import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

class DatabaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        leaderBoard: [],
        players: [],
    };
  }

  API_URL = "http://localhost:3001/";

  async componentDidMount() {
    this.refreshCollections();
  }

  async refreshCollections() {
    try {
        const leaderboard = await fetch(this.API_URL + "api/LeagueOfLegends/leaderboard");
        const players = await fetch(this.API_URL + "api/LeagueOfLegends/players");
        if (!leaderboard.ok || !players.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await leaderboard.json();
        const data2 = await players.json();
        console.log('Fetched data:', data); // Log the fetched data to the console
        this.setState({ leaderBoard: data, players: data2 });
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
  }

  render() {
    const {leaderBoard} = this.state;
    const {players} = this.state;
    return (

      <div>
        {leaderBoard.map( (leaderBoard) =>
            <div key={leaderBoard._id}>
            <Typography>Category: {leaderBoard.category}</Typography>
            <Typography>One: {leaderBoard.one}</Typography>
            <Typography>Two: {leaderBoard.two}</Typography>
            <Typography>Three: {leaderBoard.three}</Typography>
            <Typography>Four: {leaderBoard.four}</Typography>
            <Typography>Five: {leaderBoard.five}</Typography>
            <Typography>Six: {leaderBoard.six}</Typography>
          </div>
        )}

        <Typography>-------Players-------</Typography>
        {players.map( (collection) =>
            <div key={collection._id}>
            <Typography>PlayerID: {collection.PlayerID}</Typography>
            <Typography>Assists: {collection.assists}</Typography>
            <Typography>Deaths: {collection.deaths}</Typography>
            <Typography>Gold Earned: {collection.gold_earned}</Typography>
            <Typography>Kills: {collection.kills}</Typography>
            <Typography>Vision Score: {collection.vision_score}</Typography>
            <Typography>Summoner Name: {collection.summoner_name}</Typography
          </div>
        )}
      </div>
    );
  }
}

export default DatabaseComponent;