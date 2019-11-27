import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal } from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { getRolesAsync } from "../../redux/action-creators/role";
import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";

const RadioGroup = Radio.Group;

@connect(state => ({ roles: state.roles }), { getRolesAsync })
class Role extends Component {
  state = {
    value: "", //单选的默认值，也就是选中的某个角色的id值
    addRoleModalVisible: false, //是否展示创建角色的标识
    updateRoleModalVisible: false, //是否展示设置角色的标识
    isDisabled: false
  };

  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRolesAsync();
    }
  }

  columns = [
    {
      dataIndex: "_id",
      render: id => <Radio value={id} />
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: time => time && dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  onRadioChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({ [key]: value });
    };
  };

  //创建角色的回调函数
  addRole = () => {};
  //设置角色权限的回调函数
  updateRole = () => {};

  render() {
    const {
      value,
      isDisabled,
      addRoleModalVisible,
      updateRoleModalVisible
    } = this.state;

    const { roles } = this.props;

    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("addRoleModalVisible", true)}
            >
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.switchModal("updateRoleModalVisible", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <RadioGroup
          onChange={this.onRadioChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper: true
            }}
          />
        </RadioGroup>

        <Modal
          title="创建角色"
          visible={addRoleModalVisible}
          onOk={this.addRole}
          onCancel={this.switchModal("addRoleModalVisible", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={updateRoleModalVisible}
          onOk={this.updateRole}
          onCancel={this.switchModal("updateRoleModalVisible", false)}
        >
          <UpdateRoleForm
            wrappedComponentRef={form => (this.updateRoleForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
