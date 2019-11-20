import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import { connect } from "react-redux";
import { getUserAsync } from "../../redux/action-creators/user";
import logo from "./logo.png";
import "./index.less";

const { Item } = Form;

@connect(null, { getUserAsync })
@Form.create()
class Login extends Component {
  // 表单校验函数
  validator = (rule, value, callback) => {
    /*
      rule 用来获取当前校验的是哪个表单/Input
      value 当前表单项的值
      callback 不管校验成功还是失败 必须调用的函数
        callback() 代表校验成功
        callback('xxx') 代表校验失败
    */
    const name = rule.field === "username" ? "用户名" : "密码";

    if (!value) {
      // 说明没有值
      callback("请输入" + name);
    } else if (value.length < 4) {
      callback(name + "长度至少大于4位");
    } else if (value.length > 13) {
      callback(name + "长度不能大于13位");
    } else if (!/\w/.test(value)) {
      callback(name + "只能包含英文、数字和下划线");
    } else {
      // 注意callback必须调用
      callback();
    }
  };

  // 登录
  login = e => {
    e.preventDefault();
    // 缓存一下
    const { form } = this.props;

    // 校验表单并获取表单项的值
    form.validateFields((err, values) => {
      /*
        err 校验后的错误信息
        values 表单项的值 
      */
      if (!err) {
        // 校验成功
        // console.log(values); // 收集表单数据
        const { username, password } = values;
        // 发送请求，请求登录
        this.props
          .getUserAsync(username, password)
          .then(response => {
            console.log(response);

            this.props.history.push("/");
          })
          .catch(err => {
            // 清空密码
            form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    // getFieldDecorator方法也是一个高阶组件用法
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <Form onSubmit={this.login}>
            <h3>用户登录</h3>
            <Item>
              {getFieldDecorator("username", {
                // 表单校验规则
                rules: [
                  // 一般适用于只有一条校验规则
                  /* {
                    required: true, // 必填项
                    message: "请输入用户名" // 一旦表单校验失败提示的错误信息
                  },
                  {
                    min: 4,
                    message: "用户名长度至少大于4位"
                  },
                  {
                    max: 13,
                    message: "用户名长度不能大于13位"
                  },
                  {
                    pattern: /\w/,
                    message: "用户名只能包含英文、数字和下划线"
                  } */
                  {
                    // 适用于多条校验规则，并可复用
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" className="login-icon" />}
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" className="login-icon" />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              {/* htmlType="submit" 设置原生type */}
              <Button type="primary" className="login-btn" htmlType="submit">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

// Form.create方法是一个高阶组件用法。 作用：给组件传递form属性
// export default Form.create()(Login);

export default Login;
