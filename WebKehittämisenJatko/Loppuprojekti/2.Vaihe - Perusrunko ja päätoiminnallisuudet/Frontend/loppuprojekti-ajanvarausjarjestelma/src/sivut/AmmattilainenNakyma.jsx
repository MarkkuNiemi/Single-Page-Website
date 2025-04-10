import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/ammattilainen.css';

function AmmattilainenNakyma() {
  const kayttaja = "Lääkäri Emilia";
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [ajat, setAjat] = useState([]);
  const [uusiAika, setUusiAika] = useState('');

  // Haetaan ajat tietokannasta valitulle päivälle ja käyttäjälle
  useEffect(() => {
    const haeAjat = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ajat');
        const data = await res.json();

        const paivaString = date.toISOString().split('T')[0];
        const filtteroidytAjat = data.filter(
          (aika) => aika.kayttaja === kayttaja && aika.paiva === paivaString // korjattu avain
        );


        setAjat(filtteroidytAjat);
      } catch (err) {
        console.error('Virhe haettaessa aikoja:', err);
      }
    };

    haeAjat();
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const lisaaAika = async () => {
    if (!uusiAika) return;

    const uusi = {
      kayttaja: kayttaja, // korjattu avain
      paiva: date.toISOString().split('T')[0],
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
        setAjat([...ajat, { ...uusi, id: Date.now() }]);
        setUusiAika('');
      } else {
        alert('Ajan lisäys epäonnistui');
      }
    } catch (err) {
      console.error(err);
      alert('Virhe lisättäessä aikaa');
    }
  };

  const poistaAika = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ajat/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAjat(ajat.filter((aika) => aika.id !== id));
      } else {
        alert('Ajan poisto epäonnistui');
      }
    } catch (err) {
      console.error(err);
      alert('Virhe poistaessa aikaa');
    }
  };

  const meneTakaisin = () => {
    navigate('/');
  };

  return (
    <div className="ammattilainen-nakyma">
      {/* Header */}
      <header className="header">
        <h1>Tervetuloa, Emilia</h1>
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
            {ajat.length === 0 ? (
              <li>Ei aikoja valitulle päivälle</li>
            ) : (
              ajat.map((aika) => (
                <li key={aika.id} className={aika.status === 'vapaa' ? 'vapaa' : 'varattu'}>
                  {aika.aika} ({aika.status})
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

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Loppuprojekti | Ammattilaisnäkymä
      </footer>
    </div>
  );
}

export default AmmattilainenNakyma;
