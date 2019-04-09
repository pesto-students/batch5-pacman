/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import NavBar from './components/UI/NavBar';
import PacmanGame from './components/PacmanGame/PacmanGame';
import SinglePacmanGame from './components/SinglePacmanGame/SinglePacmanGame';
import SimpleModal from './components/UI/Modal';
import { Consumer } from './api/userContext';
import { getBoard, boardEdgeInPixel } from './components/PacmanGame/constants';

const App = ({ history, location }) => (
  <Consumer>
    {context => (
      <>
        <NavBar userContext={context} />
        <div className="container">
          {context.isGameEnd || !context.isGameStarted
            ? <SimpleModal history={history} location={location} mode={context.isGameEnd ? 'GameEnd' : 'GameStart'} userContext={context} />
            : (context.isMulti
              ? (
                <PacmanGame
                  width={boardEdgeInPixel}
                  numberofCells={getBoard().length}
                  userContext={context}
                />
              )
              : (
                <SinglePacmanGame
                  width={boardEdgeInPixel}
                  numberofCells={getBoard().length}
                  userContext={context}
                />
              )
            )
          }
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
