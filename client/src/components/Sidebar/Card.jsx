import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  total: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function Card({ type, total }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      mb={1}
      boxSizing="border-box"
      className={classes[type]}
    >
      <Typography variant="body2" component="div" className={classes.title}>
        {titleFromType(type)}
      </Typography>
      <Typography variant="subtitle1" component="div" className={classes.total}>
        {total ? total.toLocaleString() : "N/A"}
      </Typography>
    </Box>
  );
}

function titleFromType(type) {
  switch (type) {
    case "confirmed":
      return "Confirmed";
    case "deaths":
      return "Total Deaths";
    case "recovered":
      return "Total Recovered";
    case "active":
      return "Total Active";
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
