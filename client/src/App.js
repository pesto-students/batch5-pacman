import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PacmanGame from './components/PacmanGame/PacmanGame';

class App extends Component {
  render() {
    return (
      <PacmanGame width={500} numberofCells={50} />
    );
  }
}

export default App;
