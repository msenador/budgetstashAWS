import { createTheme } from '@mui/material/styles';

export const MAIN_BLUE = '#344966';
export const MAIN_GREEN = '#84bc9c';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: MAIN_BLUE
        }
      }
    }
  },
  palette: {
    primary: {
      light: MAIN_GREEN,
      main: MAIN_BLUE,
      dark: MAIN_GREEN
    },
    secondary: {
      light: MAIN_BLUE,
      main: MAIN_GREEN,
      dark: MAIN_BLUE
    }
  }
});
