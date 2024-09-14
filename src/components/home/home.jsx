import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import '../../App.css';
import './home.css';

// Card content for Best KDA Player
const card = (
  <React.Fragment>
    <CardContent>
      <h5>Best KDA Player</h5>
      <h6>Player name </h6>
    </CardContent>
  </React.Fragment>
);

const Home = () => {
  const [topKillers, setTopKillers] = useState([]);
  const [topDeaths, setTopDeaths] = useState([]);

  // Simulating async data fetching
  const fetchPlayerData = async () => {
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

    setTopKillers(fetchedKillers);
    setTopDeaths(fetchedDeaths);
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  return (
    <div className="home-container">
      <h1 className="gobbler-heading">Gobbler Gauntlet</h1>

      {/* Best KDA Player Card */}
      <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333', marginBottom: 4 }}>
        {card}
      </Card>

      {/* Top Killers and Deaths Grid */}
      <Grid container spacing={4}>
        
        {/* Top 5 Players - Kills Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top 5 Players - Kills</Typography>
          <Grid container spacing={2}>
            {topKillers.map((player, index) => (
              <Grid item xs={12} sm={6} lg={5} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={player.img} alt={`${player.name} Image`} />
                    <div style={{ marginLeft: '16px' }}>
                      <Typography variant="h6" sx={{ color: '#fff' }}>{player.name}</Typography>
                      <Typography variant="body1" sx={{ color: '#fff' }}>Kills: {player.kills}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Top 5 Players - Deaths Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top 5 Players - Deaths</Typography>
          <Grid container spacing={2}>
            {topDeaths.map((player, index) => (
              <Grid item xs={12} sm={6} lg={5} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={player.img} alt={`${player.name} Image`} />
                    <div style={{ marginLeft: '16px' }}>
                      <Typography variant="h6" sx={{ color: '#fff' }}>{player.name}</Typography>
                      <Typography variant="body1" sx={{ color: '#fff' }}>Deaths: {player.deaths}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
