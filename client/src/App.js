import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/UI/NavBar';
import PacmanGame from './components/PacmanGame/PacmanGame';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar auth={{ uid: false }} profile={{ initials: 'MH' }} />
          <PacmanGame width={500} numberofCells={50} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
