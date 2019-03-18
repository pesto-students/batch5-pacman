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
};

const ButtonAppBar = ({ classes, isLoggedIn }) => (
  <div className="NavBar">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          PackMan Pro
        </Typography>
        {isLoggedIn
          ? (
            <>
              <Button color="inherit">Lead Board</Button>
            </>
          )
          : <Button color="inherit" href="/auth/signin">login</Button>}
      </Toolbar>
    </AppBar>
  </div>
);

ButtonAppBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};


export default withStyles(styles)(ButtonAppBar);
