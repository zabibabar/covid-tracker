import React, { useEffect } from "react";
import { getTimeSeries } from "../../actions/timeSeriesActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Countries from "./Countries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "36ch",
    marginTop: theme.spacing(8),
    padding: 0,
    position: "fixed",
    zIndex: 1,
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    overflowX: "hidden",
    backgroundColor: "#FFF",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));

function CountryList({ getTimeSeries, timeSeries }) {
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  const classes = useStyles();
  return (
    <List className={classes.root}>
      {timeSeries
        .filter((country) => country.country != "World")
        .map((country) => (
          <Countries
            key={country.country}
            country={country.country}
            countryTimeSeries={country.timeSeries}
          />
        ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.timeSeries.data,
});

export default connect(mapStateToProps, { getTimeSeries })(CountryList);
