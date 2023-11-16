import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { searchSpotifySong } from "../api/spotifyApi";
import { useAuth } from "../contexts/AuthContext";

const SearchBar = () => {
  const SpotifyAuth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.querySelector("input").value; //weird because MUI div layering
    searchSpotifySong(query, SpotifyAuth.token);
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
