import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    width: 600,
    height: 300,
  },
  charts: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    padding: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

function CountryCharts({ selectedCountry }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h5" className={classes.title}>
        Confirmed Cases
      </Typography>
      <Divider className={classes.divider} />

      <LineChart
        width={550}
        height={250}
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
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry,
});

export default connect(mapStateToProps)(CountryCharts);
