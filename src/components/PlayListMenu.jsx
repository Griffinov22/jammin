import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getPlaylistTracks } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const PlayListItem = ({
  name,
  src,
  uri,
  href,
  imageSrc,
  setSelectedPlaylists,
}) => {
  //   console.log(name, src, imageSrc, setSelectedPlaylists);

  const handleClick = (e) => {
    if (e.shiftKey || e.altKey) {
      const containerBox = e.target.closest(".MuiBox-root");
      if (containerBox.classList.contains("grey-bg")) {
        setSelectedPlaylists((prev) => {
          return prev.filter((x) => x != href);
        });
      } else {
        setSelectedPlaylists((prev) => [...prev, href]);
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

async function asyncGetter(u, t) {
  const a = await getPlaylistTracks(u, t);
  return a;
}

const PlayListMenu = ({ playlists }) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const showMergeButton = selectedPlaylists.length >= 2;
  const { token } = useAuth();
  //   console.log(playlists);

  if (selectedPlaylists.length > 0) {
    let tracks = [];
    for (let i = 0; i < selectedPlaylists.length; i++) {
      //   tracks.push(asyncGetter(selectedPlaylists[i], token));
      console.log(asyncGetter(selectedPlaylists[i], token));
    }
    console.log(tracks);
  }

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
        {playlists.map((obj, ind) => {
          return (
            <PlayListItem
              key={ind}
              name={obj.name}
              src={obj.src}
              href={obj.href}
              uri={obj.uri}
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
