webpackJsonp([41],{"/2qO":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("Dd8w"),a=s.n(o),n=s("uaSg"),r=s("yclV"),c=(s("ngqk"),s("NYxO")),i=(a()({},Object(c.b)(["userInfo"])),{computed:a()({},Object(c.b)(["userInfo"])),data:function(){return{}},mounted:function(){},methods:{gotoback:function(){this.$router.go(-1)},imageuploaded:function(t){alert("111"),0==t.errcode&&(this.src=t.data.src)},repaddress:function(){this.$router.push({name:"addressList"})},repcarInfo:function(){this.$router.push({name:"carchoose"})},gotorep:function(){this.$router.push({name:"reperUserInfo"})},loginout:function(){var t=this;Object(n.a)(this,"/api/customer/logout",{},"post","正在退出...",function(e){t.$dialog.toast({mes:"退出成功!",timeout:1e3,icon:"success",callback:function(){Object(r.c)("userInfo"),Object(r.c)("carInfo"),t.$router.go(-1)}})})}}}),l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("yd-layout",{attrs:{id:"userInfo"}},[s("yd-navbar",{attrs:{slot:"navbar",title:"用户信息",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[s("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[s("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),s("yd-cell-group",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("当前登录账号")])]),t._v(" "),s("ul",{staticClass:"news",on:{click:t.gotorep}},[s("li",{staticClass:"link"},[s("yd-flexbox",[s("div",{staticClass:"mess_1"},[s("img",{staticClass:"messimg",attrs:{src:t.userInfo.avatar}})]),t._v(" "),s("yd-flexbox-item",{staticClass:"mess_2"},[s("yd-flexbox",{staticClass:"mess_3",attrs:{direction:"vertical"}},[s("yd-flexbox-item",[s("span",{staticClass:"name"},[t._v("姓名："+t._s(t.userInfo.name))])]),t._v(" "),s("yd-flexbox-item",[s("div",{staticClass:"title"},[t._v("手机："+t._s(t.userInfo.phone))])])],1)],1),t._v(" "),s("div",{staticClass:"yd-cell-arrow"})],1)],1)])],1),t._v(" "),s("yd-cell-group",[s("yd-cell-item",{attrs:{arrow:"",type:"a"},nativeOn:{click:function(e){t.repaddress()}}},[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("收货地址设置")])]),t._v(" "),t._e()],1),t._v(" "),t._e()],1)},staticRenderFns:[]};var u=s("VU/8")(i,l,!1,function(t){s("lNRb"),s("CnE+")},"data-v-1232090c",null);e.default=u.exports},"CnE+":function(t,e){},lNRb:function(t,e){}});