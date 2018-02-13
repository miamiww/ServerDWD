
var data = [];

function setup() {
  createCanvas(400, 400);
  getLatest();
}

function draw() {
  background(220);
  for (var i = 0; i < data.length; i++) {
    ellipse(data[i].x, data[i].y, 20, 20);
  }
}

function getLatest() {
  httpGet("http://liveweb.itp.io:8999/data","json",false,
          function(response) {
        		console.log(response)
    				data = response;
    				setTimeout(getLatest,100)
  			},
        function() {
          console.log("bad")
        }
	);
}

function mousePressed() {
 	ellipse(mouseX, mouseY, 20, 20);
  var data = {
    x: mouseX,
    y: mouseY
  };
  // SEnd to server
  // http get
  httpGet("http://liveweb.itp.io:8999/save?x="+mouseX+"&y="+mouseY,"json",false,function() {console.log("good");},function() {console.log("bad");} );

}
