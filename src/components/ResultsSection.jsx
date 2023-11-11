import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ResultsSection = () => {
  return (
    <Grid item sm={12} md={6} bgcolor={grey[100]}>
      <Typography variant="h3" component="h4" fontSize="1.8rem">
        Results
      </Typography>
    </Grid>
  );
};

export default ResultsSection;
