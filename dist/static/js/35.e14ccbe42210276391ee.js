webpackJsonp([35],{"1Kk2":function(t,e){},xPzR:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("uaSg"),c={data:function(){return{quantity:0,initindex:0,nums:10,categories:[],catItemlist:[],cacheCatItemList:[],caturl:"",caturllist:[],selectcategoryId:""}},mounted:function(){this.$route.query.hasOwnProperty("categoryId")&&(this.selectcategoryId=this.$route.query.categoryId),this.getData()},beforeRouteEnter:function(t,e,s){s(function(t){"home"==e.name&&(t.$route.query.hasOwnProperty("categoryId")&&(t.selectcategoryId=t.$route.query.categoryId),t.getData())})},beforeRouteLeave:function(t,e,s){s(function(t){})},methods:{gotoback:function(){this.$router.go(-2)},getData:function(){var t=this.$store.state.basicStorage.categoryList;if(t.length>0)for(var e in this.categories=t,this.cacheCatItemList=this.categories,this.categories)this.selectcategoryId.length>0&&this.selectcategoryId==this.categories[e].categoryId?(this.categories[e].select=!0,this.selectItemCategories(this.categories[e].categoryId,e)):0==this.selectcategoryId.length&&e==this.initindex?(this.categories[e].select=!0,this.selectItemCategories(this.categories[e].categoryId,e)):this.categories[e].select=!1;else{var s=this;Object(a.a)(this,"/api/mall/category",this.loginpas,"post","加载中...",function(t){if(t.categories){for(var e in s.cacheCatItemList=t.categories,t.categories)s.selectcategoryId.length>0&&s.selectcategoryId==t.categories[e].categoryId?(t.categories[e].select=!0,s.selectItemCategories(t.categories[e].categoryId,e)):0==s.selectcategoryId.length&&e==s.initindex?(t.categories[e].select=!0,s.selectItemCategories(t.categories[e].categoryId,e)):t.categories[e].select=!1;s.categories=t.categories,s.$store.dispatch("setCategoryList",s.categories)}})}},selectItemCategories:function(t,e){this.selectcategoryId=t+"";var s=this;this.catItemlist=void 0!=s.cacheCatItemList[e].catItemlist?s.cacheCatItemList[e].catItemlist:[],s.caturllist.length>=e&&(this.caturl=s.caturllist[e]?s.caturllist[e]:""),this.catItemlist.length>0||Object(a.a)(this,"/api/mall/category",{parentId:t},"post",0==this.catItemlist.length?"加载中...":"",function(t){t.categories?(s.caturllist[e]=t.url,s.cacheCatItemList[e].catItemlist=t.categories,s.catItemlist=t.categories,s.caturl=t.url):(s.caturllist[e]="",s.cacheCatItemList[e].catItemlist=[],s.catItemlist=[])})},selectItem:function(t){for(var e in this.categories)e==t?this.categories[t].select=!0:this.categories[e].select=!1;this.selectItemCategories(this.categories[t].categoryId,t)},gotoList:function(t){this.$router.push({path:"/home/productsList",query:{categoryId:t.categoryId}})}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"carPro"}},[s("yd-navbar",{attrs:{slot:"navbar",title:"商品分类",bgcolor:"#d41d0f",color:"#FFF"},slot:"navbar"},[s("router-link",{attrs:{slot:"left",to:""},nativeOn:{click:function(e){t.gotoback()}},slot:"left"},[s("yd-navbar-back-icon",{attrs:{color:"#FFF"}})],1)],1),t._v(" "),s("div",{staticClass:"yd-scrolltab"},[s("div",{staticClass:"yd-scrolltab-nav"},t._l(t.categories,function(e,a){return s("a",{key:a,staticClass:"yd-scrolltab-item",class:{"yd-scrolltab-active":e.select},attrs:{href:"javascript:;"},on:{click:function(e){t.selectItem(a)}}},[t._m(0,!0),t._v(" "),s("div",{staticClass:"yd-scrolltab-title",staticStyle:{"font-size":".28rem"}},[t._v(t._s(e.categoryName))])])})),t._v(" "),s("div",{staticClass:"yd-scrolltab-content"},[t.caturl&&t.caturl.length>0?s("div",[s("img",{attrs:{src:t.caturl,width:"100%"}})]):t._e(),t._v(" "),s("yd-grids-group",{attrs:{rows:3}},t._l(t.catItemlist,function(e,a){return s("yd-grids-item",{key:a,attrs:{link:{name:"productsList",query:{categoryId:e.categoryId}}}},[s("img",{attrs:{slot:"icon",src:e.imgUrl},slot:"icon"}),t._v(" "),s("span",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.categoryName))])])}))],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"yd-scrolltab-icon"},[e("i",{staticClass:"demo-icons-category1"})])}]};var r=s("VU/8")(c,i,!1,function(t){s("1Kk2")},null,null);e.default=r.exports}});