import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://dayr8.herokuapp.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        DayR8
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "100px",
    textAlign: "center",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "5px",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
