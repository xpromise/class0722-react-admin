import React, { Component } from "react";
import { Card, Table, Select, Input, Button, Icon } from "antd";

import { reqGetProducts } from "../../api";

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
      dataIndex: "status",
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            已下架
          </div>
        );
      }
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      }
    }
  ];

  // 获取商品
  getProducts = async (pageNum, pageSize) => {
    const result = await reqGetProducts(pageNum, pageSize);
    this.setState({
      products: result.list,
      total: result.total
    });
  };

  showAddCategoryForm = () => {
    this.props.history.push('/product/add');
  }

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
