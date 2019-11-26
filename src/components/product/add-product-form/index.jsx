import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Icon,
  InputNumber,
  Button,
  message
} from "antd";
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creators/category";
import { reqAddProduct } from "../../../api";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "./index.less";

@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class AddProductForm extends Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  };

  componentDidMount() {
    if (!this.props.categories.length) {
      // 发送请求，请求分类数据
      this.props.getCategoriesAsync();
    }
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  validator = (rule, value, callback) => {
    if (!value || value.isEmpty()) {
      callback("请输入商品详情");
    } else {
      callback();
    }
  };

  addProduct = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, price, categoryId, editorState } = values;
        const detail = editorState.toHTML();
        // 发送请求添加商品
        await reqAddProduct({ name, desc, price, categoryId, detail });
        // 跳转到商品列表页面，提示添加成功
        message.success("添加商品成功~");
        this.props.history.push("/product");
      }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      categories,
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" className="go-back" onClick={this.goBack} />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          onSubmit={this.addProduct}
        >
          <Form.Item label="商品名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [{ required: true, message: "请输入商品描述" }]
            })(<Input placeholder="请输入商品描述" />)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [{ required: true, message: "请选择商品分类" }]
            })(
              <Select placeholder="请选择商品分类">
                {categories.map(category => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入商品价格" }]
            })(
              <InputNumber
                style={{ width: 150 }}
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\￥\s?|(,*)/g, "")}
                // onChange={onChange}
              />
            )}
          </Form.Item>
          <Form.Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("editorState", {
              validateTrigger: "onBlur", // 校验子节点的时机（失去焦点在进行表单校验）
              rules: [
                {
                  required: true,
                  validator: this.validator
                }
              ]
            })(
              <BraftEditor
                className="rich-text-editor"
                // controls={controls}
                // value={editorState}
                // onChange={this.handleEditorChange}
                placeholder="请输入商品详情"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default AddProductForm;
