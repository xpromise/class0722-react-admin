import React, { Component } from "react";
import { Form, Input } from "antd";

@Form.create()
class AddCategoryForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="品类名称">
          {getFieldDecorator("categoryName", {
            rules: [{ required: true, message: "请输入分类名称" }]
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default AddCategoryForm;
