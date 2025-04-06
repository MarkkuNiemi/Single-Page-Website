// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Kirjautuminen</Link></li>
            <li><Link to="/ajanvaraus">Ajanvaraus</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        {children}  {/* Tämä on paikka, johon muut sivut renderöidään */}
      </main>

      <footer>
        <p>&copy; 2025 Ajanvarausjärjestelmä</p>
      </footer>
    </div>
  );
};

export default Layout;
