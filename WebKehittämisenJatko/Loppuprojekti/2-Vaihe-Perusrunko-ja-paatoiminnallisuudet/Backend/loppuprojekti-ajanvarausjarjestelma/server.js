const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const ajanvarausRoutes = require('./routes/ajanvarausRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewaret
app.use(cors());
app.use(bodyParser.json());

// API-reitit
app.use('/api/ajat', ajanvarausRoutes);

// Testireitti
app.get('/api', (req, res) => {
  res.send('Tämä on ajanvarausjärjestelmän backend.');
});

// Palvele Viten build-kansio
app.use('/', express.static(path.join(__dirname, '../../Frontend/loppuprojekti-ajanvarausjarjestelma/dist')));

// Kaikki muut pyynnöt ohjataan index.html:ään
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/loppuprojekti-ajanvarausjarjestelma/dist', 'index.html'));
});

// Serverin käynnistys
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
