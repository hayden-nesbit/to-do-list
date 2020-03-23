import React from 'react';
import './App.css';
import Views from './buttons'
import DoneList from './DoneList'
import AllList from './AllList'
// import Navbar from './Navbar'

//import Input from './input'
// import TodoApp from './To-Do';
import ScratchPad from './scratchpad'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentView: "To-do" }
    this.updateView = this.updateView.bind(this)
  }

  updateView(newView) {
    this.setState({ currentView: newView })
  }

  render() {
    return (
      <div className="App">
      
       
        <header className="App-header">
        <ScratchPad /> 
        <Views
        updateView={this.updateView}
      />
            
        </header>
        
        
      </div>
    )
  };
}

export default App;
