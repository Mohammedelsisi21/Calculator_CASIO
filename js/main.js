const body = document.body;
const parentElement = document.querySelector('.parent');
const openButton = document.querySelector('.open-btn');
const icon = openButton.querySelector('.icon-lok');
const lightMode = document.getElementById('light-mode-toggle');
const iconDark = document.getElementById('iconDark');
const calculator = document.getElementById('calculator');
const logoDark = document.getElementById('logo-dark');
const input = document.getElementById('input')
const output = document.getElementById('output')
const labAlpha = document.querySelectorAll('.lab-alph')
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const negativeBtn =document.getElementById("negative-btn")
// Start load
window.addEventListener("load", function () {
    let preloader = document.querySelector("#preloader");
        preloader.classList.add("preloaded");
    setTimeout(function () {
            preloader.remove();
        }, 3000);
});
// End load

// start open
openButton.addEventListener('click', () => {
    if (parentElement.classList.contains('animate')) {
        parentElement.classList.remove('animate');
        parentElement.classList.add('close');
        icon.classList.remove('fa-lock-open');
        icon.classList.add('fa-unlock');
        openButton.textContent = 'Open';
        openButton.appendChild(icon);
    } else {
        parentElement.classList.remove('close');
        parentElement.classList.add('animate');
        icon.classList.remove('fa-unlock');
        icon.classList.add('fa-lock-open');
        openButton.textContent = 'Close';
        openButton.appendChild(icon);
    }
});
// End open
lightMode.addEventListener('click', () => {
    // Change a body mode
    body.classList.toggle('light');

    // Change a icon mode
    if (iconDark.classList.contains('fa-sun')) {
        iconDark.classList.remove('fa-sun');
        iconDark.classList.add('fa-moon');
        lightMode.appendChild(iconDark);
        parentElement.classList.add('color-change');
        parentElement.classList.add('light');
        lightMode.classList.add('light')
        openButton.classList.add('light')
    } else {
        iconDark.classList.remove('fa-moon');
        iconDark.classList.add('fa-sun');
        lightMode.appendChild(iconDark);
        parentElement.classList.remove('color-change');
        parentElement.classList.remove('light');
        lightMode.classList.remove('light')
        openButton.classList.remove('light')
    }
    // light
    calculator.classList.toggle('dark')
    logoDark.classList.toggle('logo-dark')
    input.classList.toggle('screen-dark')
    output.classList.toggle('screen-dark')
});


// script.js
document.addEventListener('DOMContentLoaded', () => {
    let lastValue = '';
    leftButton.addEventListener('click', () => {
        const cursorPosition = input.selectionStart;
        if (cursorPosition > 0) {
            input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }
        input.focus()
    });
    rightButton.addEventListener('click', () => {
        const cursorPosition = input.selectionStart;
        if (cursorPosition < input.value.length) {
            input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        }
        input.focus()
    });
const handleInput = (value, isOperator = false) => {
    if (isOperator) {
        switch (value) {
            case 'equals':
                try {
                    let expression = input.value
                        .replace(/sin\(([^)]+)\)/g, (match, p1) => `Math.sin(degreesToRadians(${p1}))`)
                        .replace(/cos\(([^)]+)\)/g, (match, p1) => `Math.cos(degreesToRadians(${p1}))`)
                        .replace(/tan\(([^)]+)\)/g, (match, p1) => `Math.tan(degreesToRadians(${p1}))`)
                        .replace(/floor\(([^)]+)\)/g, (match, p1) => `Math.floor(${p1})`)
                        .replace(/round\(([^)]+)\)/g, (match, p1) => `Math.round(${p1})`)
                        .replace(/ceil\(([^)]+)\)/g, (match, p1) => `Math.ceil(${p1})`)
                        .replace(/ln\(([^)]+)\)/g, (match, p1) => `ln(${p1})`)
                        .replace(/log\(([^,]+),?([^)]*)\)/g, (match, p1, p2) => `log(${p1}, ${p2})`)
                        .replace(/\|(-?\d+)\|/g,(match, p1) => `Math.abs(${p1})`)
                        .replace(/√([^ ]+)/g, (match, p1) => `Math.sqrt(${p1})`)
                        .replace(/p\(([^,]+),([^)]+)\)/g, (match, n, r) => `permutation(${n.trim()}, ${r.trim()})`)
                        .replace(/c\(([^,]+),([^)]+)\)/g, (match, n, r) => `combination(${n.trim()}, ${r.trim()})`)
                    const result = eval(expression);
                    output.value = result;
                    lastValue = result;
                    input.value = '';
                } catch (error) {
                    output.value = 'Error';
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                input.value += value;
                break;
        }
    } else {
        input.value += value;
    }
    if (value !== 'equals') {
        try {
            let expression = input.value
                .replace(/sin\(([^)]+)\)/g, (match, p1) => `sinDegrees(${p1})`)
                .replace(/cos\(([^)]+)\)/g, (match, p1) => `cosDegrees(${p1})`)
                .replace(/tan\(([^)]+)\)/g, (match, p1) => `tanDegrees(${p1})`)
                .replace(/floor\(([^)]+)\)/g, (match, p1) => `Math.floor(${p1})`)
                .replace(/round\(([^)]+)\)/g, (match, p1) => `Math.round(${p1})`)
                .replace(/ceil\(([^)]+)\)/g, (match, p1) => `Math.ceil(${p1})`)
                .replace(/ln\(([^)]+)\)/g, (match, p1) => `ln(${p1})`)
                .replace(/log\(([^,]+),?([^)]*)\)/g, (match, p1, p2) => `log(${p1}, ${p2})`)
                .replace(/\|(-?\d+)\|/g,(match, p1) => `Math.abs(${p1})`)
                .replace(/√([^ ]+)/g, (match, p1) => `Math.sqrt(${p1})`)
                .replace(/p\(([^,]+),([^)]+)\)/g, (match, n, r) => `permutation(${n.trim()}, ${r.trim()})`)
                .replace(/c\(([^,]+),([^)]+)\)/g, (match, n, r) => `combination(${n.trim()}, ${r.trim()})`);
            const evalResult = eval(expression);
            output.value = evalResult;
        } catch (error) {
            output.value = 'Error';
        }
    }
};
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.value || e.target.innerText;
            const op = e.target.getAttribute('data-op');

            if (e.target.classList.contains('number')) {
                input.value += value;
            } else if (op) {
                switch (op) {
                    case 'clear':
                        input.value = '';
                        output.value = '';
                        lastValue = '';
                        break;
                    case 'delete':
                        const cursorPosition = input.selectionStart;
                        if (cursorPosition > 0) {
                            input.value = input.value.slice(0, cursorPosition - 1) + input.value.slice(cursorPosition);
                            input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                        }
                        break;
                    case 'exp':
                        input.value += '**';
                        break;
                    case 'ans':
                        input.value += lastValue;
                        break;
                    case 'equals':
                        try {
                            let expression = input.value
                                .replace(/sin\(([^)]+)\)/g, (match, p1) => `sinDegrees(${p1})`)
                                .replace(/cos\(([^)]+)\)/g, (match, p1) => `cosDegrees(${p1})`)
                                .replace(/tan\(([^)]+)\)/g, (match, p1) => `tanDegrees(${p1})`)
                                .replace(/floor\(([^)]+)\)/g, (match, p1) => `Math.floor(${p1})`)
                                .replace(/round\(([^)]+)\)/g, (match, p1) => `Math.round(${p1})`)
                                .replace(/ceil\(([^)]+)\)/g, (match, p1) => `Math.ceil(${p1})`)
                                .replace(/ln\(([^)]+)\)/g, (match, p1) => `ln(${p1})`)
                                .replace(/log\(([^,]+),?([^)]*)\)/g, (match, p1, p2) => `log(${p1}, ${p2})`)
                                .replace(/\|(-?\d+)\|/g,(match, p1) => `Math.abs(${p1})`)
                                .replace(/√([^ ]+)/g, (match, p1) => `Math.sqrt(${p1})`)
                                .replace(/p\(([^,]+),([^)]+)\)/g, (match, n, r) => `permutation(${n.trim()}, ${r.trim()})`)
                                .replace(/c\(([^,]+),([^)]+)\)/g, (match, n, r) => `combination(${n.trim()}, ${r.trim()})`);
                            const result = eval(expression);
                            output.value = result;
                            lastValue = result;
                            input.value = '';
                        } catch (error) {
                            output.value = 'Error';
                        }
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        input.value += (op === 'add' ? '+' :
                                        op === 'subtract' ? '-' :
                                        op === 'multiply' ? '*' :
                                        '/');
                        break;
                }
            }
            if (op !== 'equals') {
                try {
                    let expression = input.value
                    .replace(/sin\(([^)]+)\)/g, (match, p1) => `sinDegrees(${p1})`)
                    .replace(/cos\(([^)]+)\)/g, (match, p1) => `cosDegrees(${p1})`)
                    .replace(/tan\(([^)]+)\)/g, (match, p1) => `tanDegrees(${p1})`)
                    .replace(/floor\(([^)]+)\)/g, (match, p1) => `Math.floor(${p1})`)
                    .replace(/round\(([^)]+)\)/g, (match, p1) => `Math.round(${p1})`)
                    .replace(/ceil\(([^)]+)\)/g, (match, p1) => `Math.ceil(${p1})`)
                    .replace(/ln\(([^)]+)\)/g, (match, p1) => `ln(${p1})`)
                    .replace(/log\(([^,]+),?([^)]*)\)/g, (match, p1, p2) => `log(${p1}, ${p2})`)
                    .replace(/\|(-?\d+)\|/g,(match, p1) => `Math.abs(${p1})`)
                    .replace(/√([^ ]+)/g, (match, p1) => `Math.sqrt(${p1})`)
                    .replace(/p\(([^,]+),([^)]+)\)/g, (match, n, r) => `permutation(${n.trim()}, ${r.trim()})`)
                    .replace(/c\(([^,]+),([^)]+)\)/g, (match, n, r) => `combination(${n.trim()}, ${r.trim()})`);
                    const evalResult = eval(expression);
                    output.value = evalResult;
                } catch (error) {
                    output.value = 'Error';
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (!isNaN(key) || key === '.') {
            handleInput(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleInput(key, true);
        } else if (key === 'Enter') {
            handleInput('equals', true);
        } else if (key === 'Backspace') {
            handleInput('delete', true);
        } else if (key === 'Escape') {
            handleInput('clear', true);
        }
    });
});

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
function permutation(n, r) {
    return factorial(n) / factorial(n - r);
}
function combination(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

function tanDegrees(degrees) {
    const radians = degrees * Math.PI / 180;
    if (degrees % 180 === 90) {
        return 'Infinity';
    }
    const tanValue = Math.tan(radians);
    const roundedValue = Math.abs(tanValue) < 1e-10 ? 0 : parseFloat(tanValue.toFixed(10));
    return roundedValue;
}

function cosDegrees(degrees) {
    const radians = degrees * Math.PI / 180;
    const cosValue = Math.cos(radians);
    const roundedValue = Math.abs(cosValue) < 1e-10 ? 0 : parseFloat(cosValue.toFixed(10));
    return roundedValue;
}

function sinDegrees(degrees) {
    const radians = degrees * Math.PI / 180;
    const sinValue = Math.sin(radians);
    const roundedValue = Math.abs(sinValue) < 1e-10 ? 0 : parseFloat(sinValue.toFixed(10));
    return roundedValue;
}

function ln(value) {
    if (value == 0) {
        return '- Infinity';
    }
    if (value < 0) {
        return 'greater 0';
    }
    const lnValue = Math.log(value);
    const roundedValue = parseFloat(lnValue.toFixed(10));
    return roundedValue;
}

function log(value, base = 10) {
    if (value <= 0) {
        return 'greater than 0';
    }
    const logValue = Math.log(value) / Math.log(base);

    const roundedValue = parseFloat(logValue.toFixed(10));

    return roundedValue;
}
