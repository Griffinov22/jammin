import {
  Card,
  Dialog,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
} from "@mui/material";

const Modal = ({ open, playListTitles }) => {
  const a = ["monday", "tuesday"];

  return (
    <Dialog open={open} maxWidth="lg">
      <Card variant="outlined" sx={{ minWidth: 250, padding: "1rem" }}>
        <Typography variant="h5" component="h6">
          Would you like to delete any of the {playListTitles.length} playlists
          you merged?
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            paddingBlock: "1rem",
          }}
        >
          {a.map((name, ind) => {
            return (
              <FormControlLabel
                key={ind}
                control={<Checkbox />}
                label={
                  <Typography variant="h5" sx={{ fontSize: "1.4rem" }}>
                    {name}
                  </Typography>
                }
              />
            );
          })}
        </FormGroup>
      </Card>
    </Dialog>
  );
};

export default Modal;
