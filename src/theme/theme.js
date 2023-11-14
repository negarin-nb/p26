import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000FF",
    },
    secondary: {
      main: "#FF4D00",
    },
    text: {
      light: "#EDEDED",
      main: "#808080",
    },
    custom: {
      main: "#E6E6E6",
      dark: "#D9D9D9",
    },
    myWhite: {
      main: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Peyda",
    body1: {
      fontWeight: 400,
      fontSize: "13px",
      color: "#808080",
    },
    body2: {
      fontWeight: 400,
      fontSize: "13px",
      color: "#0000FF",
    },
    h1: {
      fontWeight: 700,
      fontSize: "15px",
      color: "#808080",
    },
    h2: {
      fontWeight: 900,
      fontSize: "15px",
      color: "#0000FF",
    },
    h3: {
      fontWeight: 900,
      fontSize: "14px",
      color: "#0000FF",
    },
    h4: {
      fontWeight: 700,
      fontSize: "14px",
      color: "#808080",
    },
    h5: {
      fontWeight: 700,
      fontSize: "12px",
      color: "#0000FF",
    },
    h6: {
      fontWeight: 700,
      fontSize: "12px",
      color: "#808080",
    },
    caption: {
      fontWeight: 400,
      fontSize: "10px",
      color: "#808080",
    },
    button: {
      fontWeight: 700,
      fontSize: "14px",
    },
  },
});

export default theme;
