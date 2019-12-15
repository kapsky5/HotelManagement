const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')

var app = express();

app.set('port', process.env.PORT || 3000);