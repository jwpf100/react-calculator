import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

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
      //setLastClicked('operator')
    } else if (lastClicked === 'operator') {  
      setNewOperator(operatorValue)
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

  
  //Calculations

  const utils = {
  addition: (firstNum, secondNum) => firstNum + secondNum,
  subtraction: (firstNum, secondNum) =>  firstNum - secondNum,
  division: (firstNum, secondNum) => firstNum / secondNum,
  multiplication: (firstNum, secondNum) => firstNum * secondNum,
  }

  //Perform Calculation

  const performCalculation = (operatorValue) => {

      let firstNumber = operand;
      let secondNumber = parseInt(newOperand.join(''));
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
    let newNumber = [...newOperand, digitValue];
    setNumberInput(newNumber);
  }

  const operatorClicked = (operatorValue) => {
    if ( operand.length === 0 ) {
      let newDisplay = parseInt(newOperand.join(''));
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
      <Display message={display}/>
      <Button onClickFunction = {cancelClicked} value={lastClicked !== 'cancel' ? 'C' : 'AC'}/>
      <Button onClickFunction = {inputClicked} value='+/-'/>
      <Button onClickFunction = {inputClicked} value='%'/>
      <Button onClickFunction = {operatorClicked} value='/'/>
      <Button onClickFunction = {digitClicked} value={7}/>
      <Button onClickFunction = {digitClicked} value={8}/>
      <Button onClickFunction = {digitClicked} value={9}/>
      <Button onClickFunction = {operatorClicked} value='x'/>
      <Button onClickFunction = {digitClicked} value={4}/>
      <Button onClickFunction = {digitClicked} value={5}/>
      <Button onClickFunction = {digitClicked} value={6}/>
      <Button onClickFunction = {operatorClicked} value='-'/>
      <Button onClickFunction = {digitClicked} value={1}/>
      <Button onClickFunction = {digitClicked} value={2}/>
      <Button onClickFunction = {digitClicked} value={3}/>
      <Button onClickFunction = {operatorClicked} value='+'/>
      <Button onClickFunction = {digitClicked} value={0}/>
      <Button onClickFunction = {inputClicked} value='.'/>
      <Button onClickFunction = {operatorClicked} value='='/>
    </div>
  )
}

  ReactDOM.render(<Calculator />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
