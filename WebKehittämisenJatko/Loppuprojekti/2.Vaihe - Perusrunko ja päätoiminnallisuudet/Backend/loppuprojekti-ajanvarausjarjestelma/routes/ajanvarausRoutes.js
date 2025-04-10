const express = require('express');
const router = express.Router();
const {
  haeAjat,
  lisaaAika,
  poistaAika
} = require('../controllers/ajanvarausController');

// GET: kaikki ajat
router.get('/', haeAjat);

// POST: lisää uusi aika
router.post('/', lisaaAika);

// DELETE: poista aika id:llä
router.delete('/:id', poistaAika);

module.exports = router;
