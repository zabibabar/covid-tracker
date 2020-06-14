import React from "react";
import { Box } from "@material-ui/core";
import CaseCard from "./CaseCard";

export default function Cards({ covidData }) {
  const {
    confirmed,
    newConfirmed,
    deaths,
    newDeaths,
    recovered,
    newRecovered,
    active,
    newActive,
  } = covidData;
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
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
