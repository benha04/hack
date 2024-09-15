import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "../../App.css";
import "./home.css";

// Replace with your own component for rendering each player ranking
import Ranking from "./Ranking.js";

const Home = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [players, setPlayers] = useState([]);
  const API_URL = "http://localhost:3001/";

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

  // Render player stats for each ranking category (e.g., kills for "Most Kills")
  const renderRankingWithStats = (category, playerStat) => {
    const relevantPlayers = leaderBoard.find((entry) => entry.category === category);
    if (!relevantPlayers) return null;

    return (
      <Grid item xs={12} md={6}>
        <Ranking
          title={category}
          one={{ name: relevantPlayers.one, stat: findPlayerStats(relevantPlayers.one)[playerStat] }}
          two={{ name: relevantPlayers.two, stat: findPlayerStats(relevantPlayers.two)[playerStat] }}
          three={{ name: relevantPlayers.three, stat: findPlayerStats(relevantPlayers.three)[playerStat] }}
          four={{ name: relevantPlayers.four, stat: findPlayerStats(relevantPlayers.four)[playerStat] }}
          five={{ name: relevantPlayers.five, stat: findPlayerStats(relevantPlayers.five)[playerStat] }}
          six={{ name: relevantPlayers.six, stat: findPlayerStats(relevantPlayers.six)[playerStat] }}
        />
      </Grid>
    );
  };

  return (
    <>
      {/* Highest KDA Player Card */}
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#3A2B32",
          color: "#fff",
          borderRadius: "40px",
          padding: "20px",
          margin: "20px auto",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h1">Highest KDA Player</Typography>
          <Typography variant="h6">Player: Jayoma</Typography>
        </CardContent>
      </Card>

      {/* Rankings for Kills, Deaths, Assists, etc. */}
      <Grid container spacing={4} sx={{ padding: "20px" }}>
        {/* Most Kills */}
        {renderRankingWithStats("mostKills", "kills")}
        {/* Most Deaths */}
        {renderRankingWithStats("mostDeaths", "deaths")}
        {/* Most Assists */}
        {renderRankingWithStats("mostAssists", "assists")}
        {/* Most Gold Earned */}
        {renderRankingWithStats("mostGold", "gold_earned")}
      </Grid>
    </>
  );
};

export default Home;
