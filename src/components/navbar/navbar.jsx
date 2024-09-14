import React from 'react';
import './navbar.css'; // Importing the CSS for the navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Gobbler Gauntlet</h1> {/* You can customize the logo or title here */}
      </div>
      <div className="navbar-right">
        <ul>
          <li><a href="#players">Players</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#match-history">Match History</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
