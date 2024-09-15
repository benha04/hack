import React from 'react';
import { themeOptions } from "./ThemeOptions.tsx";
import { ThemeProvider } from "@emotion/react";

import './App.css';
import Navbar from './components/navbar/navbar.jsx'; // Import the Navbar component
import Home from './components/home/home.js'; // Existing Home component
import { CssBaseline, createTheme } from "@mui/material";


function App() {

  const theme = createTheme(themeOptions);

  
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
    <CssBaseline />

      <Navbar /> {/* Navbar appears at the top */}
      <header className="App-header">
        <Home /> {/* Main content */}
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
