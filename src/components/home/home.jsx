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

      <h5>Best KDA Player</h5>
      <h6>Player name </h6>

    </CardContent>

  </React.Fragment>
);

const Home = () => {
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Import the module dynamically
        const module = await import('../../server/connect.cjs');
        console.log('Module:', module); // Debugging statement
        
        // Access the named export from the default property
        const getCollections = module.default ? module.default.getCollections : module.getCollections;
        console.log('getCollections:', getCollections); // Debugging statement

        // Ensure getCollections is a function
        if (typeof getCollections !== 'function') {
          throw new Error('getCollections is not a function, type: ' + typeof getCollections);
        }

        const collections = await getCollections();
        console.log('Fetched collections:', collections); // Debugging statement

        setCollectionNames(collections.map(collection => collection.s.namespace.collection));
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    fetchData();
  }, []);

  console.log('Rendering collection names:', collectionNames); // Debugging statement

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