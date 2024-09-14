import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../../App.css';
import './home.css';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

const card = (
  <React.Fragment>
    <CardContent>

      <h5>Best KDA Player</h5>
      <h6>Player name </h6>

    </CardContent>

  </React.Fragment>
);


const Home = () => {
    // State for top killers and top deaths
  const [topKillers, setTopKillers] = useState([]);
  const [topDeaths, setTopDeaths] = useState([]);

  // Simulating async data fetching
  const fetchPlayerData = async () => {
    // Assume these are fetched from Firestore or another API/database
    const fetchedKillers = [
      { name: 'John Doe', kills: 15, img: '/images/player.jpg' },
      { name: 'Jane Smith', kills: 12, img: '/images/player.jpg' },
      { name: 'Mike Johnson', kills: 10, img: '/images/player.jpg' },
      { name: 'Sarah Brown', kills: 9, img: '/images/player.jpg' },
      { name: 'Alex King', kills: 8, img: '/images/player.jpg' },
    ];

    const fetchedDeaths = [
      { name: 'John Doe', deaths: 10, img: '/images/player.jpg' },
      { name: 'Jane Smith', deaths: 9, img: '/images/player.jpg' },
      { name: 'Mike Johnson', deaths: 8, img: '/images/player.jpg' },
      { name: 'Sarah Brown', deaths: 7, img: '/images/player.jpg' },
      { name: 'Alex King', deaths: 6, img: '/images/player.jpg' },
    ];

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set the fetched data to state
    setTopKillers(fetchedKillers);
    setTopDeaths(fetchedDeaths);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPlayerData();
  }, []);
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
    <div className="home-container">
      <h1 className="gobbler-heading">Gobbler Gauntlet</h1>
      <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
        {card}
      </Card>
      <Grid container spacing={2} className="main-grid">
        {/* Full-width cards */}
        <Grid item xs={12}>
          <Typography variant="h5" className="section-title">Top 5 Players - Kills</Typography>
          {topKillers.map((player, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ backgroundColor: '#3A2B32', color: '#333', marginBottom: 2, width: '100%' }} // Full width of the grid
            >
              <CardContent className="player-card-content" sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar className="player-avatar" src={player.img} alt={`${player.name} Image`} />
                <div className="player-info" style={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>{player.name}</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>Kills: {player.kills}</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>Matches Played: {player.matchesPlayed}</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>Main Character: {player.character}</Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" className="section-title">Top 5 Players - Deaths</Typography>
          {topDeaths.map((player, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ backgroundColor: '#3A2B32', color: '#333', marginBottom: 2, width: '100%' }} // Full width of the grid
            >
              <CardContent className="player-card-content" sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar className="player-avatar" src={player.img} alt={`${player.name} Image`} />
                <div className="player-info" style={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>{player.name}</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>Deaths: {player.deaths}</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>Matches Played: {player.matchesPlayed}</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>Main Character: {player.character}</Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;