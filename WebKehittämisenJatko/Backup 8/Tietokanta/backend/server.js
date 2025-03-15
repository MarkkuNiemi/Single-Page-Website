const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Käytetään body-parseria JSON-datan käsittelyyn
app.use(bodyParser.json());

// SQLite-tietokannan luominen tai avaaminen
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Tietokannan avaaminen epäonnistui:', err.message);
  } else {
    console.log('Tietokanta on avattu.');
  }
});

// Luo tietokannan rakenne, jos sitä ei ole vielä olemassa
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Tietokannan rakenne ei voitu luoda:', err.message);
    } else {
      console.log('Tietokannan rakenne luotiin tai se on jo olemassa.');
    }
  });
});

const path = require('path');

// Palvelee staattisia tiedostoja 'public'-kansiosta
app.use(express.static(path.join(__dirname, 'public')));


// CRUD: CREATE
app.post('/users', (req, res) => {
  const { name, address, phone } = req.body;
  const stmt = db.prepare("INSERT INTO users (name, address, phone) VALUES (?, ?, ?)");
  
  stmt.run(name, address, phone, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, address, phone });
  });

  stmt.finalize();
});

// CRUD: READ (tarkastelee kaikkia käyttäjiä)
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// CRUD: READ (tarkastelee tiettyä käyttäjää ID:n perusteella)
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Käyttäjää ei löydy' });
    }
    res.json(row);
  });
});

// CRUD: UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, phone } = req.body;
  const stmt = db.prepare("UPDATE users SET name = ?, address = ?, phone = ? WHERE id = ?");

  stmt.run(name, address, phone, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Käyttäjää ei löydy' });
    }
    res.json({ message: 'Käyttäjä päivitetty', id, name, address, phone });
  });

  stmt.finalize();
});

// CRUD: DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");

  stmt.run(id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Käyttäjää ei löydy' });
    }
    res.json({ message: 'Käyttäjä poistettu', id });
  });

  stmt.finalize();
});

// Käynnistetään palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnistetty porttiin ${port}`);
});