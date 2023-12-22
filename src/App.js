import logo from './logo.svg';
import './App.css';

function App() {
  function reducer(state,{type,payload}){ //Add factorials and other stuff when done to make it more complicated 
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
          ...state, // Need our spread operator so previos state doesn't get overrided by one variable.
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

  const [{currentOperand, previousOperand, operation} , dispatch] = useReducer(reducer,{currentOperand:""})
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
