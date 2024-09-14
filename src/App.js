import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx'; // Import the Navbar component
import Home from './components/home/home.jsx'; // Existing Home component

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Navbar appears at the top */}
      <header className="App-header">
        <Home /> {/* Main content */}
      </header>
    </div>
  );
}

export default App;
