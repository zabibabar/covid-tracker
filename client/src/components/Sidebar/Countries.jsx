import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import lightGreen from "@material-ui/core/colors/lightGreen";

import { setSelectedCountry } from "../../actions/selectedCountryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFF",
    width: "100%",
    margin: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transform: "scale(1.05)",
    },
  },
  item: {
    margin: 0,
  },
  countryName: {
    marginBottom: theme.spacing(0.5),
    fontWeight: "bold",
  },
  numbers: {
    textAlign: "center",
    fontWeight: "bold",
    "& .cases": {
      fontSize: "1.2rem",
      fontWeight: "lighter",
      color: orange[500],
    },
    "& .deaths": {
      fontSize: "1.2rem",
      fontWeight: "lighter",
      color: red[500],
    },
    "& .recovered": {
      fontSize: "1.2rem",
      fontWeight: "lighter",
      color: lightGreen[800],
    },
  },
  divider: {
    marginTop: theme.spacing(1),
  },
}));

function Countries({ country, countryTimeSeries, setSelectedCountry }) {
  const classes = useStyles();
  const { confirmed, deaths, recovered } = countryTimeSeries[
    countryTimeSeries.length - 1
  ];
  return (
    <>
      <ListItem
        className={classes.root}
        onClick={() => setSelectedCountry({ country, countryTimeSeries })}
      >
        <ListItemText
          disablediv
          className={classes.item}
          primary={
            <Typography
              className={classes.countryName}
              variant="h6"
              component="div"
            >
              {country}
            </Typography>
          }
          secondary={
            <>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item className={classes.numbers}>
                  <div>
                    <div className="cases">
                      {confirmed.toLocaleString() === "0"
                        ? "N/A"
                        : confirmed.toLocaleString()}
                    </div>
                    <div>Cases</div>
                  </div>
                </Grid>
                <Grid item className={classes.numbers}>
                  <div>
                    <div className="deaths">
                      {deaths.toLocaleString() === "0"
                        ? "N/A"
                        : deaths.toLocaleString()}
                    </div>
                    <div>Deaths</div>
                  </div>
                </Grid>
                <Grid item className={classes.numbers}>
                  <div>
                    <div className="recovered">
                      {recovered.toLocaleString() === "0"
                        ? "N/A"
                        : recovered.toLocaleString()}
                    </div>
                    <div>Recovered</div>
                  </div>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
            </>
          }
        />
      </ListItem>
    </>
  );
}

export default connect(null, { setSelectedCountry })(Countries);
