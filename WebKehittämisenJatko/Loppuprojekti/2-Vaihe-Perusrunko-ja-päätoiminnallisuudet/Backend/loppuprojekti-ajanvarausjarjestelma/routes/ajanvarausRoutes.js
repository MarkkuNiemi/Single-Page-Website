const express = require('express');
const router = express.Router();
const {
  haeAjat,
  lisaaAika,
  poistaAika,
  varaaAika,
  haeAsiakkaanAjat

} = require('../controllers/ajanvarausController');

// GET: kaikki ajat
router.get('/', haeAjat);

// POST: lisää uusi aika
router.post('/', lisaaAika);

// DELETE: poista aika id:llä
router.delete('/:id', poistaAika);

router.patch('/:id/varaa', varaaAika);

router.get('/asiakkaan-ajat', haeAsiakkaanAjat);


module.exports = router;
