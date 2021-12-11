const express = require('express');
const { restart } = require('nodemon');
const { find } = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');

const version  = require('../Objects/VersionStatus.json');

router.get('/',(req,res)=> {
     try{     
        res.status(200).json(version);
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
});

module.exports = router;