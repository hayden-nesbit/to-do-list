import React from 'react';
import './App.css';
import ToDoApp from './ToDoApp'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App-header">
        <ToDoApp />
      </div>
    )
  };
}

export default App;