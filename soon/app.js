var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
// создаём Express-приложение
var app = express();
var tags;

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'Lophophore'
 });
  con.connect(function(err) {