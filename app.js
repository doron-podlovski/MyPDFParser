const express = require('express');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv/config');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set('view engine','ejs');

//Import Routes
const files = require('./routes/files');
const ping = require('./routes/ping');
app.use('/',files);
app.use('/ping',ping);

const port = process.env.APP_PORT;
app.listen(port,()=>{console.log('Server started, Listening on: ' + port)});