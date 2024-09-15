import React from 'react';
import './navbar.css'; // Importing the CSS for the navbar
import { Avatar, Box, Typography } from '@mui/material';

// import Logo from '../../icons/Logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar alt="Remy Sharp" src="images/logo.png" sx={{ width: 128, height: 128 }} />
      <Typography variant= "h1" style={{ marginLeft: '16px' }} color="white">Gobbler Gauntlet</Typography> {/* You can customize the logo or title here */}
    </Box>
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
