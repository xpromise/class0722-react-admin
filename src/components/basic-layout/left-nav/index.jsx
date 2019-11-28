import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

/*
  需求：给非路由组件传递路由组件的三大属性
  解决：withRouter是一个高阶组件
  作用：给非路由组件传递路由组件的三大属性
*/
import { Link, withRouter } from "react-router-dom";
import menus from "../../../config/menus";
import withErrorBoundary from "../../error-boundary";
import logo from "../../../assets/logo.png";
import "./index.less";

const { SubMenu } = Menu;

@withErrorBoundary
@connect(state => ({ menus: state.user.user.menus }))
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
        const cMenu = menu.children.find(cMenu => pathname === cMenu.path);
        if (cMenu) {
          return menu.path;
        }
      }
    }
  };

  render() {
    let { pathname } = this.props.location;
    pathname = pathname.startsWith("/product") ? "/product" : pathname;
    const { t, menus: authMenus } = this.props;

    // 在生成菜单之前，将没有权限访问的菜单项给过滤掉
    const filterMenus = menus.reduce((p, menu) => {
      // 判断权限菜单中是否包含当前菜单的path
      // 包含就要显示 / 不包含就要过滤掉
      if (authMenus.indexOf(menu.path) !== -1) {
        // 包含 说明子菜单全选了
        return [...p, menu];
      }

      // 不包含, 可能子菜单只选中一个，还要检查子菜单，
      if (menu.children) {
        const newMenu = { ...menu };
        newMenu.children = menu.children.filter(
          cMenu => authMenus.indexOf(cMenu.path) !== -1
        );
        return [...p, newMenu];
      }

      return p;
    }, []);

    const openKey = this.findOpenKey(filterMenus, pathname);
    // 重复调用
    const menusList = this.createMenus(filterMenus);

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
