import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTimeSeries } from "../actions/timeSeriesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress, Box } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import CountryDetails from "./Details/CountryDetails";
import InfoModal from "./InfoModal";

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
  InfoModal: {
    [theme.breakpoints.down("sm")]: {
      top: 310,
      right: 20,
    },
    [theme.breakpoints.up("md")]: {
      top: 20,
      right: 40,
    },
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
      <Box position="absolute" className={classes.InfoModal}>
        <InfoModal />
      </Box>
    </div>
  );
}
const mapStateToProps = ({ timeSeries }) => ({
  timeSeries: timeSeries.data,
  loading: timeSeries.loading,
});

export default connect(mapStateToProps, { getTimeSeries })(Home);
