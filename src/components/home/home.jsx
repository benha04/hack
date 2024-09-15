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

      {/* Kills and Deaths Side by Side */}
      <Grid container spacing={4} className="kills-deaths-section">
        
        {/* Left Half: Top Players by Kills */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Kills</Typography>
          <Grid container spacing={2}>
            {leaderBoard.length > 0 && leaderBoard.find(l => l.category === 'mostKills') &&
              [leaderBoard.find(l => l.category === 'mostKills').one,
              leaderBoard.find(l => l.category === 'mostKills').two,
              leaderBoard.find(l => l.category === 'mostKills').three,
              leaderBoard.find(l => l.category === 'mostKills').four,
              leaderBoard.find(l => l.category === 'mostKills').five,
              leaderBoard.find(l => l.category === 'mostKills').six].map((playerID, rankIndex) => 
                renderPlayerCard(playerID, rankIndex)
              )
            }
          </Grid>
        </Grid>

        {/* Right Half: Top Players by Deaths */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Deaths</Typography>
          <Grid container spacing={2}>
            {leaderBoard.length > 0 && leaderBoard.find(l => l.category === 'mostDeaths') &&
              [leaderBoard.find(l => l.category === 'mostDeaths').one,
              leaderBoard.find(l => l.category === 'mostDeaths').two,
              leaderBoard.find(l => l.category === 'mostDeaths').three,
              leaderBoard.find(l => l.category === 'mostDeaths').four,
              leaderBoard.find(l => l.category === 'mostDeaths').five,
              leaderBoard.find(l => l.category === 'mostDeaths').six].map((playerID, rankIndex) => 
                renderPlayerCard(playerID, rankIndex)
              )
            }
          </Grid>
        </Grid>
      </Grid>

      {/* Gold Earned and Assists Side by Side */}
      <Grid container spacing={4} className="gold-assists-section">
        
        {/* Left Half: Top Players by Gold Earned */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Gold Earned</Typography>
          <Grid container spacing={2}>
            {leaderBoard.length > 0 && leaderBoard.find(l => l.category === 'mostGold') &&
              [leaderBoard.find(l => l.category === 'mostGold').one,
              leaderBoard.find(l => l.category === 'mostGold').two,
              leaderBoard.find(l => l.category === 'mostGold').three,
              leaderBoard.find(l => l.category === 'mostGold').four,
              leaderBoard.find(l => l.category === 'mostGold').five,
              leaderBoard.find(l => l.category === 'mostGold').six].map((playerID, rankIndex) => 
                renderPlayerCard(playerID, rankIndex)
              )
            }
          </Grid>
        </Grid>

        {/* Right Half: Top Players by Assists */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className="section-title">Top Players by Assists</Typography>
          <Grid container spacing={2}>
            {leaderBoard.length > 0 && leaderBoard.find(l => l.category === 'mostAssists') &&
              [leaderBoard.find(l => l.category === 'mostAssists').one,
              leaderBoard.find(l => l.category === 'mostAssists').two,
              leaderBoard.find(l => l.category === 'mostAssists').three,
              leaderBoard.find(l => l.category === 'mostAssists').four,
              leaderBoard.find(l => l.category === 'mostAssists').five,
              leaderBoard.find(l => l.category === 'mostAssists').six].map((playerID, rankIndex) => 
                renderPlayerCard(playerID, rankIndex)
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
