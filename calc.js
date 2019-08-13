let total = 0;
let prev = null;
let infoBar = "0";
let buffer = "0";

const screen = document.querySelector(".screen");
const up_screen = document.querySelector(".up-screen");

function perform_op(n1,n2,op){
  n1 = parseInt(n1)
  n2 = parseInt(n2)
  switch (op){
    case '+':
    return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '/':
      return n1 / n2; 
  }
}

function running_eval(str) {
  let nums = str.match(/\d+/g);
  let opers = str.match(/\+|-|\*|\//g);
  let result = 0;
  for (opr of opers) {
    result = perform_op(nums[0], nums[1], opr);
    nums = [result].concat(nums.slice(2));
  }
  console.log(result);
  return result;
}

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
        break;
    case '≈':
        buffer = running_eval(infoBar);
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



// str = '23+2*3-70*2/5'
// str = '2+3*2'
// running_eval(str);

