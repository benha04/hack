import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import "./home.css";
import Player from "./Player.js";
import Ranking from "./Ranking.js";

// Importing custom icons
import Death from "../../icons/Deaths.png";
import Gold from "../../icons/Gold.png";
import Placements from "../../icons/Placements.png";
import Assists from "../../icons/Assists.png";

const Home = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [bestPlayerStats, setBestPlayerStats] = useState(null); // State for best player stats
  const API_URL = "http://localhost:3001/";

  // Custom icons
  const customDeaths = Death;
  const customGold = Gold;
  const customAssists = Assists;
  const customPlacements = Placements;

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const getCardWidth = () => {
    if (isSmallScreen) return '90%';
    if (isMediumScreen) return '70%';
    if (isLargeScreen) return '50%';
    return '90%';
  };

  // Fetch leaderboard and player data from the backend
  const fetchPlayerData = async () => {
    try {
      const leaderboardResponse = await fetch(API_URL + "api/LeagueOfLegends/leaderboard");
      const playersResponse = await fetch(API_URL + "api/LeagueOfLegends/players");

      if (!leaderboardResponse.ok || !playersResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const leaderboardData = await leaderboardResponse.json();
      const playersData = await playersResponse.json();

      setLeaderBoard(leaderboardData);
      setPlayers(playersData);

      // Compute the best player based on highest KDA
      let bestPlayer = null;
      let highestKDA = -1;

      playersData.forEach(player => {
        const kills = player.kills || 0;
        const deaths = player.deaths || 0;
        const assists = player.assists || 0;
        const kda = ((kills + assists) / Math.max(1, deaths));

        if (kda > highestKDA) {
          highestKDA = kda;
          bestPlayer = {
            name: player.summoner_name,
            kills: kills,
            deaths: deaths,
            assists: assists,
            kda: kda.toFixed(2),
            profileId: player.summoner_profile_id,
          };
        }
      });

      // Set best player's stats if found
      if (bestPlayer) {
        setBestPlayerStats(bestPlayer);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  // Find player stats by summoner_name
  const findPlayerStats = (summoner_name) => {
    const player = players.find((p) => p.summoner_name === summoner_name);
    return player ? player : {};
  };

  // Render player stats for each ranking category
  const renderRankingWithStats = (category, playerStat, icon) => {
    const relevantPlayers = leaderBoard.find((entry) => entry.category === category);
    if (!relevantPlayers) return null;

    return (
      <Grid item xs={12} md={6} justifyContent="center">
        <Ranking
          customIcon={icon}
          title={category}
          one={{
            name: relevantPlayers.one,
            stat: findPlayerStats(relevantPlayers.one)[playerStat],
            pic_id: findPlayerStats(relevantPlayers.one).summoner_profile_id,
          }}
          two={{
            name: relevantPlayers.two,
            stat: findPlayerStats(relevantPlayers.two)[playerStat],
            pic_id: findPlayerStats(relevantPlayers.two).summoner_profile_id,
          }}
          three={{
            name: relevantPlayers.three,
            stat: findPlayerStats(relevantPlayers.three)[playerStat],
            pic_id: findPlayerStats(relevantPlayers.three).summoner_profile_id,
          }}
          four={{
            name: relevantPlayers.four,
            stat: findPlayerStats(relevantPlayers.four)[playerStat],
            pic_id: findPlayerStats(relevantPlayers.four).summoner_profile_id,
          }}
          five={{
            name: relevantPlayers.five,
            stat: findPlayerStats(relevantPlayers.five)[playerStat],
            pic_id: findPlayerStats(relevantPlayers.five).summoner_profile_id,
          }}
        />
      </Grid>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "90vh",
          marginTop: "40px",
          background: "linear-gradient(to right, #5D31EC, #861C54)",
          overflow: 'hidden',
        }}
      >
        <img
          src="images/ashe-removebg-preview.png"
          alt="Ashe"
          className="champion-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "438px",
            height: "412px",
          }}
        />
        <img
          src="/images/lucian-removebg-preview.png"
          alt="Lucian"
          className="champion-image"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "767px",
            height: "427px",
          }}
        />

        {/* Best Player Card with Stats */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="100vh" // Ensures it fills the entire height of the viewport
        >
          <Card
            variant="outlined"
            className="best-player-card" // Add class for styling
            sx={{
              backgroundColor: "#2A2126",
              color: "#FDF2E7",
              borderRadius: "20px",
              padding: "20px",
              width: getCardWidth(), // Use dynamic width
              boxShadow: "0 15px 30px rgba(0,0,0,0.5)",
            }}
          >
            <CardContent>
              <Typography variant="h1" align="center">
                Best Player
              </Typography>

              {bestPlayerStats ? (
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Avatar
                    alt={bestPlayerStats.name}
                    src={`https://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/${bestPlayerStats.profileId}.png`}
                    sx={{
                      width: 128,
                      height: 128,
                      marginTop: "20px",
                    }}
                    className="player-avatar"
                  />
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant="h3">Player: {bestPlayerStats.name}</Typography>
                    <Typography variant="h5">Kills: {bestPlayerStats.kills}</Typography>
                    <Typography variant="h5">Deaths: {bestPlayerStats.deaths}</Typography>
                    <Typography variant="h5">Assists: {bestPlayerStats.assists}</Typography>
                    <Typography variant="h5">KDA: {bestPlayerStats.kda}</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body1">Loading player stats...</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Rankings Section */}
      <div className="home-container">
        <Typography variant="h1" className="section-title">
          Player Rankings
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {renderRankingWithStats("mostKills", "kills", customPlacements)}
          {renderRankingWithStats("mostDeaths", "deaths", customDeaths)}
          {renderRankingWithStats("mostAssists", "assists", customAssists)}
          {renderRankingWithStats("mostGold", "gold_earned", customGold)}
        </Grid>
      </div>
    </>
  );
};

export default Home;
