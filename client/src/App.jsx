import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import NavBar from './components/UI/NavBar';
import PacmanGame from './components/PacmanGame/PacmanGame';
import SimpleModal from './components/UI/Modal';
import { Consumer } from './api/userContext';
import { board, boardEdgeInPixel } from './components/PacmanGame/constants';

const App = ({ history, location }) => (
  <Consumer>
    {context => (
      <>
        <NavBar userContext={context} />
        <div className="container">
          <SimpleModal history={history} location={location} mode="GameStart" userContext={context} />
          <PacmanGame width={boardEdgeInPixel} numberofCells={board.length} />
        </div>
      </>
    )
    }
  </Consumer>
);

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
export default App;
