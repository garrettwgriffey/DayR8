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

function SavedNotes({savedNotes}) {
  const classes = useStyles();
  

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {savedNotes.map((feeling) => (
        <ListItem button>
          <ListItemText primary={feeling.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default SavedNotes;
