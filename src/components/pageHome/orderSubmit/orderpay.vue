<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="订单支付" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <iframe :src='src' frameborder="0" width="100%" height="100%"></iframe>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
        src:'',
      }
    },
    mounted(){
      if(this.$route.query.token_id){
        this.src=  "https://pay.swiftpass.cn/pay/jspay?token_id="+this.$route.query.token_id+"&showwxtitle=1";
      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
    },
  }
  export default vm;
</script>
<style>

</style>
