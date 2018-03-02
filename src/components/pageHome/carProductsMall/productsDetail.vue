<template>
  <yd-layout id="proDetail">
    <yd-navbar slot="navbar" title="商品详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-tab slot="navbar" :callback="switchlist">
      <yd-tab-panel label="商品"  tabkey="0" :active="tabkey==0"></yd-tab-panel>
      <yd-tab-panel label="详情" tabkey="1" :active="tabkey==1"></yd-tab-panel>
      <yd-tab-panel label="评价" tabkey="2" :active="tabkey==2"></yd-tab-panel>
    </yd-tab>
    <swiper :options="swiperOption" ref="mySwiper" id="mySwipers">
      <!-- slides -->
      <swiper-slide>
          <swiper :options="swiperOption1" ref="myImageSwiper" style="max-height: 6rem" id="img">
            <swiper-slide style="height: 100%;text-align:center !important;"  v-for="item,index in previewlist" :key="index">
              <img class="preview-img" :src="item.src"  style="height: 100%;overflow:hidden" @click="$preview.open(index, previewlist)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="spxq1">
            <p class="spxq2">{{product.skuName}}</p>
            <p class="spxq3" style="color:#D41D0F;font-size: .25rem;">{{product.longDescription}}</p>
            <p class="xqjge1">¥<em class="xqjge2" style="color: #d41d0f;">{{price}}</em> &nbsp;<em  style="text-decoration:line-through;color: gray;font-size: 0.3rem">¥{{guidePrice}}</em></p>
            <div v-if="product.skuAssociation.gift&&product.skuAssociation.gift.length>0">
              <span style="color: #7f828f;float: left;padding-top: 0.1rem;">促销:&nbsp;&nbsp;</span>
              <yd-flexbox>
                <yd-flexbox-item>
                  <p  v-for="gifts in product.skuAssociation.gift" style="padding-top: 0.1rem;padding-bottom: 0.1rem"> <span style="border-radius: 0.1rem;border: 1px solid #d41d0f;color: #d41d0f;padding:0 0.1rem">赠品</span>&nbsp;{{gifts.skuName}} </p>
                </yd-flexbox-item>
              </yd-flexbox>
            </div>
            <div v-if="product.skuAssociation.service&&product.skuAssociation.service.length>0">
              <span style="color: #7f828f;float: left;padding-top: 0.1rem;">服务:&nbsp;&nbsp;</span>
              <yd-flexbox>
                <yd-flexbox-item>
                  <p v-if="product.skuAssociation.service" v-for="services in product.skuAssociation.service" style="padding-top: 0.1rem;padding-bottom: 0.1rem"><span style="border-radius: 0.1rem;border: 1px solid #d41d0f;color: #d41d0f;padding:0 0.1rem">服务</span>&nbsp; {{services.serviceName}}</p>
                </yd-flexbox-item>
              </yd-flexbox>
            </div>
          </div>
        <yd-cell-group id="security" @click.native="gotoSecurityDeatil()" style="margin-top: 0.2rem">
          <div style="padding: 0.2rem 0.2rem">
            <button style="line-height: 0.6rem;margin-right: 0.2rem;border: none;" v-for="securityitem in securitylst"><yd-icon name="gouxuan" size=".3rem" color="#ff7723"  custom></yd-icon>{{securityitem}}</button>
          </div>
        </yd-cell-group>
        <yd-cell-group id="info">
          <yd-cell-item>
            <span slot="left" class="spxq14">商家</span>
            <span slot="left" class="spxq16">{{product.storeName}}</span>
          </yd-cell-item>
        </yd-cell-group>
      </swiper-slide>
      <swiper-slide style="background-color: white">
        <yd-cell-item style="border-bottom: 1px solid #D9D9D9;" >
          <span slot="left" class="qbpj1"><em style="color: #d41d0f;font-size: .4rem;">|</em>&nbsp;规格参数</span>
        </yd-cell-item>
        <table class="gridtable">
          <tr style="height: .8rem;">
            <th>等级</th>
            <th>{{param.greade}}</th>
          </tr>
          <tr style="height: .8rem;">
            <th>规格</th>
            <th>{{param.model}}</th>
          </tr>
          <tr style="height: .8rem;">
            <th>单位</th>
            <th>{{param.unit}}</th>
          </tr>
          <tr style="height: .8rem;">
            <th>产地</th>
            <th>{{param.place}}</th>
          </tr>
        </table>
        <yd-cell-item style="border-top: 8px solid #f5f5f5;">
          <span slot="left" class="qbpj1"><em style="color: #D41D0F;font-size: .4rem;">|</em>&nbsp;商品详情</span>
        </yd-cell-item>
        <img  v-for="item,imgindex in list" :key="imgindex" v-lazy="item" style="width: 100%;">
      </swiper-slide>
      <swiper-slide id="reviews">
        <yd-cell-item class="qbpj" style="background-color: #fff">
          <span slot="left" class="qbpj1">全部评价(<span style="color: #d41d0f">{{reviewCount>0?reviewCount:0}}</span>)</span>
        </yd-cell-item>
        <ul style="background-color: #fff">
          <li v-for="item in reviewslist" style="border-bottom: 1px solid #ebeced">
            <yd-flexbox style="padding-top: 0.2rem">
              <div style="width: 1rem;height: 1rem;overflow: hidden;border-radius: 50%;border: 1px solid #edeeef;margin-left: 0.2rem ">
                <img :src="item.avatar" style="width: 100%;height: 100%;"></div>
              <yd-flexbox-item style="margin-left: 0.2rem">
                <yd-flexbox direction="vertical">
                  <yd-flexbox-item style="line-height: 0.6rem;font-size: 0.3rem">{{item.name}}</yd-flexbox-item>
                  <yd-flexbox-item><yd-rate v-model="item.level" size=".3rem" :readonly="true" color="#d41d0f" active-color="#d41d0f"></yd-rate></yd-flexbox-item>
                </yd-flexbox>
              </yd-flexbox-item>
              <div style="padding-right: .3rem;color: #9a9b9c">{{item.date}}</div>
            </yd-flexbox>
            <yd-flexbox style="margin-left: 1.4rem;margin-top: 0.2rem">
              <div style="color: #666869">{{item.desc}}</div><!--用户评论-->
            </yd-flexbox>
            <yd-flexbox style="margin-bottom: 0.2rem">
              <yd-lightbox class="pj_9">
                <yd-lightbox-img v-for="src,srcindex in item.reviewImgs" :key="srcindex" :src="src" class="xqpjtp1"></yd-lightbox-img>
              </yd-lightbox>
            </yd-flexbox>
            <div style="padding: .1rem;" v-if="item.childrens.length>0">
              <p style="background-color: #edeeef;padding: .2rem;" v-for="huifu in item.childrens">
                <span style="color: rgb(255, 125, 73);" >官方回复：</span>{{huifu.desc}}
              </p>
            </div>
          </li>
        </ul>
        <yd-button size="large" class="pj_12" @click.native="gotoReview()">查看全部评论</yd-button>
      </swiper-slide>
    </swiper>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="gotoCar()" :info="quantity+''" />
      <van-goods-action-big-btn  v-if="product.isAvalible==true" text="加入购物车" @click="showBase=!showBase"/>
      <van-goods-action-big-btn  v-if="product.isAvalible==true" text="立即购买" @click="showBase=!showBase" primary />
      <van-goods-action-big-btn  v-if="product.isAvalible==false" text="库存不足"/>
    </van-goods-action>

    <yd-popup v-model="securityView" position="bottom" height="40%" style="z-index: 50;">
      <div style="display: flex;text-align:center;" slot="top">
        <p style="padding: 0.2rem;line-height: 0.4rem;font-size: 0.3rem;width: 98%">服务说明</p>
        <yd-icon slot="icon" name="quxiao" color="#c1c2c3" size="0.5rem" custom @click.native="gotoSecurityDeatil()"></yd-icon>
      </div>
      <ul class="security">
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zpbz" color="#ff0000" size="0.35rem" custom></yd-icon>正品保障</p>
          <p style="color: #808390;padding-left: 0.4rem">配件由商社易配提供、装饰内容商品商社美容提供</p>
        </li>
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zymd" color="#5a62b4" size="0.35rem" custom></yd-icon>自营门店</p>
          <p style="color: #808390;padding-left: 0.4rem">商社汽贸旗下各品牌4S店提供线下服务</p>
        </li>
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zgfp" color="#5a62b4" size="0.35rem" custom></yd-icon>正规发票</p>
          <p style="color: #808390;padding-left: 0.4rem">提供个人发票、增值税普通发票和增值税专用发票，增值税发票需提供单位名称和税号。服务类商品由线下服务门店提供发票。</p>
        </li>
      </ul>
    </yd-popup>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :quota="0"
      @buy-clicked="gotoOder"
      @add-cart="additem"
    />
  </yd-layout>
</template>
<script type="text/babel">
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {baseHttp} from  '../../../config/env'
  import {setStore,getStore} from '../../../config/mUtils'
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'
  import VuePreview from 'vue-preview'
  import {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku
  } from 'vant';

  Vue.use(VueLazyload)
  Vue.use(VuePreview)
  const vm= {
    components: {
      swiper,
      swiperSlide,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
      [Sku.name]:Sku
    },
    data() {
      return {
        skuData:{},
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
          ],
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: true, // 是否无规格商品
          messages: [ {
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0' // 是否必填 '1' 表示必填
          }],
          hide_stock: false // 是否隐藏剩余库存
        },
        isCookie:getStore("token").length>0?true:false,
        goods: {},
        goodsId:'',
        showBase:false,
        tabkey: 0,
        productId: '',//产品Id
        defaultSkuId:'',//默认SkuId
        product: {'isAvalible':true,'skuAssociation':{}},
        skuid:'',//获取选择产品的sku
        price:0,//获取选择产品的价格
        guidePrice:0,
        quantity: 0,
        spinner4: 1,//产品数量
        show2: false,
        securityView:false,
        list: [],//图文列表
        previewlist:[],
        param:{},
        reviews1:{},
        images:{},
        reviewslist:[],//评价数据
        reviewCount:'',//评价总条数
        securitylst:['正品保障','正规发票','自营门店'],
        swiperOption:{
          autoHeight: true, //高度随内容变化
          lazyLoading : true,
          on:{
            slideChange:()=>{
              this.swiper.update();
              this.switchlist('',this.swiper.activeIndex);
            },
          }
        },
        swiperOption1:{
          pagination: {
            el: '.swiper-pagination',
          },
          nested: true,
          autoplayDisableOnInteraction: true,
          resistanceRatio: 0,
          autoplay: 2000,
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted(){
      this.productId =this.$route.query.skuId;
      if(this.isCookie==true){
        this.getCartsQuantity();
      }
      this.productDetail();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity)that.quantity = data.quantity;
        })
      },
      switchlist(label,tabkey){
        this.tabkey = tabkey;
        if (tabkey==1){
         if(!this.param.greade){
            this.productDesc();
         }
        }
        else if(tabkey==2){
          if(this.reviewslist.length==0){
            this.reviews();
          }
        }
        this.swiper.slideTo(tabkey, 500, true)
      },
      /*产品详情*/
      productDetail(){
        const that=this;
        baseHttp(this, '/api/mall/productDetail', {'skuId': this.productId}, 'get', '加载中...', function (data) {
          that.product = data.product;
          if(data.product){
            that.defaultSkuId= data.product.skuId;
            that.skuid =data.product.skuId
            that.price=data.product.price;
            that.guidePrice=data.product.guidePrice;
            that.sku.stock_num=data.product.stock;
            that.sku.price=data.product.price;
            that.sku.collection_id=data.product.skuId;
            that.goods.title=data.product.skuName;
            that.goodsId=data.product.skuId
          }
          var previewlist1=[];
          if(data.product.images){
            that.goods.picture=data.product.images[0];
            data.product.images.forEach(function (item) {
              var img = new Image();
              img.src = item;
              img.onload = function(){
                var b={src:img.src,w:img.width,h:img.height};
                previewlist1.push(b);
              }
            });
          }
          if(data.skus){
            that.sku.none_sku=false;
            data.skus.forEach(function (item) {
              for (var key in item.attrs){
                eval("item."+key+"=\""+item.attrs[key]+"\"");
              }
              item.id=item.skuId;
              item.stock_num=item.stock;
              item.price=item.price*100;
            })
          }
          that.sku.list=data.skus;
          var tree=[];
          if(data.productOptions){
            data.productOptions.forEach(function (item) {
              var treelst={};
              for(var key in item){
                treelst.k=key;
                treelst.k_s=key;
                treelst.v=[];
                for(var vkey in item[key]){
                  treelst.v.push({id:item[key][vkey],name:item[key][vkey]});
                }
              }
              tree.push(treelst);
            })
          }
          that.sku.tree=tree;
          that.previewlist=previewlist1;
          that.productDesc();
        })
      },
      /*商品图文描述*/
      productDesc(){
        const  that =this;
        baseHttp(this, '/api/mall/productDesc', {'skuId': this.productId}, 'get', '加载中...', function (data) {
          if(data.images)that.images=data.images;
          if(data.images.descriptions) that.list = data.images.descriptions;
          if(data.images.param) that.param=data.images.param;
            that.$nextTick(function() {
              that.swiper.update();
            })

        })
      },
      /*获取部分评论*/
      reviews(){
        const  that =this;
        baseHttp(this, '/api/mall/reviews', {'skuId': this.productId, 'page': 1, 'pageSize': '3'}, 'get', '加载中...', function (data) {
          that.reviews1=data;
          if(data.reviews){
            that.reviewslist=data.reviews;
          }
          if(data.reviewCount)that.reviewCount=data.reviewCount;
        })
      },
      gotoSecurityDeatil(){
        this.securityView=!this.securityView;
      },
      /*加入购物车*/
      additem(skuData){
        var skuId='';
        if(skuData.selectedSkuComb){
          skuId=skuData.selectedSkuComb.id;
        }else{
          skuId=skuData.goodsId;
        }
        var  that =this;
        baseHttp(this,'/api/carts/addToCarts',{'skuId':skuId,'quantity':skuData.selectedNum,'merchantId':this.product.merchantId},'post','',function (data){
          that.showBase=false;
          that.quantity=parseInt(that.quantity)+1;
        });
      },
      gotoCar(){
        this.$router.push({ name: 'shoppingCart',meta:{title:'购物车'}});
      },
      /*立即购买*/
      gotoOder(skuData){
        var skuId='';
        if(skuData.selectedSkuComb){
          skuId=skuData.selectedSkuComb.id;
        }else{
          skuId=skuData.goodsId;
        }
        var oderInfo={};
        var carInfo = getStore('carInfo');
        if (carInfo.type){
          oderInfo.carDetailId=carInfo.id;//
        }
        var cityInfo=getStore('cityInfo');
        if(cityInfo.cityName){
          oderInfo.location=cityInfo.cityName;
        }else{
          oderInfo.location='重庆';
        }
        oderInfo.orderType='GENERAL';
        var products=[];
        var product={};
        product.skuId=skuId;
        product.quantity=skuData.selectedNum;
        products.push(product);
        if(products.length==0){
          this.$dialog.toast({mes: '请选择购物商品', timeout: 1000});
          return;
        }
        oderInfo.products=products;
        setStore("oderInfo",oderInfo);
        this.$router.push({ name: 'orderSubmit'});
      },
      /*查看评论*/
      gotoReview(){
        this.$router.push({ name: 'reviewsList',query:{skuId:this.productId},meta:{title:'评价列表'}});
      },
      onClickMiniBtn(){

      },
    },
  }
  export default vm;
</script>
<style scoped>
    .spxq1{
      padding-left:0.3rem;
      background-color: white;
    }

    .spxq2{
      line-height: .5rem;
      font-size: 0.3rem;
      color: #001b29;
    }

    .spxq3{
      color: red;
      text-decoration:underline;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    #natureCotainer.nature-container.spxq10{
      margin-left: 15px;
      background-color: white;
      margin-top:13px;

    }
    .part-note-msg{
      line-height: 23px;
      float: left;
    }
    .part-note-msg.spxq11{
      color: rgb(129, 131, 142);
    }
    .selectBtn {
      color: red;
      border: 1px solid #f00 !important;
    }

    .noslectBtn {
      color: #999;
      border: 1px dashed #666 !important;
    }
    .pro-size{
      background-color: white;
      margin-top:0.2rem;

    }
    .pro-size.spxq12{
      padding-left: 15px;
    }
    .spxq14{
      color: rgb(129, 131, 142);
    }
    .spxq16{
      margin-left: 10px;
    }
    .qbpj1 {
      color: #8f8f94;
    }
    /*详情页面*/
    table.gridtable {
      width: 100%;
      font-family: verdana,arial,sans-serif;
      font-size:.25rem;
      color:#8f8f94;
      border-width: 1px;
      border-color: #666666;
      border-collapse: collapse;
    }
    table.gridtable th {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #D9D9D9;
      border-top: none;
    }
    .security{
      padding: 0 0.2rem;
    }
    .security li{
      padding: 0.2rem;
    }
    .security li:not(:last-child){
      border-bottom: 1px solid #ebf0f1;
    }
    .xqjge1{
      color: red;
      margin-top: 0.1rem;
    }
    em.xqjge2{
      font-size: .4rem;
    }
    .pj_12.yd-btn-block.yd-btn-primary {
      margin-top: 0px;
      background-color: #FFFFFF;
      color: #8f8f94;
      font-size: .3rem;
    }
    .gwl1 {
      width: 15%;
      float: left;
      margin-top: 5px;
    }
    #proDetail .yd-tabbar-item.gwul2.yd-tabbar-active {
      color: rgb(151, 151, 151);
    }
    .ljgm1.yd-btn.yd-btn-warning{
      width: 20%;
      height: 50px;
      float: right;
      background-color: red;
      border: none;
      border-radius: 0;
      margin-top: 1px;
    }
    .jrgwc1.yd-btn.yd-btn-warning{
      width: 20%;
      height: 50px;
      float: right;
      border: none;
      border-radius: 0;
      margin-top: 1px;
    }
    .jrgwc2.yd-btn.yd-btn-primary{
      margin: 30px;
      background-color: #FFFFFF;
      height: 50%;
    }
    .pj_9 {
      margin-left: 1.2rem;
      margin-top: .2rem;
    }
    .pj_9 img:not(:first-child){
      margin-left: 0.1rem;
    }
    .xqpjtp1 {
      float: left;
      width: 1.55rem;
      height: 1.55rem;
      padding-right: .1rem;
      padding-top: .1rem;
    }
</style>
<style>
  #proDetail .swiper-pagination-bullet-active{
    background:red;
  }
  #reviews .yd-cell-item.qbpj {
    border-bottom: 8px solid #f5f5f5;
  }
  #info .yd-cell:after {
    border-bottom: 0px;
  }
  #info .yd-cell-item {
    max-height: 0.8rem;
  }
  #img .swiper-wrapper{
    height: 6rem;
  }
  #reviews .yd-cell-item:not(:last-child):after{
    border-bottom:0px;
  }

</style>
