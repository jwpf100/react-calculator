import React, { useState } from 'react';
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
  const [counter, input] = useState(5);
  const inputClicked = (inputValue) => input(inputValue)
  return (
    <div className='calculator-container'>
      <Display message={counter}/>
      <Button onClickFunction = {inputClicked} value='AC'/>
      <Button onClickFunction = {inputClicked} value='+/-'/>
      <Button onClickFunction = {inputClicked} value='%'/>
      <Button onClickFunction = {inputClicked} value='/'/>
      <Button onClickFunction = {inputClicked} value={7}/>
      <Button onClickFunction = {inputClicked} value={8}/>
      <Button onClickFunction = {inputClicked} value={9}/>
      <Button onClickFunction = {inputClicked} value='x'/>
      <Button onClickFunction = {inputClicked} value={4}/>
      <Button onClickFunction = {inputClicked} value={5}/>
      <Button onClickFunction = {inputClicked} value={6}/>
      <Button onClickFunction = {inputClicked} value='-'/>
      <Button onClickFunction = {inputClicked} value={1}/>
      <Button onClickFunction = {inputClicked} value={2}/>
      <Button onClickFunction = {inputClicked} value={3}/>
      <Button onClickFunction = {inputClicked} value='+'/>
      <Button onClickFunction = {inputClicked} value='0'/>
      <Button onClickFunction = {inputClicked} value='.'/>
      <Button onClickFunction = {inputClicked} value='='/>
    </div>
  )
}

  ReactDOM.render(<Calculator />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
