import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGroup from './ButtonGroup';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '20%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -20%)',
    alignItem: 'center',
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class SimpleModal extends React.Component {
  state = { open: true, mode: 'button' };

  closeModal = () => {
    this.setState({ open: false });
  }

  pacManImage = () => {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Avatar alt="Remy Sharp" src="/images/pac.png" className={classes.bigAvatar} />
      </Grid>
    );
  }

  modalLabel = () => {
    const { mode, userContext } = this.props;
    const gameStart = 'GameStart';
    const isGameStart = mode === gameStart;
    const isLoggedIn = userContext.isLogIn;
    return (
      <>
        <Typography variant="h4" id="simple-modal-description">
          {isGameStart ? 'Welcome to Pacman' : 'Your Final Score is: 454'}
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          {(!isGameStart && !isLoggedIn) ? 'SignIn to save your score ' : ''}
        </Typography>
      </>
    );
  }

  buttonGroup = () => {
    const {
      history, location, mode, userContext,
    } = this.props;
    return (
      <ButtonGroup
        history={history}
        location={location}
        closeModal={this.closeModal}
        userContext={userContext}
        toLoader={this.toLoaderMode}
        mode={mode}
      />
    );
  }

  toLoaderMode = () => {
    this.setState({ mode: 'loader' });
  }

  getLoader = () => {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress className={classes.progress} />
        <Typography>Searching for another player for you...</Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { open, mode } = this.state;
    const loaderMode = 'loader';
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
        >
          <div className={classes.paper}>
            {this.pacManImage()}
            {this.modalLabel()}
            {mode === loaderMode ? this.getLoader() : this.buttonGroup()}

          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  userContext: PropTypes.shape().isRequired,
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleModal);
