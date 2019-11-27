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
import { reqAddProduct, reqGetProduct, reqUpdateProduct } from "../../../api";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "./index.less";

@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductForm extends Component {
  state = {
    // 初始化为null，保证没有数据的时候
    // 不会进入BraftEditor.createEditorState(product.detail)初始化一个空P标签
    product: null
  };

  componentDidMount() {
    if (!this.props.categories.length) {
      // 发送请求，请求分类数据
      this.props.getCategoriesAsync();
    }
    if (!this.props.location.state) {
      reqGetProduct(this.props.match.params.id).then(res => {
        this.setState({
          product: res
        });
      });
    }
  }

  validator = (rule, value, callback) => {
    // 如果数据为空也要报错
    // 如果有数据，数据是editorState。需要调用它的isEmpty方法来判断是否为空
    if (!value || value.isEmpty()) {
      callback("请输入商品详情");
    } else {
      callback();
    }
  };

  addProduct = e => {
    e.preventDefault();
    // 校验表单收集数据
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, price, categoryId, editorState } = values;
        const detail = editorState.toHTML();

        let content = "添加";
        const { pathname, state } = this.props.location;
        // 判断是添加/更新商品
        if (pathname.startsWith("/product/update/")) {
          // 因为productId可能来自state（由点击修改按钮传递过来的）也可能来自于发送请求请求来的product
          const productId = state ? state._id : this.state.product._id;
          await reqUpdateProduct({
            name,
            desc,
            price,
            categoryId,
            detail,
            productId
          });
          content = "更新";
        } else {
          // 发送请求添加商品
          await reqAddProduct({ name, desc, price, categoryId, detail });
        }
        // 跳转到商品列表页面，提示成功
        message.success(content + "商品成功~");
        // 一般先把当前页面的事全部干完，在跳转到其他地址
        this.props.history.push("/product");
      }
    });
  };

  // 回退按钮回调函数
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      categories,
      form: { getFieldDecorator },
      location: { pathname, state }
    } = this.props;

    // 初始化为null保证添加商品时不会初始化数据
    // 更新商品product的值就不为空了
    let product = null;
    // 判断添加商品还是修改商品
    if (pathname.startsWith("/product/update/")) {
      // 是更新商品
      // 因为productId可能来自state（由点击修改按钮传递过来的）也可能来自于发送请求请求来的product
      product = state || this.state.product;
    }

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
              rules: [{ required: true, message: "请输入商品名称" }],
              initialValue: product ? product.name : ""
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [{ required: true, message: "请输入商品描述" }],
              initialValue: product ? product.desc : ""
            })(<Input placeholder="请输入商品描述" />)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [{ required: true, message: "请选择商品分类" }],
              initialValue: product ? product.categoryId : ""
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
              rules: [{ required: true, message: "请输入商品价格" }],
              initialValue: product ? product.price : ""
            })(
              <InputNumber
                style={{ width: 150 }}
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
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
              ],
              // initValue如果设置多次有效值，第一次生效，后面的没用
              initialValue: product
                ? BraftEditor.createEditorState(product.detail)
                : ""
            })(
              <BraftEditor
                className="rich-text-editor"
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

export default ProductForm;
