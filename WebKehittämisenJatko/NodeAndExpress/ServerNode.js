const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Tarkistetaan pyydetäänkö juuri "/"-polkua, joka on pääsivu
    let filePath = path.join(__dirname, 'SinglePageAll.html');

    // Määritetään tiedoston tyyppi
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // CSS ja JS -tiedostojen käsittely
    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.js') {
        contentType = 'application/javascript';
    }

    // Luetaan tiedosto ja lähetetään se
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Tiedostoa ei löytynyt');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});