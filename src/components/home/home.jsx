import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../App.css';
import './home.css';

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
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { default: getCollections } = await import('../../server/connect.cjs');
        const collections = await getCollections();
        setCollectionNames(collections.map(collection => collection.s.namespace.collection));
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    fetchData();
  }, []);

  
  return (
    <div>
      <h1>Gobbler Gauntlet</h1>
      <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
        {card}
      </Card>

      <h1>Collection Names</h1>
      <ul>
        {collectionNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;