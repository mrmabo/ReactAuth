// Main starting point of the application.
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost/auth');

//Add setup
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
// Add headers


router(app);

//server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('server listen on:', port);