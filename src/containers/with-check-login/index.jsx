/*
  检查登录
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const withCheckLogin = WrappedComponent => {
  return connect(
    state => ({ token: state.user.token }),
    null
  )(
    class extends Component {
      static displayName = `CheckLogin(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;
      render() {
        /*
          1. 如果用户在/login  this.props.location.path
            如果用户登录过，去 /   redux中user中token
            如果用户没有登录过，不动
          
          2. 如果用户在非 /login
             如果用户登录过，不动
             如果用户没有登录过，/login

            location/history/match是路由组件的三大属性，其他组件默认没有
            路由组件指通过Route加载的组件
        */

        const {
          token,
          location,
          ...rest // 剩下所有没有被解构赋值的参数
        } = this.props;

        // 1. 如果用户在/login
        if (location.pathname === "/login") {
          if (token) {
            return <Redirect to="/" />;
          }
        } else {
          if (!token) {
            return <Redirect to="/login" />;
          }
        }
        // 不动
        // 定义高阶组件时，需要将其接受到的props，在往下传递
        return <WrappedComponent {...rest} location={location} />;
      }
    }
  );
};

export default withCheckLogin;
