var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/public'));
var server = app.listen(8000);

app.post('/upload', upload.single('photo'), function (req, res) {
	console.log(req.file);
	res.send("uploaded: " + req.file);
	// req.file is the uploaded file information
  	// req.body will hold the other text fields
});
