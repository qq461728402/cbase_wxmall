webpackJsonp([38],{OZLe:function(t,e){},"j4/s":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("bOdI"),s=o.n(i),n=(o("FDxC"),o("w+oK")),a=o.n(n),l=o("Dd8w"),r=o.n(l),c=o("uaSg"),d={components:s()({},a.a.name,a.a),name:"integral",props:["list","theme"],methods:{gotoDetail:function(t){this.$emit("gotoDetail",t)}}},u={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("yd-list",{attrs:{theme:t.theme,id:"integral"}},t._l(t.list,function(e,i){return o("yd-list-item",{key:i,nativeOn:{click:function(o){t.gotoDetail(e)}}},[o("img",{attrs:{slot:"img",src:e.skuModel.image},slot:"img"}),t._v(" "),o("span",{staticStyle:{"font-weight":"normal",color:"#000"},attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.skuModel.skuName))]),t._v(" "),o("yd-list-other",{attrs:{slot:"other"},slot:"other"},[o("div",[o("span",{staticClass:"demo-list-price",staticStyle:{color:"red"}},[t._v(t._s(e.skuModel.bonusPoints)+"积分")]),t._v(" "),o("span",{staticClass:"demo-list-del-price",staticStyle:{"font-size":".2rem","text-decoration":"line-through"}},[o("em",[t._v("¥")]),t._v(t._s(e.skuModel.salePrice))])]),t._v(" "),o("div",[o("van-button",{staticClass:"pull-right",attrs:{type:"danger",size:"small"}},[t._v("积分兑换")])],1)])],1)}))},staticRenderFns:[]};var f,m=o("VU/8")(d,u,!1,function(t){o("OZLe"),o("nRhA")},"data-v-0dfb4d2f",null).exports,h=o("NYxO"),p={computed:r()({},Object(h.b)(["userInfo"])),components:(f={},s()(f,a.a.name,a.a),s()(f,"integral",m),f),data:function(){return{theme:3,items:[]}},mounted:function(){this.loadList()},methods:{loadList:function(){var t=this;Object(c.a)(this,"/api/promotion/list",{promotionType:"EXCHANGE"},"get","加载中...",function(e){t.items=e.promotions,t.$refs.pullrefreshDemo.$emit("ydui.pullrefresh.finishLoad")})},gotoDetail:function(t){this.$router.push({path:"/home/PointsDetail",query:{promotionId:t.promotionId}})}},activated:function(){this.loadList()}},v={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("yd-layout",{staticStyle:{"background-color":"#FFFFFF"}},[o("yd-navbar",{attrs:{slot:"navbar",title:"积分中心",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[o("router-link",{attrs:{slot:"left",to:"/home/MyPoints"},slot:"left"},[o("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),o("div",{staticStyle:{background:"linear-gradient(90deg,#eb3c3c,#ff7459)","box-shadow":"0 2px 5px rgba(255,98,98,.4)",width:"100%",height:"130px"}},[o("div",{staticStyle:{"font-size":"14px","padding-top":"20px","text-align":"center",color:"rgba(76,0,0,.7)"}},[t._v("可用积分")]),t._v(" "),o("div",{staticStyle:{"font-size":"48px",color:"#ffffff","text-align":"center"}},[t._v(t._s(t.userInfo.bonus?t.userInfo.bonus:"0"))]),t._v(" "),o("div",{staticStyle:{"font-size":"12px",color:"hsla(0,0%,100%,.7)","text-align":"center"}},[t._v("小积分 换好礼 会员专享 每月更新")])]),t._v(" "),o("yd-pullrefresh",{ref:"pullrefreshDemo",attrs:{callback:t.loadList}},[o("integral",{attrs:{list:t.items,theme:t.theme},on:{gotoDetail:t.gotoDetail}})],1)],1)},staticRenderFns:[]},g=o("VU/8")(p,v,!1,null,null,null);e.default=g.exports},nRhA:function(t,e){}});