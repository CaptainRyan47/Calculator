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

document.addEventListener('keydown', (button) => keyboardInput(button));

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
  if (button.key === 'Enter' || button.key === '=') display.textContent = operate();
  else if (button.key === '+' || button.key === '-' || button.key === '*' || button.key === '/') {
    inputOperator(button.key);
  } else if (button.key === '.') decimalHandler(button.key);
  else if (button.key === 'Backspace') deleteButton();
  else inputNum(button.key.replace(/\D/g, ''));
};

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

function deleteButton() {
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
};


function operate() {
  switch (operator) {
    case 'add':
    case '+':
      return add(firstInput, secondInput);

    case 'subtract':
    case '-':
      return subtract(firstInput, secondInput);

    case 'multiply':
    case '*':
      return multiply(firstInput, secondInput);

    case 'divide':
    case '/':
      return divide(firstInput, secondInput);

    default:
      return 0;
  }
};
