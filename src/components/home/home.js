import React from "react";
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

  const BestPlayerIcon = "/images/primary.png";
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
        <Grid2 container item xs={6} justifyContent="center">
          <Ranking
            customIcon = "/icons/Placements.png"
            title="Most Kills"
            one="Agura"
            two="Jayoma"
            three="ERIK"
            four="ABEAS"
            five="MasterMi"
          />
        </Grid2>
        <Grid2 container item xs={6} justifyContent="center">
          <Ranking
            customIcon = "/icons/Deaths.png"

            title="Most Deaths"
            one="Agura"
            two="Jayoma"
            three="ERIK"
            four="ABEAS"
            five="MasterMi"
          />
        </Grid2>
        </Grid2>
        <Grid2
        container
        spacing={3}
        xs={12}
        direction="row"
        justifyContent="center"
      >
        <Grid2 container item xs={6} justifyContent="center">
          <Ranking
            customIcon = "/icons/Gold.png"
            title="Most Gold Earned"
            one="Agura"
            two="Jayoma"
            three="ERIK"
            four="ABEAS"
            five="MasterMi"
          />
        </Grid2>
        <Grid2 container item xs={6} justifyContent="center">
          <Ranking
            customIcon = "/icons/Assists.png"

            title="Most Assists"
            one="Agura"
            two="Jayoma"
            three="ERIK"
            four="ABEAS"
            five="MasterMi"
          />
        </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
