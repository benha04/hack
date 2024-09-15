import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

class DatabaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
    };
  }

  API_URL = "http://localhost:3001/";

  async componentDidMount() {
    this.refreshCollections();
  }

  async refreshCollections() {
    try {
        const response = await fetch(this.API_URL + "api/LeagueOfLegends/collections");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to the console
        this.setState({ collections: data });
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
  }

  render() {
    const {collections} = this.state;
    return (

      <div>
        {collections.map( (collection) =>
            <div key={collection._id}>
            <Typography>Player ID: {collection.PlayerID}</Typography>
            <Typography>Assists: {collection.assists}</Typography>
            <Typography>Deaths: {collection.deaths}</Typography>
            <Typography>Gold Earned: {collection.gold_earned}</Typography>
            <Typography>Kills: {collection.kills}</Typography>
            <Typography>Vision Score: {collection.vision_score}</Typography>
          </div>
        )}
      </div>
    );
  }
}

export default DatabaseComponent;