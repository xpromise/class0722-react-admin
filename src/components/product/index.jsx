import React, { Component } from "react";
import { Card, Table, Select, Input, Button, Icon, message } from "antd";

import {
  reqGetProducts,
  reqUpdateProductStatus,
  reqSearchProducts
} from "../../api";

import "./index.less";

export default class Product extends Component {
  state = {
    products: [],
    total: 0,
    searchType: "productName",
    searchValue: "",
    current: 1,
    pageSize: 3
  };

  isSearch = false; // 是否点击过搜索按钮
  currentSearchValue = ""; // 点击搜索按钮时缓存的搜索关键字

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

  /*
    1. 什么情况搜索商品，什么情况全部商品
      - 看是否有searchValue
    2. 如果在第二页，点击搜索，显示的是第一页数据
      - 原因：搜索传递的参数固定是 1 3 --> 永远搜的是第一页 3条数据
      - 解决：将 current当前页数 受控起来
    3. 输入iphone，没有点击搜索按钮。 不按照关键字去搜，而搜全部商品（一定要点击搜索按钮，才按照关键字去搜）  
      问题二：第一次输入内容1，点击搜索。 第二次输入内容2，没有点击搜索。 搜索关键字是内容1还是内容2
      总结：必须点击搜索按钮才能搜索
  */
  // 获取商品
  getProducts = async (pageNum, pageSize) => {
    const { searchType } = this.state;

    let result = null;

    if (this.isSearch) {
      // 搜索商品
      result = await reqSearchProducts({
        searchType,
        searchValue: this.currentSearchValue,
        pageNum,
        pageSize
      });
    } else {
      // 全部商品
      result = await reqGetProducts(pageNum, pageSize);
    }

    this.setState({
      products: result.list,
      total: result.total,
      current: pageNum,
      pageSize
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

  selectChange = value => {
    this.setState({
      searchType: value
    });
  };

  inputChange = e => {
    this.setState({
      searchValue: e.target.value.trim()
    });
  };

  search = () => {
    const { current, pageSize, searchValue } = this.state;

    // 点击过搜索按钮
    this.isSearch = true;
    // 缓存当前搜索value
    this.currentSearchValue = searchValue;

    this.getProducts(current, pageSize);
  };

  componentDidMount() {
    this.getProducts(1, 3);
  }

  render() {
    const { products, total, searchType, current, pageSize } = this.state;

    return (
      <Card
        title={
          <div>
            <Select value={searchType} onChange={this.selectChange}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              className="search-input"
              onChange={this.inputChange}
            />
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
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
            pageSize, // 每页条数
            total, // 总数
            onChange: this.getProducts, // 页码发生改变事件
            onShowSizeChange: this.getProducts, // pageSize 变化的回调
            current // 当前页数
          }}
        />
      </Card>
    );
  }
}
