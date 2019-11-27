import Home from '../components/home';
import Login from '../containers/login';
import NotMatch from '../components/not-match';
import Category from '../containers/category';
import User from '../containers/user';
import Role from '../containers/role';
import Product from '../components/product';
import ProductForm from '../components/product/product-form';
import ProductDetail from '../components/product/product-detail';

// 需要进行权限校验
const authRoutes = [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/category',
    component: Category,
    exact: true
  },
  {
    path: '/user',
    component: User,
    exact: true
  },
  {
    path: '/role',
    component: Role,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/product/add',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/update/:id',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    exact: true
  },
  {
    component: NotMatch, // 404组件必须是最后一个
  },
]

// 不需要
const noAuthRoutes = [{
  path: '/login',
  component: Login,
  exact: true
}]

export {
  authRoutes,
  noAuthRoutes
}