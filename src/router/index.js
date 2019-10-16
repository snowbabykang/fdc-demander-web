import Router from 'vue-router'

import center from '../components/center'
import Main from '../components/Main'
import forgetPsdMain from '../components/forgetPsdMain'
const NotFound = () => import(/* webpackChunkName: "notfound" */ '../components/404')
const Login = () => import(/* webpackChunkName: "login" */ '../views/login')
const verifyIdentity = () => import(/* webpackChunkName: "forgetpsd" */ '../views/verifyIdentity')
const resetPsd = () => import(/* webpackChunkName: "forgetpsd" */ '../views/resetPsd')
const finishPsd = () => import(/* webpackChunkName: "forgetpsd" */ '../views/finishPsd')

const Home = () => import(/* webpackChunkName: "index" */ '../views/home')
const News = () => import(/* webpackChunkName: "news" */ '../views/news')
const Register = () => import(/* webpackChunkName: "register" */ '../views/register')
const Services = () => import(/* webpackChunkName: "services" */ '../views/services')
const Shop = () => import(/* webpackChunkName: "shop" */ '../views/shop')
const PersonalCertificate = () => import(/* webpackChunkName: "index" */ '../views/personalCertificate')
const Address = () => import(/* webpackChunkName: "index" */ '../views/address')
const ServiceDetail = () => import(/* webpackChunkName: "serviceDetail" */ '../views/serviceDetail')
const Entering = () => import(/* webpackChunkName: "entering" */ '../views/entering')
const NewsList = () => import(/* webpackChunkName: "newsList" */ '../views/newsList')

const orderList = () => import(/* webpackChunkName: "order" */ '../views/orderlist')
const orderConfirm = () => import(/* webpackChunkName: "order" */ '../views/orderconfirm')
const orderPay = () => import(/* webpackChunkName: "order" */ '../views/orderpay')
const orderDetail = () => import(/* webpackChunkName: "order" */ '../views/orderdetail')
const pay = () => import(/* webpackChunkName: "order" */ '../views/pay')
const recharge = () => import(/* webpackChunkName: "order" */ '../views/recharge')



Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
      path: '/register',
      component: Register,
      name: '',
      hidden: true
    },
    // {
    //     path: '/404',
    //     component: NotFound,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/forgotpsd',
        component: forgetPsdMain,
        meta: {title: '重置密码' },
        name: '' ,
        children: [
            { path: '/verifyIdentity', component: verifyIdentity, name: '验证身份',meta: {title: '验证身份' }},
            { path: '/resetPsd', component: resetPsd, name: '重置密码',meta: {title: '重置密码' }},
            { path: '/finishPsd', component: finishPsd, name: '完成',meta: {title: '重置密码' }},
        ]
    },
    {
        path: '/',
        component: Main,
        meta: {title: '首页' },
        name: '' ,
        children: [          //nobg   内容无背景色
            { path: '/', component: Home, name: '首页',meta : {nobg : 1}},
            { path: '/404', component: NotFound, name: '找不到页面'},
            { path: '/news/:id', component: News, name: '新闻'},
            { path: '/services', component: Services, name: '服务'},
            {
                path: '/center',
                component: center,
                meta: {title: '个人中心' },
                name: '' ,
                iconCls: '',
                children: [
                    { path: '/personalcertificate', component: PersonalCertificate, name: '个人认证',meta : {nobg : 1}},
                    { path: '/address', component: Address, name: '收货地址'},
                ]
            },
            { path: '/shop/:id', component: Shop, name: '店铺'},
            { path: '/serviceDetail/:id', component: ServiceDetail, name: '服务详情'},
            { path: '/entering', component: Entering, name: '机构入驻'},
            { path: '/newsList', component: NewsList, name: '新闻列表'},
        ]
    },
    {
        path: '/',
        component: Main,
        meta: {title: '订单' },
        name: '' ,
        children: [
            { path: '/orderList', component: orderList, name: '我的订单'},
            { path: '/orderConfirm/:id', component: orderConfirm, name: '确认订单'},
            { path: '/orderPay/:id', component: orderPay, name: '订单支付'},
            { path: '/orderDetail/:id', component: orderDetail, name: '订单详情',meta : {nobg : 1}},
            { path: '/pay/:id', component: pay, name: '支付页'},
            { path: '/recharge', component: recharge, name: '银联支付'}
        ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' },
    },
]});
