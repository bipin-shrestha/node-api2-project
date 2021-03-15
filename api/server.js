// implement your server here
// require your posts router and connect it here

const express = require('express'); 
const server = express();
server.use(express.json());

const Post = require('./posts/posts-model');
const Router = require('./posts/posts-router');

// [GET] Returns **an array of all the post objects** contained in the database
server.get('/api/posts', (req, res) => {
    Router.find(req.query)
        .then(router => {
            res.status(200).json(router)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The posts information could not be retrieved" })
        });
});

// [GET]Returns **the post object with the specified id** 
server.get('/api/posts/:id', (req, res) => {
    Router.findById(req.params.id)
        .then(router => {
            if(router) {
                res.status(200).json(router)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(500),json({ message: "The post information could not be retrieved" })
        })
})

module.exports = server;