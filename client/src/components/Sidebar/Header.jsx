import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from "@material-ui/icons/Timeline";
import Divider from "@material-ui/core/Divider";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    width: "inherit",
    backgroundColor: "#FFF",
    height: theme.spacing(7),
  },
  flex: {
    display: "flex",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
  title: {
    fontSize: "20px",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.flex}>
        <TimelineIcon fontSize="large" color="primary" />
        <Divider orientation="vertical" flexItem />
        <Typography variant="h6" className={classes.title}>
          Covid Tracker
        </Typography>
        <Link component={RouterLink} to="/about">
          About
        </Link>
      </div>
      <Divider />
    </header>
  );
}
