const pool = require('../db');

// Hae kaikki ajat
const haeAjat = async (req, res) => {
  const { paiva, kayttaja } = req.query;

  try {
    if (paiva && kayttaja) {
      // Haetaan kaikki ajat (vapaa + varattu) tälle käyttäjälle ja päivälle
      const tulos = await pool.query(
        'SELECT * FROM ajat WHERE paiva = $1 AND kayttaja = $2 ORDER BY aika',
        [paiva, kayttaja]
      );
      return res.json(tulos.rows);
    } else {
      // Admin tai yleishaku: hae kaikki ajat koko tietokannasta
      const tulos = await pool.query('SELECT * FROM ajat ORDER BY paiva, aika');
      return res.json(tulos.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ virhe: 'Tietokantavirhe' });
  }
};



// Lisää uusi aika
const lisaaAika = async (req, res) => {
  const { kayttaja, paiva, aika, status } = req.body; // HUOM! kayttaja, ei kayttaja_id
  try {
    await pool.query(
      'INSERT INTO ajat (kayttaja, paiva, aika, status) VALUES ($1, $2, $3, $4)',
      [kayttaja, paiva, aika, status]
    );
    res.status(201).json({ viesti: 'Aika lisätty' });
  } catch (err) {
    console.error('Lisäysvirhe:', err);
    res.status(500).json({ virhe: 'Ajan lisääminen epäonnistui' });
  }
};


// Poista aika
const poistaAika = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM ajat WHERE id = $1', [id]);
    res.json({ viesti: 'Aika poistettu' });
  } catch (err) {
    res.status(500).json({ virhe: 'Ajan poisto epäonnistui' });
  }
};

// PATCH: varaa aika (päivittää statuksen)
const varaaAika = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE ajat SET status = $1 WHERE id = $2',
      ['varattu', id]
    );
    res.json({ viesti: 'Aika varattu onnistuneesti' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ virhe: 'Ajan varaaminen epäonnistui' });
  }
};

module.exports = { haeAjat, lisaaAika, poistaAika, varaaAika };

