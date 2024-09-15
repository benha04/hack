import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "../../App.css";
import "./home.css";

const Ranking = ({ title, one, two, three, four, five }) => {
  const players = [one, two, three, four, five]; 

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
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "#3A2B32",
        color: "#fff",
        borderRadius: "40px",
        marginBottom: "20px",
        width: "700px",
      }}
    >
      <CardContent>
        <Typography variant="h5" color="white" gutterBottom>
          {formatTitle(title)}
        </Typography>
        <Grid container spacing={2} direction={"column"}>
          {players.map((player, index) => (
            <Typography key={index} variant="body1">
              {player.name} - {player.stat || "N/A"}
            </Typography>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Ranking;
