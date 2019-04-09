import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import skull from '../../sprites/skull.png';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
}))(TableCell);

const styles = {
  card: {
    width: '80%',
    margin: '0 auto',
    height: 'fit-content',
    marginTop: 10,
    borderRadius: '15px',
    padding: '0px',
  },
  cardContent: {
    padding: '0px',
    margin: '0px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  score: {
    fontWeight: 'bold',
    fontSize: '30px',
  },
  table: {
    padding: '0px',
  },
};
const skullLogo = {
  fontSize: '8px',
  position: 'relative',
  top: '3px',
  left: '2px',
};
const scoreHeader = {
  fontSize: '20px',
};
const ScoreCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    classes,
    isDetailed,
    playerId,
    players,
  } = props;
  const rows = [
    { name: 'Food', playerOne: 320, playerTwo: 230 },
    { name: 'Energizer', playerOne: 320, playerTwo: 230 },
    { name: 'Ghosts', playerOne: 320, playerTwo: 230 },
    { name: 'Total', playerOne: 320, playerTwo: 230 },
  ];

  const hasPlayer = Object.keys(players).length > 0;
  let playerScores = [];
  if (hasPlayer) {
    playerScores = Object.keys(players).map((key) => {
      if (key === playerId) {
        players[key].isHost = true;
      }
      return players[key];
    });
  }

  const [player1, player2] = playerScores;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {isDetailed
          ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Items</CustomTableCell>
                  <CustomTableCell align="right">Player 1</CustomTableCell>
                  <CustomTableCell align="right">Player 2</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ name, playerOne, playerTwo }) => (
                  <TableRow className={classes.row} key={`${name}+${playerOne}+${playerTwo}`}>
                    <CustomTableCell component="th" scope="row">
                      {name}
                    </CustomTableCell>
                    <CustomTableCell align="right">{playerOne}</CustomTableCell>
                    <CustomTableCell align="right">{playerTwo}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
          : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell style={scoreHeader}>Score</CustomTableCell>
                  <CustomTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {hasPlayer
                  ? (
                    <>
                      <TableRow className={classes.row} key={`PLayer 1 ${player1.score}`}>
                        <CustomTableCell component="th" scope="row">
                          <span>{player1.isHost ? 'You' : 'PLayer 2'}</span>
                          <span>{player1.isHost ? (<span className="blink" />) : null}</span>
                          <span style={skullLogo}>{player1.alive ? null : (<img alt="Dead" src={skull} />)}</span>
                        </CustomTableCell>
                        <CustomTableCell align="right" className={classes.score}>{player1.score}</CustomTableCell>
                      </TableRow>
                      <TableRow className={classes.row} key={`Player 2 ${player2.score}`}>
                        <CustomTableCell component="th" scope="row">
                          <span>{player2.isHost ? 'You' : 'PLayer 2'}</span>
                          <span>{player2.isHost ? (<span className="blink" />) : null}</span>
                          <span style={skullLogo}>{player2.alive ? null : (<img alt="Dead" src={skull} />)}</span>
                        </CustomTableCell>
                        <CustomTableCell align="right" className={classes.score}>{player2.score}</CustomTableCell>
                      </TableRow>
                    </>
                  )
                  : <TableRow><CustomTableCell component="th" scope="row"><span>loading...</span></CustomTableCell></TableRow>}
              </TableBody>
            </Table>
          )
        }
      </CardContent>
    </Card>
  );
};

ScoreCard.propTypes = {
  classes: PropTypes.shape().isRequired,
  isDetailed: PropTypes.bool,
  players: PropTypes.shape().isRequired,
  playerId: PropTypes.string.isRequired,
};

ScoreCard.defaultProps = {
  isDetailed: false,
};

export default withStyles(styles)(ScoreCard);
