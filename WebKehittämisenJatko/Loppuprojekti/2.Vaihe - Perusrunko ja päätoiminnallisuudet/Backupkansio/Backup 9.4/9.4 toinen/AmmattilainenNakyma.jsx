import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/ammattilainen.css';

function AmmattilainenNakyma() {
  const meneTakaisin = () => {
    navigate('/');
  };
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [ajat, setAjat] = useState([
    { id: 1, aika: '10:00 - 11:00', status: 'vapaa' },
    { id: 2, aika: '11:30 - 12:30', status: 'varattu' },
  ]);
  const [uusiAika, setUusiAika] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const lisaaAika = () => {
    if (!uusiAika) return;
    const uusi = {
      id: Date.now(),
      aika: uusiAika,
      status: 'vapaa',
    };
    setAjat([...ajat, uusi]);
    setUusiAika('');
  };

  const poistaAika = (id) => {
    setAjat(ajat.filter((a) => a.id !== id));
  };

  return (
    <div className="ammattilainen-nakyma">
      {/* Header */}
      <header className="header">
        <h1>Tervetuloa, Ammattilainen</h1>
      </header>

      <main className="main-content">
        {/* Kalenteri */}
        <div className="kalenteri">
          <Calendar onChange={handleDateChange} value={date} />

          {/* Takaisin-painike */}
          <div className="mt-5">
            <button className="btn btn-turkoosi" onClick={meneTakaisin}>
              Takaisin kirjautumissivulle
            </button>
          </div>
        </div>

        {/* Ajat ja hallinta */}
        <div className="ajat-lista">
          <h2>Ajat päivälle {date.toLocaleDateString()}</h2>

          <ul>
            {ajat.map((aika) => (
              <li key={aika.id} className={aika.status === 'vapaa' ? 'vapaa' : 'varattu'}>
                {aika.aika} ({aika.status})
                <button onClick={() => poistaAika(aika.id)}>Poista</button>
              </li>
            ))}
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

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Loppuprojekti | Ammattilaisnäkymä
      </footer>
    </div>
  );
}

export default AmmattilainenNakyma;
