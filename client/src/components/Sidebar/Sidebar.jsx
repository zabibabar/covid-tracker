import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box, Hidden } from "@material-ui/core";

import CountryList from "./CountryList";
import Header from "./Header";
import WorldData from "./WorldData";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      // height: "50vh",
      position: "static",
    },
    [theme.breakpoints.up("md")]: {
      width: 300,
      height: "100vh",
      position: "fixed",
    },
  },
}));
const Sidebar = ({ timeSeries }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={1}
      boxShadow={2}
      bgcolor="White"
      className={classes.root}
    >
      <Header />
      <WorldData timeSeries={timeSeries} />
      <Divider />
      <Hidden smDown>
        <CountryList timeSeries={timeSeries} />
      </Hidden>
    </Box>
  );
};

export default Sidebar;
