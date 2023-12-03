import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  typography: {
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#164863",
      light: "#427D9D",
    },
    secondary: {
      main: "#427D9D",
      light: "#DDF2FD",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#fff",
    }
  },
});

theme.typography.h1 = {
  fontSize: "1.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: 12,
  color: "grey",
  fontWeight: "normal",
  "@media (min-width:600px)": {
    fontSize: 10,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
  },
};


export default theme;
