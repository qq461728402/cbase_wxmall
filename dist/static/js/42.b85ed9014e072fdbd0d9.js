webpackJsonp([42],{XZB0:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e("bOdI"),i=e.n(o),a=(e("FDxC"),e("w+oK")),l=e.n(a),n=e("uaSg"),r={components:i()({},l.a.name,l.a),name:"goodlist",props:["goodlist"],methods:{gotoDetail:function(t){this.$emit("gotoDetail",t)}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",{staticClass:"bulk_goods"},t._l(t.goodlist,function(s,o){return e("li",{key:o,staticClass:"goods-item",on:{click:function(e){t.gotoDetail(s)}}},[e("div",{staticClass:"thumb center-img badge"},[e("img",{attrs:{src:s.skuModel.image}}),t._v(" "),t._e(),t._v(" "),t._e()]),t._v(" "),e("div",{staticClass:"detail"},[e("div",{staticClass:"goods-info"},[e("div",{staticClass:"title"},[t._v(t._s(s.skuModel.skuName))]),t._v(" "),e("div",{staticClass:"meta"},[e("div",{staticClass:"price pull-left"},[e("span",[e("em",[t._v("¥")]),t._v(t._s(s.skuModel.price))]),t._v(" "),e("span",{staticClass:"del_price"},[e("em",[t._v("¥")]),t._v(t._s(s.skuModel.salePrice))])])])]),t._v(" "),e("div",{staticClass:"from-shop"},[e("div",{staticClass:"pull-left",staticStyle:{"font-size":"11px",height:"30px","line-height":"30px"}},[t._v("已团"),e("span",{staticStyle:{color:"#ff525e"}},[t._v(t._s(s.dan?s.dan:"0"))]),t._v("件")]),t._v(" "),e("van-button",{staticClass:"pull-right",attrs:{type:"danger",size:"small"}},[t._v("去开团")])],1)])])}))},staticRenderFns:[]};var d,u=e("VU/8")(r,c,!1,function(t){e("j//0")},"data-v-970821f0",null).exports,p={components:(d={},i()(d,l.a.name,l.a),i()(d,"goodlist",u),d),data:function(){return{items:[]}},mounted:function(){this.loadList()},methods:{loadList:function(){var t=this;Object(n.a)(this,"/api/promotion/list",{promotionType:"GROUPON"},"get","加载中...",function(s){t.items=s.promotions,t.$refs.pullrefreshDemo.$emit("ydui.pullrefresh.finishLoad")})},gotoDetail:function(t){this.$router.push({path:"/home/GroupBuyDetail",query:{promotionId:t.promotionId,promotionType:"GROUPON"}})}},activated:function(){this.loadList()}},v={render:function(){var t=this.$createElement,s=this._self._c||t;return s("yd-layout",{staticStyle:{"background-color":"#FFFFFF"}},[s("yd-navbar",{attrs:{slot:"navbar",title:"团购频道",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[s("router-link",[s("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),this._v(" "),s("yd-pullrefresh",{ref:"pullrefreshDemo",attrs:{callback:this.loadList}},[s("goodlist",{attrs:{goodlist:this.items},on:{gotoDetail:this.gotoDetail}})],1)],1)},staticRenderFns:[]},m=e("VU/8")(p,v,!1,null,null,null);s.default=m.exports},"j//0":function(t,s){}});