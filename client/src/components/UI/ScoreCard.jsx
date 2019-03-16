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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const styles = {
  card: {
    minWidth: 275,
    backgroundColor: '#d3d3d3',
    height: 'fit-content',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const ScoreCard = (props) => {
  const { classes, isDetailed } = props;
  const rows = [
    { name: 'Food', playerOne: 320, playerTwo: 230 },
    { name: 'Energizer', playerOne: 320, playerTwo: 230 },
    { name: 'Ghosts', playerOne: 320, playerTwo: 230 },
    { name: 'Total', playerOne: 320, playerTwo: 230 },
  ];
  const rows2 = [
    { name: 'Player One', score: 320 },
    { name: 'Player Two', score: 320 },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
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
                  <CustomTableCell>ScoreCard</CustomTableCell>
                  <CustomTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows2.map(({ name, score }) => (
                  <TableRow className={classes.row} key={`${name}+${score}`}>
                    <CustomTableCell component="th" scope="row">
                      {name}
                    </CustomTableCell>
                    <CustomTableCell align="right">{score}</CustomTableCell>
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
