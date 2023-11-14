import { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [state, setState] = useState(localStorage.getItem("state"));

  useEffect(() => {
    //state == null on first render
    if (state) {
      // this must be inside or infinite loop
      if (window.location.hash != "") {
        setUserToken(window.location.hash);
      }
    } else {
      setState(
        localStorage.setItem(
          "state",
          JSON.stringify(new Date().toLocaleDateString())
        )
      );
      getUserAccessToken();
    }
  }, [state]);

  const getUserAccessToken = () => {
    let uri = "https://accounts.spotify.com/authorize";
    uri += "?response_type=token";
    uri += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
    uri +=
      "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_SITE_ENDPOINT);
    window.location = uri;
  };

  const setUserToken = (hash) => {
    const accessToken = new URLSearchParams(hash.substring(1)).get(
      "access_token"
    );
    setToken(accessToken);
    //reformat URL
    const newURL = window.location.href.split("#")[0];
    window.history.replaceState({}, document.title, newURL);
  };

  const refreshUserAccessToken = () => {
    setState(localStorage.removeItem("state")); //returns undefined
  };

  //     const submitPlayList = (songsList) => {
  //       //
  //   }

  const value = {
    token,
    getUserAccessToken,
    setUserToken,
    refreshUserAccessToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
