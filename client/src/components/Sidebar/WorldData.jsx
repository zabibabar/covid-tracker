import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function WorldData({ timeSeries }) {
  if (!Object.keys(timeSeries).length) return <></>;

  const world = timeSeries.find((country) => (country.country = "World"));
  const data = world ? world.timeSeries[world.timeSeries.length - 1] : {};

  return (
    <Box
      px={3}
      py={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box
        fontWeight="fontWeightMedium"
        color="white"
        bgcolor="primary.main"
        borderRadius="borderRadius"
      >
        <Typography variant="h6" component="div" align="center">
          GLOBAL CASES
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Confirmed</Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box> {data.confirmed.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Deaths</Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box>{data.deaths.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Recovered</Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box>{data.recovered.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Active</Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box>{data.active.toLocaleString()}</Box>
        </Typography>
      </Box>
    </Box>
  );
}
