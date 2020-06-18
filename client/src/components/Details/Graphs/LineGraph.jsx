import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Box } from "@material-ui/core";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: 360,
    marginBottom: theme.spacing(2),
  },
  charts: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    padding: theme.spacing(1),
  },
}));

function LineGraph({ timeSeries, types, colors, ...props }) {
  const classes = useStyles();
  const options = { month: "short", day: "numeric" };

  return (
    <Paper className={classes.root} elevation={1}>
      <Box boxShadow={1}>
        <Typography
          variant="h6"
          component="div"
          align="center"
          className={classes.title}
        >
          {props.children}
        </Typography>
      </Box>

      <LineChart
        width={500}
        height={300}
        className={classes.charts}
        margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
        data={timeSeries}
      >
        <XAxis
          dataKey="date"
          // tickFormatter={(tick) =>
          //   new Intl.DateTimeFormat("en-US", options).format(new Date(tick))
          // }
        />
        <YAxis
          tickFormatter={(tick) => {
            return tick.toLocaleString();
          }}
        />
        <Tooltip
          formatter={(value) => `${value.toLocaleString()}`}
          labelFormatter={(date) =>
            new Intl.DateTimeFormat("en-US", options).format(new Date(date))
          }
        />
        <Legend />
        {types.map((type, index) => (
          <Line key={index} dataKey={type} stroke={colors[index]} dot={false} />
        ))}
      </LineChart>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.selectedCountry.countryTimeSeries,
});

export default connect(mapStateToProps)(LineGraph);
