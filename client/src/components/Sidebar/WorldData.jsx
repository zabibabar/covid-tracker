import React from "react";
import { connect } from "react-redux";
import { Box, Typography } from "@material-ui/core";

function WorldData({ worldWideData }) {
  if (!worldWideData.hasOwnProperty("timeSeries")) return <></>;
  const data = worldWideData.timeSeries[worldWideData.timeSeries.length - 1];
  return (
    <Box
      px={3}
      py={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* <Box
        fontWeight="fontWeightMedium"
        color="white"
        bgcolor="primary.main"
        borderRadius="borderRadius"
      >
        <Typography variant="subtitle1" component="div" align="center">
          GLOBAL CASES
        </Typography>
      </Box> */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4" component="div">
          <Box> {data.confirmed.toLocaleString()}</Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Confirmed</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Deaths</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="text.secondary">{data.deaths.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Recovered</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="text.secondary">{data.recovered.toLocaleString()}</Box>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" component="div">
          <Box fontWeight="fontWeightMedium">Active</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box color="text.secondary">{data.active.toLocaleString()}</Box>
        </Typography>
      </Box>
    </Box>
  );
}

const mapStateToProps = ({ timeSeries }) => ({
  worldWideData: timeSeries.worldWideData,
});

export default connect(mapStateToProps)(WorldData);
