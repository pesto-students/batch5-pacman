import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PacmanGame from './components/PacmanGame/PacmanGame';

class App extends Component {
  render() {
    return (
      <div className="container">
        <PacmanGame width={500} numberofCells={50} />
      </div>
    );
  }
}

export default App;
