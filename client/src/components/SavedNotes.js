import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    width: "120%",
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
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

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
      <ListItem className={classes.btn} button onClick={handleClick}>
        <ListItemText className={classes.list} primary="2020" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
      </Collapse>
    </List>
  );
}

export default SavedNotes;
