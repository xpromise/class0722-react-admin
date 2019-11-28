import React, { Component } from "react";
import { Icon, Drawer, Divider, Button } from "antd";
import { SketchPicker } from "react-color";
import { setItem, getItem } from "../../../utils/storage";

import "./index.less";

const initColor = getItem("color") || "#1DA57A";

export default class ThemePicker extends Component {
  state = {
    visible: false,
    background: initColor,
    prevColor: initColor
  };

  onClose = () => {
    this.setState({
      visible: false,
      background: this.state.prevColor
    });
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  componentDidMount() {
    this.styleEl = document.getElementById("theme-picker");
    if (!this.styleEl) {
      this.styleEl = document.createElement("style");
      this.styleEl.id = "theme-picker";
    }
    this.headEl = document.querySelector("head");
    // 初始化主题色
    this.setColor();
  }

  setColor = () => {
    // 1. 创建style标签
    // 2. 往style标签中写入样式
    const { background } = this.state;
    const style = `
      .ant-menu.ant-menu-dark .ant-menu-item-selected{
        background-color: ${background};
      }
      .theme-picker{
        background-color: ${background};
      }
      .ant-btn-link{
        color: ${background};
      }
      .ant-btn-link:hover, .ant-btn-link:focus{
        color: ${background};
        border-color: ${background};
      }
      .header-main .header-main-top{
        border-bottom: 1px solid  ${background};
      }
    `;
    this.styleEl.innerHTML = style;
    // 3. 将style添加到页面head最下面生效
    this.headEl.appendChild(this.styleEl);
    // 4. 将抽屉组件隐藏
    this.setState({
      visible: false,
      prevColor: background
    });
    // 5. 将颜色存储在localStorage
    setItem("color", background);
  };

  render() {
    return (
      <div>
        <div className="theme-picker" onClick={this.show}>
          <Icon type="setting" className="theme-picker-icon" />
        </div>
        <Drawer
          title="主题颜色选择"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <SketchPicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
          />
          <Divider />
          <Button onClick={this.onClose}>取消</Button>
          <Button type="primary" onClick={this.setColor}>
            确认
          </Button>
        </Drawer>
      </div>
    );
  }
}
