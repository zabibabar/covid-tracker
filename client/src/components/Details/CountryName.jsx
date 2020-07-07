import React from "react";
import { connect } from "react-redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import InfoModal from "../InfoModal";

const useStyles = makeStyles((theme) => ({
  country: {
    padding: theme.spacing(2),
  },
}));

function CountryName({ country }) {
  const classes = useStyles();

  if (!country) return <></>;

  return (
    <Box position="relative">
      <Typography
        className={classes.country}
        variant="h4"
        component="h4"
        align="center"
      >
        {country}
      </Typography>
      <InfoModal />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  country: state.selectedCountry.name,
});

export default connect(mapStateToProps)(CountryName);
