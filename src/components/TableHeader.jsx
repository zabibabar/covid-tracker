import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class TableHeader extends Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Country</TableCell>
          <TableCell>New Confirmed</TableCell>
          <TableCell>Total Confirmed</TableCell>
          <TableCell>New Deaths</TableCell>
          <TableCell>Total Deaths</TableCell>
          <TableCell>New Recovered</TableCell>
          <TableCell>Total Recovered</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
