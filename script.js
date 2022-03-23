class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.delete();
        this.input = '';
        this.result = '';
    }

    delete(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.input = ""
        this.result = ""
        this.operation = undefined
    }

    appendNumber(number){
        if (/[%]/.test(this.input[this.input.length - 1])) {
            this.input =this.input + '*' ;
        }

        if(number === '.' && this.input.includes('.'))return
        this.input += number.toString();

        
    }

    chooseOperation(operation){
        if (this.input.length == 0)return
        if (/[*+/-]/.test(this.input[this.input.length - 1])){
            const length = this.input.length;
            this.input = this.input.slice(0, length -1) + operation;
            return
        }
        if (/[%]/.test(this.input[this.input.length - 1]) && operation==='%')return

        this.operation = operation
        this.input += operation
    }

    compute(){
        if(this.input.indexOf('*') == -1 && this.input.indexOf('/') == -1 && this.input.indexOf('+') == -1 && this.input.indexOf('-') == -1 && this.input.indexOf('%') == -1) return;
        try {
            let Operation = this.input.split('%').join('/100');
            this.result = eval(Operation);
        } catch (error) {}
    }
    
    
     updateDisplay(){
        this.previousOperandTextElement.innerText  = this.input
        this.currentOperandTextElement.innerText = this.result;
        
     }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const bracketsButton = document.querySelectorAll('[data-action]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.compute()
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.compute()
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.input = calculator.result;
    calculator.result="";
    calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
bracketsButton.addEventListener('click', button => {
    calculator.chooseOperation(button.innerText)
    calculator.compute()
    calculator.updateDisplay()
})
