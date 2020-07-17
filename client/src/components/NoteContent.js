import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
}));

function NoteContent(props) {
  const classes = useStyles();

  return (
    <form>
      <div className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Title"
          onChange={(e) => {
            props.setTitle(e.target.value);
          }}
          value={props.title}
        />
      </div>
      <div className={classes.root}>
        <TextField
          id="standard-textarea"
          label="Why the rate?"
          multiline
          rows={10}
          onChange={(e) => {
            props.setNote(e.target.value);
          }}
          value={props.note}
        />
      </div>
    </form>
  );
}

export default NoteContent;
