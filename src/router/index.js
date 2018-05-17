import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./import-' + process.env.NODE_ENV)
Vue.use(Router)
const Stores =  _import('stores');//懒加载
const IndexHome = _import('IndexHome');//首页
const ChooseCity =  r => require.ensure([], () => r(require('../components/pageHome/chooseCity/chooseCity')), 'ChooseCity')//选择城市
const CarProducts = _import('pageHome/carProductsMall/Category');//车品商城
const ProductsList = _import('pageHome/carProductsMall/productsList'); //商品列表
const ProductsDetail = _import('pageHome/carProductsMall/productsDetail'); //商品详情
const ReviewsList = _import('pageHome/carProductsMall/reviewsList'); //评价列表
const OrderSubmit =_import('pageHome/orderSubmit/orderSubmit');//订单提交
const InvoiceInfo =_import('pageHome/orderSubmit/invoiceInfo');//发票信息填写
const OrderPay = _import('pageHome/orderSubmit/orderpay');//支付界面
const GetCoupons =_import('pageHome/coupons/getcoupons');//获取优惠券
const Maintain = _import('pageHome/maintain/maintainPackage');//保养
const CarMaintain = _import('pageHome/maintain/carMaintain');//保养
const ShoppingCart =_import('ShoppingCart');//购物车
const PersonalCenter =_import('PersonalCenter');//个人中心
const LoginWithCode = _import('personalCenter/loginWithCode');//用户登录
const CarChoose = _import('pageHome/carChoose'); //车辆选择
const InsuranceList = _import('pageHome/insurance/insuranceList');//保险
const FillInformation = _import('pageHome/insurance/fillInformation'); //保险信息填写
const Insurance_type = _import('pageHome/insurance/insurance_type');//保险报价
const InsuranceSure = _import('pageHome/insurance/insuranceSure');//保险报价确定
const ChooseCarInfo = _import('pageHome/chooseCarInfo/chooseCarInfo');//选择车辆
const Protocol = _import('pageHome/orderSubmit/protocol'); //用户协议
const OrderSuccess = _import('pageHome/orderSubmit/orderSuccess');//订单成功
const register = _import('personalCenter/register');//注册
const userProtocol = _import('personalCenter/userProtocol');//协议
const UserInfo = _import('personalCenter/userInfo');//用户信息
const RePerUserInfo = _import('personalCenter/reperUserInfo'); //修改用户信息
const AddressList = _import('personalCenter/addressList'); //地址列表
const AddAddress = _import('personalCenter/addAddress'); //添加地址
const MyCoupons =  _import('personalCenter/myCoupons');//优惠券
const MyOderList = _import('personalCenter/myOderList');//我的订单
const OrderDetail = _import('personalCenter/orderDetail'); //订单详情
const OrderAppraise = _import('personalCenter/orderAppraise');//订单评价
const FillsalesRetrun = _import('personalCenter/salesReturn/fillsalesRetrun');//退货订单
const SalesRetrunList = _import('personalCenter/salesReturn/salesRetrunList');//退货订单列表
const SalesRetrunDetail = _import('personalCenter/salesReturn/salesRetrunDetail');//退货订单详情
const PolicyList = _import('personalCenter/policy/policyList');//保单列表
const PolicyDetail = _import('personalCenter/policy/policyDetail');//保单详情
const GiftList = _import('personalCenter/gift/giftList');//礼物
const GiftAppoint = _import('personalCenter/gift/giftAppoint');
const AboutUs = _import('personalCenter/introduct/aboutUs');
const StoresDetail = _import('storesDetail');
const HotPro = _import('pageHome/carProductsMall/hotProductsList');
const MyPoints = _import('pageHome/MyPoints/MyPoints');
const PointsList = _import('pageHome/MyPoints/PointsList');
const PointsDetail = _import('pageHome/MyPoints/PointsDetail');
const PointsSubmit = _import('pageHome/MyPoints/pointsSubmit');
const GroupBuying = _import('pageHome/GroupBuying/GroupBuying');//团购列表
const GroupBuyDetail = _import('pageHome/GroupBuying/GroupBuyDetail');//团购详情
const Seckill = _import('pageHome/GroupBuying/Seckill');
const Card = _import('User/Card');//会员中心
const Explain = _import('User/Explain');//会员积分使用说明
const Binding = _import('User/Binding');//会员卡绑定
const showQcode = _import('User/showQcode');//优惠券条形码
const manual = _import('User/manual'); //会员使用手册
const router = new Router({
   // hashbang:false,
   // mode: 'history',
  routes: [
    {path: "*", redirect: '/home'},
    {path:'/home',name:'home',component:IndexHome,meta:{keepAlive:true}},
    {path:'/category',name:'category',component:CarProducts,meta:{title:'商品分类',keepAlive:true}},
    {path:'/shoppingCart',name:'shoppingCart',component:ShoppingCart,meta:{title:'购物车',keepAlive:true}},
    {path:'/personalCenter',name:'personalCenter',component:PersonalCenter,meta:{title:'个人中心',keepAlive:true}},
    {path:'/home/chooseCity',name:'chooseCity',component:ChooseCity,meta:{title:'选择城市',keepAlive:true}},
    {path:"/home/productsList",name:'productsList',component:ProductsList,meta:{title:'商品列表',keepAlive:true}},
    {path:"/home/productsDetail",name:'productsDetail',component:ProductsDetail,meta:{title:'商品详情',keepAlive:false}},
    {path:"/home/reviewsList",name:'reviewsList',component:ReviewsList,meta:{title:'评论列表',keepAlive:false}},
    {path:"/home/orderSubmit",name:'orderSubmit',component:OrderSubmit,meta:{title:'订单提交',keepAlive:false}},
    {path:"/home/orderpay",name:'orderpay',component:OrderPay,meta:{title:'订单支付',keepAlive:false}},
    {path:"/home/invoiceInfo",name:'invoiceInfo',component:InvoiceInfo,meta:{title:'发票信息',keepAlive:false}},
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
    {path:'/personalCenter/userInfo', name:'userInfo', component:UserInfo, meta:{title:'用户信息',keepAlive:true}},
    {path:'/personalCenter/reperUserInfo', name:'reperUserInfo', component:RePerUserInfo, meta:{title:'用户信息',keepAlive:true}},
    {path:'/personalCenter/addressList',name:'addressList',component:AddressList,meta:{title:'收货地址',keepAlive:true}},
    {path:'/personalCenter/addAddress',name:'addAddress',component:AddAddress,meta:{title:'地址信息',keepAlive:false}},
    {path:'/personalCenter/myOderList',name:'myOderList',component:MyOderList,meta:{title:'我的订单',keepAlive:false}},
    {path:'/personalCenter/orderDetail',name:'orderDetail',component:OrderDetail,meta:{title:'订单详情',keepAlive:false}},
    {path:'/personalCenter/orderAppraise',name:'orderAppraise',component:OrderAppraise,meta:{title:'订单评价',keepAlive:false}},
    {path:'/personalCenter/fillsalesRetrun',name:'fillsalesRetrun',component:FillsalesRetrun,meta:{title:'填写售后订单',keepAlive:false}},
    {path:'/personalCenter/salesRetrunList',name:'salesRetrunList',component:SalesRetrunList,meta:{title:'售后订单列表',keepAlive:true}},
    {path:'/personalCenter/salesRetrunDetail',name:'salesRetrunDetail',component:SalesRetrunDetail,meta:{title:'售后订单列表',keepAlive:false}},
    {path:'/personalCenter/policyList',name:'policyList',component:PolicyList,meta:{title:'我的保单',keepAlive:true}},
    {path:'/personalCenter/policyDetail',name:'policyDetail',component:PolicyDetail,meta:{title:'保单详情',keepAlive:false}},
    {path:'/personalCenter/giftList',name:'giftList',component:GiftList,meta:{title:'礼品列表',keepAlive:true}},
    {path:'/personalCenter/giftAppoint',name:'giftAppoint',component:GiftAppoint,meta:{title:'礼品预约',keepAlive:false}},
    {path:'/personalCenter/myCoupons',name:'myCoupons',component:MyCoupons,meta:{title:'我的优惠券',keepAlive:false}},
    {path:'/personalCenter/aboutUs',name:'aboutUs',component:AboutUs,meta:{title:'关于',keepAlive:true}},
    {path:'/personalCenter/loginWithCode',name:'loginWithCode',component:LoginWithCode,meta:{title:'登录'},
      children:[ {path:'/personalCenter/register/:userId',name:'register',component:register,meta:{title:'注册'}},
        {path:'/personalCenter/userProtocol',name:'userProtocol',component:userProtocol,meta:{title:'用户协议'}},]},

    {path:'/home/MyPoints',name:'MyPoints',component:MyPoints,meta:{title:'积分中心',keepAlive:true}},
    {path:'/home/PointsList',name:'PointsList',component:PointsList,meta:{title:'积分中心',keepAlive:true}},
    {path:'/home/PointsSubmit',name:'PointsSubmit',component:PointsSubmit,meta:{title:'积分兑换',keepAlive:false}},
    {path:'/home/PointsDetail',name:'PointsDetail',component:PointsDetail,meta:{title:'商品详情',keepAlive:false}},

    {path:'/home/GroupBuying',name:'GroupBuying',component:GroupBuying,meta:{title:'团购频道',keepAlive:true}},
    {path:'/home/GroupBuyDetail',name:'GroupBuyDetail',component:GroupBuyDetail,meta:{title:'商品详情',keepAlive:false}},
    {path:'/home/Seckill',name:'Seckill',component:Seckill,meta:{title:'限时秒杀',keepAlive:true}},
	{path:'/User/Card',name:'Card',component:Card,meta:{title:'会员中心',keepAlive:true}},
    {path:'/User/Explain',name:'Explain',component:Explain,meta:{title:'积分使用说明',keepAlive:true}},
    {path:'/User/Binding',name:'Binding',component:Binding,meta:{title:'会员卡绑定',keepAlive:false}},
    {path:'/home/showCoupons',name:'qcode',component:showQcode,mata:{title:'优惠券兑换',keepAlive:false}},
      
    {path:'/home/hotProductsList',name:'hotProductsList',component:HotPro,meta:{title:'热销商品',keepAlive:true}},
    {path:'/user/manual',name:'manual',component:manual,meta:{title:'重百新世纪会员卡使用手册',keepAlive:true}},
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
export default router
