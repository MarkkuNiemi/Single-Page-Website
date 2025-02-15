const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Tervetuloa Node.js-palvelimelle!");
    } else if (req.url === "/api") {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Tämä on API-endpoint" }));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sivua ei löydy");
    }
});

server.listen(port, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
