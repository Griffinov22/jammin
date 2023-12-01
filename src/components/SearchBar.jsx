import { Box, TextField, Typography, Avatar } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { searchSpotifySong } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const SearchBar = ({ setSongsSearch, user, songQuery, setSongQuery }) => {
  const { openSpotifyForAccessToken, setUserToken, token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (songQuery == "") {
      //clear search
      setSongsSearch([]);
      return;
    }
    const findSongs = await searchSpotifySong(songQuery, token);
    if (Object.hasOwn(findSongs, "error")) {
      //get new token
      localStorage.removeItem("token");
      if (!window.location.hash) {
        openSpotifyForAccessToken();
      }
      setUserToken(window.location.hash);
    }

    const mapSongs = findSongs.tracks.items.map((obj) => {
      return {
        id: obj.id,
        uri: obj.uri,
        href: obj.external_urls.spotify,
        songTitle: obj.name,
        artist: [...obj.artists.map((obj) => obj.name)],
        album: obj.name,
      };
    });
    setSongsSearch(mapSongs);
  };

  return (
    <Box pt={4}>
      <Typography variant="h5" textAlign="center" color={grey[700]}>
        A simple way to <i>create,edit, and merge</i> playlist for your Spotify
      </Typography>
      <Box textAlign="center">
        <div className="input-border-round">
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Search song..."
              fontSize={12}
              size="small"
              onChange={(e) => setSongQuery(e.target.value)}
              value={songQuery}
              sx={{
                marginTop: "2rem",
                width: "50%",
                maxWidth: "50rem",
                minWidth: "20rem",
                //   this allows you to override css
                "& .MuiOutlinedInput-input": {
                  paddingInline: "1.2rem",
                },
              }}
            />
          </form>
        </div>
      </Box>
      {user.username && (
        <Typography
          variant="h5"
          textAlign="center"
          color={grey[700]}
          sx={{
            fontWeight: 500,
            color: "black",
            marginTop: "2rem",
            whiteSpace: "nowrap",
          }}
        >
          user: {user.username}
        </Typography>
      )}

      {user.userPic ? (
        <Avatar alt="user" src={user.userPic} sx={{ marginInline: "auto" }} />
      ) : (
        <Avatar
          alt={user.username ? user.username : "profile pic"}
          sx={{
            bgcolor: deepPurple[500],
            marginInline: "auto",
          }}
        >
          {user.username ? user.username[0].toUpperCase() : ""}
        </Avatar>
      )}
    </Box>
  );
};

export default SearchBar;
