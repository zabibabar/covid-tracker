import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from "@material-ui/icons/Close";
import {
  setSelectedCountry,
  deselectCountry,
} from "../../actions/selectedCountryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "40px",
    backgroundColor: "#FFF",
    margin: `${theme.spacing(1)}px auto`,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    boxShadow: theme.shadows[1],
    boxSizing: "border-box",
    borderRadius: "6px",
    "&:hover": {
      boxShadow: theme.shadows[2],
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      cursor: "pointer",
      "& $button": {
        opacity: 1,
        marginLeft: theme.spacing(1.5),
        "& svg": {
          display: "inline",
        },
      },
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  countryName: {
    fontWeight: theme.typography.fontWeightMedium,
    flex: "1 1 0",
  },
  number: {
    color: theme.palette.text.secondary,
    verticalAlign: "middle",
  },
  button: {
    padding: 0,
    transition: "0.4s all",
    opacity: 0,
    "& svg": {
      display: "none",
    },
  },
  selected: {
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    "& $number": {
      color: theme.palette.primary.main,
    },
    "& $button": {
      opacity: 1,
      marginLeft: theme.spacing(1.5),
      "& svg": {
        display: "block",
      },
    },
  },
}));

function Country({
  country,
  countryTimeSeries,
  isSelected,
  setSelectedCountry,
  deselectCountry,
}) {
  const classes = useStyles();
  const { active } = countryTimeSeries[countryTimeSeries.length - 1];

  function handleClick() {
    if (isSelected) return deselectCountry();
    return setSelectedCountry({ country, countryTimeSeries });
  }
  return (
    <ListItem
      className={`${classes.root} ${isSelected ? classes.selected : ""}`}
      onClick={() => handleClick()}
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
            <IconButton className={classes.button}>
              {isSelected ? (
                <CloseIcon fontSize="small" />
              ) : (
                <NavigateNextIcon fontSize="small" />
              )}
            </IconButton>
          </>
        }
      />
    </ListItem>
  );
}

const mapStateToProps = ({ selectedCountry }, { country }) => ({
  isSelected: selectedCountry.name === country,
});

export default connect(mapStateToProps, {
  setSelectedCountry,
  deselectCountry,
})(Country);
