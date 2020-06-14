import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Paper } from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: 360,
    marginBottom: theme.spacing(2),
  },
  chart: {
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

export default function BarGraph({ timeSeries, types, colors, ...props }) {
  const classes = useStyles();
  const options = { month: "short", day: "numeric" };

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography
        variant="h6"
        component="div"
        align="center"
        className={classes.title}
      >
        {props.children}
      </Typography>
      <Divider className={classes.divider} />
      <BarChart
        width={500}
        height={300}
        data={timeSeries}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        className={classes.chart}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(tick) =>
            new Intl.DateTimeFormat("en-US", options).format(new Date(tick))
          }
        />
        <YAxis
          tickFormatter={(tick) => {
            return tick.toLocaleString();
          }}
        />
        <Tooltip
          formatter={(value) => value.toLocaleString()}
          labelFormatter={(date) =>
            new Intl.DateTimeFormat("en-US", options).format(new Date(date))
          }
        />
        <Legend />
        {types.map((type, index) => (
          <Bar dataKey={type} fill={colors[index]} />
        ))}
      </BarChart>
    </Paper>
  );
}
