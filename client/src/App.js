import React from 'react';
import './App.css';

import PacmanGame from './components/PacmanGame/PacmanGame';

function App() {
  return (
    <PacmanGame width={500} numberofCells={50} />
  );
}

export default App;
