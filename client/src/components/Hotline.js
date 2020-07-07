import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
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
         1-800-273-8255
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Call Now</Button>
        <Button href="https://suicidepreventionlifeline.org/" size="small">Official Website</Button>
      </CardActions>
    </Card>
  );
}