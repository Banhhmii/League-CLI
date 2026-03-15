const http = require('http');
const { URL } = require('url');
const riot =  require('./riotService.js');


const server = http.createServer( async (req, res) => {
    const baseURL = `http://localhost:3000`;
    const myURL = new URL(req.url, baseURL);
    const summonerName = myURL.searchParams.get('summonerName');
    const tagLine = myURL.searchParams.get('tagLine');

    if(myURL.pathname == '/api' && req.method === 'GET') {
        const matchStats = await riot.getMatchStats(summonerName, tagLine);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ matchStats }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }

});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})