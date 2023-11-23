import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getPlaylistTracks } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const PlayListItem = ({ name, src, imageSrc, setSelectedPlaylists }) => {
  const handleClick = (e) => {
    if (e.shiftKey || e.altKey) {
      const containerBox = e.target.closest(".MuiBox-root");
      if (containerBox.classList.contains("grey-bg")) {
        setSelectedPlaylists((prev) => {
          return prev.filter((x) => x != src);
        });
      } else {
        setSelectedPlaylists((prev) => [...prev, src]);
      }
      e.target.closest(".MuiBox-root").classList.toggle("grey-bg");
    } else {
      window.open(src, "_blank");
    }
  };

  const hasImage = imageSrc.length >= 0;

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

async function get(u, t) {
  const a = await getPlaylistTracks(u, t);
}

const PlayListMenu = ({ user }) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const showMergeButton = selectedPlaylists.length >= 2;
  const { token } = useAuth();

  if (Object.keys(user).length > 0) get(user.playlists[0].tracks.href, token);

  return (
    <>
      <Box
        bgcolor={grey[100]}
        width="100%"
        my={2}
        display="flex"
        columnGap={1}
        alignItems="center"
        borderRadius="50vw"
        px={1}
        py={1}
        sx={{
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {Object.keys(user).length > 0 &&
          user.playlists.map((obj, ind) => {
            return (
              <PlayListItem
                key={ind}
                name={obj.name}
                src={obj.src}
                imageSrc={obj.images}
                setSelectedPlaylists={setSelectedPlaylists}
              />
            );
          })}
      </Box>
      {showMergeButton && (
        <Button
          variant="contained"
          sx={{ display: "block", marginInline: "auto" }}
        >
          Merge Playlists
        </Button>
      )}
    </>
  );
};

export default PlayListMenu;
