import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function SelectedTrack({ track }) {
  React.useEffect(() => {}, [track]);

  const classes = useStyles();
  console.log(track);
  var a = [];
  if (track !== null) {
    track.artists.map(artist => {
      a.push(artist.name);
    });
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Selected Track:
          </Typography>
          {track ? (
            <>
              <Typography variant="body2" component="p">
                {track.name}
              </Typography>

              <Typography variant="body2" component="p">
                Artists: {a.join(", ")}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" component="p">
              no track selected
            </Typography>
          )}
        </CardContent>
      </Card>

      <Button variant="contained" color="primary">
        Add to playlist
      </Button>
    </div>
  );
}

export default SelectedTrack;
