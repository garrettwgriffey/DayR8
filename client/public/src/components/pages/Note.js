import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EmotionsRate from "../EmotionsRate";
import SavedNotes from "../SavedNotes";
import NoteContent from "../NoteContent";
import Plot from "../plot";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  h1: {
    color: "black",
    fontSize: "50px",
    marginTop: "3px",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h1 className={classes.h1}>Saved Notes</h1>
            <SavedNotes />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <EmotionsRate />
            <NoteContent />
          </Paper>
        </Grid>
      </Grid>
      <Plot />
    </div>
  );
}
