class Calculator {
    constructor(currentContent, prevContent){
        this.currentContent = currentContent;
        this.prevContent = prevContent;
        this.clear();
    }
    clear(){
        this.currentOperand =''
        this.prevOperand  = ''
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appenNumber(number){
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    chooseOppereation(operation){
        if (this.currentOperand === '') return
        if(this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOperand=this.currentOperand;
        this.currentOperand = ''
    }
    compute(){
        let compute
        let prev= parseFloat(this.prevOperand)
        let current= parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+' :
                compute = prev + current;
                break
            case '-' :
                compute = prev - current;
                break;
            case '*' :
                compute = prev * current;
                break;
            case '/' :
                compute = prev / current;
                break;
             default:
                return;
        }
        this.currentOperand = compute;
        this.operation= undefined;
        this.prevOperand = ''
    }
    updateDisplay() {
        this.currentContent.innerText = this.currentOperand;
        if(this.operation != null )
        {
            this.prevContent.innerText =` ${this.prevOperand} ${this.operation}`;
        }
    }
}
const currentContent  =document.querySelector('[data-current]')
const prevContent  =document.querySelector('[data-prev]')
const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equale]')
const clearAllButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const swpai = document.querySelector('[swapiApi]');
console.log(numberButton)
const calculator = new Calculator(currentContent,prevContent);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appenNumber(button.innerText)
    calculator.updateDisplay()
    })
 })
operationButton.forEach(button =>  {
    button.addEventListener('click', () => {
        calculator.chooseOppereation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', async button => {
    let num= Math.floor(Math.random() * 400 +50 );
    console.log(num);
    let num2= Math.floor(Math.random() * 400 +50);
    console.log(num2);
    swpai.style.top=num +"px";
    swpai.style.right=num2 + "px";
    swpai.textContent =" Hello from : ";
    const name1 = await getSwapiName();
    swpai.textContent+=name1;
    console.log(name1);
    calculator.compute()
    calculator.updateDisplay()
    
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
const ball = document.querySelector('ball');
const changeThemebtn = document.getElementById('changeBtn')
var i=1;
document.getElementById('switchCss').href = 'styles/style.css';
changeThemebtn.addEventListener('click', () => {
   if(i % 3 === 0)
   {
        document.getElementById('switchCss').href = 'styles/style.css';
        i++;
        return
   }
   if(i % 3 === 1)
   {
       i++;
   document.getElementById('switchCss').href = 'styles/style1.css';
   return
   }
   if(i % 3 === 2)
   {
       i++;
   document.getElementById('switchCss').href = 'styles/style2.css';
   return
   }
})


async function getSwapiName () {
    let num= Math.floor(Math.random() * 3 );
    console.log(num);
    let num2= Math.floor(Math.random() * 5 +1 );
    console.log(num2);
    const arr= ['planets' , 'people'  , 'films'  ];
    const req = await fetch(`https://swapi.dev/api/${arr[num]}/${num2}/`);
    const res = await req.json();
const name = res.name;
console.log(name);    
return name;

}