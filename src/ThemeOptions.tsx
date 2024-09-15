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
        fontSize: '3.5rem',
      },
  },
  
};