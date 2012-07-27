#!/usr/bin/env node

var createServer = require('../lib/server.js').createServer;

var port = (process.argv.length > 2) ? process.argv[2] : 5004;

createServer(port);
