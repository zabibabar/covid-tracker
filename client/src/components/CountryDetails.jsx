import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CountryCharts from "./CountryCharts";
import CaseCard from "./CaseCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F9F8FF",
    paddingTop: theme.spacing(8),
    paddingLeft: "36ch",
  },
  country: {
    margin: theme.spacing(3),
    textAlign: "center",
  },
  cards: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function CountryDetails({ country, countryTimeSeries = [] }) {
  const classes = useStyles();
  const {
    confirmed,
    newConfirmed,
    deaths,
    newDeaths,
    recovered,
    newRecovered,
    active,
    newActive,
  } = countryTimeSeries[countryTimeSeries.length - 1] || {};
  return (
    <div className={classes.root}>
      <Typography className={classes.country} variant="h4" component="h4">
        {country}
      </Typography>
      <div className={classes.cards}>
        <CaseCard
          type="confirmed"
          total={confirmed}
          today={newConfirmed}
        ></CaseCard>
        <CaseCard type="deaths" total={deaths} today={newDeaths}></CaseCard>
        <CaseCard
          type="recovered"
          total={recovered}
          today={newRecovered}
        ></CaseCard>
        <CaseCard type="active" total={active} today={newActive}></CaseCard>
      </div>
      <CountryCharts></CountryCharts>
    </div>
  );
}

const mapStateToProps = (state) => ({
  country: state.selectedCountry.name,
  countryTimeSeries: state.selectedCountry.countryTimeSeries,
});

export default connect(mapStateToProps)(CountryDetails);
