import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import Countries from "./Countries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "48ch",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: "calc(100vh - 80px)",
  },
}));

export default function CountryList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.countries.map((country) => (
        <Countries key={country.Slug} country={country} />
      ))}
    </List>
  );
}
