import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimeSeries } from "../actions/timeSeriesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import CountryDetails from "./Details/CountryDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
}));

function Home({ getTimeSeries, loading }) {
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
      <Sidebar />
      <CountryDetails />
    </div>
  );
}
const mapStateToProps = ({ timeSeries }) => ({
  loading: timeSeries.loading,
});

export default connect(mapStateToProps, { getTimeSeries })(Home);
