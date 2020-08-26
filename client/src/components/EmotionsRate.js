import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    textAlign: "center",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

function valuetext(value) {
  return `${value}`;
}

function EmotionsRate(props) {
  const [rate, setRate] = useState("");

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography 
        id="discrete-slider" 
        gutterBottom
      >
        From 1 to 8, How are you feeling today? (1 being the worst you can feel
        and 8 being the best you can feel)
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={8}
        onChange={(e, value) => {
          props.setEmotions(value)
          setRate(value)
        }}
      />
      <div>
        {rate}
      </div>
    </div>
  );
}

export default EmotionsRate;
