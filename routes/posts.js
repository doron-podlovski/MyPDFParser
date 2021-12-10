const express = require('express');
const { restart } = require('nodemon');
const { find } = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');

//Get all posts
router.get('/', async(req,res)=> {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
});

//Submit a post
router.post('/',async(req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        date:req.body.date
    });
try{
    const savedPost = await post.save()    
    res.status(200).json(savedPost);
}
catch(err)
{
    res.status(500).json({message:err});
}
});

//Get a post by id
router.get('/:postId', async(req,res) =>
{
    try{
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);        
    }
    catch(err)
    {
        res.status(404).json({error:err});
    }
})

//Delete a post by id
router.delete('/:postId', async(req,res)=>{
    try{
    const removedPost = await Post.remove({_id:req.params.postId} );    
    res.status(200).json(removedPost);
    }
    catch(err)
    {
        res.status(500).json({error:err});
    }
})

//Update a post by id
router.patch('/:postId',async(req,res)=>{            
    try{        
        const updatedPost = await Post.updateOne(                        
            {_id:req.params.postId},
            {$set:{title:req.body.title}}
        );
        res.status(200).json(updatedPost);
    }
    catch(err)
    {
        res.status(500).json({error:err});
    }
})


module.exports = router;