var mongojs = require('mongojs');
var config = require('./config.js')
var db = mongojs(config.mlabstring,[config.collection]);
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/public'));
var server = app.listen(8001);
var io = require('socket.io')(server);
var count = 0;



//when someone makes a get request for /
//respond with "hello world"
app.get('/', function (req, res) {
  res.sendFile('/public/index.html')
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
      db.nameandaddress.save(data, function(err, saved) {
        if( err || !saved ) console.log("Not saved");
        else console.log("Saved");
      });
      // db.mycollection.find({}, function(err, saved) {
      //   if (err || !saved) {
      //     console.log("No results");
      //   }
      //   else {
      //
      //     saved.forEach(function(data) {
      //       console.log(data);
      //     });
      //   }
      // });
    });
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

});
