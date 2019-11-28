import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { removeItem } from "../../../utils/storage";
import { removeUserSuccess } from "../../../redux/action-creators/user";
import { setLangSuccess } from "../../../redux/action-creators/lang";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";

import menus from "../../../config/menus";

import "./index.less";

@withRouter
@connect(state => ({ username: state.user.user.username }), {
  removeUserSuccess,
  setLangSuccess
})
@withTranslation()
class HeaderMain extends Component {
  formatDate = date => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = this.addZero(date.getMonth() + 1);
    const day = this.addZero(date.getDate());
    const hours = this.addZero(date.getHours());
    const minutes = this.addZero(date.getMinutes());
    const seconds = this.addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  addZero = number => {
    if (number < 10) return "0" + number;
    return number;
  };

  state = {
    isFullscreen: false,
    isEnglish: this.props.i18n.language === "en" ? true : false,
    title: "",
    pathname: "", // 存储上一次pathname
    // date: this.formatDate(Date.now())
    date: dayjs().format("YYYY/MM/DD HH:mm:ss")
  };

  toggleScreen = () => {
    // 切换全屏显示
    screenfull.toggle();
  };

  change = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };

  // 切换语言
  changeLang = () => {
    const isEnglish = !this.state.isEnglish;
    this.setState({
      isEnglish
    });
    const lang = isEnglish ? "en" : "zh";
    this.props.i18n.changeLanguage(lang);
    this.props.setLangSuccess(lang);
  };

  // 登出
  logout = () => {
    Modal.confirm({
      title: "您确认要退出登录吗?",
      onOk: () => {
        // 退出登录
        // 清空用户数据（localStorage、redux）
        removeItem("user");
        this.props.removeUserSuccess();
        // 跳转到/login页面
        this.props.history.replace("/login");
      }
      // onCancel() {}
    });
  };

  componentDidMount() {
    // 切换图标显示
    screenfull.on("change", this.change);

    this.timer = setInterval(() => {
      this.setState({
        // date: this.formatDate(Date.now())
        date: dayjs().format("YYYY/MM/DD HH:mm:ss")
      });
    }, 1000);
  }

  componentWillUnmount() {
    // 解绑事件 - 解绑事件的回调函数和绑定事件的回调函数必须一致
    screenfull.off("change", this.change);

    clearInterval(this.timer);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 需求： 我不想this.setState更新title，只想location.pathname变化才更新title
    const { pathname } = nextProps.location;

    if (pathname === prevState.pathname) {
      // 说明地址没有更新 --> this.setState
      return prevState;
    }

    let title = "";

    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find(cMenu =>
          pathname.startsWith(cMenu.path)
        );
        if (cMenu) {
          title = cMenu.title;
          break;
        }
      } else {
        if (menu.path === pathname) {
          title = menu.title;
          break;
        }
      }
    }

    return {
      pathname,
      title: "layout.leftNav." + title
    };
  }

  render() {
    const { isFullscreen, isEnglish, title, date } = this.state;
    const { username, t } = this.props;

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}>
            <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button size="small" onClick={this.changeLang} className="lang-btn">
            {isEnglish ? "中文" : "English"}
          </Button>
          <span>hello, {username}</span>
          <Button type="link" size="small" onClick={this.logout}>
            退&nbsp;&nbsp;出
          </Button>
        </div>
        <div className="header-main-bottom">
          <h3>{t(title)}</h3>
          <span>{date}</span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
