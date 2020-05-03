import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export default function CountryList() {
  const [globalData, setGlobalData] = useState({});
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("globalData")) {
      setGlobalData(JSON.parse(localStorage.getItem("globalData")));
      setCountriesData(JSON.parse(localStorage.getItem("countriesData")));
      console.log("Local Storage used");
    } else {
      axios.get("https://api.covid19api.com/summary").then((res) => {
        console.log("Api Called");
        setGlobalData(res.data.Global);
        setCountriesData(res.data.Countries);
        localStorage.setItem("globalData", JSON.stringify(res.data.Global));
        localStorage.setItem(
          "countriesData",
          JSON.stringify(res.data.Countries)
        );
      });
    }
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHeader />
        <TableContent global={globalData} countries={countriesData} />
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
