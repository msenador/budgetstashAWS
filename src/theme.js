import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#344966'
        }
      }
    }
  },
  palette: {
    primary: {
      light: '#84bc9c',
      main: '#344966',
      dark: '#84bc9c'
    },
    secondary: {
      light: '#344966',
      main: '#84bc9c',
      dark: '#344966'
    }
  }
});
