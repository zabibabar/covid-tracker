import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      setCountries(res.data.Countries);
    });
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHeader />
        <TableContent rows={countries} />
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

export default CountryList;
