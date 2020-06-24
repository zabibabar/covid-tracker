import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(25% - ${theme.spacing(4)}px)`,
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
      maxWidth={300}
      minWidth={165}
      m={2}
      p={1}
      boxSizing="border-box"
      alignItems="center"
      borderRadius="borderRadius"
      boxShadow={1}
      color={getColorFromType(type)}
      bgcolor="background.paper"
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
  if (isNaN(today)) return "N/A";
  if (today < 0) return today.toLocaleString();
  return `+${today.toLocaleString()}`;
}

const getColorFromType = (type) => {
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
