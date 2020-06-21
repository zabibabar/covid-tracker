import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimeSeries } from "./actions/timeSeriesActions";
import Sidebar from "./components/Sidebar/Sidebar";
import CountryDetails from "./components/Details/CountryDetails";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

import muiTheme from "./muiTheme";

const myTheme = createMuiTheme(muiTheme);
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: myTheme.palette.background.default,
    color: myTheme.palette.primary.main,
  },
}));

function App({ getTimeSeries, timeSeries, loading }) {
  const classes = useStyles();

  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <Sidebar timeSeries={timeSeries} />
        <CountryDetails />
      </div>
    </ThemeProvider>
  );
}
const mapStateToProps = ({ timeSeries }) => ({
  timeSeries: timeSeries.data,
  loading: timeSeries.loading,
});

export default connect(mapStateToProps, { getTimeSeries })(App);
