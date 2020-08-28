import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";
import { PrivateRoute } from "./util/PrivateRoute";
import API from "./util/API";
import Dashboard from "../src/components/pages/Dashboard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      username: "",
      password: "",
      signupRedirect: false,
      errorState: null,
    };
    this.setUser = this.setUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
  }
  setErrorState(data) {
    this.setState({errorState: data});
  }
  setUser(data) {
    this.setState({ user: data });
  }
  setUsername(data) {
    this.setState({ username: data });
  }
  setPassword(data) {
    this.setState({ password: data });
  }
  signup() {
    API.signup({ username: this.state.username, password: this.state.password })
      .then((res) => {
        API.login({
          username: this.state.username,
          password: this.state.password,
        }).then((res) => {
          this.setUser(res.data.username);
        });
      })
      .catch((err) => {
        console.log(err)
        this.setState({ errorState: true });
        setTimeout(() => {
          this.setState({ errorState: false });
        }, 5000);
      });
  }
  login() {
    API.login({ username: this.state.username, password: this.state.password })
      .then((res) => this.setUser(res.data.username))
      .catch((err) => {
        console.log(err)
        this.setState({ errorState: true });
        setTimeout(() => {
          this.setState({ errorState: false });
        }, 5000);
      });
  }
  logout() {
    API.logout()
      .then((res) => {
        this.setUser(null);
      })
      .catch((err) => console.log(err));
  }
  // Creating methods to pass props to Route components, which we are unable to do normally inside of Router. - TM
  SignInPage = (props) => {
    return (
      <SignIn
        user={this.state.user}
        login={this.login}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        errorState={this.state.errorState}
        setErrorState={this.setErrorState}
        {...props}
      />
    );
  };
  SignUpPage = (props) => {
    return (
      <SignUp
        user={this.state.user}
        username={this.state.username}
        password={this.state.password}
        errorState={this.state.errorState}
        signup={this.signup}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        setErrorState={this.setErrorState}
        {...props}
      />
    );
  };
  NotePage = (props) => {
    return (
      <Note
        user={this.state.user}
        // Insert props when we need them for doing cool stuff, such as flashing welcome messages to users using their username as a prop, etc - TM
        {...props}
      />
    );
  };
  Dashboard = (props) => {
    return <Dashboard user={this.state.user} {...props} />;
  };
  render() {
    return (
      <>
        <Router>
          <NavBar logout={this.logout} user={this.state.user} />
          <Switch>
            <Route exact path="/" component={this.SignInPage} />
            <Route exact path="/signup" component={this.SignUpPage} />
            <PrivateRoute
              exact
              user={this.state.user}
              path="/note"
              component={this.NotePage}
            />
            <PrivateRoute
              exact
              user={this.state.user}
              path="/dashboard"
              component={this.Dashboard}
            />
          </Switch>{" "}
           <Footer />
        </Router>
      </>
    );
  }
}
export default App;
