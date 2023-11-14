const getUserAccessToken = () => {
  let uri = "https://accounts.spotify.com/authorize";
  uri += "?response_type=token";
  uri += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
  uri +=
    "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_SITE_ENDPOINT);
  window.location = uri;
};

export default getUserAccessToken;
