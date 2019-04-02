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
  const { classes, isDetailed, score: rows2 } = props;
  const rows = [
    { name: 'Food', playerOne: 320, playerTwo: 230 },
    { name: 'Energizer', playerOne: 320, playerTwo: 230 },
    { name: 'Ghosts', playerOne: 320, playerTwo: 230 },
    { name: 'Total', playerOne: 320, playerTwo: 230 },
  ];
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
                {rows2.map(({
                  name, score, isAlive, isHost,
                }) => (
                  <TableRow className={classes.row} key={`${name}+${score}`}>
                    <CustomTableCell component="th" scope="row">
                      <span>{name}</span>
                      <span>{isHost ? (<span className="blink" />) : null}</span>
                      <span style={skullLogo}>{isAlive ? null : (<img alt="Dead" src={skull} />)}</span>
                    </CustomTableCell>
                    <CustomTableCell align="right" className={classes.score}>{score}</CustomTableCell>
                  </TableRow>
                ))}
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
};

ScoreCard.defaultProps = {
  isDetailed: false,
};

export default withStyles(styles)(ScoreCard);
