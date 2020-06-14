import React from "react";
import { connect } from "react-redux";

// Material UI Imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

// Component Imports
import Cards from "./Cards/Cards";
import BarGraph from "./Graphs/BarGraph";
import LineGraph from "./Graphs/LineGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "45ch",
    paddingRight: "9ch",
    backgroundColor: theme.palette.background.default,
  },
  country: {
    padding: theme.spacing(2),
  },
}));

function CountryDetails({ country, countryTimeSeries }) {
  const classes = useStyles();
  const theme = useTheme();

  if (!countryTimeSeries.length) return <></>;
  const covidData = countryTimeSeries[countryTimeSeries.length - 1];

  return (
    <div className={classes.root}>
      <Typography
        className={classes.country}
        align="center"
        variant="h4"
        component="h4"
      >
        {country}
      </Typography>
      <Cards covidData={covidData} />
      <Box display="flex" flexDirection="column" my={3}>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["confirmed"]}
            colors={[theme.palette.info.main]}
          >
            Total Confirmed
          </LineGraph>
          <BarGraph
            timeSeries={countryTimeSeries}
            types={["newConfirmed"]}
            colors={[theme.palette.info.main]}
          >
            Daily Confirmed
          </BarGraph>
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["active"]}
            colors={[theme.palette.warning.main]}
          >
            Total Active
          </LineGraph>
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["active", "confirmed"]}
            colors={[theme.palette.info.main, theme.palette.warning.main]}
          >
            Confirmed vs. Active
          </LineGraph>
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["deaths"]}
            colors={[theme.palette.error.main]}
          >
            Total Deaths
          </LineGraph>
          <BarGraph
            timeSeries={countryTimeSeries}
            types={["newDeaths"]}
            colors={[theme.palette.error.main]}
          >
            Daily Deaths
          </BarGraph>
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["newConfirmed", "newRecovered"]}
            colors={[theme.palette.info.main, theme.palette.success.main]}
          >
            New Confirmed vs. New Recovered
          </LineGraph>
          <LineGraph
            timeSeries={countryTimeSeries}
            types={["recovered", "deaths"]}
            colors={[theme.palette.success.main, theme.palette.error.main]}
          >
            Total Recovered vs. Total Deaths
          </LineGraph>
        </Box>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => ({
  country: state.selectedCountry.name,
  countryTimeSeries: state.selectedCountry.countryTimeSeries,
});

export default connect(mapStateToProps)(CountryDetails);
