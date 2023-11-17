import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { searchSpotifySong } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const SearchBar = ({ setSongsSearch }) => {
  const { openSpotifyForAccessToken, setUserToken, token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.querySelector("input").value; //weird because MUI div layering
    if (query == "") {
      //clear search
      setSongsSearch([]);
      return;
    }
    const songQuery = await searchSpotifySong(query, token);
    if (Object.hasOwn(songQuery, "error")) {
      //get new token
      localStorage.removeItem("token");
      if (!window.location.hash) {
        openSpotifyForAccessToken();
      }
      setUserToken(window.location.hash);
    }
    console.log(songQuery);

    const mapSongs = songQuery.tracks.items.map((obj) => {
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
        A simple way to make playlist for your Spotify
      </Typography>
      <Box textAlign="center">
        <div className="input-border-round">
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Search song..."
              fontSize={12}
              size="small"
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
    </Box>
  );
};

export default SearchBar;
