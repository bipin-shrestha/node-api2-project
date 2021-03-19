// implement your server here
// require your posts router and connect it here

const express = require('express'); 
const server = express();
server.use(express.json());

const Router = require('./posts/posts-router');

server.use('/api/posts', Router);

server.get('/', (req, res) => {
    res.send(`Welcome to the post API`);
})

module.exports = server;