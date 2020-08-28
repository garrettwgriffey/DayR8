import React from "react";
import { Redirect, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorAlert from "../layout/ErrorAlert";
import validators from "../../util/validators";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const user = props.user;
  const { email, password } = validators;
  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <Container 
          component="main" 
          maxWidth="xs"
        >
          {props.errorState ? <ErrorAlert type="signup" /> : null}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography 
              component="h1" 
              variant="h5"
            >
              Sign up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                props.signup();
              }}
            >
              <Grid 
                container 
                spacing={2}
              >
                <Grid 
                  item 
                  xs={12}
                >
                  <TextField
                    autoComplete="uname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    error={email(props.username)}
                    helperText={email(props.username)}
                    id="userName"
                    label="User Name"
                    autoFocus
                    onChange={(e) => props.setUsername(e.target.value)}
                  />
                </Grid>
                <Grid 
                  item 
                  xs={12}
                >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={password(props.password)}
                    helperText={password(props.password)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => props.setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => props.setErrorState(false)}
              >
                Sign Up
              </Button>
              <Grid 
                container 
                justify="flex-end"
              >
                <Grid item>
                  <Link 
                    to="/" 
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}

export default SignUp;
