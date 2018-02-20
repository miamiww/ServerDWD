var https = require('https');
var fs = require('fs');

var credentials = {
	key: fs.readFileSync('my-key.pem'),
	cert: fs.readFileSync('my-cert.pem')
}

var express = require('express');
var app = express();
var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(8001);

var mongojs = require('mongojs');
var config = require('./config.js')
var db = mongojs(config.mlabstring,[config.collection]);
app.use(express.static(__dirname + '/public'));
var io = require('socket.io')(httpsServer);
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


app.get('/yourfriends', function(req, res) {

  db.nameandaddress.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else {
      console.log(saved);
      res.render('display.ejs', {thedata:saved});

    	// saved.forEach(function(record) {
      // 	console.log(record);
    	// });

    	/* Alternatively you could loop through the records with a "for"
    	for (var i = 0; i < saved.length; i++) {
  	  	console.log(saved[i]);
  	}
  	*/
    }
  });

});
