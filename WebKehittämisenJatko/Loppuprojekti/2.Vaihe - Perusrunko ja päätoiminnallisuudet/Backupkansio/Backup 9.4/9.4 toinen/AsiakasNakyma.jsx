import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../tyylit/calendar.css';
import '../tyylit/asiakasnakyma.css';

function AsiakasNakyma() {
  const [date, setDate] = useState(new Date());
  const [valittuAmmattihenkilo, setValittuAmmattihenkilo] = useState('Lääkäri Emilia');
  const navigate = useNavigate(); // Navigointifunktio

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAmmattihenkiloChange = (e) => {
    setValittuAmmattihenkilo(e.target.value);
  };

  const meneTakaisin = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <header className="bg-turkoosi text-white py-4 text-center shadow">
        <h1 className="h3">Asiakasnäkymä</h1>
      </header>

      <main className="flex-grow-1 container py-5">
        {/* Ammattihenkilön valinta */}
        <div className="mb-4">
          <label htmlFor="ammattihenkilo" className="form-label fw-bold">Valitse ammattihenkilö:</label>
          <select
            id="ammattihenkilo"
            className="form-select"
            value={valittuAmmattihenkilo}
            onChange={handleAmmattihenkiloChange}
          >
            <option value="Lääkäri Emilia">Lääkäri Emilia</option>
            <option value="Lääkäri Petteri">Lääkäri Petteri</option>
          </select>
        </div>

        <div className="row">
          {/* Aikojen lista */}
          <div className="col-md-8 mb-4">
            <div className="availabilities">
              <h2 className="h4 mb-4">Vapaana olevat ajat – {valittuAmmattihenkilo}</h2>
              <ul>
                <li>10:00 - 12:00</li>
                <li>12:30 - 14:00</li>
                <li>14:30 - 16:00</li>
              </ul>
            </div>
          </div>

          {/* Kalenteri */}
          <div className="col-md-4 d-flex justify-content-center">
            <div className="calendar-box w-100">
              <Calendar
                onChange={handleDateChange}
                value={date}
              />
            </div>
          </div>
        </div>

        {/* Takaisin-painike */}
        <div className="mt-5">
          <button className="btn btn-turkoosi" onClick={meneTakaisin}>
            Takaisin kirjautumissivulle
          </button>
        </div>

      </main>

      <footer className="bg-turkoosi text-white text-center py-3">
        &copy; 2025 Loppuprojekti | Kaikki oikeudet pidätetään
      </footer>
    </div>
  );
}

export default AsiakasNakyma;
