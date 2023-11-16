export const searchSpotifySong = (queryString, token) => {
  const formatQuery = queryString.split(" ").join("+");
  const limit = 20;
  console.log(formatQuery);

  fetch(
    `https://api.spotify.com/v1/search?q=${formatQuery}&type=track&market=US&limit=${limit}`,
    {
      mode: "no-cors",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => console.log(data));
};
