import React, { Component } from 'react';

import './App.css';
import logo from './logo.svg';
import Board from './components/Board.jsx';

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
