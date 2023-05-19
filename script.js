//Calculation Functions

function add(a, b) { return (Math.floor((Number(a) + Number(b)) * 1000)) / 1000 };

function subtract(a, b) { return (Math.floor((a - b) * 1000)) / 1000 };

function multiply(a, b) { return (Math.floor((a * b) * 1000)) / 1000 };

function divide(a, b) {
  if (b === '0') {
    let divideBy0 = 'I\'m sorry, Dave. I\'m afraid I can\'t do that.'
    let i = 0;

    while (i < divideBy0.length) {
      loop(i);
      i++
    }

    function loop(i) {
      setTimeout(function () {
        display.textContent += divideBy0[i];
      }, 50 * i)
    }
  } else return (Math.floor((a / b) * 1000)) / 1000;
};

//-----------------------------------

let firstInput = '';
let operator = null;
let secondInput = '';
let readyForSecondInput = false;
let decimalToggle = false;

function resetInputs(bool) {
  firstInput = '';
  operator = null;
  secondInput = '';
  readyForSecondInput = false;
  decimalToggle = false;
  if (bool) display.textContent = '0';
  if (bool) smallDisplay.innerHTML = '<br>';
};

//-----------------------------------

const display = document.querySelector('#display');
const smallDisplay = document.querySelector('#small-display');

//Number Buttons:
document.querySelectorAll('#buttons .number').forEach(
  (button) => button.addEventListener('click', (button) => inputNum(button.target.id.charAt(1)))
);
document.querySelector('#decimal').addEventListener('click', () => decimalHandler('.'));

document.addEventListener('keydown', (button) => keyboardInput(button));

//Other Buttons:
document.querySelector('#add').addEventListener('click', () => inputOperator('+'));
document.querySelector('#subtract').addEventListener('click', () => inputOperator('-'));
document.querySelector('#multiply').addEventListener('click', () => inputOperator('×'));
document.querySelector('#divide').addEventListener('click', () => inputOperator('÷'));
document.querySelector('#equals').addEventListener('click', () => equalsHandler());
document.querySelector('#clear').addEventListener('click', () => resetInputs(true));
document.querySelector('#delete').addEventListener('click', () => deleteButton());

//-----------------------------------

function inputNum(button) {
  if (!readyForSecondInput) {
    firstInput += button;
    console.log(firstInput);
    display.textContent = firstInput;
  } else {
    secondInput += button;
    console.log(secondInput);
    display.textContent = secondInput;
  }
};

function decimalHandler(decimal) {
  if (decimalToggle) return;
  else inputNum(decimal);
  decimalToggle = true;
}

function keyboardInput(button) {
  if (button.key.charAt(0) === 'F') return; //Prevents F keys from imputing to calculator
  button.preventDefault();
  if (button.key === 'Enter' || button.key === '=') equalsHandler();
  else if (button.key === '+' || button.key === '-') inputOperator(button.key);
  else if (button.key === '*') inputOperator('×');
  else if (button.key === '/') inputOperator('÷');
  else if (button.key === '.') decimalHandler(button.key);
  else if (button.key === 'Backspace') deleteButton();
  else inputNum(button.key.replace(/\D/g, ''));
};

function inputOperator(button) {
  if (firstInput === '' && !readyForSecondInput) return;
  else if (!operator) {
    operator = button;
    console.log(operator);
    readyForSecondInput = true;
    smallDisplay.textContent = firstInput + operator;
    decimalToggle = false;
  } else {
    console.log(operator)
    firstInput = operate();
    display.textContent = firstInput;
    secondInput = '';
    operator = button;
    smallDisplay.textContent = firstInput + operator;
  }
};

function deleteButton() {
  if (readyForSecondInput) {
    if (secondInput.charAt(secondInput.length - 1) === '.') decimalToggle = false;
    secondInput = secondInput.substring(0, secondInput.length - 1);
    if (secondInput === '') display.textContent = '0';
    else display.textContent = secondInput;
  }
  else {
    if (firstInput.charAt(firstInput.length - 1) === '.') decimalToggle = false;
    firstInput = firstInput.substring(0, firstInput.length - 1);
    if (firstInput === '') display.textContent = '0';
    else display.textContent = firstInput;
  }
};

function equalsHandler() {
  let temp;
  temp = operate();
  display.textContent = temp;
  if (operator) smallDisplay.textContent = firstInput + operator + secondInput + '=';
  resetInputs();
  firstInput = temp;
}


function operate() {
  switch (operator) {
    case '+':
      return add(firstInput, secondInput);

    case '-':
      return subtract(firstInput, secondInput);

    case '×':
      return multiply(firstInput, secondInput);

    case '÷':
      return divide(firstInput, secondInput);

    default:
      return 0;
  }
};
