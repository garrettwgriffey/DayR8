import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} /> */}
        <Note />

        {/* <SignUp /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
