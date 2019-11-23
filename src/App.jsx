import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import { Spin } from "antd";
import BasicLayout from "./components/basic-layout";
import history from "./utils/history";
import { authRoutes, noAuthRoutes } from "./config/routes";
import "./index.less";

export default class App extends Component {
  render() {
    return (
      // Suspense用于懒加载：等待内部元素加载完才显示，没加载完就显示fallback的值
      <Suspense fallback={<Spin size="large" className="lazy-loading"/>}>
        <Router history={history}>
          <Switch>
            {noAuthRoutes.map((route, index) => {
              return <Route {...route} key={index} />;
            })}
            <BasicLayout>
              <Switch>
                {authRoutes.map((route, index) => {
                  return <Route {...route} key={index} />;
                })}
              </Switch>
            </BasicLayout>
          </Switch>
        </Router>
      </Suspense>
    );
  }
}
