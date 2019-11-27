import React, { Component } from "react";
import { Form, Input, Select } from "antd";

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class UpdateUserForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {getFieldDecorator("username", { initialValue: "" })(
            <Input placeholder="请输入用户名" />
          )}
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone", { initialValue: "" })(
            <Input placeholder="请输入手机号" />
          )}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email", { initialValue: "" })(
            <Input placeholder="请输入邮箱" />
          )}
        </Item>
        <Item label="角色">
          {getFieldDecorator("roleId")(
            <Select placeholder="请选择分类">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default UpdateUserForm;
