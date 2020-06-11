import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: 0,
    width: 225,
    height: 110,
    color: "White",
  },
  confirmed: {
    background: theme.palette.info.main,
  },
  deaths: {
    background: theme.palette.error.main,
  },
  recovered: {
    background: theme.palette.success.main,
  },
  active: {
    background: theme.palette.warning.main,
  },
  content: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  today: {
    fontWeight: theme.typography.fontWeightMedium,
    alignSelf: "flex-end",
  },
  total: {
    fontWeight: theme.typography.fontWeightLight,
  },
  title: {
    fontWeight: theme.typography.fontWeightLight,
  },
}));

export default function CaseCard({ type, total, today }) {
  const classes = useStyles();
  return (
    <Card className={`${classes.root} ${classes[type]}`}>
      <CardContent className={classes.content}>
        <Typography variant="body2" component="div" className={classes.today}>
          {formatToday(today)}
        </Typography>
        <Typography variant="h4" component="div" className={classes.total}>
          {total ? total.toLocaleString() : "N/A"}
        </Typography>
        <Typography variant="h6" component="div" className={classes.title}>
          {titleFromType(type)}
        </Typography>
      </CardContent>
    </Card>
  );
}

function titleFromType(type) {
  switch (type) {
    case "confirmed":
      return "Confirmed";
    case "deaths":
      return "Deaths";
    case "recovered":
      return "Recovered";
    case "active":
      return "Active";
    default:
      return "";
  }
}

function formatToday(today) {
  if (!today) return "N/A";
  if (today < 0) return today.toLocaleString();
  return `+${today.toLocaleString()}`;
}
