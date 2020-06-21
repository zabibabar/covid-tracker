import React from "react";
import { connect } from "react-redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  country: {
    padding: theme.spacing(2),
  },
}));

function CountryName({ country }) {
  const classes = useStyles();

  if (!country) return <></>;

  return (
    <Typography
      className={classes.country}
      variant="h4"
      component="h4"
      align="center"
    >
      {country}
    </Typography>
  );
}

const mapStateToProps = (state) => ({
  country: state.selectedCountry.name,
});

export default connect(mapStateToProps)(CountryName);
