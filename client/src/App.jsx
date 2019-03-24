import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import PacmanGame from './components/PacmanGame/PacmanGame';
import SimpleModal from './components/UI/Modal';


const App = ({ history, location }) => (
  <div>
    <div className="container">
      <SimpleModal history={history} location={location} mode="GameStart" />
      <PacmanGame width={500} numberofCells={30} />
    </div>
  </div>
);

App.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
export default App;
