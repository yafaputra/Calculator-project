const display_history = document.querySelector(".display-history");
const display_input = document.querySelector(".display-input");
const temp_result = document.querySelector(".temp-result");
const all_clear = document.querySelector(".all-clear");
const last_entity = document.querySelector(".last-entity");
const operators = document.querySelectorAll(".operator");
const equal_sign = document.querySelector(".equal-sign");
const numbers = document.querySelectorAll(".number");

let displayHistory = "";
let displayInput = "";
let tempResult = "";
let result = null;
let lastInput = "";
let haveDot = false;
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        displayInput += e.target.innerText;
        display_input.innerText = displayInput;
    });
});




operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (!displayInput) return;
        haveDot = false;
        const operatorName = e.target.innerText;
        if (displayHistory && displayInput && lastInput) {
            calculateResult();
        } else {
            tempResult = parseFloat(displayInput);
        }
        clearVar(operatorName);
        lastInput = operatorName;
    });
});


function clearVar(name = "") {
    displayHistory += displayInput + " " + name + " ";
    display_history.innerText = displayHistory;
    display_input.innerText = "";
    displayInput = "";
    temp_result.innerText = tempResult;
}

function calculateResult() {
    if (lastInput === "+") {
        tempResult = parseFloat(tempResult) + parseFloat(displayInput);
    } else if (lastInput === "-") {
        tempResult = parseFloat(tempResult) - parseFloat(displayInput);
    } else if (lastInput === "*") {
        tempResult = parseFloat(tempResult) * parseFloat(displayInput);
    } else if (lastInput === "÷") {
        tempResult = parseFloat(tempResult) / parseFloat(displayInput);
    } else if (lastInput === "%") {
        tempResult = parseFloat(tempResult) % parseFloat(displayInput);
    }
}


equal_sign.addEventListener("click", (e) => {
    if (!displayInput || !displayHistory) return;
    haveDot = false;
    calculateResult();
    clearVar();
    display_input.innerText = tempResult;
    displayInput = tempResult;
    displayHistory = "";
    temp_result.innerText = "";
});
all_clear.addEventListener("click", (e) => {
    display_input.innerText = "";
    display_history.innerText = "";
    temp_result.innerText = "";
    displayInput = "";
    displayHistory = "";
    tempResult = "";
    lastInput = "";
    haveDot = false;
});

last_entity.addEventListener("click", (e) => {
    display_input.innerText = "";
    displayInput = "";
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" || e.key === "1" ||
        e.key === "2" || e.key === "3" ||
        e.key === "4" || e.key === "5" ||
        e.key === "6" || e.key === "7" ||
        e.key === "8" || e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    } else if (
        e.key === "+" || e.key === "-" ||
        e.key === "*" || e.key === "/" ||
        e.key === "%"
    ) {
        clickOperatorEl(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqualEl();
    }
});

function clickButtonEl(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickOperatorEl(key) {
    operators.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickEqualEl() {
    equal_sign.click();
}