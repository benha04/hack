import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import '../../App.css';
import './home.css';

const Home = () => {
  const [topKillers, setTopKillers] = useState([]);
  const [topDeaths, setTopDeaths] = useState([]);
  const [highestKDAPlayer, setHighestKDAPlayer] = useState(null);
  const API_URL = "http://localhost:3001/";

  // Fetching real data from API
  const fetchPlayerData = async () => {
    try {
      const response = await fetch(API_URL + "api/LeagueOfLegends/collections");
      const data = await response.json();

      // Filter or map the collections to focus on kills, deaths, and highestKDA
      const killsCategory = data.find(collection => collection.category === 'mostKills');
      const deathsCategory = data.find(collection => collection.category === 'mostDeaths');
      const kdaCategory = data.find(collection => collection.category === 'highestKDA');

      if (killsCategory) {
        setTopKillers([
          { name: killsCategory.one, rank: 1 },
          { name: killsCategory.two, rank: 2 },
          { name: killsCategory.three, rank: 3 },
          { name: killsCategory.four, rank: 4 },
          { name: killsCategory.five, rank: 5 },
          { name: killsCategory.six, rank: 6 },

        ]);
      }

      if (deathsCategory) {
        setTopDeaths([
          { name: deathsCategory.one, rank: 1 },
          { name: deathsCategory.two, rank: 2 },
          { name: deathsCategory.three, rank: 3 },
          { name: deathsCategory.four, rank: 4 },
          { name: deathsCategory.five, rank: 5 },
          { name: deathsCategory.six, rank: 6 },

        ]);
      }

      // Get the highest KDA player
      if (kdaCategory) {
        setHighestKDAPlayer({
          name: kdaCategory.one, // Assume 'one' represents the top KDA player
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  return (
    <div className="home-container">
      <h1 className="gobbler-heading">Gobbler Gauntlet</h1>

      {/* Highest KDA Player Section */}
      {highestKDAPlayer && (
        <Grid container justifyContent="center" alignItems="center" spacing={2} className="best-kda-section">
          <Grid item>
            <img src="/images/ashe-removebg-preview.png" alt="Ashe" className="champion-image" />
          </Grid>

          <Grid item>
            <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333', padding: 4 }}>
              <CardContent>
                <h5>Best KDA Player</h5>
                <h6>{highestKDAPlayer.name}</h6> {/* Displaying the highest KDA player's name */}
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <img src="/images/lucian-removebg-preview.png" alt="Lucian" className="champion-image" />
          </Grid>
        </Grid>
      )}

      {/* Kills on the Left and Deaths on the Right */}
      <Grid container spacing={4} className="kills-deaths-section">
        
        {/* Left Half: Top Players by Kills */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Kills</Typography>
          <Grid container spacing={2}>
            {topKillers.map((player, index) => (
              <Grid item xs={12} sm={6} lg={6} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/images/player.jpg" alt="Player Avatar" />
                    <div style={{ marginLeft: '16px' }}>
                      <Typography variant="h6" sx={{ color: '#fff' }}>{player.rank}st: {player.name}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Half: Top Players by Deaths */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Deaths</Typography>
          <Grid container spacing={2}>
            {topDeaths.map((player, index) => (
              <Grid item xs={12} sm={6} lg={6} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#333' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/images/player.jpg" alt="Player Avatar" />
                    <div style={{ marginLeft: '16px' }}>
                      <Typography variant="h6" sx={{ color: '#fff' }}>{player.rank}st: {player.name}</Typography>
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
