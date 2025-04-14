// src/sivut/Kirjautuminen.jsx
import React from 'react';
import '../tyylit/kirjautuminen.css';

function Kirjautuminen() {
  return (
    <div className="kirjautuminen-container">
      <header className="header">
        <h1>Kirjautuminen</h1>
      </header>

      <main className="main-content">
        <div className="login-form">
          <h2>Kirjaudu sisään</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Käyttäjätunnus:</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Salasana:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Kirjaudu</button>
          </form>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Loppuprojekti | Kaikki oikeudet pidätetään</p>
      </footer>
    </div>
  );
}

export default Kirjautuminen;
