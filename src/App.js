import React from 'react';
import './App.css';
// import Navbar from './Navbar'

//import Input from './input'
// import TodoApp from './To-Do';
import ScratchPad from './scratchpad'

class App extends React.Component {

  render() {
    return (
      <div className="App">
      {/* <Navbar /> */}
        <header className="App-header">
            <ScratchPad />
        </header>
      </div>
    )
  };
}

export default App;
