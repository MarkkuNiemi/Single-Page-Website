import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/admin.css';

function AdminNakyma() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [valittuHenkilo, setValittuHenkilo] = useState('Lääkäri Emilia');
  const [ajat, setAjat] = useState([]);
  const [uusiAika, setUusiAika] = useState('');

  const paivaStr = date.toISOString().split('T')[0];

  // Hae valitun ammattilaisen ajat valitulle päivälle
  const haeAjat = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat?paiva=${paivaStr}&kayttaja=${valittuHenkilo}`);
      const data = await res.json();
      setAjat(data);
    } catch (err) {
      console.error('Virhe haettaessa aikoja:', err);
    }
  };

  useEffect(() => {
    haeAjat();
  }, [date, valittuHenkilo]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const meneTakaisin = () => {
    navigate('/');
  };

  const lisaaAika = async () => {
    if (!uusiAika) return;

    const uusi = {
      kayttaja: valittuHenkilo,
      paiva: paivaStr,
      aika: uusiAika,
      status: 'vapaa',
    };

    try {
      const res = await fetch('http://localhost:5000/api/ajat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uusi),
      });

      if (res.ok) {
        setUusiAika('');
        await haeAjat();
      } else {
        alert('Ajan lisääminen epäonnistui');
      }
    } catch (err) {
      console.error(err);
      alert('Verkkovirhe lisättäessä aikaa');
    }
  };

  const poistaAika = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await haeAjat();
      } else {
        alert('Ajan poistaminen epäonnistui');
      }
    } catch (err) {
      console.error('Virhe poistaessa aikaa:', err);
      alert('Verkkovirhe poistaessa aikaa');
    }
  };

  return (
    <div className="admin-nakyma">
      <header className="header">
        <h1>Vastaanottovirkailija - Niilo</h1>
      </header>

      <main className="main-content">
        <div className="kalenteri">
          <Calendar onChange={handleDateChange} value={date} />

          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-turkoosi" onClick={meneTakaisin}>
              Takaisin kirjautumissivulle
            </button>
          </div>
        </div>

        <div className="ajat-lista">
          <h2>{valittuHenkilo} – {date.toLocaleDateString()}</h2>

          <div className="mb-3">
            <label htmlFor="henkiloSelect"><strong>Valitse ammattilainen:</strong></label>
            <select
              id="henkiloSelect"
              className="form-select"
              value={valittuHenkilo}
              onChange={(e) => setValittuHenkilo(e.target.value)}
            >
              <option value="Lääkäri Emilia">Lääkäri Emilia</option>
              <option value="Lääkäri Petteri">Lääkäri Petteri</option>
            </select>
          </div>

          <ul>
            {ajat.length === 0 ? (
              <li>Ei aikoja tälle päivälle</li>
            ) : (
              ajat.map((aika) => (
                <li key={aika.id} className={aika.status === 'vapaa' ? 'vapaa' : 'varattu'}>
                  {aika.aika} ({aika.status}
                  {aika.status === 'varattu' && aika.asiakas ? ` – Asiakas: ${aika.asiakas}` : ''})
                  <button onClick={() => poistaAika(aika.id)}>Poista</button>
                </li>
              ))
            )}
          </ul>


          <div className="lisaa-aika">
            <input
              type="text"
              placeholder="Esim. 13:00 - 14:00"
              value={uusiAika}
              onChange={(e) => setUusiAika(e.target.value)}
            />
            <button onClick={lisaaAika}>Lisää vapaa aika</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        &copy; 2025 Loppuprojekti | Admin näkymä
      </footer>
    </div>
  );
}

export default AdminNakyma;
