var mongojs = require('mongojs');
var config = require('./config.js')
var db = mongojs(config.mlabstring,[config.collection]);
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.send('bloop')
})

// var thesubmissions = [];

app.get('/templatetest', function(req, res) {
	var data = {person: {name: "Shawn", other: "blah"}};
    res.render('template.ejs', data);
});

app.get('/display', function(req, res) {
    // res.render('display.ejs', {thedata:thesubmissions});
    db.mycollection.find({}, function(err, saved) {
      if (err || !saved) {
      	console.log("No results");
      }
      else {

      	saved.forEach(function(record) {
        	console.log(record);
      	});

      	/* Alternatively you could loop through the records with a "for"
      	for (var i = 0; i < saved.length; i++) {
    	  	console.log(saved[i]);
    	}
    	*/
      }
    });

});





app.get('/formpost', function(req,res){
  res.send("you submitted "+ req.query.textfield);
  // thesubmissions.push(req.query.textfield);

  db.thesubmissions.save({"submission":req.query.textfield}, function(err, saved) {
    if( err || !saved ) console.log("Not saved");
    else console.log("Saved");
  });

});

// app.get('/display', function(req,res){
//   let htmlout = "<html><body>";
//   for(var i = 0; i< theseSubmissions.length; i++){
//     htmlout = htmlout +theseSubmissions[i] + "<br>";
//   }
//   htmlout = htmlout + "</body></html>";
//   res.send(htmlout);
// })

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
