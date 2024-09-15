import { Avatar, Grid2, Typography } from "@mui/material";

const Player = (props) => {
  return (
    <Grid2 container spacing={2} direction={"row"}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
          sx={{ width: 64, height: 64 , marginLeft: '16px', marginRight: '16px'}}
          />

        <Typography variant="h3" color="white">
          {props.name}
        </Typography>
    </Grid2>
  );
};

export default Player;
