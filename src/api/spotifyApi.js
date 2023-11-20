import { useAuth } from "../contexts/AuthContext";

export const searchSpotifySong = async (queryString, token) => {
  const formatQuery = queryString.split(" ").join("+");
  const limit = 20;

  let trackData = await fetch(
    `https://api.spotify.com/v1/search?q=${formatQuery}&type=track&limit=${limit}&include=external=audio`,
    {
      headers: {
        Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
        // "With-Credentials": true,
        // "Access-Control-Allow-Headers": true,
        // "Access-Control-Allow-Credentials": true,
        // "Access-Control-Allow-Origin": "*",
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
