import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/asiakasnakyma.css';

function AsiakasNakyma() {
  const [date, setDate] = useState(new Date());
  const [valittuAmmattihenkilo, setValittuAmmattihenkilo] = useState('Lääkäri Emilia'); // ✅ korjattu nimi
  const [ajat, setAjat] = useState([]);
  const navigate = useNavigate();

  // ✅ Ammattilaiset käyttävät nyt tietokannan tarkkoja arvoja
  const ammattilaiset = [
    { nimi: 'Lääkäri Emilia', id: 'Lääkäri Emilia' },
    { nimi: 'Lääkäri Petteri', id: 'Lääkäri Petteri' },
  ];

  useEffect(() => {
    const fetchAjat = async () => {
      try {
        const paivaStr = date.toISOString().split('T')[0];
        const response = await fetch(
          `http://localhost:5000/api/ajat?paiva=${paivaStr}&kayttaja=${valittuAmmattihenkilo}`
        );
        const data = await response.json();
        setAjat(data);
      } catch (error) {
        console.error('Virhe haettaessa aikoja:', error);
      }
    };

    fetchAjat();
  }, [date, valittuAmmattihenkilo]);

  const handleAmmattihenkiloChange = (e) => {
    setValittuAmmattihenkilo(e.target.value);
  };

  const varaaAika = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat/${id}/varaa`, {
        method: 'PATCH',
      });

      if (res.ok) {
        const paivaStr = date.toISOString().split('T')[0];
        const uusiRes = await fetch(
          `http://localhost:5000/api/ajat?paiva=${paivaStr}&kayttaja=${valittuAmmattihenkilo}`
        );
        const data = await uusiRes.json();
        setAjat(data);
      } else {
        alert('Ajan varaaminen epäonnistui');
      }
    } catch (err) {
      console.error('Virhe varattaessa aikaa:', err);
      alert('Verkkovirhe varattaessa aikaa');
    }
  };

  const meneTakaisin = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-turkoosi text-white py-4 text-center shadow">
        <h1 className="h3">Asiakasnäkymä</h1>
      </header>

      <main className="flex-grow-1 container py-5">
        <div className="mb-4">
          <label htmlFor="ammattihenkilo" className="form-label fw-bold">
            Valitse ammattihenkilö:
          </label>
          <select
            id="ammattihenkilo"
            className="form-select"
            value={valittuAmmattihenkilo}
            onChange={handleAmmattihenkiloChange}
          >
            {ammattilaiset.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nimi}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="availabilities">
              <h2 className="h4 mb-4">Vapaat ajat – {valittuAmmattihenkilo}</h2>
              {ajat.length === 0 ? (
                <p>Ei vapaita aikoja valitulle päivälle.</p>
              ) : (
                <ul>
                  {ajat.map((aika) => (
                    <li
                      key={aika.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span>{aika.aika}</span>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => varaaAika(aika.id)}
                      >
                        Varaa
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-center">
            <div className="calendar-box w-100">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button className="btn btn-turkoosi" onClick={meneTakaisin}>
            Takaisin kirjautumissivulle
          </button>
        </div>
      </main>

      <footer className="bg-turkoosi text-white text-center py-3">
        &copy; 2025 Loppuprojekti | Kaikki oikeudet pidätetään
      </footer>
    </div>
  );
}

export default AsiakasNakyma;
