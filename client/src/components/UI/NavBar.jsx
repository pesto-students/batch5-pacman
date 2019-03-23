import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginRight: 20,
  },
};

const NavBar = ({ classes }) => {
  const isLoggedIn = Object.prototype.hasOwnProperty.call(localStorage, 'jwt');
  return (
    <div className="NavBar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            PacMan Pro
          </Typography>
          {isLoggedIn
            ? (
              <>
                <Button color="inherit" className={classes.button}>Leader Board</Button>
                <Typography variant="h7" color="inherit">
                  {window.localStorage.getItem('username')}
                </Typography>
              </>
            )
            : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.shape().isRequired,
};


export default withStyles(styles)(NavBar);
