import React from "react";
import { Card, CardContent, Typography, Grid2 } from "@mui/material";

import "../../App.css";
import "./home.css";

import DatabaseComponent from "./databaseComponent.js";

import CustomI from "@mui/icons-material/AccessibleForward";
import DraftsIcon from "@mui/icons-material/MilitaryTech";
import Player from "./Player.js";

const Ranking = (props) => {
  return (
    <Grid2 item>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#3A2B32",
          color: "#333",
          borderRadius: "40px",
          marginTop: "40px",
          width: "700px",
        }}
      >
        <CardContent>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <img
        src={props.customIcon}
        alt="Custom Icon"
        style={{ width: '64px', height: '64px', marginRight: '8px' }}
      />
      <Typography variant="h1" color="white">
        {props.title}
      </Typography>
    </div>
          <Grid2 container spacing={2} xs={12} direction={"column"}>
            <Grid2 item xs={12}>
              <Player name={props.one} />
            </Grid2>
            <Grid2 item xs={12}>
              <Player name={props.two} />
            </Grid2>
            <Grid2 item xs={12}>
              <Player name={props.three} />
            </Grid2>
            <Grid2 item xs={12}>
              <Player name={props.four} />
            </Grid2>
            <Grid2 item xs={12}>
              <Player name={props.five} />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default Ranking;
