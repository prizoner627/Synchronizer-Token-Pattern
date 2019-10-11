import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpdateUser from "./components/UpdateUser";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/profile" component={UpdateUser} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
