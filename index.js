let currentInput = "";
let operation = ""; 
let firstInput = ""; 

    const resultElement = document.getElementById("result");

    function updateDisplay(value) {
        resultElement.textContent = value;
    }

    ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].forEach(number => {
        document.getElementById(number).addEventListener("click", function() {
            currentInput += this.textContent;
            updateDisplay(currentInput);
        });
    });

    const operations = {
        "sum": "+",
        "rest": "-",
        "multiply": "*",
        "division": "/"
    };

    for (let op in operations) {
        document.getElementById(op).addEventListener("click", function() {
            if (!firstInput) {
                firstInput = currentInput;
                currentInput = "";
                operation = operations[op];
            } else {
                firstInput = operate(firstInput, currentInput, operation);
                currentInput = "";
                operation = operations[op];
                updateDisplay(firstInput);
            }
            Object.keys(operations).forEach(key =>{
                document.getElementById(key).classList.remove("active");
            })
            this.classList.add("active");
        });
    }

    document.getElementById("equals").addEventListener("click", function() {
        if (firstInput && currentInput && operation) {
            firstInput = operate(firstInput, currentInput, operation);
            updateDisplay(firstInput);
            currentInput = "";
            operation = "";
        }
        Object.keys(operations).forEach(key =>{
            document.getElementById(key).classList.remove("active");
        })
    });


    document.getElementById("clear").addEventListener("click", function() {
        firstInput = "";
        currentInput = "";
        operation = "";
        updateDisplay("");

        Object.keys(operations).forEach(key =>{
            document.getElementById(key).classList.remove("active");
        })
    });

    function operate(val1, val2, operation) {
        val1 = parseFloat(val1);
        val2 = parseFloat(val2);
        switch (operation) {
            case "+":
                return (val1 + val2).toString();
            case "-":
                return (val1 - val2).toString();
            case "*":
                return (val1 * val2).toString();
            case "/":
                if (val2 !== 0) {
                    return (val1 / val2).toString();
                } else {
                    alert("No puedes dividir por cero");
                    clearAll();
                    return "";
                }
            default:
                return "";
        }
    }

    function clearAll() {
        firstInput = "";
        currentInput = "";
        operation = "";
        updateDisplay("");
    }
