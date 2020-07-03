import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, List } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import Country from "./Country";
import { selectPage } from "../../actions/timeSeriesActions";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "10%",
    },
  },
  ul: {
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
}));

function CountryList({ timeSeries, selectPage }) {
  const classes = useStyles();

  const handlePageChange = (event, page) => {
    event.preventDefault();
    selectPage(page);
  };

  return (
    <Box width="100%" className={classes.root}>
      <List>
        {timeSeries.map((country) => (
          <Country
            key={country.country}
            country={country.country}
            countryTimeSeries={country.timeSeries}
          />
        ))}
      </List>
      <Pagination
        color="primary"
        shape="rounded"
        count={5}
        classes={classes}
        onChange={handlePageChange}
      />
    </Box>
  );
}

const mapStateToProps = ({ timeSeries }) => ({
  timeSeries: timeSeries.data[timeSeries.selectedPage - 1],
});

export default connect(mapStateToProps, { selectPage })(CountryList);
