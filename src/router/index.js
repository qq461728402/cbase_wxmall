import Vue from 'vue'
import Router from 'vue-router'
const Stores =resolve =>require(['../components/stores.vue'],resolve);//懒加载
const IndexHome = r => require.ensure([], () => r(require('../components/IndexHome')), 'IndexHome')//懒加载
const ChooseCity = r => require.ensure([], () => r(require('../components/pageHome/chooseCity/chooseCity')), 'ChooseCity')//选择城市
const CarProducts = r => require.ensure([], () => r(require('../components/pageHome/carProductsMall/carProducts')), 'CarProducts')//车品商城

const ProductsList = r => require.ensure([], () => r(require('../components/pageHome/carProductsMall/productsList')), 'ProductsList')//商品列表

const ProductsDetail = r => require.ensure([], () => r(require('../components/pageHome/carProductsMall/productsDetail')), 'ProductsDetail')//商品详情

import ReviewsList from '@/components/pageHome/carProductsMall/reviewsList'
import OrderSubmit from '@/components/pageHome/orderSubmit/orderSubmit'
import GetCoupons from '@/components/pageHome/coupons/getcoupons'
import Maintain from '@/components/pageHome/maintain/maintainPackage'
import CarMaintain from '@/components/pageHome/maintain/carMaintain'
import ShoppingCart from '@/components/ShoppingCart'
import PersonalCenter from '@/components/PersonalCenter'
import LoginWithCode from '@/components/personalCenter/loginWithCode'
import CarChoose from '@/components/pageHome/carChoose'
import InsuranceList from '@/components/pageHome/insurance/insuranceList'
import FillInformation from '@/components/pageHome/insurance/fillInformation'
import Insurance_type from '@/components/pageHome/insurance/insurance_type'
import InsuranceSure from '@/components/pageHome/insurance/insuranceSure'
import ChooseCarInfo from '@/components/pageHome/chooseCarInfo/chooseCarInfo'
import Protocol from '@/components/pageHome/orderSubmit/protocol'
import OrderSuccess from '@/components/pageHome/orderSubmit/orderSuccess'
const register = resolve => require.ensure([], () => resolve(require('../components/personalCenter/register')), 'register')//注册
const userProtocol = resolve => require.ensure([], () => resolve(require('../components/personalCenter/userProtocol')), 'userProtocol')//协议
import UserInfo from '@/components/personalCenter/userInfo'
import RePerUserInfo from '@/components/personalCenter/reperUserInfo'
import AddressList from '@/components/personalCenter/addressList'
import AddAddress from '@/components/personalCenter/addAddress'
import MyCoupons from '@/components/personalCenter/myCoupons'
import MyOderList from '@/components/personalCenter/myOderList'
import OrderDetail from '@/components/personalCenter/orderDetail'
import OrderAppraise from '@/components/personalCenter/orderAppraise'
import FillsalesRetrun  from '@/components/personalCenter/salesReturn/fillsalesRetrun'
import SalesRetrunList from '@/components/personalCenter/salesReturn/salesRetrunList'
import SalesRetrunDetail from '@/components/personalCenter/salesReturn/salesRetrunDetail'
import PolicyList from '@/components/personalCenter/policy/policyList'
import PolicyDetail from '@/components/personalCenter/policy/policyDetail'
import GiftList from '@/components/personalCenter/gift/giftList'
import GiftAppoint from '@/components/personalCenter/gift/giftAppoint'
import AboutUs from '@/components/personalCenter/introduct/aboutUs'
import StoresDetail from '@/components/storesDetail'
Vue.use(Router)
const router = new Router({
  hashbang:false,
  // mode: 'history',
  routes: [
    {path: '/', name: 'home',component: IndexHome, meta:{title:'首页',keepAlive:true}},
    {path:'/home/chooseCity',name:'chooseCity',component:ChooseCity,meta:{title:'选择城市',keepAlive:true}},
    {path:"/home/carProducts",name:'carProducts',component:CarProducts,meta:{title:'车品商城',keepAlive:true}},
    {path:"/home/productsList",name:'productsList',component:ProductsList,meta:{title:'商品列表',keepAlive:false}},
    {path:"/home/productsDetail",name:'productsDetail',component:ProductsDetail,meta:{title:'商品详情',keepAlive:false}},
    {path:"/home/reviewsList",name:'reviewsList',component:ReviewsList,meta:{title:'评论列表',keepAlive:false}},
    {path:"/home/orderSubmit",name:'orderSubmit',component:OrderSubmit,meta:{title:'订单提交',keepAlive:false}},
    {path:"/home/protocol",name:'protocol',component:Protocol,meta:{title:'退换货须知',keepAlive:true}},
    {path:"/home/orderSuccess",name:'orderSuccess',component:OrderSuccess,meta:{title:'订单支付成功',keepAlive:false}},
    {path:'/home/getcoupons',name:'getcoupons',component:GetCoupons,meta:{title:'领券中心',keepAlive:false}},
    {path:'/home/carmaintain',name:'carmaintain',component:CarMaintain,meta:{title:'爱车保养',keepAlive:false}},
    {path:'/home/maintain',name:'maintain',component:Maintain,meta:{title:'保养套餐',keepAlive:false}},
    {path:'/home/CarChoose',name:'carchoose',component:CarChoose,meta:{title:'车辆选择',keepAlive:false}},
    {path:'/home/insuranceList',name:'insuranceList',component:InsuranceList,meta:{title:'购买保险',keepAlive:true}},
    {path:'/home/insuranceList/fillInformation',name:'fillInformation',component:FillInformation,meta:{title:'填写车主信息',keepAlive:false}},
    {path:'/home/insuranceList/insurance_type',name:'insurance_type',component:Insurance_type,meta:{title:'选择险种',keepAlive:false}},
    {path:'/home/insuranceList/insuranceSure',name:'insuranceSure',component:InsuranceSure,meta:{title:'险种确认',keepAlive:true}},
    {path:'/home/chooseCarInfo',name:'chooseCarInfo',component:ChooseCarInfo,meta:{title:'选择车辆信息',keepAlive:false}},
    {path:'/stores', name:'stores', component:Stores, meta:{title:'门店',keepAlive:true}},
    {path:'/stores/storesDetail',name:'storesDetail',component:StoresDetail,meta:{title:'门店详情'}},
    {path:'/shoppingCart', name:'shoppingCart', component:ShoppingCart, meta:{title:'购物车',keepAlive:true}},
    {path:'/personalCenter', name:'personalCenter', component:PersonalCenter, meta:{title:'个人中心',keepAlive:true}},
    {path:'/personalCenter/userInfo', name:'userInfo', component:UserInfo, meta:{title:'用户信息',keepAlive:true}},
    {path:'/personalCenter/reperUserInfo', name:'reperUserInfo', component:RePerUserInfo, meta:{title:'用户信息',keepAlive:true}},
    {path:'/personalCenter/addressList',name:'addressList',component:AddressList,meta:{title:'收货地址',keepAlive:true}},
    {path:'/personalCenter/addAddress',name:'addAddress',component:AddAddress,meta:{title:'地址信息',keepAlive:false}},
    {path:'/personalCenter/myOderList',name:'myOderList',component:MyOderList,meta:{title:'我的订单',keepAlive:true}},
    {path:'/personalCenter/orderDetail',name:'orderDetail',component:OrderDetail,meta:{title:'订单详情',keepAlive:false}},
    {path:'/personalCenter/orderAppraise',name:'orderAppraise',component:OrderAppraise,meta:{title:'订单评价',keepAlive:false}},
    {path:'/personalCenter/fillsalesRetrun',name:'fillsalesRetrun',component:FillsalesRetrun,meta:{title:'填写退货订单',keepAlive:false}},
    {path:'/personalCenter/salesRetrunList',name:'salesRetrunList',component:SalesRetrunList,meta:{title:'退货订单列表',keepAlive:true}},
    {path:'/personalCenter/salesRetrunDetail',name:'salesRetrunDetail',component:SalesRetrunDetail,meta:{title:'退货订单列表',keepAlive:false}},
    {path:'/personalCenter/policyList',name:'policyList',component:PolicyList,meta:{title:'我的保单',keepAlive:true}},
    {path:'/personalCenter/policyDetail',name:'policyDetail',component:PolicyDetail,meta:{title:'保单详情',keepAlive:false}},
    {path:'/personalCenter/giftList',name:'giftList',component:GiftList,meta:{title:'礼品列表',keepAlive:true}},
    {path:'/personalCenter/giftAppoint',name:'giftAppoint',component:GiftAppoint,meta:{title:'礼品预约',keepAlive:false}},
    {path:'/personalCenter/myCoupons',name:'myCoupons',component:MyCoupons,meta:{title:'我的优惠券',keepAlive:false}},
    {path:'/personalCenter/aboutUs',name:'aboutUs',component:AboutUs,meta:{title:'关于商社车管家',keepAlive:true}},
    {path:'/personalCenter/loginWithCode',name:'loginWithCode',component:LoginWithCode,meta:{title:'登录'},
      children:[ {path:'/personalCenter/register/:userId',name:'register',component:register,meta:{title:'注册'}},
                 {path:'/personalCenter/userProtocol',name:'userProtocol',component:userProtocol,meta:{title:'用户协议'}},]},
  ]
})
export default router
