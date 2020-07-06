import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form>
      <div className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Title" />
      </div>
      <div className={classes.root}>
        <TextField
          id="standard-textarea"
          label="Why the rate?"
          multiline
          rows={20}
        />
      </div>
    </form>
  );
}
