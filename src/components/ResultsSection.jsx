import { useRef, useLayoutEffect } from "react";
import Track from "./Track";

import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ResultsSection = ({ songsSearch, addSongToPlaylist }) => {
  const overflowStyle = {
    overflowY: "scroll",
    height: "60vh",
  };
  const showScroll = songsSearch.length >= 4;

  return (
    <Grid item sm={12} md={6}>
      <Box
        bgcolor={grey[100]}
        borderRadius={2}
        p={2}
        sx={{ minHeight: "60vh", ...(showScroll ? overflowStyle : {}) }}
      >
        <Typography variant="h3" component="h4" fontSize="1.8rem">
          Results
        </Typography>
        <hr />
        {/* results list */}
        <Box display="flex" flexDirection="column">
          {songsSearch &&
            songsSearch.map((song) => (
              <Track
                key={song.id}
                id={song.id}
                title={song.songTitle}
                artist={song.artist}
                album={song.album}
                addSongToPlaylist={addSongToPlaylist}
                isAddingToPlaylist={true}
                href={song.href}
              />
            ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default ResultsSection;
