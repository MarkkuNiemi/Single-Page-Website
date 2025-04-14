import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/asiakasnakyma.css';

function AsiakasNakyma() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [valittuAmmattihenkilo, setValittuAmmattihenkilo] = useState('Lääkäri Emilia');
  const [ajat, setAjat] = useState([]);
  const [omatVaraukset, setOmatVaraukset] = useState([]);
  const asiakasNimi = 'Pekka'; // Kovakoodattu asiakkaan nimi

  const paivaStr = date.toISOString().split('T')[0];

  // Hae ajat valitulle ammattilaiselle ja päivälle
  const haeAjat = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat?paiva=${paivaStr}&kayttaja=${valittuAmmattihenkilo}`);
      const data = await res.json();
      setAjat(data);
    } catch (err) {
      console.error('Virhe haettaessa aikoja:', err);
    }
  };

  // Hae asiakkaan omat varaukset
  const haeOmatVaraukset = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat`);
      const data = await res.json();
      const omat = data.filter(
        (aika) => aika.status === 'varattu' && aika.asiakas === asiakasNimi
      );
      setOmatVaraukset(omat);
      console.log('Omat varaukset raw:', data);
    } catch (err) {
      console.error('Virhe haettaessa omia varauksia:', err);
    }
  };

  useEffect(() => {
    haeAjat();
  }, [date, valittuAmmattihenkilo]);

  useEffect(() => {
    haeOmatVaraukset();
  }, [ajat]);

  const handleAmmattihenkiloChange = (e) => {
    setValittuAmmattihenkilo(e.target.value);
  };

  const varaaAika = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat/${id}/varaa`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asiakas: asiakasNimi })
      });

      if (res.ok) {
        await haeAjat();
      } else {
        alert('Ajan varaaminen epäonnistui');
      }
    } catch (err) {
      console.error('Verkkovirhe varattaessa aikaa:', err);
      alert('Verkkovirhe varattaessa aikaa');
    }
  };

  const meneTakaisin = () => {
    navigate('/');
  };


  const peruutaVaraus = async (id) => {
    if (!window.confirm('Haluatko varmasti peruuttaa ajan?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/ajat/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await haeAjat();
        await haeOmatVaraukset();
      } else {
        alert('Peruutus epäonnistui');
      }
    } catch (err) {
      console.error('Virhe peruuttaessa aikaa:', err);
      alert('Verkkovirhe peruuttaessa aikaa');
    }
  };

  const muotoilePaiva = (paivaStr) => {
    if (!paivaStr) return 'Tuntematon päivä';

    // Erotellaan vain päivämäärä, esim. '2025-04-14'
    const vainPaiva = paivaStr.split('T')[0];
    const [vuosi, kuukausi, paiva] = vainPaiva.split('-');

    // Luodaan uusi päivämäärä ja lisätään 1 päivä
    const korjattu = new Date(vuosi, kuukausi - 1, parseInt(paiva) + 2);

    const pvm = korjattu.getDate().toString().padStart(2, '0');
    const kk = (korjattu.getMonth() + 1).toString().padStart(2, '0');
    const v = korjattu.getFullYear();

    return `${pvm}.${kk}.${v}`;
  };





  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-turkoosi text-white py-4 text-center shadow">
        <h1 className="h3">Tervetuloa Pekka</h1>
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
            <option value="Lääkäri Emilia">Lääkäri Emilia</option>
            <option value="Lääkäri Petteri">Lääkäri Petteri</option>
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
                  {ajat
                    .filter((a) => a.status === 'vapaa')
                    .map((aika) => (
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

            <div className="mt-5">
              <h3 className="h5">Omat varaukset</h3>
              {omatVaraukset.length === 0 ? (
                <p>Ei varauksia vielä.</p>
              ) : (
                <ul>
                  {omatVaraukset.map((v) => (
                    <li key={v.id} className="d-flex justify-content-between align-items-center">
                      <span>
                        {muotoilePaiva(v.paiva)} klo {v.aika} – {v.kayttaja}
                      </span>
                      <button
                        className="btn btn-sm btn-danger ms-3"
                        onClick={() => peruutaVaraus(v.id)}
                      >
                        Peruuta
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
