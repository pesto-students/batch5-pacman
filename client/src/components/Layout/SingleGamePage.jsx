import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

const styles = () => ({
  card: {
    width: '80%',
    margin: '15px auto',
    borderRadius: '15px',
  },
});

const GamePage = (props) => {
  const {
    render, classes, score,
  } = props;

  return (
    <React.Fragment>
      <Grid container justify="center" wrap="wrap">
        <Grid item xs={false} sm={false} md={3} lg={4} />
        <Grid item xs={12} sm={8} md={6} lg={4}>
          {render()}
        </Grid>
        <Grid item container direction="column" alignItems="center" xs={12} sm={4} md={3} lg={3}>
          <Card className={classes.card}>
            <CardContent>
              <div style={{ fontWeight: 'bold', fontSize: '110%', margin: '5px 0' }}>
                Score:
                {score}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

GamePage.propTypes = {
  score: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

GamePage.defaultTypes = {
  classes: null,
};


export default withStyles(styles)(GamePage);
