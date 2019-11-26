import React, { Component } from "react";
import { Card, Table, Select, Input, Button, Icon, message } from "antd";

import { reqGetProducts, reqUpdateProductStatus } from "../../api";

import "./index.less";

export default class Product extends Component {
  state = {
    products: [],
    total: 0
  };

  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "状态",
      // dataIndex: "status", // 当你设置dataIndex，render方法得到一个值
      render: product => {
        const status = product.status;
        return (
          <div>
            <Button type="primary" onClick={this.updateProductStatus(product)}>
              {status === 1 ? "上架" : "下架"}
            </Button>
            {status === 1 ? "已下架" : "已上架"}
          </div>
        );
      }
    },
    {
      title: "操作", // 如果没有设置dataIndex，render方法得到整个对象
      render: product => {
        return (
          <div>
            <Button type="link" onClick={this.showProductDetail(product)}>
              详情
            </Button>
            <Button type="link" onClick={this.showUpdateProductForm(product)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];
  // 更新商品状态
  updateProductStatus = product => {
    return () => {
      const productId = product._id;
      const status = 3 - product.status;
      reqUpdateProductStatus(productId, status).then(res => {
        message.success("更新商品状态成功");
        // 更新前端数据
        this.setState({
          products: this.state.products.map(product => {
            if (product._id === productId) {
              return { ...product, status };
            }
            return product;
          })
        });
      });
    };
  };

  // 获取商品
  getProducts = async (pageNum, pageSize) => {
    const result = await reqGetProducts(pageNum, pageSize);
    this.setState({
      products: result.list,
      total: result.total
    });
  };

  showProductDetail = product => {
    return () => {
      this.props.history.push("/product/" + product._id, product);
    };
  };

  showAddCategoryForm = () => {
    this.props.history.push("/product/add");
  };

  showUpdateProductForm = product => {
    return () => {
      // 地址后面加上id --> 为了在更新商品页面刷新时能够获取到商品id --> 通过id发送请求获取商品数据
      // 第二个参数传入product，组件就能通过location.state获取
      this.props.history.push("/product/update/" + product._id, product);
    };
  };

  componentDidMount() {
    this.getProducts(1, 3);
  }

  render() {
    const { products, total } = this.state;

    return (
      <Card
        title={
          <div>
            <Select value={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="search-input" />
            <Button type="primary">搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddCategoryForm}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            total, // 总数
            onChange: this.getProducts, // 页码发生改变事件
            onShowSizeChange: this.getProducts // pageSize 变化的回调
          }}
        />
      </Card>
    );
  }
}
