var nameData = JSON.parse(localStorage.nameData || null) || {};
nameData.finalword = 'locked';
var socket = io.connect(window.location.origin);
var tableNames;
var palms;
var thebutton;
var theinput;
var song;
var showImage = false;

window.resize(250,250);

function preload(){
  song = loadSound('/assets/stangetz.mp3');
}

function setup(){
  createCanvas(400, 400);
  input = createInput();
  input.position(20, 100);
  button = createButton('submit');
  button.position(input.x + input.width, 100);
  button.mousePressed(greet);
  greeting = createElement('h2', 'it feels better out here, away from the party. \n may I ask your name?');
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
  greeting.html('it\'s a pleasure, '+name+'. it really is. let\'s keep the magic of tonight going. what is your email?');
  input.value('');
  saveStuff(name,"name");
  button.remove();
  nextButton = createButton("submit");
  nextButton.position(input.x + input.width, 100);
  nextButton.mousePressed(journey);
}

function journey(){
  var newText = input.value();
  greeting.html("we must part, though it pains me. before we go, promise me you will not forget this moment");
  input.value('');
  saveStuff(newText,"email");
  nextButton.remove();
  unholyButton = createButton("promise");
  unholyButton.position(input.x + input.width, 100);
  unholyButton.mousePressed(showAll);
} 

function showAll(){
  var lastText = input.value();
  saveStuff(lastText,"finalword");
  unholyButton.remove();
  greeting.remove();
  input.remove();
  document.getElementById("thebutton").style.display = "block";
  // _dataLoader("names.csv");
  // lastButton = createButton("see friends");
  // lastButton.position(10,10);
  // lastButton.mousePressed(printOut);
}

function printOut(){
  lastButton.remove();
  console.log(tableNames.getColumn("name"));
  for(var r = 0; r < tableNames.getRowCount(); r++){
    textSize(10);
    text(tableNames.getRow(r).get(0),width/2,10+10*r);
  }
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
