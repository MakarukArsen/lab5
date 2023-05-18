const resolveBtn = document.getElementById("resolve");

const result = document.getElementById("result");

const priorities = ["!", "&&", "||", "->", "="];
const problemArr = ["!", true, "&&", [true, "||", [false, "&&", true]], "||", false, "=", false];

const solver = (operand1, operand2, operator) => {
    if (operator === "!") {
        return !operand1;
    }
    if (operator === "&&") {
        return operand1 && operand2;
    }
    if (operator === "||") {
        return operand1 || operand2;
    }
    if (operator === "->") {
        if (operand1 === true && operand2 === true) return true;
        if (operand1 === true && operand2 === false) return false;
        if (operand1 === false && operand2 === true) return true;
        if (operand1 === false && operand2 === false) return true;
    }
    if (operator === "=") {
        return operand1 === operand2;
    }
};

const calculator = (arr) => {
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === typeof []) {
            arr.splice(i, 1, JSON.parse(calculator(arr[i]).join("")));
        }
    }
    console.log(arr);
    for (let operand = 0; operand < priorities.length; operand++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] === priorities[operand]) {
                if (arr[j] === "!") {
                    arr.splice(j, j + 2, solver(arr[j + 1], "", "!"));
                    console.log(arr);
                }
                if (arr[j] === "&&") {
                    arr.splice(j - 1, j + 2, solver(arr[j - 1], arr[j + 1], "&&"));
                    console.log(arr);
                }
                if (arr[j] === "||") {
                    arr.splice(j - 1, j + 2, solver(arr[j - 1], arr[j + 1], "||"));
                    console.log(arr);
                }
                if (arr[j] === "->") {
                    arr.splice(j - 1, j + 2, solver(arr[j - 1], arr[j + 1], "->"));
                    console.log(arr);
                }
                if (arr[j] === "=") {
                    arr.splice(j - 1, j + 2, solver(arr[j - 1], arr[j + 1], "="));
                    console.log(arr);
                }
                j = 0;
            }
        }
    }
    console.log(arr);
    return arr;
};

resolveBtn.addEventListener("click", () => {
    result.innerHTML = calculator(problemArr);
});
