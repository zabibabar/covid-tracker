import React, { useEffect } from "react";
import { getTimeSeries } from "../actions/timeSeriesActions";
import { connect } from "react-redux";

function CountryCharts({ timeSeries, getTimeSeries }) {
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  return <div></div>;
}

const mapStateToProps = (state) => ({
  timeSeries: state.timeSeries,
});

export default connect(mapStateToProps, { getTimeSeries })(CountryCharts);
