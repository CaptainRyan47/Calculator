//Calculation Functions

function add(a, b) { return a + b };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) { return a / b };

//-----------------------------------

function operate(firstInput, operator, secondInput) {
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
      break;
  }
}

let firstInput;
let operator;
let secondInput;

