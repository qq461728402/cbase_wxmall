<template>
  <yd-layout id="shopcar">
    <yd-navbar slot="navbar" title="购物车" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <yd-cell-group slot="navbar">
      <yd-cell-item>
        <span slot="left" style="text-align: center;">购物车</span>
        <span slot="right" type="button" @click="editorShopping" style="font-size: .3rem;">{{ showtext ? '编辑' : '完成' }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <div class="noProduct" v-if="showNoProduct==true">
      <img src="../assets/img/shopCar.png">
      <p>您的购物车是空的</p>
      <router-link :to="{path:'/home'}" replace>回到首页</router-link>
    </div>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <div style="margin-top: .2rem;background-color: #FFFFFF;" v-for="cart in carts">
        <div style="padding-left:12px;margin-bottom: 10px;padding-top: .2rem;">
          <yd-checkbox v-model="cart.allCheck" shape="circle" color="#d41d0f" :id="cart.ref" :change="checkAll"><i style="color: #333333;font-size: .3rem;">{{cart.storeName}}</i></yd-checkbox>
        </div>
        <hr style="border: none; border-bottom: 1px solid #D9D9D9;"/>
        <yd-checklist color="#d41d0f" :label="false" v-model="cart.selectitem" :ref="cart.ref" :callback="change(cart.ref,cart.selectitem)" slot="list">
          <yd-checklist-item :val="item.skuId" v-for="(item,index) in cart.items" :key="index">
            <yd-flexbox >
              <div class="thumb center-img" @click="gotoDetail(item)">
                <img :src="item.url">
              </div>
              <yd-flexbox-item>
                <yd-flexbox direction="vertical" style="padding-top: 0.15rem" >
                  <yd-flexbox-item style="min-height: 0.6rem" @click.native="gotoDetail(item)"><span style="overflow:hidden; text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size: 0.28rem">{{item.name}}</span>
                  </yd-flexbox-item>
                  <yd-flexbox-item>
                    <span style="background-color: #d41d0f;padding:0.05rem 0.1rem;color: #fff;border-radius: 0.05rem" v-if="item.shippingType=='DELIVERY'||item.shippingType=='BOTH'">快递</span>
                    <span style="background-color: #d41d0f;padding:0.05rem 0.1rem;color: #fff;border-radius: 0.05rem" v-if="item.shippingType=='SELF_DELIVERY'||item.shippingType=='BOTH'">门店自提</span>
                  </yd-flexbox-item>
                  <yd-flexbox-item style="height: 0.7rem">
                    <span style="color: #d41d0f;font-size: 0.25rem;line-height: 0.6rem">&yen;{{item.price}}</span>
                        	<span style="float: right; margin-right: .3rem;">
                              <div class="van-stepper">
                                  <button class="van-stepper__stepper van-stepper__minus" :class="{'van-stepper__minus--disabled':item.quantity<=1}"
                                          @click="select(item,false)"></button>
                                  <input type="number" readonly class="van-stepper__input" v-model="item.quantity">
                                  <button class="van-stepper__stepper van-stepper__plus" @click="select(item,true)"></button>
                              </div></span>
                  </yd-flexbox-item>
                </yd-flexbox>
              </yd-flexbox-item>
            </yd-flexbox>
          </yd-checklist-item>
        </yd-checklist>
      </div>
    </yd-pullrefresh>
    <yd-cell-group slot="tabbar" v-if="carts.length!=0" >
      <yd-cell-item>
            <span slot="left">
            	<yd-flexbox>
                <yd-flexbox-item>
                </yd-flexbox-item>
                <yd-flexbox-item href="javascript:;" v-show="showtext"><span>合计:<span style="color: #d41d0f">&yen; {{totalMoney}}</span> </span></yd-flexbox-item>
              </yd-flexbox>
            </span>
            <span slot="right">
            	<yd-button v-show="showtext" bgcolor="#d41d0f" color="#fff" style="width: 60px;" @click.native="gotoOrderConfirm()">去付款</yd-button>
	            <yd-button v-show="!showtext" bgcolor="#F46F04" color="#fff" style="width: 60px;" v-if="1==2">移入收藏</yd-button>
	            <yd-button v-show="!showtext" bgcolor="#d41d0f" color="#fff" style="width: 60px;" @click.native="deletePro()">删除</yd-button>
            </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页"  link="/home">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" link="/category" >
        <yd-icon slot="icon" size="0.54rem" name="fenlei" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" type="a" active>
        <yd-icon name="gouwuche" slot="icon" size="0.54rem" custom></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="quantity!=0" style="background-color: #d41d0f;">{{quantity}}</yd-badge>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="/personalCenter">
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>
<script type="text/babel">
  import {getCookie,baseHttp,baseHttp1} from "../config/env"
  import {getStore,setStore} from "../config/mUtils"
  import { mapGetters } from 'vuex'
  import { Stepper } from 'vant';
  const vm= {
    components: {
      [Stepper.name]: Stepper
    },
    computed: {
      ...mapGetters([
        'quantity'
      ])
    },
    data() {
      return {
        showtext: true,
        removeShopping: '',
        carts: [],
        isCheckAll: true,
        allCheck: true,
        totalMoney: 0.0,
        carInfo: {},
        showNoProduct:false,
      }
    },
    watch: {
      carts: {
        handler: function (val, oldval) {
          this.calculate();
        },
        deep: true,
      }
    },
    methods:{
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity>-1) {
            that.$store.dispatch('setQuantity',data.quantity);
          }
        })
      },
      loadList(){
        this.getShopCarts(true);
      },
      checkAll(e){
        var allCheck = false;
        this.carts.forEach(function (cart) {
          if (cart.ref == e.srcElement.parentNode.id) {
            cart.allCheck = !cart.allCheck;
            allCheck = cart.allCheck;
          } else {
            cart.allCheck = false;
          }
        })
        eval("this.$refs." + e.srcElement.parentNode.id + "[0].$emit(\'ydui.checklist.checkall\'," + allCheck + ")");
      },
      change(ref, item) {
        this.carts.forEach(function (cart) {
          if (ref == cart.ref) {
            if (item.length == 0) {
              cart.allCheck = false;
            } else {
              cart.allCheck = true;
            }
          }
        })
      },
      select(item, flg){
          var tempitem={};
          for(var key in item){
              tempitem[key]=item[key];
          }
          if (tempitem.quantity<=1&&flg==false){
              item.quantity=1;
              return;
          }
          if (flg==false){
              tempitem.quantity--;
          }else{
              tempitem.quantity++;
          }
          const  that=this;
          baseHttp(this, '/api/carts/cartsUpdate', tempitem, 'post', '修改中...', function (data) {
            item.quantity = data.quantity;
            that.getCartsQuantity();
        });
      },
      /*获取购物车详情*/
      getShopCarts(isrefesh){
        const that = this;
        that.cartItems = [];
        that.carts=[];
        baseHttp(this, '/api/carts/carts', {}, 'get', isrefesh==false?'加载中...':'', function (data) {
          if (data.carts) {
            that.showNoProduct=false;
            data.carts.forEach(function (cart) {
              cart.ref = 'mq' + cart.cartId;
              cart.selectitem=[];
              cart.items.forEach(function (item) {
                cart.selectitem.push(item.skuId);
              })
              cart.allCheck = false;
            });
            that.carts = data.carts;
          }else{
            that.showNoProduct=true;
          }
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        });
      },
      /*购物车删除功能*/
      deletePro(){
        const that = this;
        var cartItemIdLst = [];
        this.carts.forEach(function (cart) {
          if (cart.allCheck == true) {
            cart.selectitem.forEach(function (skuId) {
              cart.items.forEach(function (item) {
                if(item.skuId==skuId){
                  cartItemIdLst.push(item.cartItemId);
                }
              })
            })
          }
        })
        if (cartItemIdLst.length == 0) {
          this.$dialog.toast({mes: '请选择删除商品', timeout: 1000});
          return;
        }
        var cartItemIds = cartItemIdLst.join(",");
        baseHttp(this, '/api/carts/cartsDelete', {'cartItemIds': cartItemIds}, 'post', '删除中...', function (data) {
          that.loadList();
            that.getCartsQuantity();
        });
      },
      /*计算金额*/
      calculate(){
        var allMoney = 0.0;
        var itemsQuantity=0;
        this.carts.forEach(function (cart) {
          if (cart.selectitem) {
            cart.selectitem.forEach(function (skuId) {
              cart.items.forEach(function (item) {
                if(item.skuId==skuId){
                  allMoney += parseFloat(item.price) * parseFloat(item.quantity);
                }
              })
            })
          }
        });
        this.totalMoney = allMoney;
      },
      //编辑切换
      editorShopping(){
        this.showtext = !this.showtext;
      },
      /**跳转至详情**/
      gotoDetail(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId},meta:{title:'商品详情'}});
      },
      gotoOrderConfirm() {
        var getalltype=[];
        this.carts.forEach(function (cart) {
          if (cart.allCheck == true) {
            cart.selectitem.forEach(function (skuId) {
              cart.items.forEach(function (item) {
                if(item.skuId==skuId){
                  getalltype.push(item.shippingType);
                }
              })
            })
          }
        })
        if(getalltype.indexOf("DELIVERY") >-1&&getalltype.indexOf('SELF_DELIVERY')>-1){
          this.$dialog.toast({mes: '所选商品不能合并付款', timeout: 1000});
          return;
        }
        var oderInfo = {};
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
        oderInfo.orderType = 'GENERAL';
        var products = [];
        this.carts.forEach(function (cart) {
          if (cart.allCheck == true) {
            oderInfo.cartId=cart.cartId;
            cart.selectitem.forEach(function (skuId) {
              cart.items.forEach(function (item) {
                if(item.skuId==skuId){
                  var product = {};
                  product.skuId = item.skuId;
                  product.quantity = item.quantity;
                  products.push(product);
                }
              })
            })
          }
        })
        if (products.length == 0) {
          this.$dialog.toast({mes: '请选择购物商品', timeout: 1000});
          return;
        }
        oderInfo.products=products;
        setStore("oderInfo",oderInfo);
        this.$router.push({ name: 'orderSubmit'});
      },
    },
    activated(){
      this.showtext= true;
      this.getCartsQuantity();
      this.getShopCarts(false);
    },
//    mounted(){
//      this.getShopCarts(false);
//    },
  }
  export default vm;
</script>
<style scoped>
  .quantity-selector {
    margin: 0 auto;
    width: 8.571rem;
    line-height: 30px;
    border: 1px solid #d1d6e4;
    border-radius: 3px;
  }
  .quantity-selector .disable {
    color: #d2d2d2;
    cursor: default;
  }
  .quantity-selector .number {
    float: left;
    width: 33.33%;
    height: 30px;
    border: none;
    padding-left: 10px;
    text-align: center;
  }
  .quantity-selector .add {
    border-left: 1px solid #d1d6e4;
    border-right: none;
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
    font-size: 13px;
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

  .shopCar {
    background-color: #ffffff;
  }

  .shopCar li {
    border-bottom: 1px solid #eeeeee;
  }
  .thumb img {
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .thumb {
    float: left;
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    background-color: #f4f4f4;
    text-align: center;
    margin:0.2rem;
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
  }
  .center-img img {
    max-width: 100%;
    max-height: 100%;
    border: 0;
    vertical-align: middle;
  }
  .yd-tabbar-fixed{
    width: 100%;
    bottom: 1rem;
  }
</style>
<style>
  #shopcar .yd-cell:after {
    border-bottom: none;
  }
  #shopcar .yd-checkbox-text {
    margin-left: 0;
  }

  #shopcar .yd-cell-box {
    margin-bottom: 0;
  }
</style>
