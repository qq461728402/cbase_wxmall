<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {baseHttp} from '@/config/env'
  import {getLocation} from '@/config/weichatPay'
  export default{
    name: 'app',
    data () {
      return {
        imgUrl:require('../static/logo.png'),
        signatureInfo:{}
      }
    },
    mounted(){
      this.$store.dispatch('getAvatar');
      this.$store.dispatch('getToken');
      this.$store.dispatch('getUid');
      this.$store.dispatch('getUname');
      setshearUrl
    },
    methods: {
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity >= 0) {
            that.$store.dispatch('setQuantity', data.quantity);
          }
        })
      },
      getLocation(){
        const that = this;
        getLocation(this.signatureInfo, function (success) {})
      },
      signature(){
        const that = this;
        baseHttp(this, '/wechat/jsapi/signature', {'url': window.location.href}, 'post', '', function (data) {
          if (data.signature) {
            that.signatureInfo = data.signature;
            that.getLocation();
          }
        })
      },
    },
    watch: {
      "$route"(to, from) {
        const currentRouter = this.$router.currentRoute.fullPath;
        this.$store.dispatch('setshearUrl',window.location.href);
        this.$store.dispatch('setshearTitle',document.title);
        if(to.name=='/home'||to.name=='/category'||to.name=='/shoppingCart'||to.name=='/personalCenter'){
          this.getCartsQuantity();
        }
        this.signature();
      }
    },
  }
</script>
<style>
  #app {
    height: 100%;
  }
  #app .yd-navbar{
    display: none;
  }
  .hairline .yd-scrollview{
    margin-top: 0px;
  }
  .ios .yd-scrollview{
    margin-top: 0px;
  }
  .van-image-preview .van-swipe{
    background-color: white;
  }

</style>
