import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Kirjautuminen from './sivut/Kirjautuminen';
import AsiakasNakyma from './sivut/AsiakasNakyma'; // lisää jos käytät
import AmmattilainenNakyma from './sivut/AmmattilainenNakyma';
import AdminNakyma from './sivut/AdminNakyma';
// Lisää muut näkymät jos tarvitset

function App() {
  return (
    <Routes>
      <Route path="/" element={<Kirjautuminen />} />
      <Route path="/asiakas" element={<AsiakasNakyma />} />
      <Route path="/ammattilainen" element={<AmmattilainenNakyma />} />
      <Route path="/admin" element={<AdminNakyma />} />
    </Routes>
  );
}

export default App;
