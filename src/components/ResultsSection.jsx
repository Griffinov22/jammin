import Track from "./Track";

import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ResultsSection = ({ data, setSong }) => {
  return (
    <Grid item sm={12} md={6}>
      <Box bgcolor={grey[100]} borderRadius={2} p={2} height="100%">
        <Typography variant="h3" component="h4" fontSize="1.8rem">
          Results
        </Typography>
        <hr />
        {/* results list */}
        <Box display="flex" flexDirection="column">
          {data &&
            data.map((song) => (
              <Track
                key={song.id}
                id={song.id}
                title={song.songTitle}
                artist={song.artist}
                setSong={setSong}
              />
            ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default ResultsSection;
