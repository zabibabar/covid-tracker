import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import CountryList from "./CountryList";
import Header from "./Header";
import WorldData from "./WorldData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    height: "100vh",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    zIndex: 1,
    backgroundColor: "#FFF",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <WorldData />
      <Divider />
      <CountryList />
    </div>
  );
};

export default Sidebar;
