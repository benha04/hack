import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import '../../App.css';
import './home.css';

const Home = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [highestKDAPlayer, setHighestKDAPlayer] = useState(null);
  const API_URL = "http://localhost:3001/";

  // Fetch leaderboard and player data
  const fetchPlayerData = async () => {
    try {
      const leaderboardResponse = await fetch(API_URL + "api/LeagueOfLegends/leaderboard");
      const playersResponse = await fetch(API_URL + "api/LeagueOfLegends/players");

      if (!leaderboardResponse.ok || !playersResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const leaderboardData = await leaderboardResponse.json();
      const playersData = await playersResponse.json();

      setLeaderBoard(leaderboardData);
      setPlayers(playersData);

      // Set the highest KDA player (assuming 'highestKDA' category exists)
      const kdaCategory = leaderboardData.find(category => category.category === 'highestKDA');
      if (kdaCategory) {
        setHighestKDAPlayer({
          name: kdaCategory.one, // Top KDA Player is in the 'one' field
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  // Find player stats by PlayerID
  const findPlayerStats = (playerID) => {
    const player = players.find(p => p.PlayerID === playerID);
    return player ? player : {};
  };

  // Render the player card
  const renderPlayerCard = (playerID, rankIndex) => {
    const playerStats = findPlayerStats(playerID);  // Find corresponding player stats
    return (
      <Grid item xs={12} sm={6} key={rankIndex}>
        <Card variant="outlined" sx={{ backgroundColor: '#3A2B32', color: '#fff' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src="/images/player.jpg" alt="Player Avatar" />
            <div style={{ marginLeft: '16px' }}>
              <Typography variant="h6">Rank {rankIndex + 1}: {playerID}</Typography>
              <Typography variant="body1">Kills: {playerStats.kills || 'N/A'}</Typography>
              <Typography variant="body1">Deaths: {playerStats.deaths || 'N/A'}</Typography>
              <Typography variant="body1">Assists: {playerStats.assists || 'N/A'}</Typography>
              <Typography variant="body1">Gold Earned: {playerStats.gold_earned || 'N/A'}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

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

      
    </div>
  );
};

export default Home;
