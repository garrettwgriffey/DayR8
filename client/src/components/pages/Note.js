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
    fontSize: "2.5rem",
    marginTop: "3px",
  },
  btn: {
    margin: "10px",
  },
  welcome: {
    marginLeft: "10px",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

function Note(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [emotions, setEmotions] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [newBtn, setNewBtn] = useState(true);
  const [controlNewNote, setControlNewNote] = useState(true);

  useEffect(() => {
    API.getLastEntry(props.user).then((res) => {
      if (res.data.join().trim() === '') {
        console.log(res.data)
        console.log("setting to false, disabled to false")
        setControlNewNote(false)
      }
      else if (res) {
        console.log(res.data)
        console.log("setting to true, disabled to true")
        setControlNewNote(true)
      }
    });
     API.getFeeling(props.user)
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
      user: props.user,
    })
      .then((res) => {
        setNote("");
        setTitle("");
        API.getFeeling(props.user)
          .then((res) => {
            console.log("new note submitted, setting state for saved notes")
            setSavedNotes(res.data)
            setControlNewNote(true)
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const updateBtn = (e) => {
    e.preventDefault();
    setNote("");
    setTitle("");
    setNewBtn(true);
    setEmotions("");
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.welcome}>Welcome {props.user}!</h1>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <h1 className={classes.h1}>Saved Notes</h1>
            <SavedNotes
              savedNotes={savedNotes}
              setNote={setNote}
              setTitle={setTitle}
              setEmotions={setEmotions}
              setNewBtn={setNewBtn}
              user={props.user}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            {newBtn ? (
              <EmotionsRate setEmotions={setEmotions} emotion={emotions} />
            ) : (
              <h1>{emotions}</h1>
            )}

            <NoteContent
              setNote={setNote}
              setTitle={setTitle}
              note={note}
              title={title}
            />
            {newBtn ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={onSubmitFeeling}
                disabled={controlNewNote ? true : false}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={updateBtn}
              >
                New note
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Hotline />
    </div>
  );
}

export default Note;
