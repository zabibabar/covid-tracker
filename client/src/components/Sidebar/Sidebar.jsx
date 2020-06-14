import React from "react";
import { Divider, Box } from "@material-ui/core";

import CountryList from "./CountryList";
import Header from "./Header";
import WorldData from "./WorldData";

const Sidebar = ({ timeSeries }) => {
  if (!Object.keys(timeSeries).length) return <></>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={300}
      height="100vh"
      position="fixed"
      zIndex={1}
      boxShadow={2}
    >
      <Header />
      <WorldData timeSeries={timeSeries} />
      <Divider />
      <CountryList timeSeries={timeSeries} />
    </Box>
  );
};

export default Sidebar;
