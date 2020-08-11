import axios from "axios";
import qs from "qs";
import React from "react";
import "./App.css";
import SelectedTrack from "./SelectedTrack";
import SpotifySearch from "./SpotifySearch";
import TrackSearch from "./TrackSearch";

function App() {
  const [artist, setArtist] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [track, setTrack] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const clientId = "38813fe1b6b44935b104dc07d987f14b";
      const clientSecret = "5042c1760bbb497da90118833cdee903";

      const headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: clientId,
          password: clientSecret
        }
      };
      const data = {
        grant_type: "client_credentials"
      };

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        );
        console.log(response.data.access_token);
        setAccessToken(response.data.access_token);
        return response.data.access_token;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <SpotifySearch
        artist={artist}
        setArtist={setArtist}
        accessToken={accessToken}
      />
      <TrackSearch
        artist={artist}
        setArtist={setArtist}
        accessToken={accessToken}
        setTrack={setTrack}
      />
      <SelectedTrack track={track} />
    </>
  );
}

export default App;
