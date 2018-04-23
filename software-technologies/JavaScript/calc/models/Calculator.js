function Calculator(leftOperand, operator, rightOperand) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.operator = operator;

    this.calculateResult = function () {
        let result = 0;

        if (this.operator === '+') {
            result = this.leftOperand + this.rightOperand;
        } else if (operator === '-') {
            result = this.leftOperand - this.rightOperand;
        } else if (this.operator === '/') {
            result = this.leftOperand / this.rightOperand;
        } else if (this.operator === '*') {
            result = this.leftOperand * this.rightOperand;
        } else if (this.operator === 'pow') {
            result = Math.pow(this.leftOperand, this.rightOperand);
        } else if (this.operator === '%') {
            result = this.leftOperand % this.rightOperand;
        }

        return result;
    }
}

module.exports = Calculator;