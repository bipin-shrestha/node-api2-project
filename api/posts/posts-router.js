// implement your posts router here
const express = require('express');

const posts =require('./posts-model.js');
const router = express.Router();

// Returns **an array of all the post objects** contained in the database  
router.get('/', (req, res) => {
    posts.find()
        .then(Posts => {
            res.status(200).json(Posts);
        })
        .catch(error => {
            res.status(500).json({ message: "The posts information could not be retrieved" });
        });
});

//Returns **the post object with the specified id** 
router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
        .then(Posts => {
            if(Posts) {
                res.status(200).json(Posts);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
        });
});

//Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post('/', (req, res) =>{
    if(req.body.title !== '' || req.body.contents !== ''){
        posts.insert(req.body)
        .then(Post => {
            res.status(201).json(Post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database" });
        });
    } else {
        res.status(400).json({ message: "Please provide title and contents for the post" });
    } 
})

//Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', (req, res) => {
    const post = posts.findById(req.params.id);
    if(post){
        if(req.body.title !== '' || req.body.contents !== ''){
            posts.update(req.params.id, req.body)
            .then(Post => {
                res.status(200).json(Post);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "The post information could not be modified" })
            })
        } else {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
})

router.delete('/:id', (req, res) => {
    const post = posts.findById(req.params.id);
    if(post){
        posts.remove(req.params.id)
        .then(Post => {
            res.status(200).json(Post);
        })
        .catch(error =>{
            res.status(500).json({ message: "The post could not be removed" });
        })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
})

router.get('/:id/comments', (req, res) => {
   const post = posts.findById(req.params.id);
   if(post){
       posts.findPostComments(req.params.id)
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: "The comments information could not be retrieved" })
        })
   } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
   }
} )

module.exports = router;