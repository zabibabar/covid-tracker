import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: 250,
    height: 150,
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
  avatar: {
    backgroundColor: "inherit",
  },
  total: {
    textAlign: "center",
  },
}));

export default function CaseCard({ type, total, today }) {
  const classes = useStyles();
  return (
    <Card className={`${classes.root} ${classes[type]}`}>
      <CardHeader title={titleFromType(type)} />
      <CardContent>
        <Typography variant="h4" component="p" className={classes.total}>
          {total}
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
