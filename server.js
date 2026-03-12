const http = require('http');
const { URL } = require('url');


const server = http.createServer((req, res) => {
    const baseURL = `http://localhost:3000`;
    const myURL = new URL(req.url, baseURL);
    const summonerName = myURL.searchParams.get('summonerName');
    const tagLine = myURL.searchParams.get('tagLine');

    if(myURL.pathname == '/api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ summonerName, tagLine }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }

});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})