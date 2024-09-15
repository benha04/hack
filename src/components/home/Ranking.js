import React from "react";
import { Card, CardContent, Typography, Grid2 } from "@mui/material";

import "../../App.css";
import "./home.css";

import DatabaseComponent from "./databaseComponent.js";

import CustomI from "@mui/icons-material/AccessibleForward";
import DraftsIcon from "@mui/icons-material/MilitaryTech";
import Player from "./Player.js";

const Ranking = (props) => {

    const players = [props.one, props.two, props.three, props.four, props.five]; 

    const title = props.title;
  const formatTitle = (title) => {
    switch (title) {
      case "mostKills":
        return "Most Kills";
      case "mostDeaths":
        return "Most Deaths";
      case "mostAssists":
        return "Most Assists";
      case "mostGold":
        return "Most Gold Earned";
      default:
        return title;
    }
  };

  return (
    <Grid2 item>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#3A2B32",
          color: "#333",
          borderRadius: "40px",
          marginTop: "40px",
          minWidth: "500px",
        }}
      >
        <CardContent>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <img
        src={props.customIcon}
        alt="Custom Icon"
        style={{ width: '32px', height: '32px', marginRight: '8px' }}
      />
      <Typography variant="h1" color="white" sx = {{marginBottom: "10px"}}>
      {formatTitle(title)}
      </Typography>
    </div>
          <Grid2 container spacing={2} xs={12} direction={"column"}>
            {players.map((player, index) => (
            <Grid2 item xs={12}>
            <Player name={player.name} stat = {player.stat} />
          </Grid2>
          ))}
            
          
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default Ranking;
