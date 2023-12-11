import {
  Card,
  Dialog,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
  Button,
  Box,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { grey } from "@mui/material/colors";

const Modal = ({
  playListTitles,
  user,
  setShowDeleteModal,
  showDeleteModal,
  setHasCreated,
}) => {
  const [deletedPlaylists, setDeletedPlaylists] = useState([]);

  const handleClose = async (e) => {
    const submitData =
      e.target.getAttribute("aria-label") == "submit deleted playlist";
    if (submitData) {
      //Till Spotify allows 3rd parties to delete user's playlists, this will suffice ):
      const listOfUrls = [];
      deletedPlaylists.forEach((name) => {
        listOfUrls.push(
          user.playlists.find((obj) => obj.name == name).external_urls.spotify
        );
      });
      listOfUrls.forEach((url) => window.open(url, "_blank"));
    }
    setShowDeleteModal(false);
    setHasCreated(true);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setDeletedPlaylists((prevList) => [...prevList, e.target.value]);
    } else {
      setDeletedPlaylists((prevList) =>
        prevList.filter((name) => name != e.target.value)
      );
    }
  };

  return (
    <Dialog
      open={showDeleteModal}
      onClose={handleClose}
      maxWidth="lg"
      data-testid="delete modal"
    >
      <Card
        variant="outlined"
        sx={{ width: 600, padding: "1rem", textAlign: "center" }}
      >
        <Typography
          variant="h5"
          component="h6"
          pb={2}
          data-testid="modal header"
        >
          Would you like to delete any of the {playListTitles.length} playlists
          you merged?
        </Typography>
        <Typography
          variant="subtitle2"
          component="p"
          gutterBottom
          fontSize="1rem"
          sx={{
            width: "80%",
            marginInline: "auto",
            fontWeight: 600,
            color: grey[600],
            lineHeight: "1.2",
            fontStyle: "italic",
          }}
        >
          You will be redirected to your playlist dashboard to delete the
          playlist there.
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBlock: "1rem",
          }}
        >
          {playListTitles.map((name, ind) => {
            return (
              <FormControlLabel
                key={ind}
                control={
                  <Checkbox
                    value={name}
                    onChange={handleChange}
                    data-testid="modal checkboxes"
                  />
                }
                label={
                  <Typography variant="h5" sx={{ fontSize: "1.4rem" }}>
                    {name}
                  </Typography>
                }
              />
            );
          })}
          <Box
            display="flex"
            pt={2}
            justifyContent={
              deletedPlaylists.length > 0 ? "space-between" : "flex-end"
            }
            alignItems="center"
            width="100%"
          >
            {deletedPlaylists.length > 0 && (
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                aria-label="submit deleted playlist"
                data-testid="modal submit"
              >
                Submit
              </Button>
            )}
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              aria-label="close modal"
            >
              Close
            </Button>
          </Box>
        </FormGroup>
      </Card>
    </Dialog>
  );
};

export default Modal;
