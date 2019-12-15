const express = require('express');
const http = require('http');
const path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));
http.createServer(app).listen(app.get(PORT), function(){
    consolr.log("Express server started on Port: " + app.get('port'));
})