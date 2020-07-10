import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";
import {PrivateRoute} from './util/PrivateRoute';
import { Validate } from './util/Validate';
import API from './util/API';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      username: "",
      password: ""
    };
    this.setUser = this.setUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  setUser(data) {
    this.setState({user: data})
  }

  setUsername(data) {
    this.setState({username: data})
    console.log(this.state.username)
  }

  setPassword(data) {
    this.setState({password: data})
    console.log(this.state.password)
  }

  signup() {
    console.log(this.state.username)
    API.signup({username: this.state.username, password: this.state.password})
      .then((res) => this.setUser(res.user))
      .catch((err) => console.log(err));
    }

  login() {
    console.log(this.state.username)
    API.login({username: this.state.username, password: this.state.password})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    }

  // Setting the user state by running validation as soon as this mounts. Either a user object is returned and user has a value, or user remains "" and we can show something else. - TM

  useEffect() {
    const sendValidation = async () => {
        try {
            await API.login.then((res) => {this.setUser(res.user); console.log(this.state.user)});
        } catch (error) {
            console.log(error);
        }
    };
    sendValidation();
  };

  render() {
    return (
      <>
      {/* {!this.state.user ? (<SignIn login={this.login} setUsername={this.setUsername} setPassword={this.setPassword} />) : (<Note/>)} */}
      {!this.state.user ? (<SignUp signup={this.signup} setUsername={this.setUsername} setPassword={this.setPassword} />) : (<Note/>)}
      </>
    );
  }
}

export default App;
