import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { withTranslation } from "react-i18next";
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

@withTranslation()
@withRouter
class LeftNav extends Component {
  static propTypes = {
    isDisplay: PropTypes.bool.isRequired
  };

  createMenus = menus => {
    const { t } = this.props;
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{t("layout.leftNav." + menu.title)}</span>
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
    const { t } = this.props;
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{t("layout.leftNav." + menu.title)}</span>
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

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKey(menus, pathname);
    const { t } = this.props;
    // 重复调用
    const menusList = this.createMenus(menus);

    return (
      <div>
        <div className="layout-logo">
          <img src={logo} alt="logo" />
          <h1 style={{ display: this.props.isDisplay ? "block" : "none" }}>
            {t("layout.leftNav.title")}
          </h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {menusList}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
