import React, { Component } from "react";
import { Button, Icon } from "antd";

import "./index.less";

export default class HeaderMain extends Component {
  render() {
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small">
            <Icon type="fullscreen" />
          </Button>
          <Button size="small" className="lang-btn">
            English
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
