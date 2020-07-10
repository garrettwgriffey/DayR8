import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";
import {PrivateRoute} from './util/PrivateRoute';
import { Validate } from './util/Validate';

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const sendValidation = async () => {
        try {
            await Validate().then((res) => {setUser(res); console.log(user)});
        } catch (error) {
            console.log(error);
        }
    };
    sendValidation();
});
  return (
    <Router>
      <NavBar />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/note" component={Note} />
          {/* <Route exact component={NoMatch} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
