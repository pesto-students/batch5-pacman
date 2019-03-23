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
  state = { withOrWithoutLogin: false };

  getButtonsToStartGame() {
    const {
      classes,
      history,
      location,
    } = this.props;
    const { withOrWithoutLogin } = this.state;
    if (withOrWithoutLogin || Object.prototype.hasOwnProperty.call(localStorage, 'jwt')) {
      return (
        <>
          <Button variant="contained" className={classes.button} onClick={this.resetBtnAndCloseModel}>
            Single Player
          </Button>
          <Button variant="contained" className={classes.button} onClick={this.resetBtnAndCloseModel}>
            Multi Player
          </Button>
        </>
      );
    }
    return (
      <>
        <GoogleLogin history={history} location={location} />
        <Button variant="contained" className={classes.button} onClick={() => this.setState({ withOrWithoutLogin: true })}>
          Continue Without Login
        </Button>
      </>
    );
  }

  getButtonsEndGam = () => {
    const {
      classes,
      history,
      location,
    } = this.props;
    const { withOrWithoutLogin } = this.state;
    if (withOrWithoutLogin) {
      return (
        <>
          <Button variant="contained" className={classes.button} onClick={this.resetBtnAndCloseModel}>
            Single Player
          </Button>
          <Button variant="contained" className={classes.button} onClick={this.resetBtnAndCloseModel}>
            Multi Player
          </Button>
        </>
      );
    }
    return (
      <>
        <GoogleLogin history={history} location={location} />
        <Button variant="contained" className={classes.button} onClick={() => this.setState({ withOrWithoutLogin: true })}>
          Replay
        </Button>
      </>
    );
  }

  resetBtnAndCloseModel = () => {
    const { closeModal } = this.props;
    this.setState({ withOrWithoutLogin: false });
    closeModal();
  };

  render() {
    const { mode } = this.props;
    if (mode === 'GameStart') {
      return this.getButtonsToStartGame();
    }
    return this.getButtonsEndGam();
  }
}


ButtonGroup.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonGroup);
