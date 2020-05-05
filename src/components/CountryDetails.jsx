import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import pakistanData from "../pakistanData.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    minWidth: 350,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    textAlign: "center",
  },
  table: {
    minWidth: 300,
  },
}));

export default function CountryDetails() {
  const totals = pakistanData.slice(-1)[0];
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Pakistan
          </Typography>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableRow>
                <TableCell>Total Confirmed</TableCell>
                <TableCell align="right">{totals.Confirmed}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Deaths</TableCell>
                <TableCell align="right">{totals.Deaths}</TableCell>
              </TableRow>
              <TableBody>
                <TableRow key="global">
                  <TableCell>Total Recovered</TableCell>
                  <TableCell align="right">{totals.Recovered}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
