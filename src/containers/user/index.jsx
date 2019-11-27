import React, { Component } from "react";
import { Card, Button, Table, Modal } from "antd";
import dayjs from "dayjs";

import AddUserForm from "./add-user-form";
import UpdateUserForm from "./update-user-form";

class User extends Component {
  state = {
    users: [
      {
        _id: "5c7dafe855fb843490b93a49",
        createTime: 1551740904866,
        email: "aaa@aaa.com",
        phone: "123456789",
        roleId: "5c7d222c12d5e51908cc0380",
        username: "aaa"
      }
    ], //用户数组
    addUserModalVisible: false, //是否展示创建用户的标识
    updateUserModalVisible: false //是否展示更新用户的标识
  };

  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId"
    },
    {
      title: "操作",
      render: user => {
        return (
          <div>
            <Button type="link" onClick={() => {}}>
              修改
            </Button>
            <Button type="link" onClick={() => {}}>
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  // 创建用户的回调函数
  addUser = () => {};

  // 更新用户的回调函数
  updateUser = () => {};

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      });
    };
  };

  render() {
    const { users, addUserModalVisible, updateUserModalVisible } = this.state;

    return (
      <Card
        title={
          <Button
            type="primary"
            onClick={this.switchModal("addUserModalVisible", true)}
          >
            创建用户
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true
          }}
        />

        <Modal
          title="创建用户"
          visible={addUserModalVisible}
          onOk={this.addUser}
          onCancel={this.switchModal("addUserModalVisible", false)}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
          />
        </Modal>

        <Modal
          title="更新用户"
          visible={updateUserModalVisible}
          onOk={this.updateUser}
          onCancel={this.switchModal("updateUserModalVisible", false)}
        >
          <UpdateUserForm
            wrappedComponentRef={form => (this.updateUserForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
