import React, { useState } from 'react';
import { FLUIDS, DRUGS, drugById } from './drugs';

const HF_LIMIT_MG = 2000; // daily sodium restriction used for the context panel
const MG_PER_MEQ = 23;

const fmt = (n, decimals = 0) =>
  Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

// Per-line sodium breakdown, in mg/day.
function lineTotals(row) {
  const drug = drugById(row.drugId);
  const doses = Number(row.dosesPerDay) || 0;
  let intrinsic;
  let diluent = 0;
  if (drug.rtu) {
    intrinsic = drug.sodiumPerDoseMg * doses;
  } else {
    intrinsic = (drug.sodiumPerGramMg || 0) * (Number(row.dose) || 0) * doses;
    const fluid = FLUIDS[row.fluid];
    if (fluid) {
      diluent = fluid.sodiumMgPerMl * (Number(row.volumeMl) || 0) * doses;
    }
  }
  return { drug, intrinsic, diluent, total: intrinsic + diluent };
}

// Lowest-sodium labeled configuration for a line: swap to D5W where the
// label allows it, keeping the current volume. RTU lines cannot change.
function optimizedTotal(row) {
  const drug = drugById(row.drugId);
  if (!drug.rtu && drug.d5w === 'ok' && drug.allowedFluids.includes('D5W')) {
    return lineTotals({ ...row, fluid: 'D5W' }).total;
  }
  return lineTotals(row).total;
}

function newRow(drug) {
  return {
    key: Math.random().toString(36).slice(2),
    drugId: drug.id,
    dose: drug.defaultDose,
    dosesPerDay: drug.defaultDosesPerDay,
    fluid: drug.defaultFluid,
    volumeMl: drug.defaultVolumeMl,
  };
}

// Actionable suggestions for one line, generated from the data model.
function suggestions(row, drug, diluent) {
  const out = [];
  const fluid = drug.rtu ? null : FLUIDS[row.fluid];
  if (fluid && fluid.sodiumMgPerMl > 0 && diluent > 0 && drug.d5w === 'ok') {
    out.push(`Switching to D5W saves ~${fmt(diluent)} mg/day`);
  }
  if (drug.d5w === 'caution' && drug.d5wNote) {
    out.push(`D5W caution: ${drug.d5wNote}`);
  }
  if (drug.d5w === 'no' && drug.d5wNote) {
    out.push(`D5W not an option: ${drug.d5wNote}`);
  }
  if (drug.poNote) {
    out.push(`Consider PO: ${drug.poNote}`);
  }
  if (drug.formulationNote) {
    out.push(`Note: ${drug.formulationNote}`);
  }
  return out;
}

const LOW_SODIUM_AGENTS = [
  'Cefepime',
  'Aztreonam',
  'Ciprofloxacin',
  'Levofloxacin',
  'Doxycycline',
  'Clindamycin',
  'SMX-TMP',
  'Vancomycin',
];

function App() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    if (rows.length < 10) {
      setRows([...rows, newRow(DRUGS[0])]);
    }
  };

  const removeRow = (key) => setRows(rows.filter((r) => r.key !== key));

  const updateRow = (key, patch) =>
    setRows(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const changeDrug = (key, drugId) => {
    const drug = drugById(drugId);
    setRows(rows.map((r) => (r.key === key ? { ...newRow(drug), key } : r)));
  };

  const lines = rows.map(lineTotals);
  const totalMg = lines.reduce((sum, l) => sum + l.total, 0);
  const optimizedMg = rows.reduce((sum, r) => sum + optimizedTotal(r), 0);
  const pctOfLimit = (totalMg / HF_LIMIT_MG) * 100;
  const contextClass =
    pctOfLimit < 10 ? 'ctx-green' : pctOfLimit <= 50 ? 'ctx-amber' : 'ctx-red';

  return (
    <div className="app">
      <header>
        <h1>NabxCalc</h1>
        <p className="subtitle">
          How much sodium is your IV antibiotic regimen really delivering?
        </p>
      </header>

      <section className="card">
        {rows.length === 0 && (
          <p className="muted">No medications yet. Add one to begin.</p>
        )}
        {rows.map((row) => {
          const drug = drugById(row.drugId);
          const { intrinsic, diluent, total } = lineTotals(row);
          return (
            <div key={row.key} className="row">
              <div className="row-inputs">
                <label>
                  Medication
                  <select
                    value={row.drugId}
                    onChange={(e) => changeDrug(row.key, e.target.value)}
                  >
                    {DRUGS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Dose ({drug.doseUnit})
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={row.dose}
                    onChange={(e) => updateRow(row.key, { dose: e.target.value })}
                  />
                </label>
                <label>
                  Doses/day
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={row.dosesPerDay}
                    onChange={(e) =>
                      updateRow(row.key, { dosesPerDay: e.target.value })
                    }
                  />
                </label>
                {!drug.rtu && (
                  <>
                    <label>
                      Diluent
                      <select
                        value={row.fluid}
                        onChange={(e) =>
                          updateRow(row.key, { fluid: e.target.value })
                        }
                      >
                        {drug.allowedFluids.map((f) => (
                          <option key={f} value={f}>
                            {FLUIDS[f].name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Volume/dose (mL)
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={row.volumeMl}
                        onChange={(e) =>
                          updateRow(row.key, { volumeMl: e.target.value })
                        }
                      />
                    </label>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => removeRow(row.key)}
                >
                  Remove
                </button>
              </div>
              <div className="row-result">
                drug {fmt(intrinsic)} mg
                {!drug.rtu && ` + diluent ${fmt(diluent)} mg`} ={' '}
                <strong>{fmt(total)} mg/day</strong>
              </div>
              {suggestions(row, drug, diluent).length > 0 && (
                <ul className="row-notes">
                  {suggestions(row, drug, diluent).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="btn"
          onClick={addRow}
          disabled={rows.length >= 10}
        >
          Add medication
        </button>
      </section>

      {rows.length > 0 && (
        <section className={`card context ${contextClass}`}>
          <h2>Clinical context</h2>
          <div className="context-grid">
            <div>
              <div className="big">{fmt(totalMg)} mg</div>
              <div className="muted">total sodium per day</div>
            </div>
            <div>
              <div className="big">{fmt(totalMg / MG_PER_MEQ, 1)} mEq</div>
              <div className="muted">per day</div>
            </div>
            <div>
              <div className="big">{fmt(pctOfLimit, 1)}%</div>
              <div className="muted">of a 2000 mg/day HF sodium restriction</div>
            </div>
            <div>
              <div className="big">{fmt(totalMg / FLUIDS.NS.sodiumMgPerMl)} mL</div>
              <div className="muted">equivalent 0.9% saline per day</div>
            </div>
          </div>
          {optimizedMg < totalMg - 0.5 && (
            <p className="optimize">
              Optimizable to {fmt(optimizedMg)} mg/day (−
              {fmt(totalMg - optimizedMg)} mg/day) by using the lowest-sodium
              labeled diluent on every line.
            </p>
          )}
        </section>
      )}

      <section className="card">
        <h2>Near-zero intrinsic sodium agents</h2>
        <p>{LOW_SODIUM_AGENTS.join(' · ')}</p>
      </section>

      <section className="card">
        <h2>Methodology &amp; citations</h2>
        <p>
          Each line adds <strong>intrinsic drug sodium</strong> (per the package
          insert) to <strong>diluent sodium</strong>: 0.9% NaCl contributes
          3.542 mg/mL, i.e. 177 mg per 50 mL or 354 mg per 100 mL bag. D5W
          contributes none.
        </p>
        <ul>
          <li>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6916518/">
              Wang et al. 2019
            </a>{': '}
            sodium content of IV antimicrobials
          </li>
          <li>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6559271/">
              Frisbee et al. 2019
            </a>{': '}
            IV antibiotics in acute decompensated heart failure
          </li>
          <li>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8128950/">
              Van Regenmortel et al. 2021
            </a>{': '}
            fluid creep
          </li>
        </ul>
        <details>
          <summary>Per-drug sources (package inserts)</summary>
          <ul>
            {DRUGS.map((d) => (
              <li key={d.id}>
                {d.name}:{' '}
                {d.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ' · '}
                    <a href={s.url}>{s.label}</a>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="card disclaimer">
        <strong>Disclaimer:</strong> Educational tool, not medical advice.
        Verify all doses, compatibilities, and sodium content with your
        pharmacy and the current package insert.
      </section>

      <footer>
        <a className="heritage" href="./legacy/index.html">
          NabxCalc V1
        </a>
      </footer>
    </div>
  );
}

export default App;
