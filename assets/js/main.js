
  const previousOutput = document.querySelector(".previous-output");
  // console.log(previousOutput);
  const currentOutput = document.querySelector(".current-output");
  // console.log(currentOutput);
  const clearAll = document.querySelector("#clear-all");
  const deleteNumber = document.querySelector("#delete");
  const equalSign = document.querySelector("#equals");
  const numbers = document.querySelectorAll(".numbers");
  const operations = document.querySelectorAll(".operations");


  class Calculator {
    constructor(previousOutput, currentOutput) {
      this.previousOutput = previousOutput;
      this.currentOutput = currentOutput;
      this.clearAll();
    }

    clearAll() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }

    deleteNum() {
      if (this.currentOperand != "0") {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
      } else {
        return;
      }
    }

    appendNum(number) {
      if(number === '.' && this.currentOperand.includes('.')){ return}
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (this.currentOperand === '') {
        return
      }
      if (this.previousOperand !== '') {
        this.calculate()
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    calculate() {
      let calculation;
      const previous = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) {
        return;
      }
      switch (this.operation) {
        case "%":
          calculation = previous / 100 * current;
          break;
        case "÷":
          calculation = previous / current;
          break;
        case "*":
          calculation = previous * current;
          break;
        case "-":
          calculation = previous - current;
          break;
        case "+":
          calculation = previous + current;
          break;
        default:
          return;
      }
      this.currentOperand = calculation;
      this.previousOperand = '';
      this.operation = undefined;
    }

    getDisplayOutputNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }

    displayOutput() {
      this.currentOutput.innerText = this.getDisplayOutputNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOutput.innerText = `${this.getDisplayOutputNumber(
          this.previousOperand
        )} ${this.operation}`;
      } else {
        this.previousOutput.innerText = '';
      }
    }
  }

  const myCalculator = new Calculator(previousOutput, currentOutput);

  numbers.forEach(button => {
    button.addEventListener("click", () => {
      myCalculator.appendNum(button.innerText);
      myCalculator.displayOutput();
    })
  });

  operations.forEach((button) => {
    button.addEventListener("click", () => {
      myCalculator.chooseOperation(button.innerText);
      myCalculator.displayOutput();
    });
  });

equalSign.addEventListener("click", button => {
  myCalculator.calculate();
  myCalculator.displayOutput();
})

clearAll.addEventListener("click", (button) => {
  myCalculator.clearAll();
  myCalculator.displayOutput();
});

deleteNumber.addEventListener("click", (button) => {
    myCalculator.deleteNum();
    myCalculator.displayOutput();
});
