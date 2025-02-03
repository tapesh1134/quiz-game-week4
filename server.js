const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serverfile(res, 'public/index.html', 'text/html');
    } else if (req.url === '/questions') {
        fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No questions' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        serverfile(res, public${req.url}, contenttype(req.url));
    }
});