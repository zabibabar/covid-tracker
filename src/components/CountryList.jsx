import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import axios from "axios";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  // useStyles = () =>
  //   makeStyles({
  //     table: {
  //       minWidth: 650,
  //     },
  //   });

  getData() {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      console.log(res.data);
      this.setState({ countries: res.data.Countries });
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    // const classes = this.useStyles();
    // console.log("table", classes.table);
    return (
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHeader />
            <TableContent rows={this.state.countries} />
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default CountryList;
