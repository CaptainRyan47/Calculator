//Calculation Functions

function add(a, b) { return Number(a) + Number(b) };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) { return a / b };

//-----------------------------------

let firstInput = '';
let operator = null;
let secondInput = '';
let readyForSecondInput = false;

function resetInputs(bool) {
  firstInput = '';
  operator = null;
  secondInput = '';
  readyForSecondInput = false;
  if (bool) display.textContent = '0';
}

//-----------------------------------

const display = document.querySelector('#display');

//Number Buttons:
document.querySelectorAll('#buttons .number').forEach(
  (button) => button.addEventListener('click', (button) => inputNum(button.target.id.charAt(1)))
);

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
    secondInput = secondInput.substring(0, secondInput.length - 1);
    display.textContent = secondInput;
  }
  else {
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
}

function inputOperator(button) {
  if (firstInput === '' && !readyForSecondInput) return;
  else if (!operator) {
    operator = button;
    console.log(operator);
    readyForSecondInput = true;
  } else {
    firstInput = operate();
    display.textContent = firstInput;
    secondInput = '';
    operator = button;
  }
};



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
}
