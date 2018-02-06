var express = require('express')
var app = express()
app.use(express.static('public'));
var server = app.listen(8000);
var io = require('socket.io')(server);
var count = 0;



//when someone makes a get request for /
//respond with "hello world"
app.get('/', function (req, res) {
  res.send(index.html)
})

// app.listen(8000, function () {
//   console.log('Example app listening on port 8000!')
// });

var name = [];

// app.get('/formpost', function(req,res){
//   res.send("you submitted "+ req.query.textfield);
//   theseSubmissions.push(req.query.textfield);
// });


io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('nameSocket',function(data){
      console.log("connected");
      console.log(data);
      name.push(data);
    })
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

});
