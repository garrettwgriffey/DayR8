import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
// import SignIn from "./components/pages/SignIn";
import Note from "./components/pages/Note";
import Test from './components/layout/Button.js'
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Test />
        {/* <Route exact path="/" component={SignIn} /> */}
        {/* <Route path="/emotions" component={Note} /> */}
        {/* <Note /> */}
      </>
    </Router>
  );
}

export default App;
