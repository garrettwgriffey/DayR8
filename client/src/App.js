import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
// import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
// import Note from "./components/pages/Note";
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Route exact path="/" component={SignIn} />
        {/* <Route exact path="/singup" component={SignUp} /> */}
        {/* <Note /> */}

        <SignUp />
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
