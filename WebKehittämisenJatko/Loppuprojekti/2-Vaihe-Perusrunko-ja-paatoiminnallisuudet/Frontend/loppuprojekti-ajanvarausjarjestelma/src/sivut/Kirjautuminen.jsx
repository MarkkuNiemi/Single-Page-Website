import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Kirjautuminen() {
  const [valittuRooli, setValittuRooli] = useState('asiakas');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yksinkertainen validointi
    if (!username || !password) {
      alert('Täytä kaikki kentät!');
      return;
    }

    // Tähän voi lisätä myöhemmin autentikoinnin

    // Ohjaa eri näkymään roolin perusteella
    if (valittuRooli === 'asiakas') {
      navigate('/asiakas');
    } else if (valittuRooli === 'ammattilainen') {
      navigate('/ammattilainen');
    } else if (valittuRooli === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      <header className="bg-turkoosi text-white py-4 text-center shadow">
        <h1 className="h3">Tervetuloa ajanvaraukseen</h1>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
          <h2 className="h4 mb-3 text-center">Kirjaudu sisään</h2>

          {/* Valinta */}
          <div className="d-flex justify-content-between mb-4">
            {['asiakas', 'ammattilainen', 'admin'].map((rooli) => (
              <button
                key={rooli}
                className={`btn btn-sm ${
                  valittuRooli === rooli ? 'btn-turkoosi' : 'btn-outline-secondary'
                }`}
                onClick={() => setValittuRooli(rooli)}
              >
                {rooli.charAt(0).toUpperCase() + rooli.slice(1)}
              </button>
            ))}
          </div>

          {/* Lomake */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Käyttäjätunnus</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Salasana</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-turkoosi w-100">Kirjaudu</button>
          </form>
        </div>
      </main>

      <footer className="bg-turkoosi text-white text-center py-3">
        &copy; 2025 Loppuprojekti | Kaikki oikeudet pidätetään
      </footer>
    </div>
  );
}

export default Kirjautuminen;
