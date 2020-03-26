import React from 'react';
import './App.css';
import Views from './buttons'
import DoneList from './DoneList'
import AllList from './AllList'
// import Navbar from './Navbar'

//import Input from './input'
// import TodoApp from './To-Do';
import ToDoApp from './ToDoApp'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
      
       
        <header className="App-header">
        <ToDoApp />  
        </header>
        
        
      </div>
    )
  };
}

export default App;
