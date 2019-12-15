const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const rooms  = require('./routes/rooms');

//db creation and connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/HotelManagement", {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});

//running express
var app = express();

//app properties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/booking', rooms);
//running server
app.set('port', (process.env.PORT || 3000));
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server started on Port: " + app.get('port'));
});
