<template>
  <yd-layout id="policylist">
    <yd-navbar slot="navbar" title="我的保单" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group class="policy_2">
      <yd-cell-item>
        <img slot="icon" src="../../../assets/img/policy.png">
        <span slot="left">全部保单</span>
      </yd-cell-item>
    </yd-cell-group>
    <div style="overflow:hidden;padding: .15rem;background-color: white" v-for="item,index in orders" :key="index">
      <div style="overflow: hidden;border: 1px solid #D9D9D9;padding: .15rem;border-radius: .1rem;">
        <div style="border-bottom: 1px solid #D9D9D9;padding-bottom:.1rem ;"><span style="font-size: .3rem;">保单号：<i style="color: #666;">{{item.bussinessNumber?item.bussinessNumber:'正在出单中'}}</i></span><span style="float: right;font-size: .3rem;color:#d41d0f;">投保状态：{{item.status=='NEW'?'未支付':item.status=='PAID '?'已支付—正在出单':item.status=='FINISHED'?'完成配送信息':'保单完成'}}</span></div>
        <div style="width: 80%;float: left;line-height: .5rem;font-size: .3rem;height: 1.4rem;margin-top: .1rem;">
          <p>产品名称：{{item.insuranceName}}</p>
          <p>投保人：{{item.username}}</p>
          <p>投保金额：{{item.totleFee}}</p>
        </div>
        <div style="width: 20%;float: right;text-align: center;height: 1.4rem;line-height: 1.5rem;border-left: 1px solid #D9D9D9;margin-top: .1rem;">
          <yd-badge shape="square" style="font-size: .3rem;border: 1px solid rgb(255, 125, 73);background-color: #FFFFFF;color: rgb(255, 125, 73);" @click.native="gotoDeatil(item)">查看</yd-badge>
        </div>
      </div>
    </div>
  </yd-layout>

</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
        orders:[],
        userInfo:{},
      }
    },
    mounted(){
        this.insuranceOrders();
    },
    activated(){
      this.insuranceOrders();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      insuranceOrders(){
        const  that=this;
        baseHttp(this,'/api/insurance/orders',{},'get','加载中...',function (data) {
          that.orders=data.orders;
        });
      },
      gotoDeatil(item){
        this.$router.push({ name: 'policyDetail',query:{insuranceId:item.insuranceId}});
      }
    },
  }
  export default vm;
</script>
<style scoped>
  ul.news{
    background-color: #FFFFFF;
  }
  li.link{
    padding: .3rem;
  }

  div.xxzx5{
    margin-top: 30%;
    color: #d41d0f;
  }
  div.mess_1{
    overflow:hidden;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 100%;
  }
  img.messimg{
    width: 100%;
  }

  span.name{
    font-size: 0.3rem;
    color: #6e6f70;
  }
  div.title{
    color: #6e6f70;
    font-size: 0.3rem;
    line-height: 0.5rem;

  }
  div.yd-cell-box{
    margin-bottom: 0px;
  }


  .mess_2{
    height:1.2rem;
    padding-left: .3rem;
  }
   .mess_3{
    padding-top: 0.15rem;
  }
  .policy_1{
    margin-bottom: .35rem;
  }
   .policy_2{
    border-bottom: 1px solid #D9D9D9;
  }

</style>
<style>
  #policylist .yd-cell:after{
    border-bottom: none;
  }
</style>
