import "./App.css";
import { useState, useEffect, useContext } from "react";
import { getUserProfile } from "./api/spotifyApi";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import PlayListSection from "./components/PlayListSection";

import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [songsSearch, setSongsSearch] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [username, setUsername] = useState("");
  const [userPic, setUserPic] = useState("");
  const { token, openSpotifyForAccessToken, setUserToken } = useAuth();

  useEffect(() => {
    async function getProfile(token) {
      const profile = await getUserProfile(token);
      if (Object.hasOwn(profile, "error")) {
        //get new token
        localStorage.removeItem("token");
        if (!window.location.hash) {
          openSpotifyForAccessToken();
        }
      }
      //has valid
    }

    getProfile(token);
  }, [username, userPic]);

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
        <SearchBar setSongsSearch={setSongsSearch} />
        <Grid container my={4} direction="row" spacing={2}>
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
