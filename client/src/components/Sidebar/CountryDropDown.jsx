import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import { setSelectedCountry } from "../../actions/selectedCountryActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(1)}px auto`,
    width: 300,
    minWidth: 120,
  },
}));

function CountryDropDown({
  worldData,
  timeSeries,
  selectedCountry,
  setSelectedCountry,
}) {
  const classes = useStyles();
  const countryList = [worldData, ...timeSeries.flat()];

  const handleChange = (event) => {
    return setSelectedCountry({
      country: event.target.value,
      countryTimeSeries: countryList.find(
        (country) => country.country === event.target.value
      ).timeSeries,
    });
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Country</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCountry.name}
        onChange={handleChange}
      >
        {countryList.map((country) => (
          <MenuItem key={country.country} value={country.country}>
            {country.country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const mapStateToProps = ({ selectedCountry, timeSeries }) => ({
  worldData: timeSeries.worldWideData,
  timeSeries: timeSeries.data,
  selectedCountry,
});

export default connect(mapStateToProps, {
  setSelectedCountry,
})(CountryDropDown);
