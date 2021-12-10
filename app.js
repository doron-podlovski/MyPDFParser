const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postRoute = require('./routes/posts');
app.use('/posts',postRoute);

//ROUTES
app.get('/',(req,res)=> {
    res.send('We`re home!');
});


//Connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION,()=>{console.log("Connected to MonngoDB")});

app.listen(3000);