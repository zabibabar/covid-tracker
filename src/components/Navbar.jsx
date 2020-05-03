import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <TimelineIcon className={classes.Icon} />
          <Typography variant="h6" className={classes.title}>
            Coronavirus Case Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
