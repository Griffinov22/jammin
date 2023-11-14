import "./App.css";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import PlayListSection from "./components/PlayListSection";

import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import data from "./tempData/tempData";
import getUserAccessToken from "./api/spotifyApi";

function App() {
  const [songsSearch, setSongsSearch] = useState(data); //change this when going to API
  const [playList, setPlayList] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  //authentication
  useEffect(() => {
    if (window.location.hash == "") {
      getUserAccessToken();
    }
    setAccessToken(
      new URLSearchParams(window.location.hash.substring(1)).get("access_token")
    );
  }, [accessToken]);

  const addSongToPlayList = (id) => {
    if (!songsSearch) return;

    const song = songsSearch.find((song) => song.id == id);
    if (song) {
      setPlayList((prevSongs) => {
        return [...prevSongs, song];
      });
      setSongsSearch((prevSongs) => {
        const reducedSongSearch = prevSongs.filter(
          (oldSong) => oldSong != song
        );
        return reducedSongSearch;
      });
    } else {
      alert("song was not found");
    }
  };

  const removeSongFromPlayList = (id) => {
    if (!songsSearch) return;

    const song = playList.find((song) => song.id == id);
    if (song) {
      setPlayList((prevSongs) => {
        const reducedPlayList = prevSongs.filter((oldSong) => oldSong != song);
        return reducedPlayList;
      });
      setSongsSearch((prevSongs) => {
        return [...prevSongs, song];
      });
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
          <ResultsSection
            songsSearch={songsSearch}
            addSongToPlaylist={addSongToPlayList}
          />
          <PlayListSection
            playList={playList}
            removeSongFromPlayList={removeSongFromPlayList}
          />
        </Grid>
      </Container>
    </>
  );
}

export default App;
