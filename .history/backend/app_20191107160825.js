const express = require('express');
const http = require('http');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/HotelManagement", {useNewUrlParser:true, useCreateIndex: true})
var app = express();

app.set('port', (process.env.PORT || 3000));
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server started on Port: " + app.get('port'));
});

