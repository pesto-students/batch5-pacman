import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import ScoreCard from '../UI/ScoreCard';

const styles = () => ({
  card: {
    width: '80%',
    margin: '15px auto',
    borderRadius: '15px',
  },
});

const GamePage = (props) => {
  const {
    render, classes, startGame, score, status,
  } = props;
  const gameScore = [
    {
      name: 'player 1', score, isAlive: false, isHost: true,
    },
    {
      name: 'player 2', score: 0, isAlive: false, isHost: false,
    },
  ];
  const buttonMessage = () => {
    if (status === 0) return 'Start';
    if (status === 1) return 'Pause';
    return 'Restart';
  };
  return (
    <React.Fragment>
      <Grid container justify="center" wrap="wrap">
        <Grid item xs={false} sm={false} md={3} lg={4} />
        <Grid item xs={12} sm={8} md={6} lg={4}>
          {render()}
        </Grid>
        <Grid item container direction="column" alignItems="center" xs={12} sm={4} md={3} lg={3}>
          <ScoreCard score={gameScore} />
          <Card className={classes.card}>
            <CardContent>
              <Button variant="outlined" size="medium" color="primary" onClick={startGame}>
                {buttonMessage()}
              </Button>
              <div style={{ fontWeight: 'bold', fontSize: '110%', margin: '5px 0' }}>
                STATUS:
                {status === 2 ? 'GAME OVER' : status}
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
  status: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

GamePage.defaultTypes = {
  classes: null,
};


export default withStyles(styles)(GamePage);
