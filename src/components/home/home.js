import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid2,

} from "@mui/material";

import "../../App.css";
import "./home.css";


import Player from "./Player.js";
import Ranking from "./Ranking.js";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Best KDA Player
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        Player Name
      </Typography>
    </CardContent>
  </React.Fragment>
);

const Home = () => {
  return (
    <>
      {/* Render a card that has Card component with  title "Highest KDA Player" and subtitles kills, deaths, assists, and KDA 
      That is centered in horizontal viewport*/}
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#3A2B32",
          color: "#333",
          borderRadius: "40px",
          marginTop: "0px",
        }}
      >
        <CardContent>
          <Typography variant="h1">Highest KDA Player</Typography>
          <Typography variant="h6">Player: Jayoma</Typography>
        </CardContent>
      </Card>

      {/* Render  a card with leading icon and title "Most Kills" with  6  card  elements  after it that have player name, kills, deaths, assists, and gold earned */}
      <Grid2 container spacing={40} xs={12} direction = {'row'}>
        <Grid2 item xs={12}>
        <Ranking title="Most Kills" one="Agura" two="Jayoma" three="ERIK" four="ABEAS" five="MasterMi" />
        <Ranking title="Most Deaths" one="Agura" two="Jayoma" three="ERIK" four="ABEAS" five="MasterMi" />
        </Grid2>
        <Grid2 item xs={12}>
        <Ranking title="Most Assists" one="Agura" two="Jayoma" three="ERIK" four="ABEAS" five="MasterMi" />
        <Ranking title="Most Assists" one="Agura" two="Jayoma" three="ERIK" four="ABEAS" five="MasterMi" />
        </Grid2>
        
      </Grid2>
    </>
  );
};

export default Home;
