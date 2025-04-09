import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/admin.css';

function AdminNakyma() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [valittuHenkilo, setValittuHenkilo] = useState('Lääkäri Emilia');
  const [uusiAika, setUusiAika] = useState('');

  const [kaikkiAjat, setKaikkiAjat] = useState([
    { id: 1, ammattilainen: 'Lääkäri Emilia', aika: '10:00 - 11:00', status: 'vapaa' },
    { id: 2, ammattilainen: 'Lääkäri Petteri', aika: '11:30 - 12:30', status: 'varattu' },
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const meneTakaisin = () => {
    navigate('/');
  };

  const poistaAika = (id) => {
    setKaikkiAjat(kaikkiAjat.filter((a) => a.id !== id));
  };

  const lisaaAika = () => {
    if (!uusiAika) return;
    const uusi = {
      id: Date.now(),
      ammattilainen: valittuHenkilo,
      aika: uusiAika,
      status: 'vapaa',
    };
    setKaikkiAjat([...kaikkiAjat, uusi]);
    setUusiAika('');
  };

  return (
    <div className="admin-nakyma">
      <header className="header">
        <h1>Admin - Kaikki ammattilaisten varaukset</h1>
      </header>

      <main className="main-content">
        {/* Kalenteri vasemmalla */}
        <div className="kalenteri">
          <Calendar onChange={handleDateChange} value={date} />

          {/* Takaisin kirjautumissivulle */}
          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-turkoosi" onClick={meneTakaisin}>
              Takaisin kirjautumissivulle
            </button>
          </div>
        </div>

        {/* Lista ja hallinta oikealla */}
        <div className="ajat-lista">
          <h2>Ajat päivälle {date.toLocaleDateString()}</h2>

          {/* Ammattihenkilön valinta */}
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

          {/* Lista */}
          <ul>
            {kaikkiAjat
              .filter((aika) => aika.ammatilainen === valittuHenkilo)
              .map((aika) => (
                <li key={aika.id} className={aika.status === 'vapaa' ? 'vapaa' : 'varattu'}>
                  {aika.aika} ({aika.status}) – {aika.ammatilainen}
                  <button onClick={() => poistaAika(aika.id)}>Poista</button>
                </li>
              ))}
          </ul>

          {/* Lisää uusi aika */}
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
