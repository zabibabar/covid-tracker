import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import lightGreen from "@material-ui/core/colors/lightGreen";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  charts: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function CountryCharts({ selectedCountry }) {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" component="h5">
        Confirmed Cases
      </Typography>
      <LineChart
        width={800}
        height={400}
        className={classes.charts}
        data={selectedCountry.countryTimeSeries}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="confirmed"
          stroke={orange[500]}
          dot={false}
        />
        <Line type="monotone" dataKey="deaths" stroke={red[400]} dot={false} />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke={lightGreen[800]}
          dot={false}
        />
        <Line type="monotone" dataKey="active" stroke="#8884d8" dot={false} />
      </LineChart>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry,
});

export default connect(mapStateToProps)(CountryCharts);
