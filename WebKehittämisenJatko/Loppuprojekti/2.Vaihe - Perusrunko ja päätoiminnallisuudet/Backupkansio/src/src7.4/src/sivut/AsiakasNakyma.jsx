import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/*import './calendar.css'; // halutessa lisätyyliä*/

function AsiakasNakyma() {
  const [valittuPaiva, setValittuPaiva] = useState(null);

  const vapaatAjat = {
    '2025-04-07': ['10:00', '13:30', '15:00'],
    '2025-04-08': ['09:00', '11:00'],
    // Lisää tarvittaessa
  };

  const muodostaPaivaAvain = (pvm) =>
    pvm.toISOString().split('T')[0];

  const valitunPaivanAjat = valittuPaiva
    ? vapaatAjat[muodostaPaivaAvain(valittuPaiva)] || []
    : [];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Vapaana olevat ajat */}
        <div className="col-md-8">
          <h3 className="mb-3">Vapaana olevat ajat</h3>
          {valittuPaiva ? (
            valitunPaivanAjat.length > 0 ? (
              <ul className="list-group">
                {valitunPaivanAjat.map((aika) => (
                  <li key={aika} className="list-group-item">
                    {aika}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ei vapaita aikoja valitulle päivälle.</p>
            )
          ) : (
            <p>Valitse päivä kalenterista.</p>
          )}
        </div>

        {/* Kalenteri oikeassa yläkulmassa */}
        <div className="col-md-4 d-flex justify-content-end">
          <div>
            <h5>Valitse päivä</h5>
            <Calendar
              onChange={setValittuPaiva}
              value={valittuPaiva}
              locale="fi-FI"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsiakasNakyma;
