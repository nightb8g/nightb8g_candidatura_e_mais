'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const node = express();

const routes = require('./routes/index');

node.use(bodyParser.json());
node.use(bodyParser.urlencoded({ extended: false }));
node.use(express.static(path.join(__dirname, 'public')));
node.use('/', routes);

node.set('port', process.env.PORT || 8082);

const server = node.listen(node.get('port'), () => {
    let host = server.address().address === "::" ? "localhost" : server.address().address;
    let port = server.address().port;

    console.log(`Example app listenening http://${host}:${port}`);
});

node.use((req, res, nest) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

node.use((err, req, res, next) => {
    res.status(err.status || 505);
    res.send('error' + err.message);
});

















/*'use strict';
var http = require('http');
var port = process.env.PORT || 8082;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);

*/
