const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Määritetään tiedoston tyyppi
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.js') {
        contentType = 'application/javascript';
    } else if (extname === '.png') {
        contentType = 'image/png';
    } else if (extname === '.jpg' || extname === '.jpeg') {
        contentType = 'image/jpeg';
    }

    // Yritetään lukea tiedostoa ja lähettää se
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