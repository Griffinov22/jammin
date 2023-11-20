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
  const [user, setUser] = useState({});
  const { token, openSpotifyForAccessToken, setUserToken } = useAuth();

  useEffect(() => {
    async function getProfile(token) {
      const profile = await getUserProfile(token);
      if (Object.hasOwn(profile, "error")) {
        //get new token
        //FIX ERROR IN HERE
        localStorage.removeItem("token");
        openSpotifyForAccessToken();
      }
      //has valid
      setUser({
        username: profile.display_name,
        id: profile.id,
        ...(profile.images.length > 0 && { userPic: profile.images[0] }),
      });
    }

    getProfile(token);
  }, []);

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
        <SearchBar setSongsSearch={setSongsSearch} user={user} />
        <Grid container my={2} direction="row" spacing={2}>
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
