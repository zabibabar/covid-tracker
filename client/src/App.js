import React, { useEffect } from "react";
import { getTimeSeries } from "./actions/timeSeriesActions";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import CountryDetails from "./components/Details/CountryDetails";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import muiTheme from "./muiTheme";

const theme = createMuiTheme(muiTheme);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function App({ getTimeSeries }) {
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Sidebar />
        <CountryDetails />
      </div>
    </ThemeProvider>
  );
}

export default connect(null, { getTimeSeries })(App);
