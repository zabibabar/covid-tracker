import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

class TableContent extends Component {
  render() {
    return (
      <TableBody>
        {this.props.countries.map((row) => (
          <TableRow key={row.CountryCode}>
            <TableCell component="th" scope="row">
              <Link to={row.Slug}>{row.Country}</Link>
            </TableCell>
            <TableCell align="right">{row.NewConfirmed}</TableCell>
            <TableCell align="right">{row.TotalConfirmed}</TableCell>
            <TableCell align="right">{row.NewDeaths}</TableCell>
            <TableCell align="right">{row.TotalDeaths}</TableCell>
            <TableCell align="right">{row.NewRecovered}</TableCell>
            <TableCell align="right">{row.TotalRecovered}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}
export default TableContent;
