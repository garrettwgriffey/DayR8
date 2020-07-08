import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EmotionsRate from "../EmotionsRate";
import SavedNotes from "../SavedNotes";
import NoteContent from "../NoteContent";
import Button from "@material-ui/core/Button";
import API from "../../util/API";
import Hotline from "../Hotline";

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
  btn: {
    margin: "10px",
  },
}));

function Note() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [emotions, setEmotions] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    API.getFeeling()
      .then((res) => setSavedNotes(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(title, note, emotions);
  }, [title, note, emotions]);

  const onSubmitFeeling = () => {
    API.submitFeeling({
      title: title,
      notes: note,
      emotion: emotions,
    })
      .then((res) => {
        setNote("");
        setTitle("");
        API.getFeeling()
          .then((res) => setSavedNotes(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h1 className={classes.h1}>Saved Notes</h1>
            <SavedNotes
              savedNotes={savedNotes}
              setNote={setNote}
              setTitle={setTitle}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <EmotionsRate setEmotions={setEmotions} emotion={emotions} />
            <NoteContent
              setNote={setNote}
              setTitle={setTitle}
              note={note}
              title={title}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={onSubmitFeeling}
            >
              Save
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Hotline />
    </div>
  );
}

export default Note;
