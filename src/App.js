import React from 'react';
import logo from './logo.svg';
import './App.css';

import Input from './input'
import TodoApp from './To-Do';

class App extends React.Component {
 
  render () {
    return (
    <div className="App">
      <header className="App-header">
        <p>
        <TodoApp />
        </p>
      </header>
    </div>
    )};
}

export default App;
