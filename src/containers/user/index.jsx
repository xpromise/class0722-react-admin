import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { reqGetUsers, reqAddUser } from "../../api";
import { getRolesAsync } from "../../redux/action-creators/role";

import AddUserForm from "./add-user-form";
import UpdateUserForm from "./update-user-form";

@connect(state => ({ roles: state.roles }), { getRolesAsync })
class User extends Component {
  state = {
    users: [], //用户数组
    addUserModalVisible: false, //是否展示创建用户的标识
    updateUserModalVisible: false //是否展示更新用户的标识
  };

  componentDidMount() {
    reqGetUsers().then(res => {
      this.setState({
        users: res
      });
    });

    if (!this.props.roles.length) {
      this.props.getRolesAsync();
    }
  }

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
      dataIndex: "roleId",
      render: id => {
        const role = this.props.roles.find(role => {
          return role._id === id;
        });
        return role && role.name;
      }
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
  addUser = () => {
    const form = this.addUserForm.props.form;
    form.validateFields(async (err, values) => {
      if (!err) {
        const result = await reqAddUser(values);
        message.success("添加用户成功");
        form.resetFields();
        this.setState({
          addUserModalVisible: false,
          users: [...this.state.users, result]
        });
      }
    });
  };

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
            roles={this.props.roles}
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
