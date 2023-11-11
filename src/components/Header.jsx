import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const Header = () => {
  return (
    <Box bgcolor={blue[600]} py={2}>
      <Typography variant="h4" component="h1" textAlign="center" color="white">
        Jammin&apos;
      </Typography>
    </Box>
  );
};

export default Header;
