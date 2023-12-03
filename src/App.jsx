import "./App.css";
import { useState, useEffect, useContext } from "react";
import { getUserProfile, getUserPlaylists } from "./api/spotifyApi";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import PlayListSection from "./components/PlayListSection";
import PlayListMenu from "./components/PlayListMenu";

import { Alert, Container } from "@mui/material";
import { Grid } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [songsSearch, setSongsSearch] = useState([]);
  const [songQuery, setSongQuery] = useState("");
  const [playList, setPlayList] = useState([]);
  const [playListTitles, setPlayListTitles] = useState([]);
  const [user, setUser] = useState({});
  const [hasCreated, setHasCreated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { token, openSpotifyForAccessToken } = useAuth();

  useEffect(() => {
    async function getProfile(token) {
      const profile = await getUserProfile(token);
      const playlists = await getUserPlaylists(token);
      //has valid
      setUser({
        username: profile.display_name,
        id: profile.id,
        ...(profile.images.length > 0 && { userPic: profile.images[0].url }),
        playlists,
      });
      //////////////////////////playlists//////////////////////////
    }

    getProfile(token);
  }, [token]);

  useEffect(() => {
    if (hasCreated) {
      setSongsSearch([]);
      setSongQuery("");
      setPlayList([]);
      setHasCreated(false);
      setShowSuccess(true);
      //show success for 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  }, [hasCreated]);

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
        <SearchBar
          setSongsSearch={setSongsSearch}
          user={user}
          songQuery={songQuery}
          setSongQuery={setSongQuery}
        />
        {showSuccess && (
          <Alert severity="success" sx={{ marginTop: "1rem" }}>
            Successfully created playlist
          </Alert>
        )}
        {Object.keys(user).length > 0 && (
          <PlayListMenu
            playlists={user.playlists}
            setPlayList={setPlayList}
            setPlayListTitles={setPlayListTitles}
          />
        )}
        <Grid container my={2} direction="row" spacing={2}>
          <ResultsSection
            songsSearch={songsSearch}
            addSongToPlaylist={addSongToPlayList}
          />
          <PlayListSection
            playList={playList}
            playListTitles={playListTitles}
            setPlayListTitles={setPlayListTitles}
            removeSongFromPlayList={removeSongFromPlayList}
            user={user}
            setHasCreated={setHasCreated}
          />
        </Grid>
      </Container>
    </>
  );
}

export default App;
