document.addEventListener('DOMContentLoaded', function () {
    let operand1 = '';
    let operand2 = '';
    let operation = '';
    let displayValue = '0';
    let error = null;

    const display = document.getElementById('textToDisplay');
    const buttons = document.querySelectorAll('button');

    function updateDisplay(msg = "") {
        if (msg == "") {
            display.textContent = displayValue;
        }
        else {
            display.textContent = msg;
        }
    }

    function clickCifra(digit) {
        if (!operation) {
            operand1 += digit;
        } else {
            operand2 += digit;
        }
        displayValue = operand1 + ' ' + operation + ' ' + operand2;
        updateDisplay();
    }


    function clickOperator(operator) {
        if (!operation) {
            operation = operator;
        } else {
            if (operand2 !== '') {
                calculateResult();
            }
            operation = operator;
        }
        displayValue = operand1 + ' ' + operation;
        updateDisplay();
    }


    function calculateResult() {
        const num1 = parseFloat(operand1);
        const num2 = parseFloat(operand2);
        switch (operation) {
            case '+':
                operand1 = (num1 + num2).toString();
                break;
            case '-':
                operand1 = (num1 - num2).toString();
                break;
            case 'x':
                operand1 = (num1 * num2).toString();
                break;
            case '/':
                updateDisplay("Error");
                if (num2 === 0) {
                    setTimeout(() => {
                        error = null;

                    }, 2000);
                    return;
                }

                operand1 = (num1 / num2).toString();
                break;
        }
        operand2 = '';
        operation = '';
        displayValue = operand1;
        updateDisplay();
    }


    function clickEquals() {
        if (operation && operand2 !== '') {
            calculateResult();
        }
    }

    function clickClear() {
        operand1 = '';
        operand2 = '';
        operation = '';
        displayValue = '0';
        error = null;
        updateDisplay();
    }


    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (!isNaN(buttonValue) || buttonValue === '.') {
                clickCifra(buttonValue);
            } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === 'x' || buttonValue === '/') {
                clickOperator(buttonValue);
            } else if (buttonValue === '=') {
                clickEquals();
            } else if (buttonValue === 'C') {
                clickClear();
            }
        });
    });
});
