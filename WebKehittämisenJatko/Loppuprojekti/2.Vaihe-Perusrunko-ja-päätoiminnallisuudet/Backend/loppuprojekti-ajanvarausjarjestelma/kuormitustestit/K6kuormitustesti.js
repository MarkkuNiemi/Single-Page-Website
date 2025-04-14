import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 20, // Samanaikaisten käyttäjien määrä
  duration: '30s', // Testin kesto
};

export default function () {
  const res = http.get('http://localhost:5000/api/ajat'); // testattava reitti

  check(res, {
    'Vastekoodi on 200': (r) => r.status === 200,
    'Palauttaa dataa': (r) => r.body.includes('aika'),
  });

  sleep(1); // pieni tauko joka kierroksella
}
