import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from "@material-ui/icons/Timeline";
import Divider from "@material-ui/core/Divider";

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
    padding: theme.spacing(1, 2),
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
  title: {
    marginRight: 0,
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
          The Flat Covid Society
        </Typography>
      </div>
      <Divider />
    </header>
  );
}
