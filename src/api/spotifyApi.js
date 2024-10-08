import { useAuth } from "../contexts/AuthContext";

export const searchSpotifySong = async (queryString, token) => {
  const formatQuery = queryString.split(" ").join("+");
  const limit = 20;

  let trackData = await fetch(
    `https://api.spotify.com/v1/search?q=${formatQuery}&type=track&limit=${limit}&include=external=audio`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  let tracksJson = await trackData.json();

  return tracksJson;
};

export const getUserProfile = async (token) => {
  let userData = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  let userJson = await userData.json();

  return userJson;
};

export const createPlaylist = async (userId, token, playListName, uris) => {
  try {
    const playListData = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playListName,
        }),
      }
    );
    if (!playListData.status == 201) {
      throw new Error("Not a 201 status");
    }
    const playListJson = await playListData.json();

    //get id of created playlist
    if (!Object.hasOwn(playListJson, "id")) {
      throw new Error();
    }
    const { id } = playListJson;
    let addedAllSongs = false;
    let addSongsData;
    let addSongsJson;

    const numberOfChunks = Math.ceil(uris.length / 100);

    for (let i = 0; i < numberOfChunks; i++) {
      addSongsData = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            uris: uris.slice(i * 100, i * 100 + 100),
          }),
        }
      );
      addSongsJson = await addSongsData.json();
    }

    return { status: 200 };
  } catch (err) {
    console.log(err);
  }
};

export const getUserPlaylists = async (token) => {
  try {
    const playlistData = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=10",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (Object.hasOwn(playlistData, "error")) {
      throw new Error();
    }
    const playlistJson = await playlistData.json();
    const { items } = playlistJson;
    return items;
  } catch (err) {
    console.log(err);
  }
};

export const getPlaylistTracks = async (href, token) => {
  const songsData = await fetch(href, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const songsJson = await songsData.json();
  return songsJson.tracks.items.map((obj) => obj.track);
};

export const udpatePlaylist = async (
  token,
  matchedPlaylist,
  uris,
  currTitle
) => {
  //get playlist songs, delete all old songs, load all new songs from uris,
  const oldSongsFromPlaylist = await getPlaylistTracks(
    matchedPlaylist.href,
    token
  );

  const deleteSongsData = await fetch(
    `https://api.spotify.com/v1/playlists/${matchedPlaylist.id}/tracks`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        tracks: oldSongsFromPlaylist.map((obj) => {
          return { uri: obj.uri };
        }),
      }),
    }
  );
  const deleteSongsJson = await deleteSongsData.json();

  const addSongsData = await fetch(
    `https://api.spotify.com/v1/playlists/${matchedPlaylist.id}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        uris,
      }),
    }
  );
  const addSongsJson = await addSongsData.json();

  //udpate playlist name
  const updateNameData = await fetch(
    `https://api.spotify.com/v1/playlists/${matchedPlaylist.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name: currTitle }),
    }
  );

  return { status: 200 };
};
