import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import Country from "./Country";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));

export default function CountryList({ timeSeries }) {
  console.log("List Rendering...");
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {timeSeries
        .filter((country) => country.country !== "World")
        .map((country) => (
          <Country
            key={country.country}
            country={country.country}
            countryTimeSeries={country.timeSeries}
          />
        ))}
    </List>
  );
}
