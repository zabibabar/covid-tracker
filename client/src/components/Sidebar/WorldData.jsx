import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  total: {
    color: theme.palette.info.dark,
  },
  label: {},
  number: {},
}));

function WorldData({ timeSeries }) {
  const classes = useStyles();
  const world = timeSeries.find((country) => (country.country = "World"));
  const data = world ? world.timeSeries[world.timeSeries.length - 1] : {};

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="div" className={classes.total}>
        {data.confirmed ? data.confirmed.toLocaleString() : null}
      </Typography>

      <div className={classes.row}>
        <Typography variant="h6" component="div" className={classes.label}>
          Deaths
        </Typography>
        <Typography variant="h6" component="div" className={classes.number}>
          {data.deaths ? data.deaths.toLocaleString() : null}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="h6" component="div" className={classes.label}>
          Recovered
        </Typography>
        <Typography variant="h6" component="div" className={classes.number}>
          {data.recovered ? data.recovered.toLocaleString() : null}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="h6" component="div" className={classes.label}>
          Active
        </Typography>
        <Typography variant="h6" component="div" className={classes.number}>
          {data.confirmed ? data.active.toLocaleString() : null}
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  timeSeries: state.timeSeries.data,
});

export default connect(mapStateToProps)(WorldData);
