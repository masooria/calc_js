let total = 0;
let prev = null;
let infoBar = "0";
let buffer = "0";

const screen = document.querySelector(".screen");
const up_screen = document.querySelector(".up-screen");

function evaluate(expr){
  
  return eval (expr);
}

function isNumber(value){
  if (isNaN(parseInt(value))) {
    return false;
  } else {
    return true;
  }
}

function isOperation(value){
  console.log(`checking prev ${value} opera?`)
  var operations = ['+', '-', '*', '/'];
  for(let operation of operations){
    if (value === operation){
      return true;
    }
  };
  return false;
}

function handleNumber(value){
  console.log(` ${value} is a number, prev is ${prev}`)
  if (infoBar === "0" || prev === '='){
    buffer = value;
    infoBar = value;
  }
  else if (isNumber(prev) || prev === null) {
    buffer = buffer + value;
    infoBar = infoBar + value;
  }
  else if (isOperation(prev)){
    buffer = value;
    infoBar = infoBar + value;
  }
  prev = value;
}

function handleSymbol(value){
  console.log(` ${value} is a symbol`)
  switch (value) {
    case "C":
      total = 0;
      prev = null;
      infoBar = "0";
      buffer = "0";
      break;
    case '←':
      infoBar = infoBar.substr(0, infoBar.length-1)
      buffer = evaluate(infoBar);
      prev = isOperation(prev) ? '0' : '+';
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      console.log(`   its operation`)
      if (isOperation(prev)){
        //do nothing
        console.log('prev is operation')
      }
      else{
        buffer = evaluate(infoBar);
        infoBar = infoBar + value;
        prev = value;
      }
      break;
    case '=':
        buffer = evaluate(infoBar);
        prev = value;
  }
}

function buttonClick(value){
  console.log(`button clicked is ${value}`)
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function rerender() {
  screen.innerText = buffer;
  up_screen.innerText = infoBar;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();

var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});