<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" :img-set="imgUrl" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  export default{
    name: 'app',
    data () {
      return {
        imgUrl:require('./static/logo.png'),
      }
    },
    mounted(){

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
