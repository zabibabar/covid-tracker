import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    width: "95%",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    "&:hover": {
      color: theme.palette.primary.light,
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
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
    fontWeight: "bold",
  },
}));

export default function Countries(props) {
  const classes = useStyles();
  const {
    Country,
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
  } = props.country;
  return (
    <ListItem className={classes.root}>
      <ListItemText
        disableTypography
        className={classes.item}
        primary={
          <Typography
            className={classes.countryName}
            variant="h6"
            component="div"
          >
            {Country}
          </Typography>
        }
        secondary={
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={4}>
                <Typography
                  className={classes.numbers}
                  variant="subtitle2"
                  component="div"
                >
                  {TotalConfirmed.toLocaleString()}
                </Typography>
                <Typography variant="body2" component="div">
                  Cases
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.numbers}
                  variant="subtitle2"
                  component="div"
                >
                  {TotalDeaths.toLocaleString()}
                </Typography>
                <Typography variant="body2" component="div">
                  Deaths
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.numbers}
                  variant="subtitle2"
                  component="div"
                >
                  {TotalRecovered.toLocaleString()}
                </Typography>
                <Typography variant="body2" component="div">
                  Recovered
                </Typography>
              </Grid>
            </Grid>
          </div>
        }
      />
    </ListItem>
  );
}
