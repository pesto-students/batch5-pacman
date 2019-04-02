import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleLogin from './GoogleLogin';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'white',
  },
});

class ButtonGroup extends React.Component {
  state = { displayPlayButton: false };

  getButtonsToStartGame() {
    const {
      classes, history, location, userContext,
    } = this.props;
    const { displayPlayButton } = this.state;
    if (displayPlayButton || userContext.isLogIn) {
      return (
        <>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.resetButtonsAndLoadSinglePLayerPacman}
          >
            Single Player
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.resetButtonsAndLoadMultiplayerPacman}
          >
            Multi Player
          </Button>
        </>
      );
    }
    return (
      <>
        <GoogleLogin history={history} location={location} userContext={userContext} />
        <Button variant="contained" className={classes.button} onClick={this.setDisplayPlayButton}>
          Continue Without Login
        </Button>
      </>
    );
  }

  getButtonsEndGame = () => {
    const { classes, history, location } = this.props;
    const { displayPlayButton } = this.state;
    if (displayPlayButton) {
      return (
        <>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.resetButtonsAndLoadSinglePLayerPacman}
          >
            Single Player
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.resetButtonsAndLoadMultiplayerPacman}
          >
            Multi Player
          </Button>
        </>
      );
    }
    return (
      <>
        <GoogleLogin history={history} location={location} />
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.setDisplayPlayButton}
        >
          Replay
        </Button>
      </>
    );
  };

  resetButtonsAndLoadMultiplayerPacman = () => {
    const { userContext, toLoader } = this.props;
    this.setState({ displayPlayButton: false });
    toLoader();
    userContext.startMultiPlayerGame();
  };

  resetButtonsAndLoadSinglePLayerPacman = () => {
    const { userContext, closeModal } = this.props;
    this.setState({ displayPlayButton: false });
    userContext.startSinglePlayerGame();
    closeModal();
  };

  setDisplayPlayButton = () => {
    this.setState({ displayPlayButton: true });
  };

  render() {
    const { mode } = this.props;
    const gameStart = 'GameStart';
    if (mode === gameStart) {
      return this.getButtonsToStartGame();
    }
    return this.getButtonsEndGame();
  }
}

ButtonGroup.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  userContext: PropTypes.shape().isRequired,
  closeModal: PropTypes.func.isRequired,
  toLoader: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonGroup);
