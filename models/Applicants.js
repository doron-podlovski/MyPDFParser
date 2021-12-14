const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
// email address, Linkedin profile url, mobile phone number and i.d
const PostSchema = mongoose.Schema({
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
    name:{
        type:String,
        required:true
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