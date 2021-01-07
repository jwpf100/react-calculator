import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

  //Calculations

  const utils = {
    addition: (firstNum, secondNum) => firstNum + secondNum,
    subtraction: (firstNum, secondNum) =>  firstNum - secondNum,
    division: (firstNum, secondNum) => firstNum / secondNum,
    multiplication: (firstNum, secondNum) => firstNum * secondNum,

    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    }

function Display(props) {
  let className = 'standard display'
  return (
    <div className={className}>
      <div>{props.message}</div>
    </div>
  )
}

function Button(props) {
  let className = 'standard button'
  const handleClick = () => props.onClickFunction(props.value);
  return (
    <div onClick={handleClick} className={className}>
      {props.value}
    </div>
  )
}

function ZeroButton(props) {
  let className = 'zero button'
  const handleClick = () => props.onClickFunction(props.value);
  return (
    <div onClick={handleClick} className={className}>
      {props.value}
    </div>
  )
}

function Numpad(props) {
  let className = 'inner-container numpad'
  const numberKeys = [...utils.range(1, 9)];

  return (
      <div className={className}>
                <ZeroButton 
              onClickFunction={props.onClickFunction} 
              value={0}
          />
          <Button 
              onClickFunction={props.onClickFunction} 
              value={'.'}
          />
        {numberKeys.map(numberKey => 
          <Button 
            onClickFunction={props.onClickFunction} 
            value={numberKey}
          />
        )}

      </div>
  )
};

function OperatorKeys(props) {
  let className = 'inner-container operator-keys'
  const operatorKeys = ['/', 'x', '-', '+', '=', ];
  
  return (
      <div className={className}>
        {operatorKeys.map(operatorKey => 
          <Button 
            onClickFunction={props.onClickFunction} 
            value={operatorKey}/>
        )}
      </div>
  )
};

function MiscKeys(props) {
  let className = 'inner-container misc-keys'
  const miscKeys = ['+/-', '%'];
  
  return (
      <div className={className}>
          <Button 
              onClickFunction={props.cancelFunction} 
              value={props.lastClicked !== 'cancel' ? 'C' : 'AC'}
          />
          {miscKeys.map(miscKey => 
          <Button 
            onClickFunction={props.onClickFunction} 
            value={miscKey}/>
        )}
      </div>
  )
};


function Calculator() {

   //Initialise the State
  
  const [newOperand, setNewOperand] = useState([0]);
  const [operator, setNewOperator] = useState('');
  const [operand, setOperand] = useState('');
  const [display, setDisplay] = useState([0]);
  const [lastClicked, setLastClicked] = useState('cancel');
 

  //Computations Based On State

 //test this

 const calculatorStatus = lastClicked === 'number' ? 'yes' : 'no';
  
  //setState

  const setNumberInput = (displayValue) => {
    setNewOperand(displayValue)
    setDisplay(displayValue)
    setLastClicked('number')
  }

  const setCalculatorState = (displayValue, operatorValue) => {

    if (operatorValue === '=') {
        setOperand(displayValue)
        setDisplay(displayValue)
      //setNewOperand([])
        setLastClicked('operator')
    } else if (lastClicked === 'operator' && newOperand === []) {  
        setNewOperator(operatorValue)
    } else if (lastClicked === 'operator' ) {
        setNewOperator(operatorValue)
        setNewOperand([])
    } else {
        setNewOperator(operatorValue) 
        setOperand(displayValue)
        setDisplay(displayValue)
        setNewOperand([])
        setLastClicked('operator')
    }
  }

  const setCalcCancelLast = () => {
    setLastClicked('cancel')
    if(lastClicked === 'number') {
      setNewOperand([0])
      setDisplay([0])
    } else if (lastClicked === 'operator') {
      setNewOperator('')
    }
  }

  //Perform Calculation

  const performCalculation = (operatorValue) => {

      let firstNumber = operand;
      let secondNumber = parseFloat(newOperand.join(''));
      let result;

      switch(operatorValue) {
        case '+':
          result = utils.addition(firstNumber, secondNumber)
          break;
        case '-':
          result = utils.subtraction(firstNumber, secondNumber)
          break;
        case '/':
          result = utils.division(firstNumber, secondNumber)
          break;
        case 'x':
          result = utils.multiplication(firstNumber, secondNumber)
          break;
        default:
          console.log('Error');
    }

    return result;
  }

  const digitClicked = (digitValue) => {
    let newNumber;
    if (digitValue === '.' && newOperand === '') {
      newNumber = ['0', '.']
    } else {
    newNumber = [...newOperand, digitValue];
  } setNumberInput(newNumber);
  }

  const operatorClicked = (operatorValue) => {
    if ( operand.length === 0 ) {
      let newDisplay = parseFloat(newOperand.join(''));
      setCalculatorState(newDisplay, operatorValue);
    } else {
      let newDisplay = performCalculation(operator);
      setCalculatorState(newDisplay, operatorValue);
    }
  }

  const inputClicked = (inputValue) => {
    console.log(`Function key - ${inputValue}`)
  }

  const cancelClicked = () => {
    if (lastClicked === 'cancel' ) {
      //Replace this with something that mounts and unmounts the main component?
      setNewOperand([0]);
      setNewOperator('');
      setOperand('');
      setDisplay([0]);
      setLastClicked('cancel');
    } else {
      setCalcCancelLast()
  }
}

  return (
    <div className='calculator-container'>
      <div className='top'>
        <Display message={display}/>
      </div>
      <div className='bottom'>
        <div className='bottom-left'>
          <MiscKeys lastClicked = {lastClicked} cancelFunction = {cancelClicked} onClickFunction = {inputClicked} />
          <Numpad onClickFunction = {digitClicked} />
        </div>
        <div className='bottom-right'>
          <OperatorKeys onClickFunction = {operatorClicked} />
        </div>
      </div>
    </div>
  )
}

  ReactDOM.render(<Calculator />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
