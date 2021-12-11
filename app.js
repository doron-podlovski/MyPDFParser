const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv/config');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.get('/',(req,res)=>{    
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

//Create a connection to mongo
const conn = mongoose.createConnection(process.env.DB_CONNECTION);

//Init gfs
let gfs;

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

  app.post('/upload',upload.single('file'),(req,res)=>{        
        res.status(200).redirect('/');
  });

  app.get('/files',(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length === 0){
            return res.status(404).json({
                err: 'No files exist!'
            });
        }
        return res.json(files);
    });
  });

  app.get('/files/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file){
            return res.status(404).json({
                err: 'No file exist!'
            });
        }
        return res.json(file);
    });
  });

  app.get('/image/:filename',(req,res)=>{
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
  
  app.delete('/files/:id',(req,res)=>{
    gfs.remove({_id: req.params.id,root: 'CV.files'},(err,gridStore)=>{
        if(err)
        {
            return res.status(404).Json({err: err});
        }
        res.redirect('/');
    });

  });

//Import Routes
// const postRoute = require('./routes/posts');
// app.use('/posts',postRoute);
const ping = require('./routes/ping');
const { options } = require('./routes/ping');
app.use('/ping',ping);

//Connect to mongoDB
//mongoose.connect(process.env.DB_CONNECTION,()=>{console.log("Connected to MonngoDB")});
const port = process.env.APP_PORT;
app.listen(port,()=>{console.log('Server started, Listening on: ' + port)});