const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const PostSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.Now
    },
    id_number:
    {
        type:String,
        required:false,
        default:null
    },
    email:{
        type:String,
        required:false,
        default:null
    },
    Linkedin:{
        type:String,
        require:false,
        default:null
    },
    mobile:{
        type:String,
        required:false,
        default:null
    },
    CV_FileName:{
        type:String,
        require:false,
        default:null
    }
});

module.exports = mongoose.model('Applicants',PostSchema);