import React, { useEffect, useState } from "react";
import { getTimeSeries } from "../../actions/timeSeriesActions";
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

function CountryList({ getTimeSeries, timeSeries }) {
  const [sortedTimeSeries, setSortedTimeSeries] = useState([]);
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  useEffect(() => {
    let sort_array = [];
    Object.keys(timeSeries || {}).map((country) => {
      return sort_array.push({
        key: country,
        confirmed: timeSeries[country].slice(-1)[0].confirmed,
      });
    });

    sort_array.sort((x, y) => y.confirmed - x.confirmed);
    setSortedTimeSeries(sort_array);
  }, [timeSeries]);

  const classes = useStyles();
  return (
    <List className={classes.root}>
      {sortedTimeSeries.map((country) => (
        <Countries
          key={country.key}
          country={country.key}
          data={timeSeries[country.key].slice(-1)[0]}
        />
      ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.timeSeries.data,
});

export default connect(mapStateToProps, { getTimeSeries })(CountryList);
