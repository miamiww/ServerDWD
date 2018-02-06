var express = require('express')
var app = express()
app.use(express.static('public'));

var count = 0;

//when someone makes a get request for /
//respond with "hello world"
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
});
