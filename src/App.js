import logo from './logo.svg';
import './App.css';
import ClickedNumber from "./ClickedNumber";
import React, { useReducer } from "react";
import './styles/style.css'

function App() {
  function reducer(state,{type,payload}){ 
    switch(type){
      case 'append':
        if (payload === '.' && state.currentOperand.includes(payload)) return state 
          return {
          ...state,
          currentOperand: `${state.currentOperand}${payload}`
          }
      case 'deletion':
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0,state.currentOperand.length - 1),
          
        }
      case 'clear':
        return {
          ...state,
          currentOperand: ""
        }
      case 'operand':
        return {
          ...state, 
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: payload
        }
      case 'evaluate':
        return {
          ...state,
          currentOperand: evaluate(state).toString(),
          previousOperand: null,
          operation: null

        }
      case 'factorial':
        return {
          ...state,
          previousOperand:state.currentOperand,
          currentOperand: `${state.currentOperand}${payload}`,
          operation: payload
        }
      default:
        throw new Error('unknown action type:' `${type}`) 
    }
  }

  function factorial(n) {
    if (n < 0) return "undefined"
    if (n === 0) return 0
    if (n === 1) return 1 
    n = n * factorial(n-1)
    return n
  }

  function evaluate({currentOperand,previousOperand,operation}) { 
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) return ""
    let result = "";
    switch(operation){
    default:
      throw new Error('unknown evaluation')
    case "+":
      result = previous + current 
      break
    case "-":
      result = previous - current 
      break
    case "*":
      result = current * previous
      break
    case "/":
      result = (previous / current)
      break
    case '^':
      result = previous ** current
      break 
    case '!':
      try{
        result = factorial(previous)
      }
      catch(err){
        result = "Infinity"
      }
      break
    }
    return result;
  }
  
  const [{currentOperand, previousOperand, operation} , dispatch] = useReducer(reducer,{currentOperand:""})
  
  return (
    <div className="calculator-grid">
    <div className="output">
    <div className="previous-operand">
      {previousOperand}{operation}
    </div>
    <div className="current-operand">
        {currentOperand}
    </div>
  </div>
  <button
    className="span-two"
    onClick={() => dispatch({type:'clear'})}
  >
    AC
  </button>
  <button onClick={() => dispatch({type:'deletion'})}>
    DEL
  </button>
  <button onClick={() => dispatch({type:'operand', payload:'/'})}>/</button>
  <button onClick={() => dispatch({type:'operand',payload:'^'})}>^</button>
  <ClickedNumber type='append' payload='1' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='2' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='3' dispatcher={dispatch}/>
  <button onClick={() => dispatch({type:'operand', payload: '*'})}>*</button>
  <ClickedNumber type='append' payload='4' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='5' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='6' dispatcher={dispatch}/>
  <button onClick={() => dispatch({type:'operand', payload:'+'})}>+</button>
  <ClickedNumber type='append' payload='7' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='8' dispatcher={dispatch}/>
  <ClickedNumber type='append' payload='9' dispatcher={dispatch}/>
  <button onClick={() => dispatch({type:'operand', payload:'-'})}>-</button>
  <button onClick={() => dispatch({type:'append',payload:'.'})}>.</button>
  <ClickedNumber type='append' payload='0' dispatcher={dispatch}/>
  <button onClick={() => dispatch({type:'factorial',payload:'!'})}>!</button>
  <button
    className="span-two"
    onClick={()=> dispatch({type:'evaluate'})}
  >
    =
  </button>
  </div>
  );
}

export default App;
