import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback
} from "react";
import { Card, Button, Table, Modal, message } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { getRolesAsync } from "../../redux/action-creators/role";
import { reqGetUsers, reqAddUser } from "../../api";
import AddUserForm from "./add-user-form";

function User({ roles, getRolesAsync }) {
  // 设置loading状态
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  let addUserForm = null;

  // 发送请求、请求数据
  // []代表如果里面值不发生变化就不会调用, 没有值，所以该函数只会调用一次，
  // 相当于componentDidMount
  useEffect(() => {
    // 判断
    if (!roles.length) {
      getRolesAsync();
    }

    reqGetUsers().then(res => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  // 缓存结果
  const columns = useMemo(() => {
    return [
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
        render: time => time && dayjs(time).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "所属角色",
        dataIndex: "roleId",
        render: id => {
          const role = roles.find(role => role._id === id);
          return role ? role.name : "";
        }
      },
      {
        title: "操作",
        render() {
          return (
            <Fragment>
              <Button type="link">修改</Button>
              <Button type="link">删除</Button>
            </Fragment>
          );
        }
      }
    ];
  }, [roles]);

  // 缓存函数
  const hidden = useCallback(() => {
    setAddUserModalVisible(false);
  }, []);
  const show = useCallback(() => {
    setAddUserModalVisible(true);
  }, []);

  // 添加用户
  const addUser = () => {
    addUserForm.form.validateFields((err, values) => {
      if (!err) {
        reqAddUser(values).then(res => {
          message.success("添加用户成功~");
          addUserForm.form.resetFields();
          setUsers([...users, res]);
        });
      }
    });
  };

  return (
    <Card
      title={
        <Button type="primary" onClick={show}>
          添加用户
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        bordered
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showQuickJumper: true
        }}
        loading={loading}
      />

      <Modal
        title="创建用户"
        visible={addUserModalVisible}
        onOk={addUser}
        onCancel={hidden}
      >
        <AddUserForm
          roles={roles}
          wrappedComponentRef={form => (addUserForm = form)}
        />
      </Modal>
    </Card>
  );
}

export default connect(state => ({ roles: state.roles }), { getRolesAsync })(
  User
);
