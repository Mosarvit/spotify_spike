import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import React from "react";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function SpotifySearch({ artist, setArtist, accessToken }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [artists, setArtists] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      );
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map(key => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {}, [artist]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
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
        // value={artist}
        options={artists}
        loading={loading}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setArtist(newValue.name);
          } else {
            setArtists([]);
            setArtist(null);
          }
        }}
        onInputChange={(event, newValue) => {
          if (newValue.length > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open(
              "GET",
              "https://api.spotify.com/v1/search?q=" +
                newValue +
                "&type=artist",
              true
            );
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.send();

            xhr.onload = function processRequest(e) {
              // if (xhr.readyState === 4 && xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              var a = [];
              response.artists.items.map(artist => {
                a.push(artist);
              });
              setArtists(a);
              //document.getElementById("artists").innerHTML = this.responseText;
              // }
            };
          }
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose the artist..."
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

export default SpotifySearch;
