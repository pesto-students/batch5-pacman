import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100 px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowestHighScore: 0,
      leaderBoardObject: {},
      leaderBoardList: [],
    };
  }

  componentDidMount() {
    this.newLeaderboardScore({
      Hassan: 50, Shalini: 5, Shivang: 10, Mehul: 2, Kaushik: 101,
    });
  }

  createData = (object) => {
    let rank = 0;
    const leaderBoardObjectRows = Object.entries(object)
      .map(([username, score]) => {
        rank += 1;
        return { rank, username, score };
      });
    return leaderBoardObjectRows;
  }

  newLeaderboardScore = (object) => {
    const { leaderBoardObject, lowestHighScore } = this.state;
    const newLeaderBoardObject = leaderBoardObject;
    Object.entries(object).forEach(
      ([username, score]) => {
        if (score > lowestHighScore) {
          Object.assign(newLeaderBoardObject, { [username]: score });
        }
      },
    );

    const sortedLeaderboardObject = {};
    Object.keys(newLeaderBoardObject)
      .sort((a, b) => newLeaderBoardObject[b] - newLeaderBoardObject[a])
      .forEach(key => Object.assign(sortedLeaderboardObject,
        { [key]: newLeaderBoardObject[key] }));

    const lowestScore = Object.values(sortedLeaderboardObject).slice(-1)[0];
    const leaderBoardList = this.createData(sortedLeaderboardObject);
    this.setState({
      leaderBoardObject: sortedLeaderboardObject,
      lowestHighScore: lowestScore,
      leaderBoardList,
    });
  };

  render() {
    const { leaderBoardList } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Rank</CustomTableCell>
                <CustomTableCell>Username</CustomTableCell>
                <CustomTableCell>Score</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderBoardList.map(row => (
                <TableRow key={row.rank}>
                  <CustomTableCell component="th" scope="row">{row.rank}</CustomTableCell>
                  <CustomTableCell>{row.username}</CustomTableCell>
                  <CustomTableCell>{row.score}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

LeaderBoard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(LeaderBoard);
