import React, { Component } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class TableContent extends Component {
  render() {
    return (
      <TableBody>
        {this.props.rows.map((row) => (
          <TableRow key={row.CountryCode}>
            <TableCell component="th" scope="row">
              {row.Country}
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
