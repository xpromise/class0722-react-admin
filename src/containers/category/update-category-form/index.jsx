import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

@Form.create()
class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };

  validator = (rule, value, callback) => {
    if (value === this.props.categoryName) {
      callback("请修改分类名称，不能与之前一致");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;

    return (
      <Form>
        <Form.Item label="品类名称">
          {getFieldDecorator("categoryName", {
            rules: [
              { required: true, message: "请输入分类名称" },
              { validator: this.validator }
            ], // 表单校验
            initialValue: categoryName // 初始化值
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateCategoryForm;
