webpackJsonp([11],{"7aJ4":function(t,e){},MnaB:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),o=s("bOdI"),r=s.n(o),n=s("Dd8w"),l=s.n(n),d=s("yclV"),c=s("uaSg"),h=s("8NGk"),v=s("NYxO"),p={computed:l()({},Object(v.b)(["invoice"])),data:function(){var t;return t={checkbox1:!0,getorderInfo:{},spinner1:1,startDate:"2018-1-1",endDate:"2018-1-1",orderDate:"",orderData:{},oderdefault:{},address:{lastName:"",phonePrimary:""},chooseCoupon:!1},r()(t,"oderdefault",{}),r()(t,"availableCount",0),r()(t,"available",[]),r()(t,"unavailable",[]),r()(t,"defuletCoupons",{}),r()(t,"selectCoupons",[]),r()(t,"couponsMoney",0),r()(t,"exchangeStore",!1),r()(t,"stores",[]),r()(t,"personCheckbox",!0),r()(t,"unitCheckbox",!1),r()(t,"msg",""),r()(t,"storeName",""),r()(t,"isNeedService",!1),r()(t,"isBonusPointsUsed",!1),r()(t,"bonusPointsUsed",0),r()(t,"bonusPoints",0),r()(t,"payInfo",{}),r()(t,"tabkey","1"),r()(t,"paytotalFee",0),r()(t,"carInfo",!1),t},filters:{formatDate:function(t){if(!t)return"";var e=new Date(t);return Object(c.b)(e,"yyyy-MM-dd")}},watch:{personCheckbox:{handler:function(t,e){1==t&&(this.unitCheckbox=!1)}},isNeedService:{handler:function(t,e){0==t&&(this.stores.forEach(function(t){t.select=!1}),this.storeName="",this.orderData.serviceShop="",this.confirmOder())}},unitCheckbox:{handler:function(t,e){1==t&&(this.personCheckbox=!1)}},selectCoupons:{deep:!0,handler:function(t,e){var s=0;for(var a in t)s+=t[a].discount;this.couponsMoney=s}}},mounted:function(){if(Object(d.a)("oderInfo").length>0){var t=Object(d.a)("oderInfo");this.getorderInfo=JSON.parse(t)}if(Object(c.c)(this.getorderInfo)){var e=this;this.$dialog.confirm({title:"温馨提示",mes:"订单已经提交",opts:function(){e.$router.go(-1)}})}else this.oderInfo()},methods:{oderInfo:function(){var t=this;Object(c.a)(this,"/api/order/defaultInfo",{},"get","获取中...",function(e){t.oderdefault=e,e.address&&(t.address=e.address),e.bonusPoints&&(t.bonusPoints=e.bonusPoints,t.bonusPointsUsed=e.bonusPoints),e.carInfo?t.carInfo=!0:t.carInfo=!1,t.confirmOder()})},confirmOder:function(){var t=this.getorderInfo;t.serviceShop=this.orderData.serviceShop,t.isNeedService=this.isNeedService,this.address.lastName.length>0&&(t.lastName=this.address.lastName,t.primaryPhone=this.address.phonePrimary,t.city=this.address.addressCity,t.district=this.address.addressDistrict,t.state=this.address.addressState,t.street=this.address.addressStreet);var e=this;Object(c.a)(this,"/api/order/confirm",{data:i()(t)},"post","",function(t){if(e.orderData=t.orderData,e.bonusPointsUsed=e.bonusPointsUsed>e.orderData.subTotal+e.orderData.serviceFee?e.orderData.subTotal+e.orderData.serviceFee:e.bonusPointsUsed,t.orderData.preorderTime){var s=new Date(t.orderData.preorderTime);e.startDate=Object(c.b)(s,"yyyy-MM-dd"),e.endDate=e.getEndDate(t.orderData.preorderTime)}"BOTH"!=t.orderData.shippingType&&(e.isNeedService="DELIVERY"!=t.orderData.shippingType),e.oderdefault.payments.length>0&&(e.orderData.payment=e.oderdefault.payments[0].id)}),this.couponsOder()},couponsOder:function(){var t=this.getorderInfo,e=this;t.serviceShop=this.orderData.serviceShop,t.isNeedService=this.isNeedService,Object(c.a)(this,"/api/order/coupons",{data:i()(t)},"post","",function(t){t.availableCount&&(e.availableCount=t.availableCount),t.available&&(e.available=t.available),t.unavailable&&(e.unavailable=t.unavailable);var s=[];e.available.length>0&&(e.defuletCoupons=t.available[0],s.push(t.available[0])),e.selectCoupons=s;var a=0;for(var i in s)a+=s[i].discount;e.couponsMoney=a})},getEndDate:function(t){var e=new Date(t);return e.setTime(e.getTime()+27648e5),e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},getCoupon:function(){this.chooseCoupon=!this.chooseCoupon},gotoAddress:function(){this.$router.push({name:"addressList"})},selectCoupon:function(t){if(-1!==this.selectCoupons.indexOf(t))this.selectCoupons=[];else{var e=[];e.push(t),this.selectCoupons=e}},mshowfp:function(){this.$router.push({name:"invoiceInfo"})},changes:function(t){1==t?unitCheckbox=!1:personCheckbox=!1},switchlist:function(t,e){this.tabkey=e},getStoreList:function(){var t=this;if(this.stores.length>0)this.exchangeStore=!this.exchangeStore;else{var e=this.getorderInfo;e.serviceShop=this.orderData.serviceShop,this.address.lastname&&(e.lastname=this.address.lastName,e.primaryPhone=this.address.phonePrimary,e.city=this.address.addressCity,e.district=this.address.addressDistrict,e.state=this.address.addressState,e.street=this.address.addressStreet),Object(c.a)(this,"/api/order/serviceShops",{data:i()(e)},"post","加载中...",function(e){for(var s in e.stores)e.stores[s].select=!1;t.stores=e.stores,t.exchangeStore=!t.exchangeStore})}},coupons:function(){this.$router.push({path:"/home/getcoupons"})},selectStore:function(t){for(var e in this.stores)this.stores[e].select=!1;this.stores[t].select=!0,this.storeName=this.stores[t].storeName,this.orderData.serviceShop=this.stores[t].id,this.exchangeStore=!1,this.confirmOder()},gotopro:function(){this.$router.push({name:"protocol"})},gotoback:function(){this.$router.go(-1)},gotoplay:function(){if(this.orderData.isNeedService=this.isNeedService,0!=this.checkbox1)if(0!=this.address.lastName.length||0!=this.orderData.isNeedService)if(0!=this.orderData.payment.length)if(this.orderData.invoiceTitle=this.invoice.invoiceTitle,this.orderData.taxNumber=this.invoice.taxNumber,this.orderData.invoiceType=this.invoice.invoiceType,0!=this.carInfo||0!=this.msg.length||1!=this.orderData.isNeedService){this.orderData.isBonusPointsUsed=this.isBonusPointsUsed,0==this.isBonusPointsUsed?this.orderData.bonusPointsUsed=0:this.orderData.bonusPointsUsed=this.bonusPointsUsed,this.orderData.msg=this.msg,this.orderData.preorderTime=this.orderDate,this.orderData.coupons=[];var t=this;this.selectCoupons.forEach(function(e){t.orderData.coupons.push(e.code)}),this.orderData.lastname=this.address.lastName,this.orderData.primaryPhone=this.address.phonePrimary,this.orderData.city=this.address.addressCity,this.orderData.district=this.address.addressDistrict,this.orderData.state=this.address.addressState,this.orderData.street=this.address.addressStreet,Object(c.a)(this,"/api/order/checkout",{data:i()(this.orderData)},"post","提交中...",function(e){t.paytotalFee=e.total_fee,e.total_fee?0==e.total_fee?this.$router.replace({name:"myOderList",query:{type:1}}):t.perPay(e):this.$router.replace({name:"myOderList",query:{type:1}})})}else this.$dialog.toast({mes:"请输入留言",timeout:1e3});else this.$dialog.toast({mes:"请选择支付方式",timeout:1e3});else this.$dialog.toast({mes:"请选择地址",timeout:1e3});else this.$dialog.toast({mes:"请确认用户须知",timeout:1e3})},perPay:function(t){var e=this;Object(c.a)(this,"/wechat/pay/unifiedorder",t,"post","提交中...",function(t){e.payInfo=t.payInfo,Object(h.c)(t.payInfo,function(t){Object(d.c)("oderInfo"),"get_brand_wcpay_request:ok"==t.err_msg?e.$router.replace({name:"orderSuccess",params:{payMoney:e.paytotalFee}}):"get_brand_wcpay_request:cancel"==t.err_msg?e.$router.replace({name:"myOderList",query:{type:2}}):"get_brand_wcpay_request:fail"==t.err_msg&&e.$dialog.toast({mes:"支付失败! 请重新支付",timeout:2e3})},function(t){e.$dialog.toast({mes:"支付失败! 请重新支付",timeout:2e3})})})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("yd-layout",{attrs:{id:"orderSub"}},[a("yd-navbar",{attrs:{slot:"navbar",title:"订单提交",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[a("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[a("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),a("div",{staticClass:"userinfo",on:{click:function(e){t.gotoAddress()}}},[t.address.lastName.length>0?a("div",{staticClass:"defalutaddress"},[a("div",{staticClass:"infomation",staticStyle:{"font-size":".3rem"}},[a("span",{staticStyle:{"line-height":"0.5rem"}},[t._v(t._s(t.address.lastName))]),t._v(" "),a("span",{staticStyle:{"line-height":"0.5rem"}},[t._v(t._s(t.address.phonePrimary))]),t._v(" "),a("span",{staticStyle:{border:"1px solid #d41d0f","border-radius":"2px",padding:"2px 5px",color:"#d41d0f","font-size":"0.2rem"}},[t._v("默认")]),t._v(" "),a("p",{staticClass:"areaInfo"},[t._v(t._s(t.address.addressStateName+t.address.addressCityName+t.address.addressDistrictName+t.address.addressStreet))])]),t._v(" "),a("span",{staticClass:"choose"})]):a("div",{staticClass:"defalutaddress"},[a("p",{staticClass:"noaddressInfo"},[t._v("请设置地址")]),t._v(" "),a("span",{staticClass:"choose"})])]),t._v(" "),a("yd-cell-group",{staticStyle:{"margin-top":"10px","z-index":"-1"}},[a("yd-cell-item",{attrs:{arrow:"",type:"label"}},[a("span",{attrs:{slot:"left"},slot:"left"},[t._v("支付方式")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.orderData.payment,expression:"orderData.payment"}],staticClass:"main_3",attrs:{slot:"right"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.orderData,"payment",e.target.multiple?s:s[0])}},slot:"right"},t._l(t.oderdefault.payments,function(e){return a("option",{domProps:{value:e.id}},[t._v(t._s(e.description))])}))]),t._v(" "),a("yd-cell-item",{attrs:{arrow:""},nativeOn:{click:function(e){t.mshowfp(e)}}},[a("span",{attrs:{slot:"left"},slot:"left"},[t._v("发票")]),t._v(" "),a("span",{staticStyle:{"font-size":"0.3rem"},attrs:{slot:"right"},slot:"right"},[t._v(t._s("NO"==t.invoice.invoiceType?"无需发票":"PERSONAL"==t.invoice.invoiceType?"个人-商品明细":"公司-商品明细"))])]),t._v(" "),a("yd-cell-item",{attrs:{arrow:""},nativeOn:{click:function(e){t.getCoupon()}}},[a("span",{attrs:{slot:"left"},slot:"left"},[t._v("优惠券"),t.selectCoupons.length>0?a("span",{staticStyle:{border:"1px solid #d41d0f",padding:"0.05rem","font-size":"0.2rem !important",color:"#d41d0f","border-radius":"0.1rem","margin-left":"0.1rem"}},[t._v(t._s("已选择"+t.selectCoupons.length+"张")+" ")]):t._e()]),t._v(" "),0==t.availableCount?a("span",{staticStyle:{"font-size":"0.3rem"},attrs:{slot:"right"},slot:"right"},[t._v("无可用")]):0==t.couponsMoney?a("span",{staticStyle:{"font-size":"0.3rem"},attrs:{slot:"right"},slot:"right"},[t._v(t._s("可用优惠券"+t.available.length+"张"))]):a("span",{staticStyle:{"font-size":"0.3rem",color:"#d41d0f"},attrs:{slot:"right"},slot:"right"},[t._v(t._s("-"+t.couponsMoney+"元"))])]),t._v(" "),a("yd-cell-item",[a("span",{attrs:{slot:"left"},slot:"left"},[t._v("是否使用积分")]),t._v(" "),a("yd-switch",{attrs:{slot:"right",disabled:0==t.bonusPoints},slot:"right",model:{value:t.isBonusPointsUsed,callback:function(e){t.isBonusPointsUsed=e},expression:"isBonusPointsUsed"}})],1),t._v(" "),t.isBonusPointsUsed?a("yd-cell-item",[a("span",{attrs:{slot:"left"},slot:"left"},[t._v("抵扣积分(共"+t._s(t.bonusPoints)+"积分)")]),t._v(" "),a("span",{attrs:{slot:"right"},slot:"right"},[a("yd-spinner",{attrs:{max:t.bonusPoints>t.orderData.subTotal+t.orderData.serviceFee-t.couponsMoney?t.orderData.subTotal+t.orderData.serviceFee-t.couponsMoney:t.bonusPoints,unit:"1"},model:{value:t.bonusPointsUsed,callback:function(e){t.bonusPointsUsed=e},expression:"bonusPointsUsed"}})],1)]):t._e(),t._v(" "),a("yd-cell-item",[a("yd-textarea",{attrs:{slot:"right",placeholder:0==t.carInfo&&1==t.isNeedService?"请输入留言(必填)":"请输入留言(选填)",maxlength:"30"},slot:"right",model:{value:t.msg,callback:function(e){t.msg=e},expression:"msg"}})],1)],1),t._v(" "),a("div",{staticClass:"products"},[a("div",{staticClass:"yd-accordion-title",staticStyle:{"border-bottom":"1px solid #e3e3e3"}},[a("span",{staticStyle:{"padding-left":"0.3rem","font-size":"0.3rem"}},[t._v("订单商品")])]),t._v(" "),a("div",[a("h3",[t._v("商品")]),t._v(" "),a("ul",{staticClass:"por",attrs:{slot:"list"},slot:"list"},t._l(t.orderData.items,function(e){return a("li",[a("yd-flexbox",[a("div",{staticClass:"imgdiv"},[a("img",{attrs:{src:e.imageUrl}}),t._v(" "),0==e.available?a("img",{staticStyle:{"margin-left":"-1.3rem"},attrs:{src:s("otxl")}}):t._e()]),t._v(" "),a("yd-flexbox-item",[a("div",{staticClass:"titlediv"},[a("p",[t._v(t._s(e.skuName))]),t._v(" "),a("span",{staticClass:"price"},[t._v("¥"+t._s(e.salePrice))]),t._v(" "),a("span",{staticClass:"count"},[t._v("×"+t._s(e.quantity))])])])],1)],1)})),t._v(" "),t.orderData.gifts&&t.orderData.gifts.length>0?a("div",[a("h3",[t._v("赠品")]),t._v(" "),a("ul",{staticClass:"sever"},t._l(t.orderData.gifts,function(e){return a("li",[a("yd-flexbox",{staticStyle:{"margin-left":"16px"}},[a("yd-flexbox-item",[a("div",{staticClass:"titlediv"},[a("p",[t._v(t._s(e.skuName))]),t._v(" "),a("p",{staticStyle:{color:"#999"}},[t._v(t._s(e.description))])])]),t._v(" "),a("div",{staticClass:"titlediv",staticStyle:{"margin-right":"0.2rem",width:"1rem","text-align":"right"}},[a("p",{staticStyle:{color:"#df3448"}},[t._v("¥"+t._s(e.salePrice))]),t._v(" "),a("p",{staticStyle:{color:"#999"}},[t._v("×"+t._s(e.quantity))])])],1)],1)}))]):t._e(),t._v(" "),t.orderData.needService?a("div",[a("h3",[t._v("服务")]),t._v(" "),a("ul",{staticClass:"sever"},t._l(t.orderData.services,function(e){return a("li",[a("yd-flexbox",{staticStyle:{"margin-left":"16px"}},[a("yd-flexbox-item",[a("div",{staticClass:"titlediv"},[a("p",[t._v(t._s(e.serviceName))]),t._v(" "),a("p",{staticStyle:{color:"#999"}},[t._v(t._s(e.description))])])]),t._v(" "),a("div",{staticClass:"titlediv",staticStyle:{"margin-right":"0.2rem",width:"1rem","text-align":"right"}},[a("p",{staticStyle:{color:"#df3448"}},[t._v("¥"+t._s(e.servicePrice))]),t._v(" "),a("p",{staticStyle:{color:"#999"}},[t._v("×"+t._s(e.quantity))])])],1)],1)}))]):t._e()])]),t._v(" "),a("div",{staticClass:"payinfo"},[a("p",[a("span",{staticClass:"label"},[t._v("商品总额")]),t._v(" "),a("span",{staticClass:"price"},[t._v("¥"+t._s(t.orderData.subTotal))])]),t._v(" "),a("p",[a("span",{staticClass:"label"},[t._v("服务费")]),t._v(" "),a("span",{staticClass:"price"},[t._v("¥"+t._s(t.orderData.serviceFee))])]),t._v(" "),a("p",[a("span",{staticClass:"label"},[t._v("运费")]),t._v(" "),a("span",{staticClass:"price"},[t._v("¥"+t._s(t.orderData.shipmentFee))])]),t._v(" "),a("p",[a("span",{staticClass:"label"},[t._v("优惠券")]),t._v(" "),a("span",{staticClass:"price discount"},[t._v("-¥"+t._s(t.couponsMoney))])]),t._v(" "),t.isBonusPointsUsed?a("p",[a("span",{staticClass:"label"},[t._v("积分抵扣金额")]),t._v(" "),a("span",{staticClass:"price discount"},[t._v("-¥"+t._s(t.bonusPointsUsed)+" ")])]):t._e(),t._v(" "),a("div",{staticStyle:{"padding-top":"0.3rem"},attrs:{id:"hyxz"}},[a("yd-checkbox",{attrs:{shape:"circle",color:"#d41d0f",size:"16"},model:{value:t.checkbox1,callback:function(e){t.checkbox1=e},expression:"checkbox1"}}),a("span",{staticStyle:{"font-size":"12px","text-decoration":"underline",color:"#d41d0f"},on:{click:function(e){t.gotopro()}}},[t._v("《退换货须知》")])],1)]),t._v(" "),a("div",{staticStyle:{"margin-bottom":"1.5rem"}}),t._v(" "),a("div",{staticClass:"submitorder",attrs:{slot:"tabbar"},slot:"tabbar"},[a("div",{staticStyle:{width:"60%","text-align":"left","padding-left":"0.2rem"}},[t._v("实付款:¥"),t.isBonusPointsUsed?a("span",[t._v(t._s(t.orderData.total-t.couponsMoney-t.bonusPointsUsed))]):a("span",[t._v(t._s(t.orderData.total-t.couponsMoney))])]),t._v(" "),a("div",{staticClass:"subbtn",staticStyle:{width:"40%"},on:{click:t.gotoplay}},[t._v("提交订单")])]),t._v(" "),a("yd-popup",{attrs:{position:"bottom",height:"60%",id:"coupon"},model:{value:t.chooseCoupon,callback:function(e){t.chooseCoupon=e},expression:"chooseCoupon"}},[a("yd-tab",{attrs:{slot:"top",callback:t.switchlist},slot:"top"},[a("yd-tab-panel",{attrs:{label:"可用优惠券",tabkey:"1"}}),t._v(" "),a("yd-tab-panel",{attrs:{label:"不可用优惠券",tabkey:"2"}})],1),t._v(" "),0!=t.available.length&&"1"==t.tabkey?a("div",[t.selectCoupons.length>0?a("div",{staticClass:"warnTxt"},[a("span",{staticStyle:{"line-height":"0.6rem"}},[t._v("您已选中优惠券"+t._s(t.selectCoupons.length)+"张,共可抵用"),a("span",{staticStyle:{color:"#eb0026"}},[t._v("¥"+t._s(t.couponsMoney)+"元")])])]):t._e(),t._v(" "),a("ul",{staticClass:"coupon",staticStyle:{"min-height":"10rem"}},t._l(t.available,function(e){return a("li",[a("yd-flexbox",{staticStyle:{height:"1.5rem"}},[a("div",{staticClass:"couponBg",staticStyle:{height:"100%",padding:"0.2rem",width:"2rem"}},[a("p",{staticStyle:{"font-size":".3rem","font-weight":"bold",color:"#ffffff"}},[t._v("￥"),a("em",{staticStyle:{"font-size":"0.6rem"}},[t._v(t._s(e.discount))])]),t._v(" "),a("span",{staticStyle:{color:"#FFFFFF"}},[t._v(t._s(e.orderRequirement>0?"满"+e.orderRequirement+"可用":"无金额门槛"))])]),t._v(" "),a("yd-flexbox-item",{staticStyle:{"padding-left":"0.15rem"}},[a("p",{staticStyle:{"min-height":"1rem","font-size":"0.3rem"}},[t._v(t._s(e.description))]),t._v(" "),a("div",{staticStyle:{display:"block"}},[a("span",{staticStyle:{padding:"3px 0"}},[t._v(t._s(t._f("formatDate")(e.startTime))+"—"+t._s(t._f("formatDate")(e.endTime)))]),t._v(" "),-1===t.selectCoupons.indexOf(e)?a("yd-badge",{staticStyle:{"margin-right":"0.2rem",float:"right"},attrs:{type:"disabled"},nativeOn:{click:function(s){t.selectCoupon(e)}}},[t._v("立即使用\n                ")]):a("yd-badge",{staticStyle:{"margin-right":"0.2rem","background-color":"#d41d0f",float:"right"},attrs:{type:"danger"},nativeOn:{click:function(s){t.selectCoupon(e)}}},[t._v("已选择\n                ")])],1)])],1)],1)}))]):0!=t.unavailable.length&&"2"==t.tabkey?a("ul",{staticClass:"coupon1",staticStyle:{"min-height":"10rem"}},t._l(t.unavailable,function(e){return a("li",[a("yd-flexbox",{staticStyle:{height:"1.5rem"}},[a("div",{staticStyle:{height:"100%","background-color":"#BBBBBB",padding:"0.2rem",width:"2rem"}},[a("p",{staticStyle:{"font-size":".3rem","font-weight":"bold",color:"#ffffff"}},[t._v("￥"),a("em",{staticStyle:{"font-size":"0.6rem"}},[t._v(t._s(e.discount))])]),t._v(" "),a("span",{staticStyle:{color:"#FFFFFF"}},[t._v(t._s(e.orderRequirement>0?"满"+e.orderRequirement+"可用":"无金额门槛"))])]),t._v(" "),a("yd-flexbox-item",{staticStyle:{"padding-left":"0.15rem"}},[a("p",{staticStyle:{"min-height":"1rem","font-size":"0.3rem"}},[t._v(t._s(e.description))]),t._v(" "),a("div",{staticStyle:{display:"block",color:"#707070"}},[a("span",{staticStyle:{padding:"3px 0"}},[t._v(t._s(t._f("formatDate")(e.startTime))+"—"+t._s(t._f("formatDate")(e.endTime)))])])])],1)],1)})):a("div",{staticStyle:{"text-align":"center",height:"10rem"}},[a("p",[a("img",{attrs:{src:s("evVK"),width:"30%"}})]),t._v(" "),a("p",[t._v("没有券？")]),t._v(" "),a("p",{staticStyle:{color:"#999999","line-height":".5rem"}},[t._v("去领券中心看看吧")]),t._v(" "),a("p",{staticStyle:{"line-height":"1.5rem"}},[a("yd-button",{staticStyle:{"background-color":"#D9D9D9",border:"1px solid #999999",width:"20%"},attrs:{type:"hollow"},nativeOn:{click:function(e){t.coupons(e)}}},[t._v("去看看")])],1)])],1),t._v(" "),a("yd-popup",{attrs:{position:"bottom",height:"60%"},model:{value:t.exchangeStore,callback:function(e){t.exchangeStore=e},expression:"exchangeStore"}},[a("div",{staticStyle:{height:"1rem","line-height":"1rem","border-bottom":"1px solid #edeeef"},attrs:{slot:"top"},slot:"top"},[a("span",{staticStyle:{"font-size":"0.3rem",color:"#666","padding-left":"0.2rem"}},[t._v("选择安装门店")]),t._v(" "),a("div",{staticClass:"close",on:{click:function(e){t.exchangeStore=!1}}})]),t._v(" "),a("ul",{staticClass:"storeList"},t._l(t.stores,function(e,s){return a("li",{on:{click:function(e){t.selectStore(s)}}},[a("yd-flexbox",[a("div",{staticStyle:{overflow:"hidden",padding:"0.15rem",height:"1.8rem",width:"1.8rem"}},[a("img",{staticStyle:{height:"1.5rem",width:"1.5rem"},attrs:{src:e.logo}})]),t._v(" "),a("yd-flexbox-item",{staticStyle:{height:"1.8rem",width:"75%"}},[a("yd-flexbox",{staticStyle:{"padding-top":"0.15rem"},attrs:{direction:"vertical"}},[a("yd-flexbox-item",[a("span",{staticStyle:{"font-size":"0.3rem"}},[t._v(t._s(e.storeName))])]),t._v(" "),a("yd-flexbox-item",[a("p",{staticStyle:{color:"#6e6f70","font-size":"0.25rem","line-height":"0.5rem",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v("\n                "+t._s(e.storeAddress))])]),t._v(" "),a("yd-flexbox-item",[a("span",{staticStyle:{color:"#6e6f70","font-size":"0.25rem","line-height":"0.5rem"}},[t._v("评价"),a("span",{staticStyle:{color:"#ff7d49"}},[t._v(t._s(e.ratesCount?e.ratesCount:"0"))]),t._v(" |总订单"),a("span",{staticStyle:{color:"#ff7d49"}},[t._v(t._s(e.orderCount?e.orderCount:"0"))])]),t._v(" "),a("span",{staticStyle:{float:"right","margin-right":"0.1rem"}},[a("button",{class:{storeSelectBtn:e.select,storeNoselectBtn:!e.select}},[t._v("\n                                    "+t._s(e.select?"已选择":"选择")+"\n                                  ")])])])],1)],1)],1)],1)}))])],1)},staticRenderFns:[]};var f=s("VU/8")(p,u,!1,function(t){s("7aJ4"),s("lXa7")},"data-v-47a07dc1",null);e.default=f.exports},evVK:function(t,e,s){t.exports=s.p+"static/img/myyhq.c20b577.png"},lXa7:function(t,e){},otxl:function(t,e){t.exports="data:image/png;base64,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"}});