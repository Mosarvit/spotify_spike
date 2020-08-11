import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function TrackSearch({ artist, setArtist, accessToken, setTrack }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [tracks, setTracks] = React.useState([]);

  React.useEffect(() => {
    if (artist !== null) {
      var xhr = new XMLHttpRequest();

      const query =
        "https://api.spotify.com/v1/search?q=" + artist + ":&type=artist,track";

      xhr.open("GET", query, true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
      xhr.send();

      xhr.onload = function processRequest(e) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        var t = [];
        response.tracks.items.map(track => {
          t.push(track);
        });
        setTracks(t);
      };
    }
  }, [artist]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo-2"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={option => option.name}
        options={tracks}
        loading={loading}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setTrack(newValue);
          } else {
            setTrack(null);
          }
        }}
        onInputChange={(event, newValue) => {
          console.log(newValue);
          var xhr = new XMLHttpRequest();

          const query = artist
            ? "https://api.spotify.com/v1/search?q=" +
              artist +
              ":" +
              newValue +
              "&type=artist,track"
            : "https://api.spotify.com/v1/search?q=" + newValue + "&type=track";

          console.log(query);

          xhr.open("GET", query, true);
          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
          xhr.send();

          xhr.onload = function processRequest(e) {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            var t = [];
            if (response.tracks && response.tracks.items) {
              response.tracks.items.map(track => {
                t.push(track);
              });
              setTracks(t);
            } else {
              setTracks([]);
            }
          };
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose the song..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </>
  );
}

export default TrackSearch;
