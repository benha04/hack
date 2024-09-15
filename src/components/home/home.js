import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  Box,
  Avatar,
} from "@mui/material";

import "../../App.css";
import "./home.css";

import Player from "./Player.js";
import Ranking from "./Ranking.js";

// import BestPlayerIcon from "icons/primary.png";

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
      <Grid2 container item xs={6} justifyContent="center">
       <Ranking
         customIcon = "/icons/Deaths.png"

         title={category}
         one={{ name: relevantPlayers.one, stat: findPlayerStats(relevantPlayers.one)[playerStat] }}
         two={{ name: relevantPlayers.two, stat: findPlayerStats(relevantPlayers.two)[playerStat] }}
         three={{ name: relevantPlayers.three, stat: findPlayerStats(relevantPlayers.three)[playerStat] }}
           four={{ name: relevantPlayers.four, stat: findPlayerStats(relevantPlayers.four)[playerStat] }}
           five={{ name: relevantPlayers.five, stat: findPlayerStats(relevantPlayers.five)[playerStat] }}
          six={{ name: relevantPlayers.six, stat: findPlayerStats(relevantPlayers.six)[playerStat] }}
      />
    </Grid2>

      
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
        }}
      >
        <img
          src="images/ashe-removebg-preview.png"
          alt="Landing Page"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "438px",
            height: "412px",
          }}
        />
        <img
          src="/images/lucian-removebg-preview.png" // Replace with the actual path to your image
          alt="Another Image"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "767px",
            height: "427px",
          }}
        />
        <Card
          variant="outlined"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -80%)",
            backgroundColor: "#3A2B32",
            color: "#333",
            borderRadius: "40px",
            marginTop: "0px",
            minWidth: "749px", // Set minimum width
          }}
        >
          <CardContent>
            <Typography variant="h1" color="white">
              Best Player
            </Typography>

            <Grid2 container spacing={2} xs={12} direction={"row"}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 128,
                  height: 128,
                  marginLeft: "16px",
                  marginRight: "16px",
                }}
              />
              <Typography variant="h6">Player: Jayoma</Typography>
            </Grid2>
          </CardContent>
        </Card>
      </Box>

      {/* Render  a card with leading icon and title "Most Kills" with  6  card  elements  after it that have player name, kills, deaths, assists, and gold earned */}
      <Grid2
        container
        spacing={2}
        xs={12}
        direction="column"
        justifyContent="center"
      >
        
        <Grid2
        container
        spacing={3}
        xs={12}
        direction="row"
        justifyContent="center"
      >
        {renderRankingWithStats("mostKills", "kills")}

        {renderRankingWithStats("mostDeaths", "deaths")}
        </Grid2>
        <Grid2
        container
        spacing={3}
        xs={12}
        direction="row"
        justifyContent="center"
      >
        {renderRankingWithStats("mostAssists", "assists")}

        {renderRankingWithStats("mostGold", "gold_earned")}

        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
