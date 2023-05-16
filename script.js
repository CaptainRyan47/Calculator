//Calculation Functions

function add(a, b) { return (Math.floor((Number(a) + Number(b)) * 1000)) / 1000 };

function subtract(a, b) { return (Math.floor((a - b) * 1000)) / 1000 };

function multiply(a, b) { return (Math.floor((a * b) * 1000)) / 1000 };

function divide(a, b) {
  if (b === '0') console.log('boom!');
  return (Math.floor((a / b) * 1000)) / 1000
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
};

//-----------------------------------

const display = document.querySelector('#display');

//Number Buttons:
document.querySelectorAll('#buttons .number').forEach(
  (button) => button.addEventListener('click', (button) => inputNum(button.target.id.charAt(1)))
);
document.querySelector('#decimal').addEventListener('click', () => decimalHandler('.'));

//Other Buttons:
document.querySelector('#add').addEventListener('click', (button) => inputOperator(button.target.id));
document.querySelector('#subtract').addEventListener('click', (button) => inputOperator(button.target.id));
document.querySelector('#multiply').addEventListener('click', (button) => inputOperator(button.target.id));
document.querySelector('#divide').addEventListener('click', (button) => inputOperator(button.target.id));
document.querySelector('#equals').addEventListener('click', () => {
  display.textContent = operate();
  resetInputs();
});
document.querySelector('#clear').addEventListener('click', () => resetInputs(true));
document.querySelector('#delete').addEventListener('click', () => {
  if (readyForSecondInput) {
    if (secondInput.charAt(secondInput.length - 1) === '.') decimalToggle = false;
    secondInput = secondInput.substring(0, secondInput.length - 1);
    display.textContent = secondInput;
  }
  else {
    if (firstInput.charAt(firstInput.length - 1) === '.') decimalToggle = false;
    firstInput = firstInput.substring(0, firstInput.length - 1);
    display.textContent = firstInput;
  }
});

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

function inputOperator(button) {
  if (firstInput === '' && !readyForSecondInput) return;
  else if (!operator) {
    operator = button;
    console.log(operator);
    readyForSecondInput = true;
    decimalToggle = false;
  } else {
    firstInput = operate();
    secondInput = '';
    operator = button;
  }
};

function mf(num) {
  return (Math.floor(num * 1000)) / 1000;
}

function operate() {
  switch (operator) {
    case 'add':
      return add(firstInput, secondInput);
      break;

    case 'subtract':
      return subtract(firstInput, secondInput);
      break;

    case 'multiply':
      return multiply(firstInput, secondInput);
      break;

    case 'divide':
      return divide(firstInput, secondInput);
      break;

    default:
      return 0;
      break;
  }
};
