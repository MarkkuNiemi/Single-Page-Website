import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Lisää kalenterin oma CSS
import '../tyylit/calendar.css'; // Oikea polku tyylitiedostoon

function AsiakasNakyma() {
  const [date, setDate] = useState(new Date());

  // Päivämäärän muutoksen käsittelijä
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <header className="bg-cyan-600 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Asiakasnäkymä</h1>
      </header>

      <main className="flex-grow flex flex-wrap justify-between px-4 py-8">
        {/* Kalenteri */}
        <div className="w-full md:w-1/4 flex justify-center mb-8">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar w-full"
          />
        </div>

        {/* Vapaiden aikojen lista */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Vapaana olevat ajat</h2>
          <ul>
            {/* Tässä voit näyttää dynaamisesti vapaiden aikojen listan */}
            <li className="text-xl">10:00 - 12:00</li>
            <li className="text-xl">12:30 - 14:00</li>
            <li className="text-xl">14:30 - 16:00</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cyan-600 text-white text-center py-4 text-sm">
        &copy; 2025 Loppuprojekti | Kaikki oikeudet pidätetään
      </footer>
    </div>
  );
}

export default AsiakasNakyma;
