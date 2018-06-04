<template>
  <yd-layout id="proDetail">
    <van-swipe :autoplay="3000" :style="{height:screenWidth+'px'}">
      <van-swipe-item v-for="(item, index) in previewlist" :key="index">
        <div class="thumb">
          <img v-lazy="item.src" @click="showPreview(index)"/>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <p class="skuName">{{product.skuName}}</p>
        <p class="longDescription">{{product.longDescription}}</p>
        <p class="price">¥<em>{{price}}</em> <em class="guidePrice">¥{{guidePrice}}</em></p>
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
      </van-cell>
   </van-cell-group>
    <van-cell-group style="margin-top: 0.2rem;margin-bottom: 0.2rem">
      <van-cell>
          <span class="store">商家</span>
          <span class="storeName"> {{product.storeName}} </span>
      </van-cell>
      <van-cell is-link :to="{'path':'/home/greatCustomer'}">
        <span class="store">大客户经理</span>
      </van-cell>
    </van-cell-group>
    <van-tabs :active="active" swipeable  sticky :duration="0.5" style="background-color: #ffffff;margin-bottom: 1rem;z-index: 1" id="tabs">
      <van-tab  title="商品详情">
        <van-cell-group>
          <van-cell>
            <span  class="qbpj1"><em style="color: #D41D0F;font-size: .5rem;">|</em>&nbsp;商品规格</span>
          </van-cell>
          <van-cell>
            <van-col span="12" style="border-right: 1px solid #f5f5f5;border-bottom: 1px solid #f5f5f5;">等级:{{param.greade}}</van-col>
            <van-col span="12" style="border-bottom: 1px solid #f5f5f5;padding-left: 0.2rem">规格:{{param.model}}</van-col>
            <van-col span="12" style="border-right: 1px solid #f5f5f5;padding-right: 0.2rem">单位:{{param.unit}}</van-col>
            <van-col span="12" style="padding-left: 0.2rem">产地:{{param.place}}</van-col>
          </van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell>
            <span  class="qbpj1"><em style="color: #D41D0F;font-size: .5rem;">|</em>&nbsp;商品详情</span>
          </van-cell>
          <img  v-for="item,imgindex in descriptions" :key="imgindex"  v-lazy="item"  style="width: 100%;display: block; " @click="showPreviewDetail(imgindex)">
        </van-cell-group>
      </van-tab>
      <van-tab title="商品评价">
        <van-cell-group>
          <van-cell>
            <span  class="qbpj1">评价</span>
          </van-cell>
          <van-cell class="reviews"  v-if="reviewslist.length>0">
            <ul>
              <li v-for="item in reviewslist">
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
                <div style="padding: .1rem;" v-if="item.childrens &&item.childrens.length>0">
                  <p style="background-color: #edeeef;padding: .2rem;" v-for="huifu in item.childrens">
                    <span style="color: rgb(255, 125, 73);" >掌柜回复：</span>{{huifu.desc}}
                  </p>
                </div>
              </li>
            </ul>
          </van-cell>
          <van-cell>
            <van-col offise="1" span="11" style="">共<span style="color: #f00;">{{reviewCount}}</span> 评论</van-col>
            <van-col span="12" style="text-align: right" @click.native="gotoReview">查看更多<div class="yd-cell-arrow" style="float: right">
            </div></van-col>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>

    <van-goods-action slot="tabbar" style="z-index: 1">
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="gotoCar()" :info="$store.state.basicStorage.quantity+''" />
      <van-goods-action-big-btn  v-if="product.isAvalible==true" text="加入购物车" @click="shopping(1)"/>
      <van-goods-action-big-btn  v-if="product.isAvalible==true" text="立即购买" @click="shopping(2)" primary />
      <van-goods-action-big-btn  v-if="product.isAvalible==false" text="联系门店" />
    </van-goods-action>
    <van-sku slot="tabbar"
             v-model="showBase"
             :sku="sku"
             :goods="goods"
             :goods-id="goodsId"
             :hide-stock="sku.hide_stock"
             :quota="0"
             :reset-stepper-on-hide="sku.resetStepperOnHide"
             :reset-selected-sku-on-hide="sku.resetSelectedSkuOnHide"
             @buy-clicked="gotoOder"
             @add-cart="additem"
    >
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions" style="display: none">
          <van-button v-if="isCarOrBuy==1" type="primary" bottom-action @click="props.skuEventBus.$emit('sku:addCart')">加入购物车</van-button>
          <van-button type="primary" v-else-if="isCarOrBuy==2" bottom-action @click="props.skuEventBus.$emit('sku:buy')">下一步</van-button>
        </div>
      </template>
    </van-sku>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from  '../../../config/env'
  import {setStore,getStore} from '../../../config/mUtils'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku,
    Button,
    Cell,
    Col,
    CellGroup,
    ImagePreview,
    Swipe,
    SwipeItem,
    Tab,
    Tabs
  } from 'vant';
  const vm= {
    computed: {
      ...mapGetters([
        'quantity',
        'storeinfo',
      ])
    },
    components: {
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
      [Sku.name]:Sku,
      [Button.name]:Button,
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
      [Col.name]:Col,
      [ImagePreview.name]:ImagePreview,
      [Swipe.name]:Swipe,
      [SwipeItem.name]:SwipeItem,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
    },
    data() {
      return {
        externalId:'',
        active:0,
        screenWidth: document.body.clientWidth,
        sku: {
          tree: [],
          list: [],
          stock_num:1,
          collection_id:0,
          price:'',
          none_sku: true, // 是否无规格商品
          messages: [ {
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0' // 是否必填 '1' 表示必填
          }],
          hide_stock: false, // 是否隐藏剩余库存
          resetStepperOnHide:true,//窗口隐藏时重置选择的商品数量
          resetSelectedSkuOnHide:true,//窗口隐藏时重置已选择的sku
        },
        isCarOrBuy:0,//1表示Car 2表示 buy
        goods: {
          title: '',
          picture: ''
        },
        goodsId:'',
        showBase:false,
        tabkey: 0,
        productId: '',//产品Id
        defaultSkuId:'',//默认SkuId
        product: {'isAvalible':true,'skuAssociation':{}},
        skuid:'',//获取选择产品的sku
        price:0,//获取选择产品的价格
        guidePrice:0,
        spinner4: 1,//产品数量
        show2: false,
        securityView:false,
        descriptions: [],//图文列表
        previewlist:[],
        param:{},
        images:{},
        reviewslist:[],//获取部分评价数据
        reviewCount:'0',//评价总条数
        securitylst:['正品保障','正规发票','自营门店'],
      }
    },
    computed: {
    },
    mounted(){
      const  that =this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
      if(this.$route.query.skuId){
        this.productId =this.$route.query.skuId+'';
      } else{
        this.externalId=this.$route.query.skuCode+'';
      }
      this.productDetail();
    },
    methods:{
      shopping(isCarOrBuy){
        this.isCarOrBuy=isCarOrBuy;
        this.showBase=!this.showBase
      },
      gotoback(){
        this.$router.go(-1);
      },
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity)that.$store.dispatch('setQuantity',data.quantity);
        })
      },
      /*产品详情*/
      productDetail(){
        const that=this;
        var parm={};
        if (this.productId.length>0){
          parm.skuId=this.productId;
        }else{
          parm.externalId=this.externalId;
        }
        baseHttp(this, '/api/mall/skuDetail', parm, 'get', '加载中...', function (data) {
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
            that.goodsId=data.product.skuId;
            that.sku.none_sku=data.product.noneSku;
            that.sku.hide_stock=data.product.hideStock;
          }
          var previewlist1=[];
          if(data.product.images){
            that.goods.picture=data.product.images[0];
            data.product.images.forEach(function (item) {
              previewlist1.push({src:item});
            });
          }
          that.previewlist=previewlist1;
          if(data.skus){
            that.sku.list=data.skus;
          }
          if(data.productOptions){
            that.sku.tree =data.productOptions;
          }
          that.productDesc();
        })
      },
      /*商品图文描述*/
      productDesc(){
        const  that =this;
        baseHttp(this, '/api/mall/productDesc', {'skuId': this.skuid}, 'get', '加载中...', function (data) {
          if(data.images)that.images=data.images;
          if(data.images.descriptions) that.descriptions = data.images.descriptions;
          if(data.images.param) that.param=data.images.param;
          that.reviews();
        })
      },
      /*获取部分评论*/
      reviews(){
        const  that =this;
        baseHttp(this, '/api/mall/reviews', {'skuId': this.skuid, 'page': 1, 'pageSize': '8'}, 'get', '加载中...', function (data) {
          if(data.reviews){
            that.reviewslist=data.reviews;
          }
          if(data.reviewCount)that.reviewCount=data.reviewCount;
        })
      },
      /*刷新列表*/
      loadList(){
        this.page = 1;
        this.reviews1(true);
      },
      /*加载更多*/
      loadMore(){
        this.page = this.page + 1;
        this.reviews1(true);
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
          that.getCartsQuantity();
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
      //客服电话
      onClickMiniBtn(){
        window.location.href = 'tel://'+this.storeinfo.systemPhone;
      },
      //图片预览
      showPreview(index){
        var img=[];
        this.previewlist.forEach(function (item) {
          img.push(item.src);
        })
        ImagePreview(img, index);
      },
      showPreviewDetail(index){
        ImagePreview(this.descriptions, index);
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .thumb {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    text-align: center;
  }
  .thumb img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    border: 0;
    vertical-align: middle;
  }
  .skuName{
    line-height: .5rem;
    font-size: 0.3rem;
    color: #001b29;
  }
  .longDescription{
    text-decoration:underline;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    color:#D41D0F;
    font-size: .25rem;

  }
  .price{
    color: red;
    margin-top: 0.1rem;
  }
  .price >em{
    font-size: .4rem;
    color: #d41d0f;
  }
  .price .guidePrice {
    text-decoration:line-through;
    color: gray;
    font-size: 0.3rem
  }
  .store{
    color: rgb(129, 131, 142);
    font-size: 0.28rem;
  }
  .storeName{
    font-size: 0.28rem;
  }

  .qbpj1 {
      color: #8f8f94;
      font-size: 0.28rem;
    }
    .reviews ul{
      background-color: #ffffff;
    }
    .reviews ul li:not(:last-child){
      border-bottom: 1px solid #ebeced
    }
</style>
<style>
  #reviews .yd-cell-item:not(:last-child):after{
    border-bottom:0px;
  }

</style>
