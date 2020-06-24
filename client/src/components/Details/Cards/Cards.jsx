import React from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import CaseCard from "./CaseCard";

function Cards({ covidData }) {
  if (!covidData.length) return <></>;
  const {
    confirmed,
    newConfirmed,
    deaths,
    newDeaths,
    recovered,
    newRecovered,
    active,
    newActive,
  } = covidData[covidData.length - 1];
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
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
    </Box>
  );
}

const mapStateToProps = (state) => ({
  covidData: state.selectedCountry.countryTimeSeries,
});

export default connect(mapStateToProps)(Cards);
