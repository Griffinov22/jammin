import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const PlayListItem = ({ name, src, imageSrc }) => {
  const handleClick = (e) => {
    window.open(src, "_blank");
  };

  const hasImage = imageSrc.length > 0;

  return (
    <Box
      px={3}
      py={1}
      onClick={handleClick}
      display="flex"
      alignItems="center"
      columnGap={1}
      sx={{
        borderRadius: "25vw",
        "&:hover": {
          cursor: "pointer",
          bgcolor: grey[300],
        },
      }}
    >
      <img src={imageSrc[0].url} alt="playlist" width={48} />
      <Typography
        variant="h6"
        component="p"
        whiteSpace="nowrap"
        sx={{
          //   fontWeight: 500,
          maxWidth: "10rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

// USED BELOW \/

const PlayListMenu = ({ userPlaylists }) => {
  //   console.log(userPlaylists);
  return (
    <Box
      bgcolor={grey[100]}
      width="100%"
      my={2}
      display="flex"
      alignItems="center"
      borderRadius="50vw"
      px={4}
      py={1}
      sx={{
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {userPlaylists.map((obj, ind) => {
        return (
          <PlayListItem
            key={ind}
            name={obj.name}
            src={obj.src}
            imageSrc={obj.images}
          />
        );
      })}
    </Box>
  );
};

export default PlayListMenu;
