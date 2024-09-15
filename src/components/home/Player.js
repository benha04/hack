import { Avatar, Grid2, Typography } from "@mui/material";

const Player = (props) => {
  return (
<Grid2 container item xs={12} justifyContent="center" alignItems="center" sx={{ minWidth: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 64, height: 64, marginLeft: '16px', marginRight: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h2" color="white">
            {props.name} - {props.stat || "N/A"}
          </Typography>
          
        </div>
      </div>
    </Grid2>
  );
};

export default Player;
