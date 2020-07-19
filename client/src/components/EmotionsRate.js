import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
    textAlign: "center",
    marginLeft: "450px",
  },
});

function valuetext(value) {
  return `${value}`;
}

function EmotionsRate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        From 1 to 8, How are you feeling today? (1 being the worst you can feel
        and 8 being the best you can feel)
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={8}
        onChange={(e) => {
          props.setEmotions(e.target.textContent);
        }}
      />
    </div>
  );
}

export default EmotionsRate;
