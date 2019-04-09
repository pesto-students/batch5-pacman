/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import PacmanGame from './components/PacmanGame/PacmanGame';
import SinglePacmanGame from './components/SinglePacmanGame/SinglePacmanGame';
import SimpleModal from './components/UI/Modal';
import { getBoard, boardEdgeInPixel } from './components/PacmanGame/constants';

const App = ({ history, location, context }) => {
  const { isGameEnd, isGameStarted, isMulti } = context;
  return (
    <div className="container">
      {isGameEnd || !isGameStarted ? (
        <SimpleModal
          history={history}
          location={location}
          mode={isGameEnd ? 'GameEnd' : 'GameStart'}
          userContext={context}
        />
      ) : isMulti ? (
        <PacmanGame
          width={boardEdgeInPixel}
          numberofCells={getBoard().length}
          userContext={context}
        />
      ) : (
        <SinglePacmanGame
          width={boardEdgeInPixel}
          numberofCells={getBoard().length}
          userContext={context}
        />
      )}
    </div>
  );
};

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  context: PropTypes.shape().isRequired,
};
export default App;
