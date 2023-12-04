import { useState, useRef, useEffect } from "react";
import { blue, grey, red } from "@mui/material/colors";
import Track from "./Track";
import { Grid, Box, Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { createPlaylist, udpatePlaylist } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const PlayListSection = ({
  playList,
  removeSongFromPlayList,
  user,
  setHasCreated,
  clickedMerge,
  playListTitles,
  setPlayListTitles,
}) => {
  //consider refactor if have more than one playlist selected from user
  const [currTitle, setCurrTitle] = useState("");
  const [error, setError] = useState(false);
  const ref = useRef();

  useEffect(() => {
    //if selected more than one playlist to merge, do not show a title
    playListTitles.length == 1
      ? setCurrTitle(playListTitles[0])
      : setCurrTitle("");
  }, [playListTitles]);

  const startedList = playList.length > 0;
  const { token } = useAuth();

  const handleClick = async (e) => {
    if (playList.length >= 0 && currTitle) {
      const uriList = playList.map((obj) => obj.uri);
      let playListCreation;

      if (playListTitles.length == 1) {
        //updating playlist
        const matchedPlaylist = user.playlists.find(
          (obj) => obj.name == playListTitles[0]
        );
        if (!matchedPlaylist) throw new Error();
        playListCreation = await udpatePlaylist(
          token,
          matchedPlaylist,
          uriList,
          currTitle
        );
      } else {
        //merging and creating new playlist with new name OR creating fresh playlist
        playListCreation = await createPlaylist(
          user.id,
          token,
          currTitle,
          uriList
        );
      }

      if (playListCreation) {
        setHasCreated(true);
      } else {
        alert("error submitting data to Spotify!");
      }
    } else {
      //turn playlist name red i.e. title was not given and/or playlist has no songs
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
              value={currTitle}
              onChange={(e) => {
                setCurrTitle(e.target.value);
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
            <Button
              type="submit"
              variant="contained"
              onClick={handleClick}
              ref={ref}
            >
              {playListTitles.length == 1
                ? "Update Playlist"
                : playListTitles.length >= 1
                ? "Merge Playlist"
                : "Submit"}
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default PlayListSection;
