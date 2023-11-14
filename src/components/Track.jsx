import { Box, Typography } from "@mui/material";

const Track = ({
  title,
  artist,
  addSongToPlaylist,
  removeSongFromPlayList,
  id,
  album,
  isAddingToPlaylist,
}) => {
  const handleSong = ({ target }) => {
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
          <Typography
            variant="h3"
            component="h5"
            fontWeight="bolder"
            fontSize={22}
          >
            {title}
          </Typography>
          <Typography variant="p" fontSize={18}>
            {artist} {album && "  ||  " + album}
          </Typography>
        </Box>
        <Typography variant="h3" component="p">
          +
        </Typography>
      </Box>
      <hr />
    </Box>
  );
};

export default Track;
