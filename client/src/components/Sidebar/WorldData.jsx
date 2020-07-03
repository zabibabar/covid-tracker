import React from "react";
import { connect } from "react-redux";
import { Box, Typography } from "@material-ui/core";

import Card from "./Card";

function WorldData({ worldWideData }) {
  if (!worldWideData.hasOwnProperty("timeSeries")) return <></>;
  const data = worldWideData.timeSeries[worldWideData.timeSeries.length - 1];
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          mt={2}
          mb={1}
          py={1}
          width="80%"
          borderRadius="borderRadius"
          bgcolor="primary.main"
          color="common.white"
        >
          <Typography variant="h5" component="div" align="center">
            GLOBAL CASES
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {data.confirmed.toLocaleString()}
        </Typography>
        <Typography>Total Confirmed</Typography>
      </Box>
      <Box
        mx={2}
        my={2}
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Card type="deaths" total={data.deaths} />
        <Card type="recovered" total={data.recovered} />
        <Card type="active" total={data.active} />
      </Box>
    </>
  );
}

const mapStateToProps = ({ timeSeries }) => ({
  worldWideData: timeSeries.worldWideData,
});

export default connect(mapStateToProps)(WorldData);
