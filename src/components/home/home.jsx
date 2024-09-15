import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import '../../App.css';
import './home.css';

const Home = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [players, setPlayers] = useState([]);
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
      <Grid item xs={12} sm={6} lg={6} key={rankIndex}>
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

      {/* Iterate through leaderboard categories */}
      {leaderBoard.map((category, index) => (
        <Grid container spacing={4} key={index} className="leaderboard-section">
          <Grid item xs={12}>
            <Typography variant="h5" className="section-title">Category: {category.category}</Typography>
          </Grid>

          {/* Render each rank for the category */}
          {[category.one, category.two, category.three, category.four, category.five, category.six].map((playerID, rankIndex) => 
            renderPlayerCard(playerID, rankIndex)
          )}
        </Grid>
      ))}
    </div>
  );
};

export default Home;
