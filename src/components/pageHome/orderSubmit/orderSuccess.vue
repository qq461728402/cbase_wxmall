<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="订单支付成功" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-flexbox style="padding-top: 1rem;">
      <div align="right" style="width: 45%; padding-right: .4rem;"><img src="../../../assets/img/success.png" width="50%"></div>
      <div style="width: 55%;font-size: .3rem;">
        <p style="line-height: .8rem;">支付方式：<i style="color: #d41d0f;">微信支付</i></p>
        <p style="line-height: .5rem;">订单金额：<i style="color: #d41d0f;">￥{{payMoney}}</i></p>
      </div>
    </yd-flexbox>
    <div align="center" class="gohome">
      <router-link :to="{path:'/home'}" replace>回到首页</router-link>
    </div>
    <div align="center" style="padding-top: .5rem;">
      <yd-button size="large" type="danger" @click.native="gotoOrder()" style="width: 80%;border: 1px solid #D9D9D9;background-color: #FFFFFF;color: #000000;font-size: .3rem;height: .8rem;">查看订单</yd-button>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {getStore,removeStore} from '@/config/mUtils'
  const vm= {
    data() {
      return {
        payMoney:0.0,
      }
    },
    mounted(){
      if(this.$route.query.payMoney) {
        this.payMoney=this.abs(this.$route.query.payMoney);
      }
      removeStore("oderInfo");
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      gotoOrder(){
        this.$router.replace({ path: '/personalCenter/myOderList',query: { type: 1 }});
      },
      abs(val){
        var str = (val/100).toFixed(2) + '';
        var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
        var dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
        var ret = intSum + dot;
        return ret;
      },
    },
  }
  export default vm;
</script>
<style scoped>
   .gohome a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }
</style>
