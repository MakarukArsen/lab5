const resolveBtn = document.getElementById("resolve");

const result = document.getElementById("result");

const priorities = ["!", "&&", "||", "->", "="];
const problemArr = [
    "!",
    { 0: false, 1: false, 2: true, 3: true },
    "||",
    [{ 0: false, 1: false, 2: true, 3: true }, "||", { 0: false, 1: true, 2: false, 3: true }],
    "=",
    { 0: false, 1: true, 2: false, 3: true },
];

const solver = (object1, object2, operator) => {
    const resultObj = {};
    for (let i = 0; i < 4; i++) {
        if (operator === "!") {
            resultObj[i] = !object1[i];
        }
        if (operator === "&&") {
            resultObj[i] = object1[i] && object2[i];
        }
        if (operator === "||") {
            resultObj[i] = object1[i] || object2[i];
        }
        if (operator === "->") {
            if (object1[i] === true && object2[i] === true) resultObj[i] = true;
            if (object1[i] === true && object2[i] === false) resultObj[i] = false;
            if (object1[i] === false && object2[i] === true) resultObj[i] = true;
            if (object1[i] === false && object2[i] === false) resultObj[i] = true;
        }
        if (operator === "=") {
            resultObj[i] = object1[i] === object2[i];
        }
    }
    return resultObj;
};

const calculator = (arr) => {
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr.splice(i, 1, calculator(arr[i])[0]);
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
    return arr;
};

resolveBtn.addEventListener("click", () => {
    calculator(problemArr);
});
