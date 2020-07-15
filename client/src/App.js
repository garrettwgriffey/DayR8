import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";
import { PrivateRoute } from "./util/PrivateRoute";
import API from "./util/API";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      username: "",
      password: "",
      signupRedirect: false,
      dupUser: null
    };
    this.setUser = this.setUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    console.log("running get by week")
    API.getByWeek().then(res => console.log(res))
    API.getByMonth().then(res => console.log(res))
    API.getByYear().then(res => console.log(res))
  }

  setUser(data) {
    this.setState({ user: data });
  }

  setUsername(data) {
    this.setState({ username: data });
    console.log(this.state.username);
  }

  setPassword(data) {
    this.setState({ password: data });
    console.log(this.state.password);
  }

  signup() {
    console.log(this.state.username);
    API.signup({ username: this.state.username, password: this.state.password })
      .then((res) => {
        this.setState({
          username: this.state.username,
          password: this.state.password,
        });
        API.login({
          username: this.state.username,
          password: this.state.password,
        }).then((res) => {
          this.setUser(res.data.username)});
      })
        .catch((err) => {
          this.setState({dupUser: true});
          setTimeout(() => {this.setState({dupUser: false})}, 5000)
      });
  }

  handleSignup() {
    this.setState({ signupRedirect: true });
  }

  login() {
    console.log(this.state.username);
    API.login({ username: this.state.username, password: this.state.password })
      .then((res) => this.setUser(res.data.username))
      .catch((err) => console.log(err));
  }
  
  logout() {
    console.log("running logout");
    API.logout()
      .then((res) => this.setUser(null))
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
        {...props}
      />
    );
  };
  SignUpPage = (props) => {
    return (
      <SignUp
        user={this.state.user}
        dupUser={this.state.dupUser}
        signup={this.signup}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        signupRedirect={this.handleSignup}
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
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
