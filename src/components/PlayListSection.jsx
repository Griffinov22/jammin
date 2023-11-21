import { useState, useLayoutEffect, useRef } from "react";
import { blue, grey, red } from "@mui/material/colors";
import Track from "./Track";
import { Grid, Box, Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { createPlaylist } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const PlayListSection = ({
  playList,
  removeSongFromPlayList,
  user,
  setHasCreated,
}) => {
  const [playListName, setPlayListName] = useState("");
  const [error, setError] = useState(false);

  const startedList = playList.length > 0;
  const { token } = useAuth();

  const handleClick = async (e) => {
    if (playListName && playList.length > 0 && user) {
      const uriList = playList.map((obj) => obj.uri);
      const snapshot = await createPlaylist(
        user.id,
        token,
        playListName,
        uriList
      );
      if (snapshot) {
        setHasCreated(true);
        setPlayListName("");
        alert("worked!");
      } else {
        alert("error!");
      }
    } else {
      //turn playlist name red
      setError(true);
    }
  };

  const overflowStyle = {
    overflowY: "scroll",
    height: "60vh",
  };
  const showScroll = playList.length >= 4;

  return (
    <Grid item sm={12} md={6}>
      {/* flex \/ */}
      <Box
        bgcolor={grey[100]}
        borderRadius={2}
        p={2}
        display="flex"
        flexDirection="column"
        sx={{ minHeight: "60vh", ...(showScroll ? overflowStyle : {}) }}
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
              onChange={(e) => {
                setPlayListName(e.target.value);
                setError(false);
              }}
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
                  color: error ? red[500] : blue[600],
                  opacity: error ? "100%" : "60%",
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
            <Button type="submit" variant="contained" onClick={handleClick}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default PlayListSection;
