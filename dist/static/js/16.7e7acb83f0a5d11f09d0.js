webpackJsonp([16],{"0SbS":function(t,e){},c6Ri:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("uaSg"),s=i("yclV"),l=i("ngqk"),r={components:{goods:i("uMyE").a,"vue-core-image-upload":l.a},data:function(){return{data:{tag:"return"},returnType:"MAINTENANCE",shippingType:"DELIVERY",orderItems:{},orderId:"",dess:"",flag:"",uploadURL:a.d,images:[],item:{},upLoad:!1,upImages:[],applyRequest:{}}},mounted:function(){this.flag=this.$route.query.flag,1==this.flag?this.applyRequest.orderId=this.$route.query.orderId:this.applyRequest.skuId=this.$route.query.orderId,this.applyRequest.desc="",this.orderId=this.$route.query.orderId;var t=JSON.parse(Object(s.a)("refundInfo"));this.orderItems=t},methods:{imageuploading:function(t,e){this.upLoad=!0},imageuploaded:function(t,e){this.upLoad=!1;var i={};i.id=t.result[0].id,i.url=t.result[0].url,this.upImages.push(i)},delImage:function(t){this.upImages.shift(t)},gotoback:function(){this.$router.go(-1)},submit:function(){this.applyRequest.returnType=this.returnType,this.applyRequest.shippingType=this.shippingType;var t=0;this.orderItems.item.forEach(function(e){t+=e.quantity}),this.applyRequest.quantity=t;var e=[];if(this.upImages.forEach(function(t){e.push(t.id)}),e.length>0&&(this.applyRequest.medias=e.join(",")),0!=this.flag.length){var i=this;console.log(this.applyRequest);Object(a.a)(this,1==this.flag?"/api/return/applyOrder":2==this.flag?"/api/return/apply":"",this.applyRequest,"post","申请中...",function(t){i.$dialog.toast({mes:"申请成功!",timeout:1e3,icon:"success",callback:function(){i.gotoback()}})})}}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("yd-layout",{attrs:{id:"fillsales"}},[a("yd-navbar",{attrs:{slot:"navbar",title:"填写售后订单",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[a("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[a("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),a("div",{staticClass:"service"},[t._v("本次售后服务由"),a("em",[t._v("重庆百货")]),t._v("为您提供")]),t._v(" "),a("yd-cell-group",[a("yd-cell-item",[a("span",{staticClass:"or_2",attrs:{slot:"left"},slot:"left"},[t._v("订单编号："+t._s(t.orderItems.number))])]),t._v(" "),t._l(t.orderItems.item,function(t,e){return a("div",{key:e,staticStyle:{padding:"0.2rem"}},[a("goods",{attrs:{item:t,goodsType:"submit",showQuantity:!0}})],1)})],2),t._v(" "),a("yd-cell-group",{staticStyle:{"margin-top":"0.2rem","border-bottom":"1px solid #eeeeee"}},[a("div",{staticClass:"type"},[a("p",[t._v("服务类型")]),t._v(" "),a("yd-button",{class:{anniu:"MAINTENANCE"==t.returnType},nativeOn:{click:function(e){t.returnType="MAINTENANCE"}}},[t._v("维修")]),t._v(" "),a("yd-button",{class:{anniu:"RETURN"==t.returnType},nativeOn:{click:function(e){t.returnType="RETURN"}}},[t._v("退货")]),t._v(" "),a("yd-button",{class:{anniu:"EXCHANGE"==t.returnType},nativeOn:{click:function(e){t.returnType="EXCHANGE"}}},[t._v("换货")])],1),t._v(" "),t._e(),t._v(" "),t._e()],1),t._v(" "),a("yd-cell-group",{staticStyle:{"margin-top":"0.2rem"},attrs:{title:"问题描述"}},[a("yd-cell-item",[a("yd-textarea",{ref:"desc",attrs:{slot:"right",placeholder:"请输入问题详细描述？",maxlength:"100"},slot:"right",model:{value:t.applyRequest.desc,callback:function(e){t.$set(t.applyRequest,"desc",e)},expression:"applyRequest.desc"}})],1),t._v(" "),a("yd-grids-group",{attrs:{rows:5}},[t._l(t.upImages,function(e,s){return a("yd-grids-item",{key:s},[a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"else"},slot:"else"},[a("img",{staticStyle:{height:"1.2rem","max-width":"1.2rem"},attrs:{src:e.url}}),t._v(" "),a("img",{staticStyle:{height:"0.3rem",width:"0.3rem",position:"absolute",right:"0rem"},attrs:{src:i("vmxF")},on:{click:function(e){t.delImage(t.index)}}})])])}),t._v(" "),1==t.upLoad?a("yd-grids-item",[a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"else"},slot:"else"},[a("icon",{attrs:{name:"wait",spin:"",scale:7}})],1)]):t._e(),t._v(" "),a("yd-grids-item",{attrs:{type:"a"}},[a("vue-core-image-upload",{staticStyle:{"text-align":"center"},attrs:{slot:"else",inputOfFile:"file",credentials:!1,crop:!1,data:t.data,compress:70,"multiple-size":5,"max-file-size":5242880,url:t.uploadURL},on:{imageuploading:t.imageuploading,imageuploaded:t.imageuploaded},slot:"else"},[a("img",{staticClass:"messimg",staticStyle:{height:"1.2rem",width:"1.2rem"},attrs:{src:i("VhXN")}})])],1)],2)],1),t._v(" "),a("yd-cell-group",{staticStyle:{"margin-top":"0.2rem","border-bottom":"1px solid #eeeeee"}},[a("div",{staticClass:"type"},[a("p",[t._v("商品退回方式")]),t._v(" "),a("yd-button",{class:{anniu:"DELIVERY"==t.shippingType},nativeOn:{click:function(e){t.shippingType="DELIVERY"}}},[t._v("快递至商城")]),t._v(" "),a("yd-button",{class:{anniu:"SELF_DELIVERY"==t.shippingType},nativeOn:{click:function(e){t.shippingType="SELF_DELIVERY"}}},[t._v("送货至自提点")]),t._v(" "),a("p",{staticStyle:{color:"#999999","padding-top":".2rem!important"}},[t._v("商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。商城不收取快递附加费。")])],1)]),t._v(" "),a("yd-button-group",[a("yd-button",{staticClass:"thlb7",attrs:{size:"large"},nativeOn:{click:function(e){t.submit()}}},[t._v("提交申请")])],1)],1)},staticRenderFns:[]};var o=i("VU/8")(r,n,!1,function(t){i("0SbS"),i("tJ7z")},"data-v-64196da6",null);e.default=o.exports},tJ7z:function(t,e){},vmxF:function(t,e){t.exports="data:image/png;base64,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"}});