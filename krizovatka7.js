
var isPlaying = false;
var demoEnabled = true;
var solutionEnabled = true;
var indicatorEnabled = false;
var leftInd = "50% 0%";
var rightInd = "100% 0%";
var resetInd = "0% 0%"
var answer = "";


/*change these values for your animation (further code changes necessary if adding cars/changing colours)*/
var solution = "redgreenblue";
var redcarAnimlen = 3000;
var bluecarAnimlen = 4000;
var greencarAnimlen = 2000;
var redInd = rightInd;
var blueInd = leftInd;
var greenInd = resetInd;

function playDemo() {
  solutionEnabled = false;
  if (demoEnabled == true){
    redcdrive();
    setTimeout(function(){
      greencdrive();
      setTimeout(function(){
        bluecdrive();
      }, greencarAnimlen);
    }, redcarAnimlen);
  }
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
      document.getElementById("grade").style.color = "red";
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

function redcdrive() {
  if (isPlaying == false){
    isPlaying = true;
    demoEnabled = false;
    document.getElementById("redc").className = "redcardriving";
    setTimeout(function(){
      redcfinish();
    }, redcarAnimlen);
  }
}

function redcfinish() {
  isPlaying = false;
  answer += "red";
  if (answer.length == solution.length) {
    grade();
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

function greencdrive() {
    if (isPlaying == false){
      isPlaying = true;
      demoEnabled = false;
      document.getElementById("greenc").className = "greencardriving";
      setTimeout(function(){
        greencfinish();
      }, greencarAnimlen);
    }
  }
  
  function greencfinish() {
    isPlaying = false;
    answer += "green";
    if (answer.length == solution.length) {
      grade();
    }
  }

function indicators() {
  if (indicatorEnabled == false){
    document.getElementById("redcindicator").style.backgroundPosition = redInd;
    document.getElementById("bluecindicator").style.backgroundPosition = blueInd;
    document.getElementById("greencindicator").style.backgroundPosition = greenInd;
    indicatorEnabled = true;
  } else {
    document.getElementById("redcindicator").style.backgroundPosition = resetInd;
    document.getElementById("bluecindicator").style.backgroundPosition = resetInd;
    document.getElementById("greencindicator").style.backgroundPosition = resetInd;
    indicatorEnabled = false;
  }
}

var intervalInd = setInterval(function(){
    indicators()
}, 1000);

