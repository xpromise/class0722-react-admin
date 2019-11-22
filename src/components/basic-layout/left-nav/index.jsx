import React, { Component } from "react";
import { Menu, Icon } from "antd";
/*
  需求：给非路由组件传递路由组件的三大属性
  解决：withRouter是一个高阶组件
  作用：给非路由组件传递路由组件的三大属性
*/
import { Link, withRouter } from "react-router-dom";
import menus from "../../../config/menus";

import logo from "../../../assets/logo.png";
import "./index.less";

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  state = {
    menus: []
  };

  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
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
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  findOpenKey = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find(cMenu => cMenu.path === pathname);
        if (cMenu) {
          return menu.path;
        }
      }
    }
  };

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    });
  }

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKey(menus, pathname);

    return (
      <div>
        <div className="layout-logo">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
