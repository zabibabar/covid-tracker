import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box, Hidden } from "@material-ui/core";

import Header from "./Header";
import WorldData from "./WorldData";
import CountryList from "./CountryList";
import CountryDropDown from "./CountryDropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      position: "static",
    },
    [theme.breakpoints.up("md")]: {
      width: 300,
      height: "100vh",
      position: "fixed",
    },
  },
}));
const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={1}
      boxShadow={2}
      bgcolor="White"
      boxSizing="border-box"
      className={classes.root}
    >
      <Header />
      <WorldData />
      <Divider />
      <Hidden smDown>
        <CountryList />
      </Hidden>
      <Hidden mdUp>
        <CountryDropDown />
      </Hidden>
    </Box>
  );
};

export default Sidebar;
