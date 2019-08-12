
let runningTotal = 0;
let buffer = "0";
const screen = document.querySelector(".screen");
let previousOperator = null;

function buttonClick(value){
  if(isNaN(parseInt(value))){
    handleSymbol(value);
  }
  else{
    handleNumber(value);
  }
  reRender();
}

function handleNumber(value){
  console.log('handling number '+ value + ' buffer is '+ buffer)
  if (buffer === "0"){
    buffer = value;
  }
  else{
    buffer += value;
  }
  console.log('handled number '+ value + ' buffer is '+ buffer)
}

function handleSymbol(value){
  switch (value){
    case 'C':
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null){
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case '⤆':
      if (buffer.length === 1){
        buffer = 0
      }
      else{
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
   
}

function handleMath(value){
  
  const intBuffer = parseInt(buffer);
  console.log('handling math ' + intBuffer + ' ' + value)
  if (runningTotal === 0){
    runningTotal = intBuffer;
  }
  else{
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer){
  switch (previousOperator){
    case '+':
      runningTotal += intBuffer;
      break;
    case '-':
      runningTotal -= intBuffer;
      break;
    case '*':
      runningTotal *= intBuffer;
      break;
    case '/':
      runningTotal /= intBuffer;
      break;
  }
}

document.querySelector(".calc-buttons").addEventListener("click", function(event) {
  buttonClick(event.target.innerText);
});


function reRender(){
  screen.innerText = buffer
}