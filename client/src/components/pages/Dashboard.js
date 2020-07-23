import React, { useState, useEffect } from "react";
import MyChart from "../Plot";
import BarChart from "../BarChart";
import AreaChart from "../AreaChart";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Back from "../../assets/back.png";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 100,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  h1: {
    color: "black",
    fontSize: "3rem",
    marginTop: 3,
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  icon: {
    margin: 25,
    width: 35,
    height: 35,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginBottom: -20,
    },
  },
  center: {
    textAlign: "center"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [mountLineChart, setLineChart] = useState(true);
  const [mountBarChart, setBarChart] = useState(false);
  const [mountAreaChart, setAreaChart] = useState(false);

  const setChart = (type) => {
    switch(type) {
      case "line":
        setLineChart(true)
        setBarChart(false)
        setAreaChart(false)
        break;
      case "bar":
        setLineChart(false)
        setBarChart(true)
        setAreaChart(false)
        break;
      case "area":
        setLineChart(false)
        setBarChart(false)
        setAreaChart(true)
        break;
      default:
        setLineChart(true)
        setBarChart(false)
        setAreaChart(false)
    }
  }

  return (
    <>
      {props.user && (
        <div className="backBtn">
          <Grid item xs={2}>
            <Link to="/note">
              <img src={Back} className={classes.icon} />
            </Link>
          </Grid>
        </div>
      )}
      <div className={classes.center}>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={(() => setChart("line"))}>Line</Button>
          <Button onClick={(() => setChart("bar"))}>Bar</Button>
          <Button onClick={(() => setChart("area"))}>Area</Button>
        </ButtonGroup>
      </div>
      <div className={classes.root}>
        {mountLineChart ? (        
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Week</h1>
                <MyChart type={"Week"} user={props.user} />
              </Paper>
            </Grid>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Month</h1>
                <MyChart type={"Month"} user={props.user} />
              </Paper>
            </Grid>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Year</h1>
                <MyChart type={"Year"} user={props.user} />
              </Paper>
            </Grid>
          </Grid>) 

          : mountBarChart ? (
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Week</h1>
                <BarChart type={"Week"} user={props.user} />
              </Paper>
            </Grid>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Month</h1>
                <BarChart type={"Month"} user={props.user} />
              </Paper>
            </Grid>
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <h1 className={classes.h1}>Year</h1>
                <BarChart type={"Year"} user={props.user} />
              </Paper>
            </Grid>
          </Grid>
          ) : setAreaChart ? (
            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={11}>
                <Paper className={classes.paper}>
                  <h1 className={classes.h1}>Week</h1>
                  <AreaChart type={"Week"} user={props.user} />
                </Paper>
              </Grid>
              <Grid item xs={11}>
                <Paper className={classes.paper}>
                  <h1 className={classes.h1}>Month</h1>
                  <AreaChart type={"Month"} user={props.user} />
                </Paper>
              </Grid>
              <Grid item xs={11}>
                <Paper className={classes.paper}>
                  <h1 className={classes.h1}>Year</h1>
                  <AreaChart type={"Year"} user={props.user} />
                </Paper>
              </Grid>
            </Grid>
          ) : null}

      </div>
    </>
  );
}
export default Dashboard;
