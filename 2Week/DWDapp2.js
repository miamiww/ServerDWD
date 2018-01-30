var express = require('express')
var app = express()
app.use(express.static('public'));

var count = 0;

//when someone makes a get request for /
//respond with "hello world"
app.get('/', function (req, res) {
  res.send('Hello World!')
})


var theseSubmissions = [];

app.get('/formpost', function(req,res){
  res.send("you submitted "+ req.query.textfield);
  theseSubmissions.push(req.query.textfield);
});

app.get('/display', function(req,res){
  let htmlout = "<html><body>";
  for(var i = 0; i< theseSubmissions.length; i++){
    htmlout = htmlout +theseSubmissions[i] + "<br>";
  }
  htmlout = htmlout + "</body></html>";
  res.send(htmlout);
})

app.get('/somethingelse', function (req, res) {
  res.send('goodbye')
});

app.get('/count', function (req, res) {
  count++;
  res.send('<html><body>'+count+'</body></html>')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
