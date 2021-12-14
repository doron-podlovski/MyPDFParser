const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const crypto  = require('crypto');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pdf = require('pdf-parse');
const fs = require('fs');
const applicants = require('../models/Applicants');
const Applicants = require('../models/Applicants');

require('dotenv/config');

router.use(bodyParser.json())
router.use(bodyParser.raw())

//Init gfs
var gfs;

//Create a connection to mongo
const conn = mongoose.createConnection(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION,()=>{console.log("Connected to MonngoDB")});

conn.once('open',  ()=>{
    //Init stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('CV');
})

function getDocumentPartsByName(partName,text)
{
    var startPoint = text.indexOf(partName);
    var endPoint = startPoint + 100;
    var substring = text.substring(startPoint,endPoint);
    return substring.substring(0,substring.indexOf('\n'));    
}

function getApplicantName(text)
{
    //Assumption: the name of the applicant will be at the top of the file.
    var name = text.substring(0,50).trim();            
    var applicantName = name.substring(0,name.indexOf('\n'));        
    return applicantName;
}

function parsePdfAndStore(dataBuffer,fileName)
{
    if(dataBuffer && (dataBuffer[0] == 0x25 && dataBuffer[1] == 0x50 && dataBuffer[2] == 0x44 && dataBuffer[3] == 0x46))
    {               
        pdf(dataBuffer).then(function(data) {                            
            var text = data.text;      
            var applicantName = getApplicantName(text);            
            var linkedinUrl = getDocumentPartsByName("Linkedin.com",text);
            var phoneNumber = getDocumentPartsByName("05",text).trim();
            var ValidatedPhoneNumber = phoneNumber.match(/^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/gi);
            if(text.includes("ID","id"))
            {
                var id = getDocumentPartsByName("ID",text).replace(/\D/g, "");
                var ValidatedID = id.match(/^[0-9]{9}$/gi);                
            }
            var email = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);            
            var cvInfo = new applicants(
                {
                    id_number:ValidatedID.toString(),
                    name:applicantName,
                    mobile:ValidatedPhoneNumber.toString(),
                    email:email.toString(),
                    Linkedin:linkedinUrl.toString(),
                    CV_FileName:fileName
                }
            );
            cvInfo.save();
        });
    }
}

const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    file: (req, file) => {              
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {           
          if (err) {
            return reject(err);
          }          
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'CV'                        
          };          
          resolve(fileInfo);
        });
      });
    }
  });

var upload = multer({    
    storage: storage,    
    fileFilter: (req, file, callback) => {                
      if (file.mimetype == "application/pdf") {
        callback(null, true);
      } else {
        callback(null, false);
        return callback(new Error('Only .pdf format allowed!'));
      }
    }
  });

router.get('/',(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length === 0){
            res.render('index',{ files:false });
        } else {
            files.map(file=> {
                if(
                    file.contentType==='image/jpeg' ||
                    file.contentType==='image/png')
                {
                    file.isImage=true;
                } else {
                    file.isImage=false;
                }
            });
            res.render('index',{ files:files });
        }
    });
});

router.post('/upload', upload.single('file'), (req, res)=>{
{                        
    const fileName = req.file.filename;
    var read_stream = gfs.createReadStream(fileName);    
    if(read_stream)
    {
    let file = [];
        read_stream.on('data', function (chunk) {
            file.push(chunk);
        });
        read_stream.on('error', e => {
            console.log(e);
            reject(e);
        });
        read_stream.on('end', function () {
            var buff = Buffer.concat(file);
            parsePdf(buff,fileName);
                        
        });
    }    
    res.status(200).redirect('/');
    
}
});

router.get('/files',(req,res)=>{
gfs.files.find().toArray((err,files)=>{
    if(!files || files.length === 0){
        return res.status(404).json({
            err: 'No files exist!'
        });
    }
    return res.json(files); });
});

router.get('/file/:filename',(req,res)=>{
gfs.files.findOne({filename:req.params.filename},(err,file)=>{
    if(!file){
        return res.status(404).json({
            err: 'No file exist!'
        });
    }
    return res.json(file);
});
});

router.get('/image/:filename',(req,res)=>{
gfs.files.findOne({filename:req.params.filename},(err,file)=>{
    if(!file){
        return res.status(404).json({
            err: 'No file exist!'
        });
    }
    if(file.contentType==='image/jpeg' || file.contentType==='image/png')
    {
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } else{
        res.status(404).json({
            err: 'Not an image!'
        });
    }

});
});

router.get('/doc/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file){
            return res.status(404).json({
                err: 'No file exist!'
            });
        }
        if(file.contentType==='application/pdf')
        {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else{
            res.status(404).json({
                err: 'Not a Document!'
            });
        }

    });
    });  
    
    router.get('/applicant/:filename',async(req,res)=>{
        
        try{
        await applicants.findOne({ CV_FileName: req.params.filename}, function (err, doc){
             res.send(doc);
        });
    }
    catch(err)
    {
        res.send(err);
    }

    });  

router.delete('file/:id',(req,res)=>{
    console.log("Trying to delete " + req.params.id );
    gfs.remove({_id: mongoose.Types.ObjectId(req.params.id),root: 'CV'},(err,gridStore)=>{
    if(err)
    {
        return res.status(404).Json({err: err});
    }
    res.redirect('/');
});


});

module.exports = router;