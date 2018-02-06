var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/somethingelse', function(req,res){
  res.send('hello world');
})
