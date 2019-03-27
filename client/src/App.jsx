/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import NavBar from './components/UI/NavBar';
import PacmanGame from './components/PacmanGame/PacmanGame';
import SimpleModal from './components/UI/Modal';
import { Consumer } from './api/userContext';


const App = ({ history, location }) => (
  <Consumer>
    {context => (
      <>
        <NavBar userContext={context} />
        <div className="container">
          <SimpleModal history={history} location={location} mode="GameStart" userContext={context} />
          <PacmanGame width={500} numberofCells={30} />
        </div>
      </>
    )
    }
  </Consumer>
);

App.propTypes = {
  // history: PropTypes.shape().isRequired,
  // location: PropTypes.shape().isRequired,
};
export default App;
