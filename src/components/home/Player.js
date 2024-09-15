// Player.js
import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Player = (props) => {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/${props.pic_id}.png`;
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: '300px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Avatar
            alt={props.name}
            src={imageUrl}
            sx={{ width: 64, height: 64, marginLeft: '16px', marginRight: '16px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h3" color="white">
              {props.name} - {props.stat || 'N/A'}
            </Typography>
          </div>
        </div>
      </Grid>
    </motion.div>
  );
};

export default Player;
