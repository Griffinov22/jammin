import { useState } from "react";
import { blue, grey } from "@mui/material/colors";
import Track from "./Track";
import { Grid, Box, Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";

const PlayListSection = ({ playList, removeSongFromPlayList }) => {
  const [playListName, setPlayListName] = useState("");

  const startedList = playList.length > 0;

  return (
    <Grid item sm={12} md={6}>
      {/* flex \/ */}
      <Box
        bgcolor={grey[100]}
        borderRadius={2}
        p={2}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {/* flex -> */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h4" fontSize="1.8rem">
            Playlist
          </Typography>

          {startedList && (
            <TextField
              id="playlist-name"
              name="playlistName"
              value={playListName}
              onChange={(e) => setPlayListName(e.target.value)}
              variant="standard"
              placeholder="playlist title..."
              size="large"
              fullWidth //allows width to be 60%
              //fix fontSize to work
              InputProps={{
                style: {
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: blue[600],
                },
              }}
              sx={{
                display: "block",
                width: "60%",
                marginInline: "auto",
                marginBottom: "0.5rem",

                "& ::placeholder": {
                  color: blue[600],
                  opacity: "60%",
                  fontWeight: 700,
                },
              }}
            />
          )}
        </Box>
        <hr />
        {/* flex \/ */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flexGrow={1}
        >
          <Box>
            {startedList &&
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
          {startedList && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default PlayListSection;
