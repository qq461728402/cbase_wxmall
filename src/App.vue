<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" img-set="'/static/favicon.ico'" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  export default{
    name: 'app',
    data () {
      return {
        imgUrl:require('../static/logo.png'),
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
