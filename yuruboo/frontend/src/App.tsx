import { Googlemap } from './Googlemap';
import { ActionButton } from './ActionButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

/*
共通テーマ
*/
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {
  return(
    <ThemeProvider theme={theme}>
      <Googlemap />
      <ActionButton />
    </ThemeProvider>
  );
};
