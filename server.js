const http = require('http');
const { URL } = require('url');
const riot =  require('./riotService.js');
const fs = require('fs');

const statsCache = new Map();
const port = process.env.PORT || 3000;

const server = http.createServer( async (req, res) => {
    const baseURL = `http://localhost:3000`;
    const myURL = new URL(req.url, baseURL);
    const summonerName = myURL.searchParams.get('summonerName');
    const tagLine = myURL.searchParams.get('tagLine');

    if(myURL.pathname == '/api' && req.method === 'GET') {
        let cacheKey = `${summonerName}#${tagLine}`;
        if(statsCache.has(cacheKey)){
            console.log('Cache hit for', cacheKey);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ matchStats: statsCache.get(cacheKey) }));
            return;
        }else {
            const matchStats = await riot.getMatchStats(summonerName, tagLine);
            statsCache.set(cacheKey, matchStats);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ matchStats }));
        }
    } else if (myURL.pathname == '/' && req.method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if(myURL.pathname == '/script.js' && req.method === 'GET') {
        fs.readFile('./script.js', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }   else {
                res.writeHead(200, { 'Content-Type': 'application/javascript'});
                res.end(data);
            }
        });
    } else if (myURL.pathname == '/styles.css' && req.method == 'GET'){
        fs.readFile('./styles.css', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})