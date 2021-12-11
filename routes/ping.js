const express = require('express');
const router = express.Router();

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