webpackJsonp([19],{GbNd:function(t,e){},LmEO:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("uaSg"),i=r("yclV"),n=(r("8NGk"),r("uMyE")),s=r("U0F2"),a={components:{goods:n.a},data:function(){return{isLocked:!1,orderStatus:"",showQRCode:!1,status:"",orderId:"",info:{},order:{},qrcode:void 0,payInfo:{},canRefund:!1,canCancel:!1,canReturn:!1,canPay:!1,canConfirm:!1,canViewShippmentHistory:!1,canComment:!1,isshowwl:!1,histories:[]}},filters:{formatDate:function(t){var e=new Date(t);return Object(o.b)(e,"yyyy-MM-dd hh:mm:ss")}},mounted:function(){this.orderId=this.$route.query.orderId,this.setQrCode(),this.getoderDetail(),this.gethistoryOrder()},methods:{gotoback:function(){this.$router.go(-1)},setQrCode:function(){var t=document.querySelector("#qrcode");this.qrcode=new s(t,{width:100,height:100,colorDark:"#000000",colorLight:"#ffffff",correctLevel:2})},getoderDetail:function(){var t=this;Object(o.a)(this,"/api/order/order",{orderId:this.orderId},"get","加载中...",function(e){e.info&&(t.info=e.info,t.qrcode.make(e.info.number)),e.isLocked&&(t.isLocked=e.isLocked),e.showQRCode&&(t.showQRCode=e.showQRCode),e.order&&(t.order=e.order),e.status&&(t.status=e.status),e.orderStatus&&(t.orderStatus=e.orderStatus),e.canPay&&(t.canPay=e.canPay),e.canCancel&&(t.canCancel=e.canCancel),e.canRefund&&(vues.canRefund=e.canRefund),e.canConfirm&&(t.canConfirm=e.canConfirm),e.canViewShippmentHistory&&(t.canViewShippmentHistory=e.canViewShippmentHistory),e.canComment&&(t.canComment=e.canComment),e.canReturn&&(t.canReturn=e.canReturn)})},cancleOrder:function(){var t=this;this.$dialog.confirm({title:"温馨提示",mes:"您是否确定取消订单！",opts:function(){t.sureCancleOrder}})},sureCancleOrder:function(){var t=this;Object(o.a)(this,"/api/order/cancel",{orderId:this.orderId},"post","取消中...",function(e){t.$dialog.toast({mes:"取消成功!",timeout:1e3,icon:"success",callback:function(){t.gotoback()}})})},affirmOrder:function(){var t=this;Object(o.a)(this,"/api/order/received",{orderId:this.orderId},"post","正在处理中...",function(e){t.$dialog.toast({mes:"确认成功!",timeout:1e3,icon:"success",callback:function(){t.gotoback()}})})},canclePayOrder:function(){var t=this;Object(o.a)(this,"/wechat/pay/refund",{orderId:this.orderId},"post","申请中...",function(e){t.$dialog.toast({mes:"申请成功!",timeout:1e3,icon:"success",callback:function(){t.gotoback()}})})},payOrder:function(){var t=this;Object(o.a)(this,"/api/order/rePay",{orderId:this.orderId},"post","支付中...",function(e){t.perPay(e)})},perPay:function(t){var e=this;Object(o.a)(this,"/api/order/prePay",t,"post","提交中...",function(t){e.payInfo=t.payInfo,window.location.href="https://pay.swiftpass.cn/pay/jspay?token_id="+e.payInfo.token_id+"&showwxtitle=1"})},gethistoryOrder:function(){var t=this;Object(o.a)(this,"/api/order/histories",{orderId:this.orderId},"get","加载中...",function(e){e.histories&&(t.histories=e.histories)})},showwl:function(){0!=this.histories.length?this.isshowwl=!this.isshowwl:this.$dialog.toast({mes:"暂无订单历史",timeout:1e3})},gotoProdcut:function(t){this.$router.push({name:"productsDetail",query:{skuId:t.skuId},meta:{title:"商品详情"}})},appraiseOrder:function(){var t=[];this.order.items.forEach(function(e){t.push(e)}),0!=this.canComment?this.$router.push({name:"orderAppraise",query:{orderId:this.orderId},params:t,meta:{title:"订单评价"}}):this.$dialog.toast({mes:"您不能评价该订单",timeout:2e3})},applyRefundAll:function(){var t={item:this.order.items};t.number=this.info.number,Object(i.e)("refundInfo",t),this.$router.push({name:"fillsalesRetrun",query:{orderId:this.orderId,flag:1}})},gotoAfterSales:function(t){var e={item:[t]};e.number=this.info.number,Object(i.e)("refundInfo",e),this.$router.push({name:"fillsalesRetrun",query:{orderId:t.skuId,flag:2}})}}},l={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("yd-layout",{attrs:{id:"orderDetail"}},[r("yd-navbar",{attrs:{slot:"navbar",title:"订单详情",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[r("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[r("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),r("yd-cell-group",[r("yd-cell-item",[r("yd-icon",{attrs:{slot:"icon",name:"feedback",size:".42rem",color:"#d41d0f"},slot:"icon"}),t._v(" "),r("span",{staticStyle:{color:"#D41D0F"},attrs:{slot:"left"},slot:"left"},[t._v(t._s(t.orderStatus))]),t._v(" "),r("span",{staticStyle:{float:"right",color:"#d41d0f"},attrs:{slot:"right"},on:{click:function(e){t.showwl()}},slot:"right"},[t._v("订单历史")])],1),t._v(" "),r("hr",{staticClass:"ddxq_6"}),t._v(" "),r("yd-flexbox",{staticClass:"ddxq_7"},[r("yd-flexbox-item",{staticClass:"ddxq_8"},[r("p",[t._v("订单编号"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.number))])]),t._v(" "),r("p",[t._v("下单时间"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.date))])]),t._v(" "),r("p",[t._v("收货人"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.name))])]),t._v(" "),1==t.info.needService?r("p",[t._v("服务门店"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.serviceShopName))])]):t.info.deliverNumber&&t.info.deliverNumber.length>0?r("p",[t._v("快递单号"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.deliverNumber))])]):t._e(),t._v(" "),r("p",[t._v("收货地址"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.addr))])]),t._v(" "),r("p",[t._v("支付方式"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.payType))])]),t._v(" "),t.info.preorderTime?r("p",[t._v("预约时间"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t._f("dateYY")(t.info.preorderTime)))])]):t._e(),t._v(" "),r("p",[t._v("配送方式"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.deliverType))])]),t._v(" "),t.info.needInvoice?r("p",[t._v("发票类型"),r("i",{staticStyle:{float:"right"}},[t._v("纸质发票")])]):t._e(),t._v(" "),t.info.needInvoice?r("p",[t._v("发票抬头"),r("i",{staticStyle:{float:"right"}},[t._v(t._s("PERSONAL"==t.info.invocieType?"个人:":"COMPANY"==t.info.invocieType?"公司:":"无需发票")+"\n            "+t._s("NO"!=t.info.invocieType?t.info.invoiceTitle:"")+"\n          ")])]):t._e(),t._v(" "),"COMPANY"==t.info.invocieType&&t.info.needInvoice?r("p",[t._v("单位税号"),r("i",{staticStyle:{float:"right"}},[t._v(t._s(t.info.taxNumber))])]):t._e()])],1)],1),t._v(" "),r("div",{staticClass:"products"},[r("div",{staticClass:"yd-accordion-title",staticStyle:{"border-bottom":"1px solid #e3e3e3"}},[r("span",{staticStyle:{"padding-left":"0.3rem","font-size":"0.3rem"}},[t._v("订单商品")])]),t._v(" "),r("div",[r("h3",[t._v("商品")]),t._v(" "),r("ul",{staticClass:"por",attrs:{slot:"list"},slot:"list"},t._l(t.order.items,function(e){return r("li",{on:{click:function(r){r.stopPropagation(),t.gotoProdcut(e)}}},[r("goods",{attrs:{item:e,goodsType:"submit",isButton:t.canReturn&&e.canReturn,showQuantity:!0},on:{gotoAfterSales:t.gotoAfterSales}})],1)})),t._v(" "),t.order.needService?r("div",[r("h3",[t._v("服务")]),t._v(" "),r("ul",{staticClass:"sever"},t._l(t.order.services,function(e){return r("li",[r("yd-flexbox",{staticStyle:{"margin-left":"16px"}},[r("yd-flexbox-item",[r("div",{staticClass:"titlediv"},[r("p",[t._v(t._s(e.serviceName))]),t._v(" "),r("p",{staticStyle:{color:"#999"}},[t._v(t._s(e.description))])])]),t._v(" "),r("div",{staticClass:"titlediv",staticStyle:{"margin-right":"0.2rem",width:"1rem","text-align":"right"}},[r("p",{staticStyle:{color:"#df3448"}},[t._v("¥"+t._s(e.servicePrice))]),t._v(" "),r("p",{staticStyle:{color:"#999"}},[t._v("×"+t._s(e.quantity))])])],1)],1)}))]):t._e()])]),t._v(" "),r("div",{staticClass:"payinfo"},[r("p",[r("span",{staticClass:"label"},[t._v("商品总额")]),t._v(" "),r("span",{staticClass:"price"},[t._v("¥"+t._s(t.order.subTotal))])]),t._v(" "),r("p",[r("span",{staticClass:"label"},[t._v("服务费")]),t._v(" "),r("span",{staticClass:"price"},[t._v("¥"+t._s(t.order.serviceFee))])]),t._v(" "),r("p",[r("span",{staticClass:"label"},[t._v("运费")]),t._v(" "),r("span",{staticClass:"price"},[t._v("¥"+t._s(t.order.shipmentFee))])]),t._v(" "),t.order.couponOffer?r("p",[r("span",{staticClass:"label"},[t._v("优惠券")]),t._v(" "),r("span",{staticClass:"price discount"},[t._v("-¥"+t._s(t.order.couponOffer))])]):t._e(),t._v(" "),1==t.order.isBonusPointsUsed?r("p",[r("span",{staticClass:"label"},[t._v("积分抵扣金额")]),t._v(" "),r("span",{staticClass:"price discount"},[t._v("-¥"+t._s(t.order.bonusPointsUsed))])]):t._e(),t._v(" "),r("p",[r("span",{staticClass:"label"},[t._v("订单总额")]),t._v(" "),r("span",{staticClass:"price"},[t._v("¥"+t._s(t.order.total))])])]),t._v(" "),r("yd-cell-group",{directives:[{name:"show",rawName:"v-show",value:1==t.showQRCode,expression:"showQRCode==true"}],staticStyle:{"text-align":"center"}},[r("div",{staticStyle:{padding:"0.2rem"}},[r("p",{staticStyle:{"font-size":"0.3rem"}},[r("strong",[t._v("订单二维码")])]),t._v(" "),r("p",{staticStyle:{color:"gray"}},[t._v("让门店扫一扫,节省您与门店对接时间")])]),t._v(" "),r("div",{staticStyle:{"margin-left":"25%",width:"50%"}},[r("div",{ref:"qrcode",staticStyle:{"padding-bottom":"0.2rem"},attrs:{id:"qrcode"}})])]),t._v(" "),r("div",{staticStyle:{height:"1.2rem",width:"100%"}}),t._v(" "),r("div",{staticStyle:{position:"fixed",top:"70%",right:"0","z-index":"999","text-align":"center",padding:"0.1rem"}},[r("a",{attrs:{href:"tel:966888"}},[r("yd-icon",{attrs:{name:"kfdh",size:".6rem",color:"#d81e06",custom:""}})],1)]),t._v(" "),1==t.canCancel||1==t.canRefund||1==t.canReturn||1==t.canConfirm||1==t.canPay||1==t.canComment?r("yd-cell-group",{staticStyle:{"margin-bottom":"0rem"},attrs:{slot:"tabbar"},slot:"tabbar"},[r("yd-cell-item",{attrs:{type:"a"}},[r("span",{attrs:{slot:"right"},slot:"right"},[1==t.canCancel?r("yd-button",{staticClass:"order_3",attrs:{type:"hollow"},nativeOn:{click:function(e){t.cancleOrder()}}},[t._v("取消订单")]):t._e(),t._v(" "),1==t.canRefund?r("yd-button",{staticClass:"order_3",attrs:{type:"hollow"},nativeOn:{click:function(e){t.canclePayOrder()}}},[t._v("申请退款")]):t._e(),t._v(" "),1==t.canReturn?r("yd-button",{staticClass:"order_3",attrs:{type:"danger",color:"#fff"},nativeOn:{click:function(e){t.applyRefundAll()}}},[t._v("申请售后")]):t._e(),t._v(" "),1==t.canConfirm?r("yd-button",{staticClass:"order_3",attrs:{type:"danger",color:"#fff"},nativeOn:{click:function(e){t.affirmOrder()}}},[t._v(t._s(1==t.info.needService?"待服务":"确认收货")+"\n        ")]):t._e(),t._v(" "),1==t.canPay?r("yd-button",{staticClass:"order_3",attrs:{type:"danger",color:"#fff"},nativeOn:{click:function(e){t.payOrder()}}},[t._v("立即支付")]):t._e(),t._v(" "),1==t.canComment?r("yd-button",{staticClass:"order_3",attrs:{type:"hollow"},nativeOn:{click:function(e){t.appraiseOrder()}}},[t._v("评价晒单")]):t._e()],1)])],1):t._e(),t._v(" "),r("yd-popup",{attrs:{position:"bottom",height:"60%"},model:{value:t.isshowwl,callback:function(e){t.isshowwl=e},expression:"isshowwl"}},[r("div",{staticStyle:{height:"1rem","line-height":"1rem","border-bottom":"1px solid #edeeef"},attrs:{slot:"top"},slot:"top"},[r("span",{staticStyle:{"font-size":"0.3rem",color:"#666","padding-left":"0.2rem"}},[t._v("订单历史详情")]),t._v(" "),r("div",{staticClass:"close",on:{click:function(e){t.isshowwl=!1}}})]),t._v(" "),r("yd-timeline",t._l(t.histories,function(e,o){return r("yd-timeline-item",{key:o},[r("p",[t._v(t._s(e.statusComments))]),t._v(" "),r("p",{staticStyle:{"margin-top":"10px"}},[t._v(t._s(t._f("formatDate")(e.dateAdded)))])])}))],1)],1)},staticRenderFns:[]};var c=r("VU/8")(a,l,!1,function(t){r("GbNd"),r("zW0n")},"data-v-60783498",null);e.default=c.exports},U0F2:function(t,e,r){var o;o=function(){return function(t){function e(o){if(r[o])return r[o].exports;var i=r[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e){function r(t){this.mode=a.MODE_8BIT_BYTE,this.data=t}function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=new Array}function i(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function n(t,e){this.totalCount=t,this.dataCount=e}function s(){this.buffer=new Array,this.length=0}r.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},o.prototype={addData:function(t){var e=new r(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=n.getRSBlocks(t,this.errorCorrectLevel),r=new s,o=0,i=0;i<e.length;i++)o+=e[i].dataCount;for(i=0;i<this.dataList.length;i++){var a=this.dataList[i];r.put(a.mode,4),r.put(a.getLength(),u.getLengthInBits(a.mode,t)),a.write(r)}if(r.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[r][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=u.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var i=0;i<this.modules.length;i++)for(var n=1*i,s=0;s<this.modules[i].length;s++){var a=1*s;this.modules[i][s]&&(o.beginFill(0,100),o.moveTo(a,n),o.lineTo(a+1,n),o.lineTo(a+1,n+1),o.lineTo(a,n+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=u.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],i=t[r];if(null==this.modules[o][i])for(var n=-2;n<=2;n++)for(var s=-2;s<=2;s++)this.modules[o+n][i+s]=-2==n||2==n||-2==s||2==s||0==n&&0==s}},setupTypeNumber:function(t){for(var e=u.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++){o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=u.getBCHTypeInfo(r),i=0;i<15;i++){var n=!t&&1==(o>>i&1);i<6?this.modules[i][8]=n:i<8?this.modules[i+1][8]=n:this.modules[this.moduleCount-15+i][8]=n}for(i=0;i<15;i++){n=!t&&1==(o>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=n:i<9?this.modules[8][15-i-1+1]=n:this.modules[8][15-i-1]=n}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,i=7,n=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var a=0;a<2;a++)if(null==this.modules[o][s-a]){var l=!1;n<t.length&&(l=1==(t[n]>>>i&1)),u.getMask(e,o,s-a)&&(l=!l),this.modules[o][s-a]=l,-1==--i&&(n++,i=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,r){for(var i=n.getRSBlocks(t,e),a=new s,l=0;l<r.length;l++){var c=r[l];a.put(c.mode,4),a.put(c.getLength(),u.getLengthInBits(c.mode,t)),c.write(a)}var d=0;for(l=0;l<i.length;l++)d+=i[l].dataCount;if(a.getLengthInBits()>8*d)throw new Error("code length overflow. ("+a.getLengthInBits()+">"+8*d+")");for(a.getLengthInBits()+4<=8*d&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*d)&&(a.put(o.PAD0,8),!(a.getLengthInBits()>=8*d));)a.put(o.PAD1,8);return o.createBytes(a,i)},o.createBytes=function(t,e){for(var r=0,o=0,n=0,s=new Array(e.length),a=new Array(e.length),l=0;l<e.length;l++){var c=e[l].dataCount,d=e[l].totalCount-c;o=Math.max(o,c),n=Math.max(n,d),s[l]=new Array(c);for(var h=0;h<s[l].length;h++)s[l][h]=255&t.buffer[h+r];r+=c;var f=u.getErrorCorrectPolynomial(d),v=new i(s[l],f.getLength()-1).mod(f);a[l]=new Array(f.getLength()-1);for(h=0;h<a[l].length;h++){var g=h+v.getLength()-a[l].length;a[l][h]=g>=0?v.get(g):0}}var p=0;for(h=0;h<e.length;h++)p+=e[h].totalCount;var m=new Array(p),_=0;for(h=0;h<o;h++)for(l=0;l<e.length;l++)h<s[l].length&&(m[_++]=s[l][h]);for(h=0;h<n;h++)for(l=0;l<e.length;l++)h<a[l].length&&(m[_++]=a[l][h]);return m};for(var a={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},l={L:1,M:0,Q:3,H:2},c={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;u.getBCHDigit(e)-u.getBCHDigit(u.G15)>=0;)e^=u.G15<<u.getBCHDigit(e)-u.getBCHDigit(u.G15);return(t<<10|e)^u.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;u.getBCHDigit(e)-u.getBCHDigit(u.G18)>=0;)e^=u.G18<<u.getBCHDigit(e)-u.getBCHDigit(u.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return u.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case c.PATTERN000:return(e+r)%2==0;case c.PATTERN001:return e%2==0;case c.PATTERN010:return r%3==0;case c.PATTERN011:return(e+r)%3==0;case c.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case c.PATTERN101:return e*r%2+e*r%3==0;case c.PATTERN110:return(e*r%2+e*r%3)%2==0;case c.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new i([1],0),r=0;r<t;r++)e=e.multiply(new i([1,d.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case a.MODE_NUMBER:return 10;case a.MODE_ALPHA_NUM:return 9;case a.MODE_8BIT_BYTE:case a.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case a.MODE_NUMBER:return 12;case a.MODE_ALPHA_NUM:return 11;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case a.MODE_NUMBER:return 14;case a.MODE_ALPHA_NUM:return 13;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var i=0;i<e;i++){for(var n=0,s=t.isDark(o,i),a=-1;a<=1;a++)if(!(o+a<0||e<=o+a))for(var l=-1;l<=1;l++)i+l<0||e<=i+l||0==a&&0==l||s==t.isDark(o+a,i+l)&&n++;n>5&&(r+=3+n-5)}for(o=0;o<e-1;o++)for(i=0;i<e-1;i++){var c=0;t.isDark(o,i)&&c++,t.isDark(o+1,i)&&c++,t.isDark(o,i+1)&&c++,t.isDark(o+1,i+1)&&c++,0!=c&&4!=c||(r+=3)}for(o=0;o<e;o++)for(i=0;i<e-6;i++)t.isDark(o,i)&&!t.isDark(o,i+1)&&t.isDark(o,i+2)&&t.isDark(o,i+3)&&t.isDark(o,i+4)&&!t.isDark(o,i+5)&&t.isDark(o,i+6)&&(r+=40);for(i=0;i<e;i++)for(o=0;o<e-6;o++)t.isDark(o,i)&&!t.isDark(o+1,i)&&t.isDark(o+2,i)&&t.isDark(o+3,i)&&t.isDark(o+4,i)&&!t.isDark(o+5,i)&&t.isDark(o+6,i)&&(r+=40);var u=0;for(i=0;i<e;i++)for(o=0;o<e;o++)t.isDark(o,i)&&u++;return r+Math.abs(100*u/e/e-50)/5*10}},d={glog:function(t){if(t<1)throw new Error("glog("+t+")");return d.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return d.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;h<8;h++)d.EXP_TABLE[h]=1<<h;for(h=8;h<256;h++)d.EXP_TABLE[h]=d.EXP_TABLE[h-4]^d.EXP_TABLE[h-5]^d.EXP_TABLE[h-6]^d.EXP_TABLE[h-8];for(h=0;h<255;h++)d.LOG_TABLE[d.EXP_TABLE[h]]=h;i.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=d.gexp(d.glog(this.get(r))+d.glog(t.get(o)));return new i(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=d.glog(this.get(0))-d.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=d.gexp(d.glog(t.get(o))+e);return new i(r,0).mod(t)}},n.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],n.getRSBlocks=function(t,e){var r=n.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,i=new Array,s=0;s<o;s++)for(var a=r[3*s+0],l=r[3*s+1],c=r[3*s+2],u=0;u<a;u++)i.push(new n(l,c));return i},n.getRsBlockTable=function(t,e){switch(e){case l.L:return n.RS_BLOCK_TABLE[4*(t-1)+0];case l.M:return n.RS_BLOCK_TABLE[4*(t-1)+1];case l.Q:return n.RS_BLOCK_TABLE[4*(t-1)+2];case l.H:return n.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},s.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=o},function(t,e,r){var o=r(0),i={width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},n=function(t,e){this.options=function(t,e){var r=JSON.parse(JSON.stringify(t));for(var o in e&&"object"==typeof e||(e={}),e)e.hasOwnProperty(o)&&(r[o]=e[o]);return r}(i,e),this.container=t};n.prototype.make=function(t){var e=this.options,r=this.container;t=function(t){var e,r,o,i;for(e="",o=t.length,r=0;r<o;r++)(i=t.charCodeAt(r))>=1&&i<=127?e+=t.charAt(r):i>2047?(e+=String.fromCharCode(224|i>>12&15),e+=String.fromCharCode(128|i>>6&63),e+=String.fromCharCode(128|i>>0&63)):(e+=String.fromCharCode(192|i>>6&31),e+=String.fromCharCode(128|i>>0&63));return e}(t);var o=this.createCanvas(t,e).toDataURL(),i=document.createElement("img");i.style.height="100%",i.style.width="100%",i.setAttribute("src",o),r.innerHTML="",r.appendChild(i)},n.prototype.createCanvas=function(t,e){var r=new o(e.typeNumber,e.correctLevel);r.addData(t),r.make();var i=document.createElement("canvas");i.width=e.width,i.height=e.height;for(var n=i.getContext("2d"),s=e.width/r.getModuleCount(),a=e.height/r.getModuleCount(),l=0;l<r.getModuleCount();l++)for(var c=0;c<r.getModuleCount();c++){n.fillStyle=r.isDark(l,c)?e.foreground:e.background;var u=Math.ceil((c+1)*s)-Math.floor(c*s),d=Math.ceil((l+1)*s)-Math.floor(l*s);n.fillRect(Math.round(c*s),Math.round(l*a),u,d)}return i},t.exports=n}])},t.exports=o()},zW0n:function(t,e){}});