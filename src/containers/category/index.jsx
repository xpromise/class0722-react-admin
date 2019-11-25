import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import {
  getCategoriesAsync,
  addCategoryAsync
} from "../../redux/action-creators/category";

import AddCategoryForm from "./add-category-form";

@connect(state => ({ categories: state.categories }), {
  getCategoriesAsync,
  addCategoryAsync
})
class Category extends Component {
  state = {
    addCategoryVisible: false
  };

  componentDidMount() {
    this.props.getCategoriesAsync();
  }

  columns = [
    {
      title: "品类名称", // 表头
      dataIndex: "name" // 找data里面key，取value
      // render: text => <a>{text}</a> // 指定表中数据如何渲染
    },
    {
      title: "操作",
      // className: "column-money", // 给列添加类名
      // dataIndex: "money",
      render: () => {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];

  // 添加分类
  addCategory = () => {
    this.addCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        // 发送请求（更新后台数据），更新redux数据
        // 方法返回值看action-creators里面函数(dispatch)的返回值
        await this.props.addCategoryAsync(categoryName);
        // 添加分类完成，才隐藏对话框
        this.hidden();
      }
    });
  };

  hidden = () => {
    // 清空表单数据
    this.setState({
      addCategoryVisible: false
    });
    setTimeout(() => {
      this.addCategoryForm.props.form.resetFields();
    }, 500);
  };

  show = () => {
    this.setState({
      addCategoryVisible: true
    });
  };

  render() {
    const { categories } = this.props;
    const { addCategoryVisible } = this.state;

    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.show}>
              <Icon type="plus" />
              分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3
            }}
          />
        </Card>

        <Modal
          title="添加分类"
          visible={addCategoryVisible}
          onOk={this.addCategory}
          onCancel={this.hidden}
          width={300}
        >
          <AddCategoryForm
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>
      </div>
    );
  }
}

export default Category;
