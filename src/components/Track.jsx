import { Box, Typography } from "@mui/material";

const Track = ({ title, artist, setSong, id }) => {
  const handleClick = ({ target }) => {
    const songId = target.closest(".track-item").id;
    setSong(songId);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className="track-item"
        id={id}
        onClick={handleClick}
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
            {artist}
          </Typography>
        </Box>
        <Typography variant="h3" component="p">
          +
        </Typography>
      </Box>
      <hr />
    </>
  );
};

export default Track;
