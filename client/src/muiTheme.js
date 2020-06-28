import deepPurple from "@material-ui/core/colors/deepPurple";

export default {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      `"Segoe UI"`,
      `"Segoe UI Web (West European)"`,
      `"Segoe UI"`,
      "-apple -system",
      "BlinkMacSystemFont",
      "Roboto",
      `"Helvetica Neue"`,
      "sans-serif",
    ].join(","),
    fontWeightMedium: 600,
  },
  palette: {
    primary: {
      main: deepPurple[500],
    },
    background: {
      default: "#F5F7Fb",
    },
  },
};
