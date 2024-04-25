import React, { useState } from 'react';

// Example data structure for medications. This could come from a database.
const medications = [
  { id: 1, name: "Penicillin G Potassium", sodiumPerDose: 453 },
  { id: 2, name: "Ampicillin", sodiumPerDose: 485 },
  { id: 3, name: "Ampicillin-sulbactam", sodiumPerDose: 528 },
  { id: 4, name: "Oxacillin", sodiumPerDose: 553 },
  { id: 5, name: "Nafcillin", sodiumPerDose: 592 },
  { id: 6, name: "Piperacillin-tazobactam", sodiumPerDose: 605 },
  { id: 7, name: "Cefazolin", sodiumPerDose: 425 },
  { id: 8, name: "Ceftriaxone", sodiumPerDose: 530 },
  { id: 9, name: "Ceftazidime", sodiumPerDose: 435 },
  { id: 10, name: "Cefepime", sodiumPerDose: 390 },
  { id: 11, name: "Aztreonam", sodiumPerDose: 353 },
  { id: 12, name: "Ertapenem", sodiumPerDose: 530 },
  { id: 13, name: "Meropenem", sodiumPerDose: 488 },
  { id: 14, name: "Imipenem", sodiumPerDose: 428 },
  { id: 15, name: "Ciprofloxacin", sodiumPerDose: 0 },
  { id: 16, name: "Levofloxacin", sodiumPerDose: 280 },
  { id: 17, name: "Azithromycin", sodiumPerDose: 1000 },
  { id: 18, name: "Vancomycin", sodiumPerDose: 1328 },
  { id: 19, name: "Daptomycin", sodiumPerDose: 390 },
  { id: 20, name: "Linezolid", sodiumPerDose: 1195 },
  { id: 21, name: "Ceftaroline", sodiumPerDose: 423 },
  { id: 22, name: "Doxycycline", sodiumPerDose: 390 },
  { id: 23, name: "Clindamycin", sodiumPerDose: 354 },
  { id: 24, name: "Sulfamethoxazole-trimethoprim", sodiumPerDose: 0 },
  { id: 25, name: "Metronidazole", sodiumPerDose: 325 }
];


function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    if (entries.length < 10) {
      setEntries([...entries, { medicationId: medications[0].id, doses: 1 }]);
    }
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, idx) => idx !== index);
    setEntries(newEntries);
  };

  const updateMedication = (index, id) => {
    const newEntries = [...entries];
    newEntries[index].medicationId = parseInt(id);
    setEntries(newEntries);
  };

  const updateDoses = (index, doses) => {
    const newEntries = [...entries];
    newEntries[index].doses = parseInt(doses);
    setEntries(newEntries);
  };

  const calculateTotalSodium = () => {
    return entries.reduce((total, entry) => {
      const medication = medications.find(med => med.id === entry.medicationId);
      return total + (medication.sodiumPerDose * entry.doses);
    }, 0);
  };

   return (
    <div style={{ backgroundColor: '#ffdb58' }}> {/* Mustard yellow background */}
      <h1>Total Sodium Content From Antibiotics Calculator</h1>
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
      <div style={{ width: '250px' }}>Med</div>
      <div style={{ width: '200px' }}>Doses per Day</div>
      <div style={{ width: '100px' }}></div>
    </div>
      {entries.map((entry, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
          <select value={entry.medicationId} onChange={e => updateMedication(index, e.target.value)}>
            {medications.map(med => (
              <option key={med.id} value={med.id}>{med.name}</option>
            ))}
          </select>
          <input type="number" value={entry.doses} onChange={e => updateDoses(index, e.target.value)} style={{ marginLeft: '10px' }} />
          <button onClick={() => removeEntry(index)} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
      ))}
      <button onClick={addEntry}>Add Medication</button>
      <h2>Total Sodium per day: {calculateTotalSodium()} mg</h2>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <div> written by robbie.med on 24APR2024</div>
	<div>sodium content data from <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6916518/table/T1/ " rel="noreferrer"> here </a>
	</div>
    </div>
  );
}

export default App;
