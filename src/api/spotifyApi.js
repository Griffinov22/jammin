export const searchSpotifySong = (queryString) => {
  const formatQuery = queryString.split(" ").join("+");
  const limit = 20;
  console.log(formatQuery);
  fetch(
    `https://api.spotify.com/v1/search?q=${formatQuery}&type=track&market=US&limit=${limit}`
  ).then((data) => console.log(data));
};
