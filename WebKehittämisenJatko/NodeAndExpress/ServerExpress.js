// Tuodaan tarvittavat moduulit
const express = require('express');
const app = express();
const port = 3000; // Portti, jossa palvelin kuuntelee

// Asetetaan Expressin serverin käsittelemään JSON-muotoisia pyyntöjä
app.use(express.json());

// Yksinkertainen reitti, joka vastaa GET-pyyntöihin
app.get('/', (req, res) => {
  res.send('Tervetuloa Express-palvelimeen!');
});

// Reitti, joka vastaanottaa POST-pyynnön ja tulostaa JSON-dataa
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log('Vastaanotettu data:', receivedData);
  res.status(200).json({ message: 'Data vastaanotettu onnistuneesti!', data: receivedData });
});

// Reitti, joka vastaa dynaamisesti parametrilla
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hei, ${name}!`);
});

// Käynnistetään palvelin ja kuunnellaan määritellyssä portissa
app.listen(port, () => {
  console.log(`Serveri käynnissä portissa ${port}`);
});