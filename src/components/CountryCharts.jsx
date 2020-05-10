import React, { useEffect } from "react";
import { getTimeSeries } from "../actions/timeSeriesActions";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function CountryCharts({ timeSeries, getTimeSeries, selectedCountry }) {
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4">
        {selectedCountry.name}
      </Typography>
      <Typography variant="h5" component="h5">
        Confirmed Cases
      </Typography>
      <LineChart
        width={600}
        height={300}
        data={selectedCountry.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="confirmed"
          stroke="#8884d8"
          dot={false}
        />
      </LineChart>

      <Typography variant="h5" component="h5">
        Deaths
      </Typography>
      <LineChart
        width={600}
        height={300}
        data={selectedCountry.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="deaths" stroke="#8884d8" dot={false} />
      </LineChart>

      <Typography variant="h5" component="h5">
        Recovered
      </Typography>
      <LineChart
        width={600}
        height={300}
        data={selectedCountry.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke="#8884d8"
          dot={false}
        />
      </LineChart>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.timeSeries,
  selectedCountry: state.selectedCountry,
});

export default connect(mapStateToProps, { getTimeSeries })(CountryCharts);
