import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CountryList from "./CountryList";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "36ch",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "#FFF",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <CountryList className={classes.list} />
    </div>
  );
};

export default Sidebar;
