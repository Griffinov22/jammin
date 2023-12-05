import { useState, useEffect } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getPlaylistTracks } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const PlayListItem = ({
  name,
  src,
  uri,
  href,
  imageSrc,
  selectedPlaylists,
  setSelectedPlaylists,
  setPlayListTitles,
  setSongsSearch,
}) => {
  const handleClick = (e) => {
    if (e.shiftKey || e.altKey) {
      const containerBox = e.target.closest(".MuiBox-root");
      if (selectedPlaylists.includes(href)) {
        setSelectedPlaylists((prev) => prev.filter((x) => x != href));
        setPlayListTitles((prev) => prev.filter((x) => x != name));
      } else {
        setSelectedPlaylists((prev) => [...prev, href]);
        setPlayListTitles((prev) => [...prev, name]);
      }
    } else {
      window.open(src, "_blank");
    }
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
        backgroundColor: selectedPlaylists.includes(href) ? grey[500] : "",
        "&:hover": {
          cursor: "pointer",
          bgcolor: grey[300],
        },
      }}
    >
      {hasImage ? (
        <img src={imageSrc[0].url} alt="playlist" width={48} />
      ) : (
        <Avatar alt={"playlist: " + name} width={48}>
          P
        </Avatar>
      )}
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

const PlayListMenu = ({
  playlists,
  setPlayList,
  setPlayListTitles,
  setSongsSearch,
  selectedPlaylists,
  setSelectedPlaylists,
}) => {
  const { token } = useAuth();

  useEffect(() => {
    async function asyncGetter(selectedPlaylists, token) {
      let tracks = [];
      for (let i = 0; i < selectedPlaylists.length; i++) {
        const findSongs = await getPlaylistTracks(selectedPlaylists[i], token);
        const mapSongs = findSongs.map((obj) => {
          return {
            id: obj.id,
            uri: obj.uri,
            href: obj.external_urls.spotify,
            songTitle: obj.name,
            artist: [...obj.artists.map((obj) => obj.name)],
            album: obj.name,
          };
        });
        tracks.push(...mapSongs);
      }
      setPlayList(tracks);
    }

    if (selectedPlaylists.length > 0) {
      asyncGetter(selectedPlaylists, token);
    } else {
      //remove playlist from playlist section
      setPlayList([]);
    }
  }, [selectedPlaylists]);

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
        id="playlist-menu-wrapper"
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
              src={obj.external_urls.spotify}
              href={obj.href}
              uri={obj.uri}
              imageSrc={obj.images}
              selectedPlaylists={selectedPlaylists}
              setSelectedPlaylists={setSelectedPlaylists}
              setPlayListTitles={setPlayListTitles}
              setSongsSearch={setSongsSearch}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PlayListMenu;
