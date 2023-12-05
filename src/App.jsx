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
import Modal from "./components/Modal";

function App() {
  const [songsSearch, setSongsSearch] = useState([]);
  const [songQuery, setSongQuery] = useState("");
  const [playList, setPlayList] = useState([]);
  const [playListTitles, setPlayListTitles] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [user, setUser] = useState({});
  const [hasCreated, setHasCreated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successState, setSuccessState] = useState({
    value: false,
    message: "",
  });
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

    //get new profile when token is reset or created to show new playlists
    getProfile(token);
  }, [token, hasCreated]);

  useEffect(() => {
    if (hasCreated) {
      setSongsSearch([]);
      setSongQuery("");
      setPlayList([]);
      setHasCreated(false);
      setPlayListTitles([]);
      setSelectedPlaylists([]);
      const message =
        playListTitles.length == 1
          ? "Successfully updated playlist"
          : "Success created playlist";
      setSuccessState({ value: true, message });
      //show success for 2 seconds
      setTimeout(() => {
        setSuccessState({ value: false, message: "" });
      }, 2000);
    }
  }, [hasCreated]);

  useEffect(() => {
    setSongQuery("");
    setSongsSearch([]);
  }, [playListTitles]);

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
        {/* occurs if multiple playlists were merged */}
        <Modal
          playListTitles={playListTitles}
          //no worky
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          setHasCreated={setHasCreated}
          user={user}
        />

        {successState.value && (
          <Alert severity="success" sx={{ marginTop: "1rem" }}>
            {successState.message}
          </Alert>
        )}
        {Object.keys(user).length > 0 && (
          <PlayListMenu
            playlists={user.playlists}
            setPlayList={setPlayList}
            setPlayListTitles={setPlayListTitles}
            setSongsSearch={setSongsSearch}
            selectedPlaylists={selectedPlaylists}
            setSelectedPlaylists={setSelectedPlaylists}
          />
        )}
        <Grid container my={2} mb={10} direction="row" spacing={2}>
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
            setShowDeleteModal={setShowDeleteModal}
          />
        </Grid>
      </Container>
    </>
  );
}

export default App;
