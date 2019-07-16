var calcScreen = document.getElementById('screen');
var btnContainer = document.getElementById('btn-container');

var calcInput = '';
var canDecimal = true;
var canOperator = false;

var currNum = null;
var currOp = null;
var components = [];

// when buttons are clicked execute functions

btnContainer.addEventListener("click", function(event) {
  if(event.target.matches('.number')){
    handleNum(event.target.value);
  }else if(event.target.matches('.operator')){
    handleOp(event.target.value);
  }else if(event.target.value === '.'){
    handleDecimal();
  }else if(event.target.matches('#clear')){
    calcScreen.innerHTML = '';
  }else if(event.target.matches('.pos-neg-operator')){
    handlePosOrNeg();
  }
  // detect if it's calculate
  evaluatesInput(event);
  
  //console.log(event);
});

// checks if its a num or an operator && decimal

function handleNum(num){
  if(currNum){
    calcScreen.innerHTML += num; 
    currNum += num;
  } else {
    calcScreen.innerHTML += num;
    components.push(currOp);
    currOp = null; 
  }
}

function handleOp(op){
  if(currOp){
    var firstPart = calcScreen.innerHTML.slice(0, calcScreen.innerHTML.length - 1);
    calcScreen.innerHTML = firstPart + op;
    currOp = op; 
  }else {
    calcScreen.innerHTML += op;
    components.push(currNum);
    currOp = op;
  }
}

function handleDecimal(){
  if(canDecimal){
    addToScreen(btnVal);
    canDecimal = false;
  }
}
// +/- turn a number positive or negative when clicked
function handlePosOrNeg(event){ 
    if(currNum){
      if(currNum > 0){
        currNum = 0 - currNum; 
        calcScreen.innerHTML.slice(0, calcScreen.innerHTML.length - currNum.length) + '-' + currNum;
      }else{
        currNum = 0 - currNum;
        calcScreen.innerHTML.slice(0, calcScreen.innerHTML.length - currNum.length); 
      }
    }
  }
  
// handling the screen 
function setScreen(input){
  calcScreen.innerHTML = input;
}

function addToScreen(input){
  calcScreen.innerHTML = calcScreen.innerHTML + input;
}

// evaluates equations  
function evaluatesInput(event){
  var screenText = calcScreen.innerHTML;
  if(event.target.value === '='){
   if(isOperator(screenText)){
    var cleanText = screenText.slice(0, screenText.length -1);
    calcScreen.innerHTML = eval(cleanText);
   }
  }if(event.target.value === '='){
    calcScreen.innerHTML = eval(calcScreen.innerHTML);
  }
}

function isOperator(screenText){
  if(
  screenText[screenText.length - 1] === "-" || 
  screenText[screenText.length - 1] === "+" ||
  screenText[screenText.length - 1] === "*" || 
  screenText[screenText.length - 1] === "/"){
    return true;
  }
  return false;
}

// keyboard event 

document.addEventListener("keyup", function(event){
  // console.log('KEYUP', event);
  if(event.keyCode >= 48 && event.keyCode <= 57){
    addKeytoScrn(event);
  }
  if(event.keyCode === 189){
    addKeytoScrn(event);
  }
  if(['+','-','*','/'].includes(event.key)){
    addKeytoScrn(event);
  } else if(event.key === "Enter"){
    evaluatesInput(event);
  }
});

function addKeytoScrn(event){
  addToScreen(event.key);
}

