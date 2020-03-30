import {createMuiTheme} from '@material-ui/core/styles';
import ColorPalette from '../../styling/ColorPalette';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      light: ColorPalette.primaryLight,
      main: ColorPalette.primary,
      dark: ColorPalette.primaryDark,
      contrastText: '#fff'
    },
    secondary: {
      light: ColorPalette.secondaryLight,
      main: ColorPalette.secondary,
      dark: ColorPalette.secondaryDark,
      contrastText: '#fff'
    },
    error: {main: ColorPalette.error},
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export default AppTheme;
