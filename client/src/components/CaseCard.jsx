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
    color: "#FFF",
  },
  confirmed: {
    backgroundImage:
      "linear-gradient(to right top, #0073aa, #007eb4, #0089be, #0095c8, #00a0d2)",
  },
  deaths: {
    backgroundImage:
      "linear-gradient(to right top, #ee3873, #f05477, #f16a7e, #f17e86, #f09090)",
  },
  recovered: {
    backgroundImage:
      "linear-gradient(to right top, #71c53c, #72c653, #75c767, #79c878, #80c888)",
  },
  active: {
    backgroundImage:
      "linear-gradient(to right top, #d87d2f, #db8a3b, #de9747, #e1a455, #e4b063)",
  },
  content: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "400",
    fontFamily: "FiraGo, system-ui, sans-serif",
  },
  total: {
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "FiraGo, system-ui, sans-serif",
  },
  today: {
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "FiraGo, system-ui, sans-serif",
  },
}));

export default function CaseCard({ type, total, today }) {
  const classes = useStyles();
  return (
    <Card className={`${classes.root} ${classes[type]}`}>
      <CardContent className={classes.content}>
        <Typography component="p" className={classes.title}>
          {titleFromType(type)}
        </Typography>
        <Typography component="p" className={classes.total}>
          {total ? total.toLocaleString() : null}
        </Typography>
        <Typography component="p" className={classes.today}>
          {formatToday(today)}
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
  if (!today) return;
  if (today < 0) return today.toLocaleString();
  return `+${today.toLocaleString()}`;
}
