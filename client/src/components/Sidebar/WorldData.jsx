import React from "react";
import { Box, Typography } from "@material-ui/core";

function WorldData({ timeSeries }) {
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
      <Typography variant="h6" component="div" align="center">
        <Box fontWeight="fontWeightMedium">Total Confirmed Cases</Box>
      </Typography>
      <Typography variant="h4" component="div" align="center">
        <Box fontWeight="fontWeightMedium" color="info.dark" my={1}>
          {data.confirmed.toLocaleString()}
        </Box>
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" component="div">
          <Box fontWeight="fontWeightMedium">Deaths</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="error.main">{data.deaths.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" component="div">
          <Box fontWeight="fontWeightMedium">Recovered</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="success.main">{data.recovered.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" component="div">
          <Box fontWeight="fontWeightMedium">Active</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="warning.main">{data.active.toLocaleString()}</Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default WorldData;
