# React 后台管理项目

## 1、初始化项目

1. 创建项目

- create-react-app xxx

2. git 管理

- 本地管理
  - git add .
  - git commit -m 'xxx'
  - git push origin xxx
- 分支管理
  - git checkout xxx 切换分支
  - git checkout -b xxx 新建并切换分支
  - git branch 查看分支
- 远程仓库管理
  - git remote add origin xxx 关联仓库
  - git clone xxx 克隆仓库
  - git fetch origin aaa:bbb 拉取远程仓库 aaa 分支到本地 bbb 分支上
- 解决:git 不能保存用户名和密码
  - git config --global credential.helper store
- 配置 SSH
  - 打开 git bash。
  - 使用 cd ~/.ssh 可以查看是否已配置 SSH（如果有配置就直接跳到最后一步）。
  - 执行生成公钥和私钥的命令 ssh-keygen -t rsa 并按回车 3 下（为什么按三下，是因为有提示你是否需要设置密码，如果设置了每次使用 Git 都会用到密码，一般都是直接不写为空，直接回车就好了）。会在一个文件夹里面生成一个私钥 id_rsa 和一个公钥 id_rsa.pub。（可执行 start ~命令，生成的公私钥在 .ssh 的文件夹里面）。
  - 复制公钥 id_rsa.pub 到 github 上配置 SSH。

## 2、项目初始化配置

1. 初始化 antd 配置

- 按需加载
- 自定义主题
  - 具体配置参照 antd 官网

2. 初始化 redux 配置

- 完成 4 个基本模块编写
- 满足多人协同开发需求

3. 初始化路由配置

- 定义 routes.js 配置文件
- 在 App.jsx 中遍历生成路由
  - 所有路由 1 对 1 严格匹配
  - 路径匹配不上返回 404 组件

## 3、完成 Login 组件

1. 完成静态组件
2. 完成动态组件

- 表单校验
  - Form.create()(Login) 高阶组件: 给 Login 组件传递 form 属性 （复用 form）
  - form 对象上面有很多操作表单的方法
    - getFieldDecorator 用于做表单校验
      - getFieldDecorator('key', { rules: [ {required: true, message: ''}, {} ] })(<Input />)
      - getFieldDecorator('key', { rules: [ {validator: this.validator} ] })(<Input />)
    - resetFields 用于重置表单项
    - validateFields 用于校验并收集表单数据
- 登录功能
  - Form 绑定 onSubmit 事件，Button 设置 htmlType 属性
    - onSubmit 事件禁止默认行为
  - validateFields 校验并收集表单数据
  - 校验成功，发送请求，请求登录 axios

## redux 开发流程

1. 先定义 action-creators

- 定义同步/异步
  - 如果要发送请求，就定义异步
  - 如果不要发送请求，就定义同步

2. 定义 action-types

3. 定义 reducer

4. 通过 connect 高阶组件给 UI 组件传递 redux 数据

5. 组件在使用传递过来的 redux 数据
