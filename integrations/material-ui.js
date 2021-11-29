import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export { makeStyles } from "@material-ui/core/styles";

const MuiTheme = createTheme({
  props: {
    MuiTextField: {
      margin: 'normal',
    },
    MuiFormControl: {
      margin: 'normal',
    },
  },
  palette: {
    primary: {
      main: "#1652f0",
    },
    secondary: {
      main: "#14A3A5",
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "50px",
      fontWeight: 500,
    },
    h2: {
      fontSize: "40px",
      fontWeight: 500,
    },
  },
});
export const theme = responsiveFontSizes(MuiTheme);
