import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Kirjautuminen from './sivut/Kirjautuminen';
import AsiakasNakyma from './sivut/AsiakasNakyma'; // lisää jos käytät
// Lisää muut näkymät jos tarvitset (Admin jne.)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Kirjautuminen />} />
      <Route path="/asiakas" element={<AsiakasNakyma />} />
    </Routes>
  );
}

export default App;
