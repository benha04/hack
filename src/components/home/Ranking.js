// Ranking.js
import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
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
    <Grid item>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#3A2B32",
          color: "#333",
          borderRadius: "40px",
          marginTop: "40px",
          minWidth: "300px",
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <img
              src={props.customIcon}
              alt="Custom Icon"
              style={{ width: '32px', height: '32px', marginRight: '8px' }}
            />
            <Typography variant="h1" color="white" sx={{ marginBottom: "10px" }}>
              {formatTitle(title)}
            </Typography>
          </div>
          <Grid container spacing={2} xs={12} direction={"column"}>
            {players.map((player, index) => (
              <Grid item xs={12} key={index}>
                <Player name={player.name} stat={player.stat} pic_id={player.pic_id} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Ranking;
