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
    const { location, history, userContext } = this.props;
    const query = queryString.parse(location.search);
    if (query.token) {
      const { token, name } = query;
      userContext.login(name);
      window.localStorage.setItem('jwt', token);
      history.push('/');
    }
  }

  logout = () => {
    const { history, userContext } = this.props;
    userContext.logout();
    window.localStorage.removeItem('jwt');
    history.push('/');
  }

  render() {
    const { classes, userContext } = this.props;
    const isLogIn = !!userContext.name;
    const username = localStorage.getItem('username');
    return (
      <>
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
      </>
    );
  }
}

GoogleLogin.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  userContext: PropTypes.instanceOf(Object).isRequired,
};


export default withStyles(styles)(GoogleLogin);
