import React, { Component } from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import withCheckLogin from "../../containers/with-check-login";
import LeftNav from "./left-nav";
import HeaderMain from "./header-main";
import { authRoutes } from "../../config/routes";
import ThemePicker from "./theme-picker";

const { Header, Content, Footer, Sider } = Layout;

@withCheckLogin
@connect(state => ({ menus: state.user.user.menus }))
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({
      collapsed,
      isDisplay: !this.state.isDisplay
    });
  };

  render() {
    const { collapsed, isDisplay } = this.state;
    const { menus } = this.props;
    // 对权限路由进行过滤显示
    const filterAuthRoutes = authRoutes.filter(
      route =>
        !route.path ||
        menus.find(menu => route.path === menu || menu.startsWith("/product"))
    );

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav isDisplay={isDisplay} />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: "40px 16px 0 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Switch>
                {filterAuthRoutes.map((route, index) => {
                  return <Route {...route} key={index} />;
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        <ThemePicker />
      </Layout>
    );
  }
}

export default BasicLayout;
