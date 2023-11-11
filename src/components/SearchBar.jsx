import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const SearchBar = () => {
  return (
    <Box pt={4}>
      <Typography variant="h5" textAlign="center" color={grey[700]}>
        A simple way to make playlist for your Spotify
      </Typography>
      <Box textAlign="center">
        <div className="input-border-round">
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
        </div>
      </Box>
    </Box>
  );
};

export default SearchBar;
