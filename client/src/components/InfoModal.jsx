import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Modal, Backdrop, Fade } from "@material-ui/core";
import { Info as InfoIcon, Close as CloseIcon } from "@material-ui/icons";
import ReactGA from "react-ga";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    top: "calc(50% - 21px)",
    right: 0,
  },
  paper: {
    boxSizing: "border-box",
    position: "absolute",
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    boxSizing: "border-box",
    margin: theme.spacing(0, 0.6),
    height: 42,
    width: 42,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[3],
  },
  closeButton: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: 20,
    right: 20,
  },
}));

export default function InfoModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    ReactGA.modalview("/info");
    setIsOpen(!isOpen);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h1>About</h1>
      <h2>Who Made this Website?</h2>
      <ul>
        <li>
          This website is developed by{" "}
          <a href="https://zabibabar.github.io/">Zabeeh Ullah Babar</a>. I live
          in Florida, U.S. and I recently graduated from University of South
          Florida.
        </li>
        <li>
          You can find my LinkedIn{" "}
          <a href="https://www.linkedin.com/in/zabibabar/">here.</a>
        </li>
      </ul>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Sources:</h2>
        <p style={{ marginLeft: "8px" }}>
          <a href="https://github.com/CSSEGISandData/COVID-19">
            COVID-19 Data Repository by the Center for Systems Science and
            Engineering (CSSE) at Johns Hopkins University
          </a>
        </p>
      </div>
      <IconButton className={classes.closeButton} onClick={handleToggle}>
        <CloseIcon />
      </IconButton>
    </div>
  );

  return (
    <Box position="absolute" className={classes.root}>
      <IconButton
        className={classes.button}
        aria-label="info"
        onClick={handleToggle}
      >
        <InfoIcon />
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleToggle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>{body}</Fade>
      </Modal>
    </Box>
  );
}
