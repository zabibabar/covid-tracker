import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimeSeries } from "../actions/timeSeriesActions";
import Sidebar from "./Sidebar/Sidebar";
import CountryDetails from "./Details/CountryDetails";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
}));

function Home({ getTimeSeries, timeSeries, loading }) {
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
    <div className={classes.root}>
      <Sidebar timeSeries={timeSeries} />
      <CountryDetails />
    </div>
  );
}
const mapStateToProps = ({ timeSeries }) => ({
  timeSeries: timeSeries.data,
  loading: timeSeries.loading,
});

export default connect(mapStateToProps, { getTimeSeries })(Home);
