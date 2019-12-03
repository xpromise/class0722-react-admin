import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Select } from "antd";

const Item = Form.Item;
const Option = Select.Option;

const AddUserForm = forwardRef(({ form, roles }, ref) => {
  const { getFieldDecorator } = form;
  // 外面通过ref获取的值由useImperativeHandle指定
  useImperativeHandle(
    ref,
    () => {
      // 获取的值就是form
      // 通过form就能够对表单进行操作~
      return {
        form
      };
    },
    []
  );

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
      <Item label="用户名">
        {getFieldDecorator("username")(<Input placeholder="请输入用户名" />)}
      </Item>
      <Item label="密码">
        {getFieldDecorator("password")(
          <Input placeholder="请输入密码" type="password" />
        )}
      </Item>
      <Item label="手机号">
        {getFieldDecorator("phone")(<Input placeholder="请输入手机号" />)}
      </Item>
      <Item label="邮箱">
        {getFieldDecorator("email")(<Input placeholder="请输入邮箱" />)}
      </Item>
      <Item label="角色">
        {getFieldDecorator("roleId")(
          <Select placeholder="请选择分类">
            {roles.map(role => {
              return (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        )}
      </Item>
    </Form>
  );
});

export default Form.create()(AddUserForm);
