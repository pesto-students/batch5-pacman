import React from 'react';
import './App.css';
import PacmanGame from './components/PacmanGame/PacmanGame';

const App = () => (
  <div>
    <div className="container">
      <PacmanGame width={500} numberofCells={50} />
    </div>
  </div>
);

export default App;
