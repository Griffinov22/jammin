import { Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { useState } from "react";

const Track = ({
  title,
  artist,
  addSongToPlaylist,
  removeSongFromPlayList,
  id,
  album,
  isAddingToPlaylist,
  href,
}) => {
  const handleSong = ({ target }) => {
    //only for adding to playlist
    if (
      isAddingToPlaylist &&
      (target.tagName == "svg" || target.tagName == "path")
    ) {
      //open an adjacent window to the song on spotify
      window.open(href, "_blank");
      return;
    }

    const songId = target.closest(".track-item").id;
    if (isAddingToPlaylist) {
      addSongToPlaylist(songId);
    } else {
      removeSongFromPlayList(songId);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className="track-item"
        id={id}
        onClick={handleSong}
        sx={{ cursor: "pointer" }}
      >
        <Box display="flex" flexDirection="column" py={3}>
          <Box display="flex" alignItems="center" columnGap={1}>
            <Typography
              variant="h3"
              component="h5"
              fontWeight="bolder"
              fontSize={22}
              maxWidth="80%"
            >
              {title}
            </Typography>
            {isAddingToPlaylist && (
              <PlayCircleIcon
                sx={{ fontSize: 26 }}
                title="listen to song on Spotify"
              />
            )}
          </Box>

          <Typography variant="p" fontSize={18}>
            {artist} {album && "  ||  " + album}
          </Typography>
        </Box>
        <Typography variant="h3" className="add-icon">
          {isAddingToPlaylist ? "+" : "-"}
        </Typography>
      </Box>
      <hr />
    </Box>
  );
};

export default Track;
