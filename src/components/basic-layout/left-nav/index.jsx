import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import menus from "../../../config/menus";

import logo from "../../../assets/logo.png";
import "./index.less";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  state = {
    menus: []
  };

  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.icon}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(cMenu => this.createCMenus(cMenu))}
          </SubMenu>
        );
      } else {
        return this.createCMenus(menu);
      }
    });
  };

  createCMenus = menu => {
    return (
      <Menu.Item key={menu.icon}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    });
  }

  render() {
    return (
      <div>
        <div className="layout-logo">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}
