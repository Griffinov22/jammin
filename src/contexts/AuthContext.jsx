import { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    if (window.location.hash) {
      setUserToken(window.location.hash);
    } else if (!token) {
      openSpotifyForAccessToken();
    }
  }, []);

  const openSpotifyForAccessToken = () => {
    let uri = "https://accounts.spotify.com/authorize";
    uri += "?response_type=token";
    uri += "&scope=playlist-modify-public,playlist-read-private";
    uri += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
    uri +=
      "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_SITE_ENDPOINT);
    window.location = uri;
  };

  const setUserToken = (hash) => {
    const accessToken = new URLSearchParams(hash.substring(1)).get(
      "access_token"
    );
    localStorage.setItem("token", JSON.stringify(accessToken));
    setToken(accessToken);

    //reformat URL
    const newURL = window.location.href.split("#")[0];
    window.history.replaceState({}, "", newURL);
  };

  const value = {
    token,
    openSpotifyForAccessToken,
    setUserToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
