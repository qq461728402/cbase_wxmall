<template>
  <yd-layout id="carmain">
    <yd-navbar slot="navbar" :title="type=='upkeep'?'爱车保养':'爱车美容'" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="topHead" slot="navbar">
      <div class="models" style="height: 55px">
        <div class="left">
          <div v-if="carInfo.name">
            <img :src="carInfo.logo" style="height: 42px">
            <p class="title" style="height: 21px;line-height: 21px" v-cloak>{{carInfo.type}}</p>
            <p class="desc" style="height: 21px;line-height: 21px" v-cloak>{{carInfo.name}}</p>
          </div>
          <div v-else>
            <p class="title" style="height: 42px;line-height: 42px" v-cloak>请选择车辆</p>
          </div>
        </div>
        <div class="right" style="text-align: right">
          <span @click="gotocar">更换</span>
        </div>
      </div>
    </div>
    <yd-step theme="2" style="background-color:white;margin-top: 10px; font-size: .3rem;" slot="navbar">
      <yd-step-item id="stepone">
        <span slot="bottom">在线选项目</span>
      </yd-step-item>
      <yd-step-item id="steptwo">
        <span slot="bottom">下单选门店</span>
      </yd-step-item>
      <yd-step-item id="stepthree">
        <span slot="bottom">商品送到店</span>
      </yd-step-item>
      <yd-step-item id="stepfour">
        <span slot="bottom">到店享安装</span>
      </yd-step-item>
    </yd-step>

    <yd-accordion v-for="item,itemindex in items" :key="itemindex" style="margin-top: 0.2rem">
      <yd-accordion-item open>
        <div slot="title" style="width: 100%; line-height: 1rem;"><span>{{item.name}}</span></div><!--项目名称-->
        <div style="padding:0 .24rem 0 .24rem;">
          <ul slot="list" v-for="product,index in item.products" :key="index">
            <li style="border-bottom: 1px solid #edeeef;" @click="gotoDetail(product)">
              <yd-flexbox style="box-sizing: content-box;">
                <div style="padding: 0.2rem;height: 1.8rem;width: 1.8rem">
                  <img :src="product.image" style="height: 1.5rem;width: 1.5rem">
                </div>
                <yd-flexbox-item style="margin-left: .1rem;">
                  <yd-flexbox direction="vertical">
                    <yd-flexbox-item style="padding-top: 0.1rem">
                      <p style="font-size: 0.3rem;min-height: 0.6rem;overflow:hidden; text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">
                        {{product.name}}</p>
                    </yd-flexbox-item><!--商品名-->
                    <yd-flexbox-item style="padding-bottom: 0.1rem">
                      <span style="color:red;font-size: 0.25rem;">&yen;{{product.salePrice}}</span>&nbsp;
                      <span style="color:#6e6f70;text-decoration:line-through;">&yen;{{product.retailPrice}}</span>&nbsp;
                      <span style="background-color: #d41d0f;padding:0.05rem 0.1rem;color: #fff;border-radius: 0.05rem"
                            v-if="product.shippingType=='DELIVERY'||product.shippingType=='BOTH'">快递</span>
                      <span style="background-color: #d41d0f;padding:0.05rem 0.1rem;color: #fff;border-radius: 0.05rem"
                            v-if="product.shippingType=='SELF_DELIVERY'||product.shippingType=='BOTH'">到店服务</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item style="margin-bottom: 0.1rem">
                      <yd-spinner v-model="product.count"></yd-spinner>
                                            <span style="float: right;">
                                                <yd-button type="hollow" style="height: .55rem;border:1px solid #d41d0f;color: #d41d0f;" @click.stop.native="payItem(product)"
                                                           v-if="product.canAddCart==true">加入购物车
                                                </yd-button>
                                               <yd-button type="hollow" style="height: .55rem;border:1px solid #d41d0f;color: #d41d0f;" @click.stop.native="getpay(product)" v-else>
                                                 立即购买
                                               </yd-button>
                                            </span>
                    </yd-flexbox-item>
                  </yd-flexbox>
                </yd-flexbox-item>
              </yd-flexbox>
            </li>
          </ul>
        </div>
      </yd-accordion-item>
      <hr style="border: none; border-bottom: 5px solid #f5f5f5;"/>
    </yd-accordion>

    <div class="noProduct" v-if="items.length==0" ref="noProduct" style="display: none">
      <img src="../../../assets/img/noProduct.png">
      <p>暂无保养信息</p>
      <link to="/">
      <a>回到首页</a></link>
    </div>
    <div slot="tabbar" align="center" style="background-color: #ffffff">
      <a class="gwl1 yd-tabbar-item gwul2 yd-tabbar-active">
        <span class="yd-tabbar-icon"><i class="yd-icon-phone2" style="font-size: 0.54rem;"></i></span>
        <span class="yd-tabbar-txt">客服</span>
      </a>
      <a class="gwl1 yd-tabbar-item gwul2 yd-tabbar-active" @click="gotoShopCar()">
        <span class="yd-tabbar-icon"><i class="yd-icon-shopcart-outline" style="font-size: 0.5rem;"></i>
        <span class="yd-tabbar-badge" v-if="quantity>0">
          <span class="yd-badge" style="background-color: rgb(212, 29, 15);">{{quantity}}</span>
        </span>
        </span>
        <span class="yd-tabbar-txt">购物车</span>
      </a>
      <yd-button type="warning" class="ljgm1" @click.native="gotoShopCar()" style="font-size: 0.28rem">去结算</yd-button>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {getStore} from '../../../config/mUtils'
  import {baseHttp} from '../../../config/env'
  const vm = {
    data() {
      return {
        carInfo: {},
        data: {},
        items: [],
        quantity: 0,
        type:'upkeep'
      }
    },
    mounted(){
      var carInfo = getStore('carInfo');
      if (carInfo.type) {
        this.carInfo = carInfo;
      }
      if(this.$route.query.type) {
        this.type=this.$route.query.type;
      }
      this.series();
      this.getCartsQuantity();
    },
    methods: {
      gotoback(){
        this.$router.go(-2);
      },
      /*选择车辆*/
      gotocar(){
        this.$router.push({name: 'carchoose'})
      },
      series(){
        const that = this;
        baseHttp(this, '/api/maintenance/list', {'type': this.type}, 'get', '加载中...', function (data) {
          if (data.items)that.items = data.items;
          that.$refs.noProduct.display = '';
        });
      },
      /*进入购物车*/
      gotoShopCar(){
        this.$router.push({ name: 'shoppingCart',meta:{title:'购物车'}});
      },
      getpay(item){
        var oderInfo={};
        var carInfo = getStore('carInfo');
        if (carInfo.type){
          oderInfo.carDetailId=carInfo.id;
        }
        var cityInfo=getStore('cityInfo');
        if(cityInfo.cityName){
          oderInfo.location=cityInfo.cityName;
        }else{
          oderInfo.location='重庆';
        }
        oderInfo.orderType = 'GENERAL';
        var products = [];
        var product = {};
        product.skuId = item.sku;
        product.quantity = 1;
        product.categoryId = this.categoryId;
        products.push(product);
        if (products.length == 0) {
          this.$dialog.toast({mes: '请选择保养服务', timeout: 1000});
          return;
        }
        oderInfo.products = products;
        this.$router.push({ name: 'orderSubmit',params:oderInfo,meta:{title:'填写订单'}});
      },
      /*加入购物车*/
      payItem(item){
        const  that =this;
        baseHttp(this,'/api/carts/addToCarts',{'skuId':item.sku,'quantity':item.count,'merchantId':item.merchantId},'post','正在加入',function (data){
          that.$dialog.toast({
            mes: '加入成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.quantity=parseInt(that.quantity)+1;
            }
          });
        });
      },
      /*获取购物车数量*/
      getCartsQuantity(){
        const  that =this;
        baseHttp(this,'/api/carts/cartsQuantity',{},'get','',function (data){
          if(data.quantity)that.quantity=data.quantity
        });
      },
      gotoDetail(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.sku},meta:{title:'商品详情'}});
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .topHead {
    width: 100%;
    max-width: 750px
  }

  .topHead .models {
    background: #fff;
    padding: 0 15px 0 15px;
    border-bottom: 1px solid #d9d9d9
  }

  .topHead .models .left {
    float: left;
    height: 50px;
    width: 70%;
    padding: 8px 0 0 0
  }

  .topHead .models .left img {
    width: 42px;
    height: 42px;
    float: left;
    margin: 0 8px 0 0
  }

  .topHead .models .left .title {
    font-size: .3rem;
    margin-bottom: 0;
    color: #333
  }

  .topHead .models .left .desc {
    font-size: 12px;
    margin-bottom: 0;
    color: #999;
    white-space: nowrap
  }

  .topHead .models .left::after {
    content: "";
    display: table;
    clear: both
  }

  .topHead .models .right {
    float: right;
    width: 30%;
    height: 50px;
    line-height: 50px;
    font-size: .3rem;
    color: #666
  }

  .topHead .selectedBy {
    background: #fff;
    height: 49px;
    line-height: 49px;
    font-size: 13px;
    border-bottom: 1px solid #d9d9d9;
    color: #333;
    padding: 0 0 0 15px
  }

  .topHead .selectedBy .left {
    float: left
  }

  .topHead .selectedBy .left p .red {
    color: #f57c33
  }

  .topHead .selectedBy .left p .total {
    color: #999;
    margin-left: 10px
  }

  .topHead .selectedBy .right {
    float: right;
    color: #666;
    position: relative;
    width: 55px
  }

  .topHead .selectedBy .right::after {
    position: absolute;
    content: '';
    width: 7px;
    height: 13px;
    background: url(../../../assets/img/arrowv2.png) no-repeat;
    background-size: 100%;
    right: 15px;
    top: 17px
  }

  .topHead .selectedBy::after {
    content: "";
    display: table;
    clear: both
  }

  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }

  .noProduct img {
    width: 70px;
    height: 70px
  }

  .noProduct p {
    font-size: .3rem;
    color: #666;
    line-height: 40px
  }

  .noProduct a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }

  .gwl1 {
    width: 15%;
    float: left;
    margin-top: 5px;
  }

  .ljgm1.yd-btn.yd-btn-warning {
    width: 20%;
    height: 1rem;
    float: right;
    background-color: #d41d0f;
    border: none;
    border-radius: 0;
    margin-top: 1px;
  }
</style>
<style>
  #carmain #stepone > em {
    background-color: #ec0055;
  }

  #carmain #steptwo > em {
    background-color: #6a68ec;
  }

  #carmain .yd-step-content #steptwo:before {
    background: -webkit-linear-gradient(left, #ec0055, #6a68ec) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ec0055, #6a68ec) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ec0055, #6a68ec) !important; /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ec0055, #6a68ec) !important; /* 标准的语法（必须放在最后） */
  }

  #carmain #stepthree > em {
    background-color: #00b8f7;
  }

  #carmain .yd-step-content #stepthree:before {
    background: -webkit-linear-gradient(left, #6a68ec, #00b8f7) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6a68ec, #00b8f7) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6a68ec, #00b8f7) !important; /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6a68ec, #00b8f7) !important; /* 标准的语法（必须放在最后） */
  }

  #carmain #stepfour > em {
    background-color: #51cb1b;
  }

  #carmain .yd-step-content #stepfour:before {
    background: -webkit-linear-gradient(left, #00b8f7, #51cb1b) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #00b8f7, #51cb1b) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #00b8f7, #51cb1b) !important; /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #00b8f7, #51cb1b) !important; /* 标准的语法（必须放在最后） */
  }

  #carmain .yd-step-item-bottom span {
    font-size: 0.2rem;
    color: #ccc;
  }

  #carmain .yd-tabbar-item.gwul2.yd-tabbar-active {
    color: rgb(151, 151, 151);
  }
</style>
