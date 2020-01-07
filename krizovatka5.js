
var isPlaying = false;
var demoEnabled = true;
var solutionEnabled = true;
var indicatorEnabled = false;
var leftInd = "50% 0%";
var rightInd = "100% 0%";
var resetInd = "0% 0%"
var answer = "";


/*change these values for your animation (further code changes necessary if adding cars/changing colours)*/
var solution = "tramblue";
var bluecarAnimlen = 3000;
var tramcarAnimlen = 2000;
var blueInd = rightInd;
var tramInd = resetInd;

function playDemo() {
  solutionEnabled = false;
  tramcdrive();
  setTimeout(function(){
    bluecdrive();
  }, tramcarAnimlen);
}


function grade() {
  if (solutionEnabled == true){
    clearInterval(intervalInd);
    if (answer == solution){
      document.getElementById("grade").innerHTML = "SPRÁVNE";
      document.getElementById("grade").style.color = "green";
    }
    else {
      document.getElementById("grade").innerHTML = "NESPRÁVNE";
      document.getElementById("grade").style.color = "blue";
    }
  }
}

function showAnswer() {
    if (document.getElementById("answer").style.display != "block") {
      document.getElementById("answer").style.display = "block";
    } else {
      document.getElementById("answer").style.display = "none";
    }
  }

function bluecdrive() {
  if (isPlaying == false){
    isPlaying = true;
    demoEnabled = false;
    document.getElementById("bluec").className = "bluecardriving";
    setTimeout(function(){
      bluecfinish();
    }, bluecarAnimlen);
  }
}

function bluecfinish() {
  isPlaying = false;
  answer += "blue";
  if (answer.length == solution.length) {
    grade();
  }
}

function tramcdrive() {
  if (isPlaying == false){
    isPlaying = true;
    demoEnabled = false;
    document.getElementById("tramc").className = "tramcardriving";
    setTimeout(function(){
      tramcfinish();
    }, tramcarAnimlen);
  }
}

function tramcfinish() {
  isPlaying = false;
  answer += "tram";
  if (answer.length == solution.length) {
    grade();
  }
}

function indicators() {
  if (indicatorEnabled == false){
    document.getElementById("bluecindicator").style.backgroundPosition = blueInd;
    document.getElementById("tramcindicator").style.backgroundPosition = tramInd;
    indicatorEnabled = true;
  } else {
    document.getElementById("bluecindicator").style.backgroundPosition = resetInd;
    document.getElementById("tramcindicator").style.backgroundPosition = resetInd;
    indicatorEnabled = false;
  }
}

var intervalInd = setInterval(function(){
    indicators()
}, 1000);