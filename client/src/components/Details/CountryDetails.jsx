import React from "react";

// Material UI Imports
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// Component Imports
import CountryName from "./CountryName";
import Cards from "./Cards/Cards";
import BarGraph from "./Graphs/BarGraph";
import LineGraph from "./Graphs/LineGraph";

export default function CountryDetails() {
  const theme = useTheme();

  return (
    <Box pl="45ch" pr="9ch">
      <CountryName />
      <Cards />
      <Box display="flex" flexDirection="column" mt={3}>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <LineGraph
            names={["Confirmed"]}
            types={["confirmed"]}
            colors={[theme.palette.info.main]}
          >
            Total Confirmed
          </LineGraph>
          <BarGraph
            names={["Daily Confirmed"]}
            types={["newConfirmed"]}
            colors={[theme.palette.info.main]}
          >
            Daily Confirmed
          </BarGraph>
          <LineGraph
            names={["Active"]}
            types={["active"]}
            colors={[theme.palette.warning.main]}
          >
            Total Active
          </LineGraph>
          <LineGraph
            names={["Active", "Confirmed"]}
            types={["active", "confirmed"]}
            colors={[theme.palette.info.main, theme.palette.warning.main]}
          >
            Confirmed vs. Active
          </LineGraph>
          <LineGraph
            names={["Deaths"]}
            types={["deaths"]}
            colors={[theme.palette.error.main]}
          >
            Total Deaths
          </LineGraph>
          <BarGraph
            names={["Deaths"]}
            types={["newDeaths"]}
            colors={[theme.palette.error.main]}
          >
            Daily Deaths
          </BarGraph>
          <LineGraph
            names={["Daily Confirmed", "Daily Recovered"]}
            types={["newConfirmed", "newRecovered"]}
            colors={[theme.palette.info.main, theme.palette.success.main]}
          >
            New Confirmed vs. New Recovered
          </LineGraph>
          <LineGraph
            names={["Recovered", "Deaths"]}
            types={["recovered", "deaths"]}
            colors={[theme.palette.success.main, theme.palette.error.main]}
          >
            Total Recovered vs. Total Deaths
          </LineGraph>
        </Box>
      </Box>
    </Box>
  );
}
