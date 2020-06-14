import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { setSelectedCountry } from "../../actions/selectedCountryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    backgroundColor: "#FFF",
    margin: "5% auto",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: "6px",
    "&:hover": {
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
      border: "1px solid #00809D",
      color: "#00809D",
      cursor: "pointer",
      "& $nextButton": {
        opacity: 1,
        marginLeft: theme.spacing(1.5),
        "& svg": {
          display: "block",
        },
      },
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    postion: "relative",
  },
  countryName: {
    fontWeight: theme.typography.fontWeightMedium,
    flex: "1 1 0",
  },
  number: {
    color: theme.palette.text.secondary,
  },
  nextButton: {
    padding: 0,
    transition: "0.4s all",
    opacity: 0,
    "& svg": {
      display: "none",
    },
  },
  selected: {
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
    border: "1px solid #00809D",
    color: "#00809D",
  },
}));

function Country({
  country,
  countryTimeSeries,
  selectedCountry,
  setSelectedCountry,
}) {
  const classes = useStyles();
  const { active } = countryTimeSeries[countryTimeSeries.length - 1];
  const isSelected = selectedCountry.name === country;
  return (
    <ListItem
      className={`${classes.root} ${isSelected ? classes.selected : null}`}
      onClick={() => setSelectedCountry({ country, countryTimeSeries })}
    >
      <ListItemText
        className={classes.item}
        primary={
          <Typography
            className={classes.countryName}
            variant="subtitle2"
            component="div"
          >
            {country === "US" ? "United States" : country}
          </Typography>
        }
        secondary={
          <>
            <Typography
              className={classes.number}
              variant="subtitle2"
              component="span"
            >
              {active.toLocaleString("en")}
            </Typography>
            <IconButton className={classes.nextButton}>
              <NavigateNextIcon />
            </IconButton>
          </>
        }
      />
    </ListItem>
  );
}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry,
});

export default connect(mapStateToProps, { setSelectedCountry })(Country);
