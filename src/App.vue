<template>
  <div id="app">
    <!--<van-button type="primary">主要按钮</van-button>-->
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
//  import { Button } from 'vant';
  export default{
//    components: {
//      [Button.name]: Button,
//    },
    name: 'app',
    data () {
      return {
        imgUrl:require('./static/logo.png'),
      }
    },
    mounted(){
      this.$store.dispatch('getAvatar');
      this.$store.dispatch('getToken');
      this.$store.dispatch('getUid');
      this.$store.dispatch('getUname');
    },
  }
</script>

<style>
  @import "static/css/iconfont.css";
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
</style>
