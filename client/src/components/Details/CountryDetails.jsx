import React from "react";

// Material UI Imports
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// Component Imports
import CountryName from "./CountryName";
import Cards from "./Cards/Cards";
import Graphs from "./Graphs/Graphs";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "5%",
      paddingRight: "5%",
      width: "100%",
      maxWidth: "100%",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "calc(50px + 300px)",
      paddingRight: 50,
    },
  },
}));

export default function CountryDetails() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CountryName />
      <Cards />
      <Graphs />
    </Box>
  );
}
