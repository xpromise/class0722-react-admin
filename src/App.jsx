import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./utils/history";

import routes from "./config/routes";
import "./index.less";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => {
            return <Route {...route} key={index} />;
          })}
        </Switch>
      </Router>
    );
  }
}
