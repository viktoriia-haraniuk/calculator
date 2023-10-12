let buffer = '0';
let runningTotal = 0;
let isEvaluated = false;
let previousOperator;
const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (buffer === '0' || isEvaluated) {
    buffer = number;
    isEvaluated = false;
  } else {
    buffer += number;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      break;
    case '=':
      handleEquals();
      break;
    case '←':
      clearSymbol();
      break;
    case '÷':
    case '*':
    case '-':
    case '+':
      handleMath(symbol);
      break;
  }

}

function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  screen.innerText = buffer;
}

function clearSymbol() {
  if (buffer.length === 1) {
    buffer = '0'
  } else {
    buffer = buffer.substring(0, buffer.length - 1);
  }
}

function handleMath(value) {
  if (buffer === 0) {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = runningTotal;
  isEvaluated = true;
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case '+':
      runningTotal += intBuffer;
      break;
    case '-':
      runningTotal -= intBuffer;
      break;
    case '*':
      runningTotal *= intBuffer;
      break;
    case '÷':
      runningTotal /= intBuffer;
      break;
    default:
      console.error(`Invalid operation ${previousOperator}`);
  }
}

function handleEquals() {
  if (previousOperator === null) {
    return;
  }
  flushOperation(parseInt(buffer));
  previousOperator = null;
  buffer = "" + runningTotal;
  runningTotal = 0;
  isEvaluated = true;
}

init();