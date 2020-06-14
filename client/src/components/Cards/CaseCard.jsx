import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "White",
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
    <Box
      display="flex"
      flexDirection="column"
      width={225}
      height={100}
      mb={1}
      p={1}
      alignItems="center"
      borderRadius="borderRadius"
      boxShadow={1}
      bgcolor={getBackgroundFromType(type)}
      className={`${classes.root} ${classes[type]}`}
    >
      <Typography variant="body2" component="div" className={classes.today}>
        {formatToday(today)}
      </Typography>
      <Typography variant="h4" component="div" className={classes.total}>
        {total ? total.toLocaleString() : "N/A"}
      </Typography>
      <Typography variant="h6" component="div" className={classes.title}>
        {titleFromType(type)}
      </Typography>
    </Box>
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

const getBackgroundFromType = (type) => {
  switch (type) {
    case "confirmed":
      return "info.main";
    case "deaths":
      return "error.main";
    case "recovered":
      return "success.main";
    case "active":
      return "warning.main";
    default:
      return "info.main";
  }
};
