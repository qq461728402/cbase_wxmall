webpackJsonp([46],{wpgl:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={data:function(){return{src:""}},mounted:function(){this.$route.query.token_id&&(this.src="https://pay.swiftpass.cn/pay/jspay?token_id="+this.$route.query.token_id+"&showwxtitle=1")},methods:{gotoback:function(){this.$router.go(-1)}}},n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("yd-layout",[r("yd-navbar",{attrs:{slot:"navbar",title:"订单支付",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[r("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[r("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),r("iframe",{attrs:{src:t.src,frameborder:"0",width:"100%",height:"100%"}})],1)},staticRenderFns:[]};var a=r("VU/8")(o,n,!1,function(t){r("zQje")},null,null);e.default=a.exports},zQje:function(t,e){}});