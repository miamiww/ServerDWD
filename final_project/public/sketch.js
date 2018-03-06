var nameData = JSON.parse(localStorage.nameData || null) || {};
nameData.finalword = 'locked';
var socket = io.connect(window.location.origin);
var tableNames;
var palms;
var thebutton;
var theinput;
var song;
var showImage = false;

var script = ['Welcome! Welcome! Come in, please, I do insist. \n For you see, you were expected, entirely'];

window.resize(250,250);



function initWebRTC(){

  // These help with cross-browser functionality
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');

  // if we have the method
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream) || stream;
        video.play();
      }, function(error) {alert("Failure " + error.code);});
  }



};

// window.addEventListener('load', initWebRTC);


function drawPic() {
  var video = document.getElementById('thevideo');
  var thecanvas = document.getElementById('thecanvas');
  var thecontext = thecanvas.getContext('2d');
  thecontext.drawImage(video,0,0,video.width,video.height);
  var dataUrl = thecanvas.toDataURL('images/webp', 1);
  document.getElementById('imagefile').src = dataUrl;
  socket.emit('image', dataUrl);
  // setTimeout(draw,3000);

};



function preload(){
  song = loadSound('/valsemoderne.mp3');
}

function setup(){
  createCanvas(400, 400);
  input = createInput();
  input.position(20, 100);
  button = createButton('submit');
  button.position(input.x + input.width, 100);
  button.mousePressed(greet);
  greeting = createElement('h2', script[0]);
  greeting.position(20, 5);
  textAlign(CENTER);
  textSize(50);
  song.loop();


  // theinput  = documet.getElementById("theinput");
  // thebutton = document.getElementById("thebutton");
  // theinput.position(20, 100);
  // thebutton.position(theinput.x + theinput.width, 100);
  // thebutton.mousePressed(greet);

  palms = document.getElementById("palms");
  friendButton = document.getElementById("thebutton");
  // friendButton.hide();

}

function draw(){
  // background(255);
  // text(loadStuff(), width/2,height/2);
  if(showImage){
    palms.hide();
  }
}

function greet() {
  var name = input.value();
  greeting.html(' if you would, please, allow me to see you?'+name+'');
  input.value('');
  saveStuff(name,"name");
  button.remove();
  nextButton = createButton("submit");
  nextButton.position(input.x + input.width, 100);
  nextButton.mousePressed(journey);
  initWebRTC();
}

function journey(){
  var newText = input.value();
  greeting.html("");
  input.value('');
  saveStuff(newText,"yes?");
  nextButton.remove();
  unholyButton = createButton("promise");
  unholyButton.position(input.x + input.width, 100);
  unholyButton.mousePressed(showAll);
  drawPic();
}

function showAll(){
  var lastText = input.value();
  saveStuff(lastText,"finalword");
  unholyButton.remove();
  greeting.remove();
  input.remove();
  document.getElementById("thebutton").style.display = "block";

}


// function _dataLoader(dataBaseName,){
//   tableNames = loadTable(dataBaseName,"csv","header");
//   console.log("data loaded");
//   console.log(tableNames.getColumn("name"));
// }


// Store your data.
function saveStuff(obj,type) {
  if(type == 'name'){
    nameData.name = obj;
  }
  if(type == 'email'){
    nameData.email = obj;
  }
  if(type == 'finalword'){
    nameData.finalword = obj;
  }
  nameData.time = new Date().getTime();
  // localStorage.nameData = JSON.stringify(nameData);
  if(nameData.finalword == "locked"){

  } else{
    _emitter(nameData);
  }
}

function loadStuff() {
  return nameData.name || "default";
}

function _emitter(data){
  socket.emit('nameSocket', data);
  //console.log(data);
}
