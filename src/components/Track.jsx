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
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleSong = ({ target }) => {
    //only for adding to playlist
    if (
      isAddingToPlaylist &&
      (target.tagName == "svg" || target.tagName == "path")
    ) {
      setIsPlaying(!isPlaying);
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
          <Box display="flex" alignItems="center">
            <Typography
              variant="h3"
              component="h5"
              fontWeight="bolder"
              fontSize={22}
              maxWidth="80%"
            >
              {title}
            </Typography>

            {isAddingToPlaylist &&
              (isPlaying ? (
                <PauseIcon sx={{ fontSize: 22 }} />
              ) : (
                <PlayCircleIcon sx={{ fontSize: 26 }} />
              ))}
          </Box>

          <Typography variant="p" fontSize={18}>
            {artist} {album && "  ||  " + album}
          </Typography>
        </Box>
        <Typography variant="h3" component="p">
          {isAddingToPlaylist ? "+" : "-"}
        </Typography>
      </Box>
      <hr />
    </Box>
  );
};

export default Track;
