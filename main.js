//Required abilites of a calculator(has to do):
//accept user inputs of number, operator, and another number
//should accept decimal numbers
//store inputs
//recognoze inputs and perform calculations
//return a result

//Optional features:
//Should accept longer arithmetic operations.
//display all inputs as it is being entered
//store previous total as start of next operation
//clear button should clear all entries
//should prevent invalid inputs (operators next to each other, two decimal points)

const Keys = document.querySelector('.calculator-buttons');
    Keys.addEventListener('click', event => {
        const {target} = event;
        const {value} = target;
        if (!target.matches('button')) {
            return;
        } else {
            calculator.parseInput(value)
            //console.log(event)
        }
    })

const calculator = {
    displayText: '0',
    //////////store previous total as start of next operation
    prevTotal: null,

    parseInput(value) {
        /////////have any of the "special buttons" been clicked
        switch (value) {
            case '=' :
                //calculate the answer
                this.calcAnswer(this.displayText)
                break;
            case 'AC' :
                //clear screen and stored values
                this.clearAll()
                break;
            case '.' :
                if (this.displayText == 0) {
                    //pass '0.' into add text method
                    this.addText('0.')
                } else {
                    //add value to text string
                    this.addText(value)
                }
                break;
            default:
                //add value to text string
                this.addText(value)
                break;
        }

    },

    addText(value) {
        if (this.displayText === '0') {
            this.displayText = ''
        } else if (this.prevTotal !==null) {
            //checks to see if previous text is 0 if  not display prevTotal, and nulls it to add new annotation 
            this.displayText = this.prevTotal
            this.prevTotal = null
        }
        if (/*check whether the last char in display AND the entered value are not numbers*/isNaN(+(value)) && isNaN(+(this.displayText))) {
            if(isNaN(this.displayText.slice(-1))) {
                return;
            }
        }
        this.displayText += value
        //output display text to screen
        this.outputText(this.displayText)

    },

    /////////////// calculator screen ///////////////
    outputText(text) {
        //whatever value we are inputting we want to show on sreen
        document.querySelector('.calculator-screen').value = text
    },
    //equation results
    calcAnswer(equation) {
        let result = Function("return " + equation) ()
        this.outputText(result)
    },

    /////////// when AC is pressed it clears all text //////////
    clearAll() {
        this.displayText = '0',
        this.prevTotal = null,
        this.outputText(this.displayText)
    }
}