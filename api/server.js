// implement your server here
// require your posts router and connect it here

const express = require('express'); 
const server = express();
server.use(express.json());

const Router = require('./posts/posts-router');

server.use('/api/posts', Router);

server.get('/', (req, res) => {
    const motd = process.env.MOTD || " Hello Everyone!!";
    res.status(200).json({ motd: motd });
})

module.exports = server;