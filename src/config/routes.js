import Loadable from "react-loadable";
import {
  Spin
} from 'antd';

const Home = Loadable({
  loader: () => import('../components/home'),
  loading: Spin
})
const Login = Loadable({
  loader: () => import('../containers/login'),
  loading: Spin
})
const NotMatch = Loadable({
  loader: () => import('../components/not-match'),
  loading: Spin
})
const Category = Loadable({
  loader: () => import('../containers/category'),
  loading: Spin
})
const User = Loadable({
  loader: () => import('../containers/user'),
  loading: Spin
})
const Role = Loadable({
  loader: () => import('../containers/role'),
  loading: Spin
})
const Product = Loadable({
  loader: () => import('../components/product'),
  loading: Spin
})
const ProductForm = Loadable({
  loader: () => import('../components/product/product-form'),
  loading: Spin
})
const ProductDetail = Loadable({
  loader: () => import('../components/product/product-detail'),
  loading: Spin
})
const Line = Loadable({
  loader: () => import('../components/charts/line'),
  loading: Spin
})
const Pie = Loadable({
  loader: () => import('../components/charts/pie'),
  loading: Spin
})
// import withErrorBoundary from '../components/error-boundary';


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
    path: '/charts/line',
    component: Line,
    exact: true
  },
  {
    path: '/charts/pie',
    component: Pie,
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