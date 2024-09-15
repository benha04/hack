import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(197,197,197,0.6)',
      disabled: 'rgba(236,209,209,0.38)',
    },
    background: {
      default: '#DACDBC',
      paper: '#3A2B32',
    },
  },
  typography: {
    fontFamily: 'Aoboshi One',
    h1: {
      fontFamily: 'Jura',
      fontWeight: 400,
      fontSize: '1rem', // Default for extra-small devices (phones)
      '@media (min-width:600px)': {
        fontSize: '1.5rem', // Small devices (tablets)
      },
      '@media (min-width:960px)': {
        fontSize: '2rem', // Medium devices (desktops)
      },
    },
    h2: {
      fontFamily: 'Jura',
      fontWeight: 400,
      fontSize: '0.8rem', // Default for extra-small devices (phones)
      '@media (min-width:600px)': {
        fontSize: '1.0rem', // Small devices (tablets)
      },
      '@media (min-width:960px)': {
        fontSize: '1rem', // Medium devices (desktops)
      },
      '@media (min-width:1280px)' : {
        fontSize: '2.5rem', // Large devices (desktops)
      },
    },
  },
  
};