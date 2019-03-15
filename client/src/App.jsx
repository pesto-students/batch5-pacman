import React from 'react';
import './App.css';
// import NavBar from './components/UI/NavBar';
import PacmanGame from './components/PacmanGame/PacmanGame';

const App = () => (
  <div>
    {/* <NavBar isLoggedIn /> */}
    <div className="container">
      <PacmanGame width={500} numberofCells={50} />
    </div>
  </div>
);

export default App;
