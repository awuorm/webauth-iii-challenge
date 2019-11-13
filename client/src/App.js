import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Registration";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={props => <Register {...props} />} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route path="/users" render={props => <Users {...props} />} />

    </div>
  );
}

export default App;
