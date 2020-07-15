import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  hotline: {
    textAlign: "center",
  },
  marginBottom: "50px",
});

function Hotline() {
  const classes = useStyles();

  return (
    <div className={classes.hotline}>
      <div className={classes.root}>
        <CardContent>
          {/* NSPL */}
          <Typography variant="h5" component="h2">
            Help is available
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Speak with a counselor today
          </Typography>
          <br />
          <Typography variant="h5" component="p">
            National Suicide Prevention Lifeline
          </Typography>
          <Typography variant="h4" component="p">
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
          <br />
            {/* SAMHSA */}
          <Typography variant="h5" component="p">
            Substance Abuse and Mental Health Services Administration
          </Typography>
          <Typography variant="h4" component="p">
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
        </CardContent>
      </div>
    </div>
  );
}

export default Hotline;
