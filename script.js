var calcScreen = document.getElementById('screen');
var btnContainer = document.getElementById('btn-container');

var calcInput = '';
var canDecimal = true;
var canOperator = false;

// when buttons are clicked execute functions

btnContainer.addEventListener("click", function(event) {
  outputsToScreen(event);
  evaluatesInput(event);
  clearDisplay(event);
  negOrPosNum(event);
  //console.log(event);
});

// outputs numbers and operators to the screen. 

function outputsToScreen(event){
  var btnVal = event.target.value;
  if(btnVal === '.'){
    if(canDecimal){
      calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
      canDecimal = false;
    }
  }else if(event.target.matches(".number")){
    canOperator = true;
    calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
  }else if(event.target.matches(".operator")){
    if(canOperator){
      calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
      canOperator = false;
    }
  }
};

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


// clear button 
function clearDisplay(event){
  if(event.target.matches('#clear')){
    calcScreen.innerHTML = '';
  }
}

// +/- turn a number positive or negative when clicked
function negOrPosNum(event){
  if(event.target.matches('.pos-neg-operator')){ 
    calcScreen.innerHTML = calcScreen.innerHTML * -1;
  }
}

// keyboard event
// add other if's statements for ops or a sep function for equals button 

document.addEventListener("keyup", function(event){
  console.log('KEYUP', event);
  if(event.keyCode >= 48 && event.keyCode <= 57){
    addKeytoScrn(event);
  }
  if(event.keyCode === 189){
    addKeytoScrn(event);
  }
  if(event.key === "+"){
    addKeytoScrn(event);
  }
  if(event.key === "*"){
    addKeytoScrn(event);
  }
  if(event.key === "*"){
    addKeytoScrn(event);
  }
  if(event.key === "/"){
    addKeytoScrn(event);
  }
  if(event.key === "Enter"){
   evaluatesInput(event);
  }
});

function addKeytoScrn(event){
  calcScreen.innerHTML= calcScreen.innerHTML + event.key;
} 