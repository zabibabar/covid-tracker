import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  country: {
    margin: theme.spacing(3),
    textAlign: "center",
  },
}));

function CountryCharts({ selectedCountry }) {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Typography className={classes.country} variant="h4" component="h4">
        {selectedCountry.name}
      </Typography>
      <Typography variant="h5" component="h5">
        Confirmed Cases
      </Typography>
      <LineChart width={600} height={300} data={selectedCountry.data}>
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
      <LineChart width={600} height={300} data={selectedCountry.data}>
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
      <LineChart width={600} height={300} data={selectedCountry.data}>
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

      <Typography variant="h5" component="h5">
        Active
      </Typography>
      <LineChart width={600} height={300} data={selectedCountry.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="active" stroke="#8884d8" dot={false} />
      </LineChart>

      <Typography variant="h5" component="h5">
        New Cases
      </Typography>
      <BarChart width={600} height={300} data={selectedCountry.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="newConfirmed" fill="#8884d8" />
      </BarChart>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry,
});

export default connect(mapStateToProps)(CountryCharts);
