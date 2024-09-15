import React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";

import '../../App.css';
import './home.css';

import DatabaseComponent from './databaseComponent.js';

const card = (
  <React.Fragment>
    <CardContent>

      <Typography variant="h5" component="div">
        Best KDA Player
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Player Name</Typography>

    </CardContent>

  </React.Fragment>
);

const Home = () => {
  


  return (
    <div>
      <h1>Gobbler Gauntlet</h1>
      <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
        {card}
      </Card>

      <h1>Collection Names</h1>
      <DatabaseComponent/>
      {/* <ul>
        {collectionNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Home;