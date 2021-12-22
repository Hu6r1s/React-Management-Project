import React, { Component } from 'react';
import './App.css';
import Customer from "./components/Customer";
import { Paper } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from '@material-ui/core';

const styles = thema => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: thema.spacing.unit*3
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    id: 1,
    img: "https://placeimg.com/64/64/1",
    name: "홍길동",
    age: 23,
    gender: "남자",
    job: "대학생"
  },
  {
    id: 2,
    img: "https://placeimg.com/64/64/2",
    name: "김철수",
    age: 23,
    gender: "남자",
    job: "대학생"
  },
  {
    id: 3,
    img: "https://placeimg.com/64/64/3",
    name: "김영희",
    age: 23,
    gender: "여자",
    job: "대학생"
  },
]

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>나이</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => {
              return (
                <Customer key={customer.id}
                  id={customer.id}
                  img={customer.img}
                  name={customer.name}
                  age={customer.age}
                  gender={customer.gender}
                  job={customer.job}
                />
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
