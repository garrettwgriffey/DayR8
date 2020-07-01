import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
// import SignIn from "./components/pages/SignIn";
import Note from "./components/pages/Note";
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        {/* <Route exact path="/" component={SignIn} /> */}
        {/* <Route path="/emotions" component={Note} /> */}
        {/* <Note /> */}
      </>
    </Router>
  );
}

export default App;
