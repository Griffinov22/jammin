import { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [expireTime, setExpireTime] = useState(
    JSON.parse(localStorage.getItem("expires-in"))
  );

  useEffect(() => {
    if (window.location.hash) {
      setUserToken(window.location.hash);
    } else if (!token || (expireTime && Date.now() > expireTime)) {
      openSpotifyForAccessToken();
    }
  }, []);

  useEffect(() => {
    let timeout;
    if (expireTime != null) {
      timeout = setTimeout(() => {
        openSpotifyForAccessToken();
      }, 3600 * 1000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const openSpotifyForAccessToken = () => {
    let uri = "https://accounts.spotify.com/authorize";
    uri += "?response_type=token";
    uri +=
      "&scope=playlist-modify-public,playlist-read-private,playlist-modify-private";
    uri += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
    uri +=
      "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_SITE_ENDPOINT);
    window.location = uri;
  };

  const setUserToken = (hash) => {
    const accessToken = new URLSearchParams(hash.substring(1)).get(
      "access_token"
    );
    const expiresIn = new URLSearchParams(hash.substring(1)).get("expires_in");
    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem(
      "expires-in",
      JSON.stringify(Date.now() + expiresIn * 1000)
    );

    setToken(accessToken);
    setExpireTime(expiresIn);

    //reformat URL
    const newURL = window.location.href.split("#")[0];
    window.history.replaceState({}, "", newURL);
  };

  const value = {
    token,
    openSpotifyForAccessToken,
    setUserToken,
  };
  return (
    <AuthContext.Provider value={value}>
      {token && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
