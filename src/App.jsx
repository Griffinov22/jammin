import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import PlayListSection from "./components/PlayListSection";

import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import data from "./tempData/tempData";

function App() {
  const [addedSong, setAddedSong] = useState({});
  console.log(addedSong);

  const findAndSetSong = (id) => {
    const song = data.find((song) => song.id == id);
    if (song) {
      setAddedSong(song);
    } else {
      alert("song was not found");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <SearchBar />
        <Grid container mt={4} direction="row" spacing={2} height="60vh">
          <ResultsSection data={data} setSong={findAndSetSong} />
          <PlayListSection />
        </Grid>
      </Container>
    </>
  );
}

export default App;
