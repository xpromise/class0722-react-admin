import React, { Component } from "react";
import { Card, Form, Input, Select, Icon, InputNumber, Button } from "antd";
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creators/category";
import Editor from "./editor";

@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class AddProductForm extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      // 发送请求，请求分类数据
      this.props.getCategoriesAsync();
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
          <Form.Item label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品描述">
            <Input placeholder="请输入商品描述" />
          </Form.Item>
          <Form.Item label="商品分类">
            <Select placeholder="请选择商品分类">
              {categories.map(category => (
                <Select.Option value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="商品价格">
            <InputNumber
              style={{ width: 150 }}
              formatter={value =>
                `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\￥\s?|(,*)/g, "")}
              // onChange={onChange}
            />
          </Form.Item>
          <Form.Item label="商品详情" wrapperCol={{ span: 22 }}>
            <Editor />
          </Form.Item>
          <Form.Item>
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default AddProductForm;
