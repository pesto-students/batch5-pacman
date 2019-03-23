import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
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
});

class SimpleModal extends React.Component {
  state = { open: true };

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
    const { mode } = this.props;
    const isGameStart = mode === 'GameStart';
    const isLoggedIn = Object.prototype.hasOwnProperty.call(localStorage, 'jwt');
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
      history, location, mode,
    } = this.props;
    return (
      <ButtonGroup
        history={history}
        location={location}
        closeModal={this.closeModal}
        mode={mode}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
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
            {this.buttonGroup()}
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
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleModal);
