// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Kirjautuminen from './sivut/Kirjautuminen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Kirjautuminen />} />
    </Routes>
  );
}

export default App;
