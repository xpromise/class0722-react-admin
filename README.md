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

## 4、封装 axios 拦截器

1. 创建 axios 实例

- 初始化公共的配置
- 执行流程：
  - 请求拦截器回调
  - 发送请求
  - 响应拦截器回调
  - 最后绑定的 then/catch 回调

2. 设置请求拦截器

- 配置变化的请求信息
  - post / content-type
  - token

3. 设置响应拦截器

- 处理 成功 / 失败

## 5、redux 开发流程

1. 先定义 action-creators

- 定义同步/异步
  - 如果要发送请求，就定义异步
  - 如果不要发送请求，就定义同步

2. 定义 action-types

3. 定义 reducer

4. 通过 connect 高阶组件给 UI 组件传递 redux 数据

5. 组件在使用传递过来的 redux 数据

## 6、登录验证高阶组件

1. 需求：需要进行登录验证，才能访问 home 组件
2. 分析：所有组件都要进行登录验证，所以统一封装一个高阶组件去复用代码
3. 思路：

- 如果用户在/login this.props.location.path
  - 如果用户登录过，去 / redux 中 user 中 token
  - 如果用户没有登录过，不动
- 如果用户在非 /login
  - 如果用户登录过，不动
  - 如果用户没有登录过，/login

4. 所有组件都要包装 withCheckLogin 组件（这里存在问题，要包好多次）

- 交给公共的父组件做登录检查，子组件就不用做了

## 7、验证 token

1. 需求：用户可能在本地 localStorage 中伪造 token
2. 解决：不用刻意向服务器发送请求验证 token，只需要正常发送请求，一旦在 home 组件发送请求都要 token。一旦 token 出错服务器会返回一个 401 的错误状态码
3. 思路：

- 统一在响应拦截器中错误回调函数判断状态码是否是 401
  - 如果是，就要清空本地数据（localStorage、redux）
    - redux 数据因为不是组件不能使用 connect 方法，只能通过 store.dispatch 更新
  - 最后跳转到 /login 重新登录
    - 因为不是组件获取不到路由组件的三大属性，从而不能 history.push。此时需要修改路由的配置
    - 通过对 react-router-dom 中 BrowserRouter 的源代码查看，BrowserRouter 就是由 react-router 中 Router + 传入 history 属性组成的
    - 所以需要将 react-router-dom 中 BrowserRouter 改成 react-router 中 Router + 传入 history 属性，此时就能得到 history 属性
    - 将 history 定义成模块去复用，从而拦截器函数中可以使用了

## 8、完成 BasicLayout 静态组件

- 具体代码参照 antd 中 Menu 组件配置

## 9、LeftNav 功能

- 需求：刷新网页时，要选中当前网址对应的菜单
  - 需要通过 pathname 得到当前地址（因为组件不是路由组件，所以通过 withRouter 传递三大属性）
  - 将菜单遍历的 key 设置为 menu.path
  - 给最外层 Menu 设置 defaultSelectedKeys={[pathname]}
- 需求：刷新网页时，要展开当前网址对应的一级菜单
  - 需要通过 pathname 得到当前地址（因为组件不是路由组件，所以通过 withRouter 传递三大属性）
  - 将菜单遍历的 key 设置为 menu.path
  - 因为 pathname 和二级菜单的 path 一致，说明是选中了二级菜单，但是要展开的是一级菜单。所以通过遍历查找得到一级菜单的 path
  - 给最外层 Menu 设置 defaultOpenKeys={[openKey]}

## 10、国际化功能

- react-i18next https://github.com/i18next/react-i18next/

- 配置：

  - 定义 i18n.js 国际化配置文件 https://github.com/i18next/react-i18next/blob/master/example/react/src/i18n.js
  - 在 index.js 入口文件引入使用
  - 定义语言包
    - public/locales/en/translation.json
    - public/locales/zh/translation.json
    - public/locales/zh-CN/translation.json

- 使用：

  - useTranslation react hooks 用法
  - withTranslation 高阶组件用法（给组件传递 t、i18n）
    - t 用来切换显示（根据当前语言环境，选择使用哪个语言包加载）
    - i18n
      - changeLanguage() 用来切换语言
      - language 用来获取当前语言
  - Trans 组件用法

- menus 菜单需要重复创建
  - 因为点击切换语言时，重新渲染组件，如果菜单没有重新创建，就不会切换语言

## 11、添加商品

1. 分类数据动态展示

- 需求：需要获取分类数据（如果之前获取过，就不要获取了）
- 解决：1. 先判断有没有，如果没有在获取 2. 只要请求一次即可
  ```
  componentDidMount() {
    if (!this.props.categories.length) {
      // 发送请求，请求分类数据
      this.props.getCategoriesAsync();
    }
  }
  ```
- 注意：addProductForm 要修改，同时 Category 组件也要修改

2. 富文本编辑器

- 在 antd 社区精选组件上查看 https://ant.design/docs/react/recommendation-cn
- 使用 braft-editor 组件开发富文本编辑器
- 具体使用看文档 https://www.yuque.com/braft-editor/be/lzwpnr

## 开发中遇到跨域问题

- 服务器代理
  - 正向代理：翻墙工具
    - 原理：
      - 浏览器发送请求到代理服务器(3000)上（浏览器代码是由代理服务器运行的，他们之间没有跨域问题）
      - 代理服务器(3000)将请求转发到目标服务器(5000)上(服务器之间没有跨域问题)
      - 代理服务器(3000)将接受到响应结果转发给浏览器
    - 配置：
      - 在 package.json 中配置： proxy: http://localhost:5000
      - 此时，浏览器就只需要向代理服务器发送请求即可，所以请求地址要改成代理服务器地址
      - 配置需要重启才能生效
  - 反向代理：nginx
    - 所有请求都向nginx服务器(80)发送, 由nginx服务器负责转发
    ```
    server {
        listen       80;
        server_name  localhost;
        
        # 接受到以 / 开头的请求（因为请求都是以 / 开头，所以匹配所有请求）
        location / {
            # 将请求转发到 http://localhost:3000
            proxy_pass http://localhost:3000;
        }

        location /api/ {
            # 将请求转发到 http://localhost:5000
            proxy_pass http://localhost:5000;
        }

    }
    ```