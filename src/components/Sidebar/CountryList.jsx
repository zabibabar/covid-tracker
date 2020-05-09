import React, { useEffect } from "react";
import { getGlobal } from "../../actions/globalActions";
import { connect } from "react-redux";
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

function CountryList({ getGlobal, global }) {
  useEffect(() => {
    getGlobal();
  }, [getGlobal]);

  const classes = useStyles();
  return (
    <List className={classes.root}>
      {global.data.map((country) => (
        <Countries key={country.Country_Region} country={country} />
      ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  global: state.global,
});

export default connect(mapStateToProps, { getGlobal })(CountryList);
