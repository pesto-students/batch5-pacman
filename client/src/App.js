import React from 'react';
import './App.css';

import PacmanGame from './components/PacmanGame/PacmanGame';

const App = () => (
  <PacmanGame width={500} numberofCells={50} />
);

export default App;
