const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
// const rooms  = require('./routes/rooms');

//db creation and connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/HotelManagement", {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});

//running express
var app = express();

//app properties
app.use(express.urlencoded());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//running server
app.set('port', (process.env.PORT || 3000));
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server started on Port: " + app.get('port'));
});
