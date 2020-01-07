
var isPlaying = false;
var demoEnabled = true;
var indicatorEnabled = false;
var leftInd = "50% 0%";
var rightInd = "100% 0%";
var resetInd = "0% 0%"
var answer = "";


/*change these values for your animation (further code changes necessary if adding cars/changing colours)*/
var solution = "redblue";
var redcarAnimlen = 2000;
var bluecarAnimlen = 3000;
var redInd = resetInd;
var blueInd = leftInd;

function playDemo() {
  redcdrive();
  setTimeout(function(){
    bluecdrive();
  }, redcarAnimlen);
}


function grade() {
  if (demoEnabled == false){
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

function indicators() {
  if (indicatorEnabled == false){
    document.getElementById("redcindicator").style.backgroundPosition = redInd;
    document.getElementById("bluecindicator").style.backgroundPosition = blueInd;
    indicatorEnabled = true;
  } else {
    document.getElementById("redcindicator").style.backgroundPosition = resetInd;
    document.getElementById("bluecindicator").style.backgroundPosition = resetInd;
    indicatorEnabled = false;
  }
}

var intervalInd = setInterval(function(){
    indicators()
}, 1000);

