import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 100,
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: 100,
    },
  },

  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  title: {
    fontSize: "1.8rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
    },
  },
  phone: {
    fontSize: "1.8rem",
  },
}));

function Hotline() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Help Is Available</h1>
      <h3>Speak with a counselor today</h3>
      <div className={classes.container}>
        {/* SAMHSA */}
        <Grid item xs={12} md={6}>
          <Typography className={classes.title} component="p">
            Substance Abuse and Mental Health Services Administration
          </Typography>
          <Typography className={classes.phone} component="p">
            <a
              href="tel:1-800-662-4357"
              className="contact-number  contact-number--banner"
            >
              1-800-662-4357
            </a>
          </Typography>
          <Link
            href="https://www.samhsa.gov/find-help/national-helpline"
            size="small"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website
          </Link>
        </Grid>

        {/* NSPL */}

        <Grid item xs={12} md={6}>
          <Typography className={classes.title} component="p">
            National Suicide Prevention Lifeline
          </Typography>
          <Typography className={classes.phone} component="p">
            <a
              href="tel:1-800-273-8255"
              className="contact-number  contact-number--banner"
            >
              1-800-273-8255
            </a>
          </Typography>
          <Link
            href="https://suicidepreventionlifeline.org/"
            size="small"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website
          </Link>
        </Grid>
      </div>
    </div>
  );
}

export default Hotline;
