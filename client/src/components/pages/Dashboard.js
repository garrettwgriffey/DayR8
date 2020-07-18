import React, { useState, useEffect } from "react";
import MyChart from "../Plot";
import Grid from "@material-ui/core/Grid";
import API from "../../util/API";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Hotline from "../Hotline";
import Back from "../../assets/back.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "50px",
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  h1: {
    color: "black",
    fontSize: "50px",
    marginTop: "3px",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  icon: {
    margin: "25px",
    width: "35px",
    height: "35px",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("running get by week");
    API.getByWeek({ user: props.user }).then((res) => {
      const apiData = res.data.map((obj) => {
        return {
          x: new Date(obj.updatedAt),
          y: parseInt(obj.emotion),
        };
      });
      setChartData(apiData);
      console.log(res);
    });
    API.getByMonth({ user: props.user }).then((res) => console.log(res));
    API.getByYear({ user: props.user }).then((res) => console.log(res));
  }, []);
  return (
    <>
      <div className="backBtn">
        <Grid item xs={2}>
          <Link to="/note ">
            <img src={Back} className={classes.icon} />
          </Link>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <h1 className={classes.h1}>Week</h1>
              <MyChart chartData={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <h1 className={classes.h1}>Month</h1>
              <MyChart chartData={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <h1 className={classes.h1}>Year</h1>
              <MyChart chartData={chartData} />
            </Paper>
          </Grid>
          <Hotline />
        </Grid>
      </div>
    </>
  );
}

export default Dashboard;
