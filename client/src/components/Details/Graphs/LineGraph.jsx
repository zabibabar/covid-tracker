import React from "react";
import { connect } from "react-redux";
import { Typography, Box } from "@material-ui/core";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function LineGraph({ timeSeries, names, types, colors, children }) {
  const data = timeSeries.map((cases) => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = cases.date.substring(0, cases.date.indexOf("T")).split("-");
    const month = months[date[1] - 1];
    const day = date[2];
    return {
      ...cases,
      date: `${month} ${day}`,
    };
  });
  return (
    <Box
      bgcolor="background.paper"
      boxShadow={2}
      width={500}
      height={320}
      mb={4}
    >
      <Box boxShadow={1} height="15%" p={1} boxSizing="border-box">
        <Typography variant="h6" component="div" align="center">
          {children}
        </Typography>
      </Box>
      <Box height="85%">
        <ResponsiveContainer>
          <LineChart
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
            data={data}
            isAnimationActive={false}
          >
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(tick) => {
                return tick.toLocaleString();
              }}
            />
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
            <Legend />
            {types.map((type, index) => (
              <Line
                key={index}
                name={names[index]}
                dataKey={type}
                stroke={colors[index]}
                strokeWidth={3}
                dot={false}
                activeDot={{ stroke: colors[index], r: 4 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.selectedCountry.countryTimeSeries,
});

export default connect(mapStateToProps)(LineGraph);
