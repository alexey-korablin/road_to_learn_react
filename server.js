const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('public/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            res.end('Not found');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
}).listen(3010, () => console.log('Server listen on port 3010'));