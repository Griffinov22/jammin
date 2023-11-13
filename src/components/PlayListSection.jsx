import { useState } from "react";
import { blue, grey } from "@mui/material/colors";
import Track from "./Track";
import { Grid, Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";

const PlayListSection = ({ playList, removeSongFromPlayList }) => {
  const [playListName, setPlayListName] = useState("");

  return (
    <Grid item sm={12} md={6}>
      <Box bgcolor={grey[100]} borderRadius={2} p={2} height="100%">
        <Typography variant="h3" component="h4" fontSize="1.8rem">
          Playlist
        </Typography>
        {playList.length > 0 && (
          <TextField
            id="playlist-name"
            name="playlistName"
            value={playListName}
            onChange={(e) => setPlayListName(e.target.value)}
            variant="standard"
            placeholder="playlist title..."
            fullWidth //allows width to be 60%
            //fix fontSize to work
            sx={{
              display: "block",
              width: "60%",
              marginInline: "auto",
              marginBottom: "1rem",
              fontSize: "36px",
              "& ::placeholder": {
                color: blue[600],
                opacity: 90,
                fontWeight: 700,
              },
            }}
          />
        )}
        <hr />
        {playList.length > 0 &&
          playList.map((song) => (
            <Track
              key={song.id}
              id={song.id}
              title={song.songTitle}
              artist={song.artist}
              album={song.album}
              isAddingToPlaylist={false}
              removeSongFromPlayList={removeSongFromPlayList}
            />
          ))}
      </Box>
    </Grid>
  );
};

export default PlayListSection;
