import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SavedNotes({
  savedNotes,
  setTitle,
  setNote,
  setEmotions,
  setNewBtn,
  updateBtn,
}) {
  const classes = useStyles();

  const showFeelings = (id) => {
    let selectedFeeling = savedNotes.filter((note) => note.id === id)[0];
    console.log(selectedFeeling);
    setNote(selectedFeeling.notes);
    setTitle(selectedFeeling.title);
    setEmotions(selectedFeeling.emotion);
    if (setNewBtn) {
      setNewBtn(false);
    } else {
      updateBtn();
    }
  };

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {savedNotes.map((feeling) => (
        <ListItem
          button
          key={feeling.id}
          onClick={() => showFeelings(feeling.id)}
        >
          <ListItemText primary={feeling.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default SavedNotes;
