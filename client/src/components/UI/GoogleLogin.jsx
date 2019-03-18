import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleButton from './GoogleButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class GoogleLogin extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      window.localStorage.setItem('username', query.name);
      history.push('/');
    }
  }

  logout = () => {
    const { history } = this.props;
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('username');
    history.push('/');
  }

  render() {
    const isLogIn = Object.prototype.hasOwnProperty.call(localStorage, 'jwt');
    const username = localStorage.getItem('username');
    const { classes } = this.props;
    return (
      <div className="auth">
        {isLogIn
          ? (
            <>
              <Button variant="contained" className={classes.button} onClick={this.logout}>
                Log Out
              </Button>
            </>
          )
          : <GoogleButton />}
        <span>{username}</span>
      </div>
    );
  }
}

GoogleLogin.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};


export default withStyles(styles)(GoogleLogin);
