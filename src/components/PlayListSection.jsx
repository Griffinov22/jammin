import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const PlayListSection = () => {
  return (
    <Grid item sm={12} md={6} bgcolor={grey[100]}>
      <Typography variant="h3" component="h4" fontSize="1.8rem">
        Playlist
      </Typography>
    </Grid>
  );
};

export default PlayListSection;
