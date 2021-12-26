import React, { Component } from 'react';
import './App.css';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import { Paper } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress"
import { withStyles } from '@material-ui/core';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    marginTop: theme.spacing.unit * 2
  },
  tableHead: {
    fontSize: "1.0rem"
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      searchKeyword: ""
    };
  }

  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0,
      searchKeyword: ""
    });
    this.callApi()
      .then(customers => this.setState({ customers }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(customers => this.setState({ customers }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  valueChangeHandler = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "나이", "성별", "직업", "설정"];
    const filteredComponents = (data) => {
      data = data.filter(c => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map(c => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} img={c.image} name={c.name} age={c.age} gender={c.gender} job={c.job} />
      });
    };
    return (
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                고객 관리 시스템
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색하기"
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  vlaue={this.state.searchKeyword}
                  onChange={this.valueChangeHandler}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed}></CircularProgress>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
