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

class App extends Component {
  state = {
    customers: ""
  };

  componentDidMount() {
    this.callApi()
      .then(customers => this.setState({customers}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  }
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
            { this.state.customers ? this.state.customers.map(customer => {
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
            }) : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
