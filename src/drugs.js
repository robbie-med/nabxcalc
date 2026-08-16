// NabxCalc data model
// All intrinsic sodium values are taken from the FDA package insert
// (via DailyMed or manufacturer labeling); see `sources` on each entry.
//
// sodiumPerGramMg = intrinsic sodium (mg) per gram of active drug
// (per million units for MU-dosed drugs).
// RTU (ready-to-use) products carry sodiumPerDoseMg instead and have no
// fluid/volume inputs.

const dailymed = (setid) =>
  `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`;

export const FLUIDS = {
  NS: { name: '0.9% NaCl (NS)', sodiumMgPerMl: 3.542 }, // 154 mEq/L
  halfNS: { name: '0.45% NaCl (½NS)', sodiumMgPerMl: 1.771 },
  D5W: { name: 'D5W', sodiumMgPerMl: 0 },
  LR: {
    name: "Lactated Ringer's",
    sodiumMgPerMl: 2.991, // 130 mEq/L
    note: 'Contains calcium; incompatible with ceftriaxone',
  },
};

export const DRUGS = [
  {
    id: 'penicillin-g-potassium',
    name: 'Penicillin G Potassium',
    doseUnit: 'MU',
    sodiumPerGramMg: 6.8, // per million units
    defaultDose: 4,
    defaultDosesPerDay: 4, // q6h
    allowedFluids: ['NS'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'caution',
    d5wNote:
      'Label lists only water/NS as diluents; also contains potassium 1.68 mEq per MU; hyperkalemia risk',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('d8aaefb6-3f7d-4bc5-b40a-1c58c3054320') },
    ],
  },
  {
    id: 'ampicillin',
    name: 'Ampicillin',
    doseUnit: 'g',
    sodiumPerGramMg: 65.8,
    defaultDose: 2,
    defaultDosesPerDay: 4, // q6h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'caution',
    d5wNote: 'D5W compatible but stable only 1–2 h; NS or LR preferred in practice',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('64a04e8c-8f78-46b3-8f45-56ef225a4f74') },
    ],
  },
  {
    id: 'ampicillin-sulbactam',
    name: 'Ampicillin-sulbactam (Unasyn)',
    doseUnit: 'g',
    sodiumPerGramMg: 76.7, // per gram of total drug (115 mg per 1.5 g)
    defaultDose: 3,
    defaultDosesPerDay: 4, // q6h
    allowedFluids: ['NS', 'D5W', 'LR'],
    defaultFluid: 'NS',
    defaultVolumeMl: 100,
    d5w: 'caution',
    d5wNote: 'D5W stable only 2 h at room temp; NS/LR preferred',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('155c7ec0-5862-404f-b1d0-f278f8a8bbda') },
    ],
  },
  {
    id: 'oxacillin',
    name: 'Oxacillin',
    doseUnit: 'g',
    sodiumPerGramMg: 57.3, // dry powder
    defaultDose: 2,
    defaultDosesPerDay: 6, // q4h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 100,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: 'Premixed frozen formulation is higher: 92.4 mg/g',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('81e90279-9889-47bd-974b-334c181f295c') },
    ],
  },
  {
    id: 'nafcillin',
    name: 'Nafcillin',
    doseUnit: 'g',
    sodiumPerGramMg: 65.8,
    defaultDose: 2,
    defaultDosesPerDay: 6, // q4h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 100,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('0f21384c-0f82-4d99-a05c-6773d1ee4bcf') },
    ],
  },
  {
    id: 'piperacillin-tazobactam',
    name: 'Piperacillin-tazobactam',
    doseUnit: 'g',
    sodiumPerGramMg: 48, // 162 mg per 3.375 g dose (generic)
    defaultDose: 3.375,
    defaultDosesPerDay: 4, // q6h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50, // label range 50–150 mL
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote:
      'Value per gram of piperacillin component (54 mg/g); brand Zosyn with EDTA is 65 mg/g. LR incompatible with generic formulation.',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('b1cb1314-d3e0-4b44-a1df-de14c32e8cc6') },
      { label: 'FDA label (DailyMed, Zosyn)', url: dailymed('8db6bd91-2106-4bfd-8cc8-38aaf1e18d17') },
    ],
  },
  {
    id: 'cefazolin',
    name: 'Cefazolin',
    doseUnit: 'g',
    sodiumPerGramMg: 48,
    defaultDose: 2,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('976916ca-85fa-4099-9607-fd377e9cf319') },
    ],
  },
  {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    doseUnit: 'g',
    sodiumPerGramMg: 83,
    defaultDose: 2,
    defaultDosesPerDay: 1, // q24h
    allowedFluids: ['NS', 'D5W'], // NOT LR (calcium precipitation)
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: "Never use calcium-containing diluents (LR/Ringer's)",
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('e6ac87e3-481e-4884-ac06-1fd7279cad62') },
    ],
  },
  {
    id: 'ceftazidime',
    name: 'Ceftazidime',
    doseUnit: 'g',
    sodiumPerGramMg: 54,
    defaultDose: 2,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'Fortaz prescribing information (Drugs.com)', url: 'https://www.drugs.com/pro/fortaz.html' },
    ],
  },
  {
    id: 'cefepime',
    name: 'Cefepime',
    doseUnit: 'g',
    sodiumPerGramMg: 0, // cefepime HCl + L-arginine, no sodium salt
    defaultDose: 2,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: 'Sodium-free formulation (HCl salt); zero inferred from label composition',
    sources: [
      { label: 'Maxipime prescribing information (Drugs.com)', url: 'https://www.drugs.com/pro/maxipime.html' },
    ],
  },
  {
    id: 'aztreonam',
    name: 'Aztreonam',
    doseUnit: 'g',
    sodiumPerGramMg: 0, // label: "sodium-free"
    defaultDose: 2,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('9a105eaf-ee77-4016-beeb-d425a5565db2') },
    ],
  },
  {
    id: 'ertapenem',
    name: 'Ertapenem',
    doseUnit: 'g',
    sodiumPerGramMg: 137,
    defaultDose: 1,
    defaultDosesPerDay: 1, // q24h
    allowedFluids: ['NS'], // NS ONLY
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'no',
    d5wNote: 'Label prohibits dextrose diluents; the 50 mL NS vehicle is unavoidable',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('33f3b99b-fa82-42e0-26bf-f49891ae3d22') },
    ],
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    doseUnit: 'g',
    sodiumPerGramMg: 90.2,
    defaultDose: 1,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'caution',
    d5wNote: 'D5W admixtures must be used immediately; NS preferred',
    poNote: null,
    formulationNote: 'Premixed DUPLEX product in NS is higher (245 mg per 500 mg)',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('8f0c2a90-956a-4430-b26d-00d48169a9b0') },
    ],
  },
  {
    id: 'imipenem-cilastatin',
    name: 'Imipenem-cilastatin',
    doseUnit: 'g',
    sodiumPerGramMg: 75, // per gram of imipenem (37.5 mg per 500 mg vial)
    defaultDose: 0.5,
    defaultDosesPerDay: 4, // q6h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 100,
    d5w: 'ok',
    d5wNote: 'Admixture stable only 4 h at room temp (all diluents)',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('f41d8abd-7792-4918-1b93-bd83ea01955e') },
    ],
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin IV',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 0.4,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'D5W', // label: dilute to 1–2 mg/mL; premix supplied in D5W
    defaultVolumeMl: 200,
    d5w: 'ok',
    d5wNote: '',
    poNote: 'Excellent oral bioavailability; IV and PO doses are equivalent',
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('f406e796-17d9-4465-b8a7-00d966a4ba74') },
    ],
  },
  {
    id: 'levofloxacin',
    name: 'Levofloxacin',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 0.75,
    defaultDosesPerDay: 1, // q24h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'D5W', // 5 mg/mL
    defaultVolumeMl: 150,
    d5w: 'ok',
    d5wNote: '',
    poNote: '99% oral bioavailability; PO equivalent',
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('70c87464-1806-480a-8ebd-3f02987ff436') },
    ],
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin IV',
    doseUnit: 'g',
    sodiumPerGramMg: 228, // 114 mg per 500 mg vial
    defaultDose: 0.5,
    defaultDosesPerDay: 1, // q24h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 250, // label: 1–2 mg/mL → 250–500 mL
    d5w: 'ok',
    d5wNote: '',
    poNote: 'Oral step-down is standard after ≥2 days IV per label',
    formulationNote: null,
    sources: [
      { label: 'Zithromax IV label (Pfizer)', url: 'https://labeling.pfizer.com/showlabeling.aspx?id=513' },
    ],
  },
  {
    id: 'vancomycin',
    name: 'Vancomycin',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 1,
    defaultDosesPerDay: 2, // q12h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 250, // ≥100 mL per 500 mg
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('8eccafe8-40c9-495a-872d-7f45a98ee759') },
    ],
  },
  {
    id: 'daptomycin',
    name: 'Daptomycin',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 0.5, // 4–6 mg/kg
    defaultDosesPerDay: 1, // q24h
    allowedFluids: ['NS'], // NS ONLY
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'no',
    d5wNote: 'Label: not compatible with dextrose-containing diluents',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'Cubicin prescribing information (Drugs.com)', url: 'https://www.drugs.com/pro/cubicin.html' },
    ],
  },
  {
    id: 'linezolid-dextrose',
    name: 'Linezolid (dextrose RTU)',
    doseUnit: 'g',
    rtu: true,
    sodiumPerDoseMg: 115, // brand Zyvox dextrose-based bag per 600 mg dose
    sodiumPerGramMg: null,
    defaultDose: 0.6,
    defaultDosesPerDay: 2, // q12h
    allowedFluids: [],
    defaultFluid: null,
    defaultVolumeMl: null,
    d5w: 'ok',
    d5wNote: '',
    poNote: '100% oral bioavailability; PO equivalent',
    formulationNote:
      'Assumes brand dextrose-based bag (115 mg/dose); NS-premixed generic is ~1196 mg/dose',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('50630775-7f76-413e-9278-ba298dd7f187') },
    ],
  },
  {
    id: 'linezolid-ns-premix',
    name: 'Linezolid (NS premix)',
    doseUnit: 'g',
    rtu: true,
    sodiumPerDoseMg: 1196, // NS-premixed generic per 600 mg dose
    sodiumPerGramMg: null,
    defaultDose: 0.6,
    defaultDosesPerDay: 2, // q12h
    allowedFluids: [],
    defaultFluid: null,
    defaultVolumeMl: null,
    d5w: 'ok',
    d5wNote: '',
    poNote: '100% oral bioavailability; PO equivalent',
    formulationNote: 'NS-premixed generic ready-to-use bag; very high sodium load',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('50630775-7f76-413e-9278-ba298dd7f187') },
    ],
  },
  {
    id: 'ceftaroline',
    name: 'Ceftaroline',
    doseUnit: 'g',
    sodiumPerGramMg: 0, // inferred: only L-arginine excipient
    defaultDose: 0.6,
    defaultDosesPerDay: 2, // q12h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 50,
    d5w: 'ok',
    d5wNote: '',
    poNote: null,
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('3ecde48b-75a2-4beb-9999-369f3f61bb8a') },
    ],
  },
  {
    id: 'doxycycline',
    name: 'Doxycycline IV',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 0.1,
    defaultDosesPerDay: 2, // q12h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'NS',
    defaultVolumeMl: 100, // 0.1–1 mg/mL
    d5w: 'ok',
    d5wNote: '',
    poNote: 'Excellent oral bioavailability; PO equivalent',
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('dd70368b-1949-4833-9d1e-f9f4cdacd9f3') },
    ],
  },
  {
    id: 'clindamycin',
    name: 'Clindamycin',
    doseUnit: 'g',
    sodiumPerGramMg: 0,
    defaultDose: 0.9,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['NS', 'D5W'],
    defaultFluid: 'D5W', // ≤18 mg/mL
    defaultVolumeMl: 100,
    d5w: 'ok',
    d5wNote: '',
    poNote: '~90% oral bioavailability; PO often appropriate',
    formulationNote: null,
    sources: [
      { label: 'Cleocin Phosphate prescribing information (Drugs.com)', url: 'https://www.drugs.com/pro/cleocin-phosphate.html' },
    ],
  },
  {
    id: 'smx-tmp',
    name: 'SMX-TMP IV (dosed as TMP component)',
    doseUnit: 'g',
    sodiumPerGramMg: 0, // 0 mg intrinsic (trace from metabisulfite)
    defaultDose: 0.4, // 400 mg TMP (PJP range)
    defaultDosesPerDay: 3, // q8h
    allowedFluids: ['D5W'], // US label requires D5W
    defaultFluid: 'D5W',
    defaultVolumeMl: 125, // per 400 mg TMP
    d5w: 'ok',
    d5wNote: 'US label requires D5W, so sodium is near zero',
    poNote: 'Excellent oral bioavailability',
    formulationNote: null,
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('640f5b0c-748d-4a68-a1de-59cc3e00ed49') },
    ],
  },
  {
    id: 'metronidazole',
    name: 'Metronidazole',
    doseUnit: 'g',
    rtu: true,
    sodiumPerDoseMg: 322, // 14 mEq per 500 mg dose
    sodiumPerGramMg: null,
    defaultDose: 0.5,
    defaultDosesPerDay: 3, // q8h
    allowedFluids: [],
    defaultFluid: null,
    defaultVolumeMl: null,
    d5w: 'no',
    d5wNote: '',
    poNote: '~100% oral bioavailability; PO equivalent',
    formulationNote: 'Ready-to-use bag in saline vehicle; sodium unavoidable in IV form',
    sources: [
      { label: 'FDA label (DailyMed)', url: dailymed('6b35138f-491b-46cf-97d3-55f43e651d63') },
    ],
  },
];

export const drugById = (id) => DRUGS.find((d) => d.id === id);
