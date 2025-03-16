let display = document.getElementById('display');
let currentInput = '';
let lastResult = '';
let currentOperation = null;
let waitingForSecondOperand = false;

// Constants
const PI = Math.PI;
const E = Math.E;

function appendNumber(num) {
    if (waitingForSecondOperand) {
        display.value = num;
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? num : display.value + num;
    }
    currentInput = display.value;
}

function appendOperator(operator) {
    if (currentOperation && !waitingForSecondOperand) {
        calculate('equals');
    }
    lastResult = display.value;
    currentOperation = operator;
    waitingForSecondOperand = true;
}

function clearDisplay() {
    display.value = '0';
    currentInput = '';
    lastResult = '';
    currentOperation = null;
    waitingForSecondOperand = false;
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    currentInput = display.value;
}

function toggleSign() {
    display.value = parseFloat(display.value) * -1;
    currentInput = display.value;
}

function calculate(operation) {
    let result;
    const currentNumber = parseFloat(currentInput);
    const previousNumber = parseFloat(lastResult);

    switch(operation) {
        case 'equals':
            if (currentOperation) {
                switch(currentOperation) {
                    case '+': result = previousNumber + currentNumber; break;
                    case '-': result = previousNumber - currentNumber; break;
                    case '*': result = previousNumber * currentNumber; break;
                    case '/': result = previousNumber / currentNumber; break;
                    case 'pow': result = Math.pow(previousNumber, currentNumber); break;
                }
                currentOperation = null;
            }
            break;
        case 'sin': result = Math.sin(currentNumber * Math.PI / 180); break;
        case 'cos': result = Math.cos(currentNumber * Math.PI / 180); break;
        case 'tan': result = Math.tan(currentNumber * Math.PI / 180); break;
        case 'sqrt': result = Math.sqrt(currentNumber); break;
        case 'log': result = Math.log10(currentNumber); break;
        case 'ln': result = Math.log(currentNumber); break;
        case 'exp': result = Math.exp(currentNumber); break;
        case 'pi': result = PI; break;
    }

    if (result !== undefined) {
        result = parseFloat(result.toFixed(8));
        display.value = result;
        currentInput = result.toString();
        lastResult = currentInput;
        waitingForSecondOperand = false;
    }
}

// Event Listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate('equals');
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
}); 