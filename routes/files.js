const express = require('express');
const router = express.Router();
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

require('dotenv/config');

//Init gfs
var gfs;

//Create a connection to mongo
const conn = mongoose.createConnection(process.env.DB_CONNECTION);

conn.once('open',  ()=>{
    //Init stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('CV');
})

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

const upload = multer({ storage });  

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

router.post('/upload',upload.single('file'),(req,res)=>{        
    res.status(200).redirect('/');
});

router.get('/files',(req,res)=>{
gfs.files.find().toArray((err,files)=>{
    if(!files || files.length === 0){
        return res.status(404).json({
            err: 'No files exist!'
        });
    }
    return res.json(files);
});
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