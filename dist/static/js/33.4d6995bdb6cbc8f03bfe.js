webpackJsonp([33],{"1khl":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("mvHQ"),a=s.n(n),c=s("uaSg"),i=s("yclV"),o={data:function(){return{show1:!1,tbid:"",brand:"",data:{},value:0,items:[],shows:!1,bfitem:[],bfselect:{},rowOne:0}},watch:{items:{deep:!0,handler:function(e,t){console.log(1),this.calculateMoney()}}},mounted:function(){this.getInsuranceQuotation()},beforeRouteEnter:function(e,t,s){s(function(e){})},beforeRouteLeave:function(e,t,s){"insuranceSure"==e.name&&(e.meta.keepAlive=!0),s(function(e){}),console.log(e)},methods:{gotoback:function(){this.$router.go(-1)},show:function(e,t,s){this.rowOne=s,this.bfselect=t,this.bfitem=e,this.show1=!this.show1},changeBjmp:function(e,t,s){if(0==e){var n=parseFloat(t.bf_a)+parseFloat(t.bf_bjmp);n+="",this.$set(this.items[s],"itemAmount",n)}else this.$set(this.items[s],"itemAmount",t.bf_a);this.$set(this.items[s],"bf_bjmp",!e)},chosebf:function(e){if(this.show1=!this.show1,this.$set(this.items[this.rowOne],"selectbes",e),1==this.items[this.rowOne].bf_bjmp){var t=parseFloat(e.bf_a)+parseFloat(e.bf_bjmp);t+="",this.$set(this.items[this.rowOne],"itemAmount",t)}else this.$set(this.items[this.rowOne],"itemAmount",e.bf_a)},chooseBrand:function(e){this.tbid=this.data.items[e].tbid,this.brand=this.data.items[e].brand,this.baofeiDeal(this.data.items[e].items)},getInsuranceQuotation:function(){var e=this;Object(c.a)(this,"/api/insurance/getQuotations",{},"get","加载中...",function(t){t.totalMoney=0,e.data=t,e.data.items.length>0?(e.tbid=e.data.items[0].tbid,e.brand=e.data.items[0].brand,e.baofeiDeal(e.data.items[0].items)):e.$dialog.alert({mes:"暂时未获取险种请等待！",callback:function(){e.gotoback()}})})},baofeiDeal:function(e){e.forEach(function(e){e.bes.length>0&&(e.bf_bjmp=!1,e.bes.forEach(function(t){e.itemAmount==t.bf_a&&(e.selectbes=t)})),e.children&&e.children.length>0&&e.children.forEach(function(e){e.bes.length>0&&(e.bf_bjmp=!1,e.bes.forEach(function(t){e.itemAmount==t.bf_a&&(e.selectbes=bes)}))})}),this.items=e},calculateMoney:function(){var e=0,t=0;this.items.forEach(function(s){1==s.checked&&(2!=s.productInsuranceId&&28!=s.productInsuranceId&&(t+=parseFloat(s.itemAmount)),e+=parseFloat(s.itemAmount),s.children&&s.children.length>0&&s.children.forEach(function(s){1==s.checked&&(e+=parseFloat(s.itemAmount),2!=s.productInsuranceId&&28!=s.productInsuranceId&&(t+=parseFloat(s.itemAmount))),s.children&&s.children.length>0&&s.children.forEach(function(s){1==s.checked&&(e+=parseFloat(s.itemAmount),2!=s.productInsuranceId&&28!=s.productInsuranceId&&(t+=parseFloat(s.itemAmount)))})}))}),this.data.totalMoney=Math.round(100*(e+.06*t))/100},sure:function(){var e=[];this.items.forEach(function(t){if(1==t.checked){if(t.bes.length>0){var s={id:t.productInsuranceId,xzmc:t.productInsuranceName,be:t.selectbes.be_a,bf:t.selectbes.bf_a};if(e.push(s),1==t.bf_bjmp){s={id:t.relatedId,xzmc:t.productInsuranceName+"不计免赔",be:t.selectbes.be_a,bf:t.selectbes.bf_bjmp};e.push(s)}}else{s={id:t.productInsuranceId,xzmc:t.productInsuranceName,be:t.insuredValue,bf:t.itemAmount};e.push(s)}t.children&&t.children.length>0&&t.children.forEach(function(t){if(1==t.checked){var s={id:t.productInsuranceId,xzmc:t.productInsuranceName,be:t.insuredValue,bf:t.itemAmount};e.push(s),t.children&&t.children.length>0&&t.children.forEach(function(t){if(1==t.checked){var s={id:t.productInsuranceId,xzmc:t.productInsuranceName,be:t.insuredValue,bf:t.itemAmount};e.push(s)}})}})}});var t=this;Object(c.a)(this,"/api/insurance/totleFee",{tbid:this.tbid,brand:this.brand,contents:a()(e)},"post","正在获取报价...",function(e){e.gifts.length>0&&e.gifts.forEach(function(e){e.select=!1}),Object(i.e)("insuranceInfo",e),t.$router.push({name:"insuranceSure"})})}}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("yd-layout",{attrs:{id:"insurancetype"}},[s("yd-navbar",{attrs:{slot:"navbar",title:"险种选择",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[s("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(t){e.gotoback()}},slot:"left"},[s("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),e._v(" "),s("yd-cell-group",{attrs:{slot:"navbar"},slot:"navbar"},[s("yd-cell-item",{attrs:{arrow:""}},[s("span",{attrs:{slot:"left"},slot:"left"},[e._v("车辆信息选择")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticStyle:{color:"black"},attrs:{slot:"right"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.value=t.target.multiple?s:s[0]},function(t){e.chooseBrand(e.value)}]},slot:"right"},e._l(e.data.items,function(t,n){return s("option",{attrs:{selected:"selected"},domProps:{value:n}},[e._v("\n          "+e._s(t.brand)+"\n        ")])}))])],1),e._v(" "),s("ul",{staticClass:"bg_ul"},e._l(e.items,function(t,n){return s("li",{key:n},[s("yd-checkbox",{attrs:{shape:"circle",disabled:!t.canCancel,color:"#F00"},model:{value:t.checked,callback:function(s){e.$set(t,"checked",s)},expression:"item.checked"}},[e._v(e._s(t.productInsuranceName)),s("span",{staticClass:"money"},[e._v("¥"+e._s(e._f("num2P")(t.itemAmount)))])]),e._v(" "),t.bes.length>0&&1==t.checked?s("div",{staticStyle:{"border-top":"1px solid #eeeeee","margin-top":"0.2rem"}},[s("ul",{staticClass:"bf_ul"},[s("li",{on:{click:function(s){e.show(t.bes,t.selectbes,n)}}},[s("span",{staticClass:"yd-checkbox-text",staticStyle:{"font-size":"14px"}},[e._v("保费:"+e._s(e._f("num2P")(t.selectbes.bf_a))+"  \n               保额:"+e._s(e._f("num2P")(t.selectbes.be_a)))]),s("span",{staticClass:"yd-cell-arrow",staticStyle:{float:"right","padding-right":".24rem"}})]),e._v(" "),s("li",{on:{click:function(s){e.changeBjmp(t.bf_bjmp,t.selectbes,n)}}},[s("label",{staticClass:"yd-checkbox yd-checkbox-circle"},[s("span",{staticClass:"yd-checkbox-icon",class:{"selectyd-checkbox-icon":1==t.bf_bjmp},staticStyle:{width:"20px",height:"20px",color:"rgb(255, 0, 0)"}},[s("i",{staticStyle:{width:"6px",height:"12px"}})]),e._v(" "),s("span",{staticClass:"yd-checkbox-text"},[e._v("保费不计免赔"),s("span",{staticClass:"money"},[e._v(e._s(e._f("num2P")(t.selectbes.bf_bjmp)))])])])])])]):e._e(),e._v(" "),t.children?s("div",[t.children.length>0&&1==t.checked?s("ul",{staticClass:"bg_ul"},e._l(t.children,function(n,a){return s("li",{key:a},[s("yd-checkbox",{attrs:{shape:"circle",color:"#F00"},model:{value:n.checked,callback:function(t){e.$set(n,"checked",t)},expression:"childernitem.checked"}},[e._v(e._s(n.productInsuranceName)),s("span",{staticClass:"money"},[e._v("¥"+e._s(e._f("num2P")(n.itemAmount)))])]),e._v(" "),n.bes.length>0&&1==n.checked?s("div",{staticStyle:{"border-top":"1px solid #eeeeee","margin-top":"0.2rem"}},[s("ul",{staticClass:"bf_ul"},[s("li",{on:{click:function(t){e.show(n.bes,n.selectbes,a)}}},[s("span",{staticClass:"yd-checkbox-text",staticStyle:{"font-size":"14px"}},[e._v("保费:"+e._s(e._f("num2P")(t.selectbes.bf_a))+"  \n               保额:"+e._s(e._f("num2P")(t.selectbes.be_a)))]),s("span",{staticClass:"yd-cell-arrow",staticStyle:{float:"right","padding-right":".24rem"}})]),e._v(" "),s("li",[s("yd-checkbox",{attrs:{shape:"circle",color:"#F00"},model:{value:t.bf_bjmp,callback:function(s){e.$set(t,"bf_bjmp",s)},expression:"item.bf_bjmp"}},[e._v("保费不计免赔"),s("span",{staticClass:"money"},[e._v(e._s(e._f("num2P")(t.selectbes.bf_bjmp)))])])],1)])]):e._e(),e._v(" "),n.children?s("div",[n.children.length>0&&1==n.checked?s("ul",{staticClass:"bg_ul"},e._l(n.children,function(t){return s("li",[s("yd-checkbox",{attrs:{shape:"circle",color:"#F00"},model:{value:t.checked,callback:function(s){e.$set(t,"checked",s)},expression:"childern2item.checked"}},[e._v(e._s(t.productInsuranceName)),s("span",{staticClass:"money"},[e._v("¥"+e._s(e._f("num2P")(t.itemAmount)))])])],1)})):e._e()]):e._e()],1)})):e._e()]):e._e()],1)})),e._v(" "),s("div",{staticStyle:{margin:"0",width:"100%",height:"1rem","background-color":"white"},attrs:{slot:"tabbar"},slot:"tabbar"},[s("yd-button",{staticStyle:{"background-color":"#363636",margin:"auto",float:"left",width:"60%","border-radius":"inherit","font-size":"0.3rem","text-align":"left","padding-left":"0.2rem"},attrs:{size:"large"}},[s("p",{staticStyle:{"font-weight":"bold"}},[e._v("合计:"+e._s(e._f("num2P")(e.data.totalMoney))+"\n      "),s("br"),s("span",{staticStyle:{"font-size":"0.2rem"}},[e._v(" (含增值税,以实际结算为准)")])])]),e._v(" "),s("yd-button",{staticStyle:{"background-color":"#d41d0f",margin:"auto",float:"right",width:"40%","border-radius":"inherit"},attrs:{size:"large",type:"primary"},nativeOn:{click:function(t){e.sure(t)}}},[e._v("确认")])],1),e._v(" "),s("yd-popup",{attrs:{position:"center",width:"80%"},model:{value:e.show1,callback:function(t){e.show1=t},expression:"show1"}},[s("ul",{staticClass:"bf_ul"},e._l(e.bfitem,function(t){return s("li",{class:{select:t.bf_a==e.bfselect.bf_a,no_select:t.bf_a!=e.bfselect.bf_a},on:{click:function(s){e.chosebf(t)}}},[s("span",{staticClass:"yd-checkbox-text",staticStyle:{"font-size":"14px","margin-left":"0.5rem"}},[e._v("保费:"+e._s(e._f("num2P")(t.bf_a))+"  \n               保额:"+e._s(e._f("num2P")(t.be_a)))])])}))])],1)},staticRenderFns:[]};var r=s("VU/8")(o,l,!1,function(e){s("EZGe"),s("QyVQ")},"data-v-596175ac",null);t.default=r.exports},EZGe:function(e,t){},QyVQ:function(e,t){}});