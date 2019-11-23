import React, { Component } from "react";
import { Button, Icon } from "antd";
import screenfull from "screenfull";
import { withTranslation } from "react-i18next";

import "./index.less";

@withTranslation()
class HeaderMain extends Component {
  state = {
    isFullscreen: false,
    isEnglish: this.props.i18n.language === "en" ? true : false
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
    this.props.i18n.changeLanguage(isEnglish ? "en" : "zh");
  };

  componentDidMount() {
    // 切换图标显示
    screenfull.on("change", this.change);
  }

  componentWillUnmount() {
    // 解绑事件 - 解绑事件的回调函数和绑定事件的回调函数必须一致
    screenfull.off("change", this.change);
  }

  render() {
    const { isFullscreen, isEnglish } = this.state;

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}>
            <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button size="small" onClick={this.changeLang} className="lang-btn">
            {isEnglish ? "中文" : "English"}
          </Button>
          <span>hello, damu</span>
          <Button type="link" size="small">
            退&nbsp;&nbsp;出
          </Button>
        </div>
        <div className="header-main-bottom">
          <h3>首页</h3>
          <span>xxxxxxxxxxxx</span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
