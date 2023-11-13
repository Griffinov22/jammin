import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const PlayListSection = () => {
  return (
    <Grid item sm={12} md={6}>
      <Box bgcolor={grey[100]} borderRadius={2} p={2} height="100%">
        <Typography variant="h3" component="h4" fontSize="1.8rem">
          Playlist
        </Typography>
        <hr />
      </Box>
    </Grid>
  );
};

export default PlayListSection;
