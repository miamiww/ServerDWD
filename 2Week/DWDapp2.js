var express = require('express')
var app = express()

//when someone makes a get request for /
//respond with "hello world"
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
