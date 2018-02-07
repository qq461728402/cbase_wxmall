<template>
  <yd-layout id="policydetail">
    <yd-navbar slot="navbar" title="保单详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <yd-icon slot="icon" name="feedback" size=".42rem" color="#d41d0f"></yd-icon>
        <span slot="left">基本信息</span>
      </yd-cell-item>
      <div style="padding: .3rem;font-size: .3rem;">
        <p style="padding-top: .1rem;">
          <span>保险公司</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.company}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>保单号</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.bussinessNumber?tbOrderBaseInfo.bussinessNumber:'正在出保单中'}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>保险名称</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.insuranceName}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>投保人</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.username}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>被保人</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.username}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>车牌号</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.brand}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>车辆名称</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.carName?tbOrderBaseInfo.carName:'正在出保单中'}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>责任期</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.startDate?tbOrderBaseInfo.startDate:'正在出保单中'}}至{{tbOrderBaseInfo.endDate}}  </span>
        </p>
        <p style="padding-top: .1rem;">
          <span>保费总计</span>
          <span style="float: right;color: #d41d0f;">{{tbOrderBaseInfo.totleFee}}</span>
        </p>
        <p style="padding-top: .1rem;">
          <span>保单状态</span>
          <span style="float: right;color: #666666;">{{tbOrderBaseInfo.status=='NEW'?'未支付':tbOrderBaseInfo.status=='PAID '?'已支付—正在出单':tbOrderBaseInfo.status=='FINISHED'?'完成配送信息':'保单完成'}}</span>
        </p>
      </div>
    </yd-cell-group>

    <yd-cell-group>
      <yd-cell-item>
        <yd-icon slot="icon" name="feedback" size=".42rem" color="#d41d0f"></yd-icon>
        <span slot="left">赠品详情</span>
      </yd-cell-item>
      <div style="padding: .3rem;font-size: .3rem;">
        <p style="padding-top: .1rem;">
        <div slot="title">{{gifts.name}}</div>
        </p>
      </div>
    </yd-cell-group>

    <div style="padding: .3rem; background-color: #FFFFFF;border-bottom: 1px solid #D9D9D9; ">
      <yd-icon slot="icon" name="feedback" size=".42rem" color="#d41d0f"></yd-icon>
      <span slot="left" style="font-size: .3rem;">投保详情</span>
    </div>
    <yd-accordion v-for="item,index in items" :key="index">
      <yd-accordion-item>
        <div slot="title" style="font-size: .3rem;color: #000000;">{{item.name}}</div>
        <div style="font-size: .25rem;padding: .3rem;color: #999999;margin-left: .3rem;"><span>{{item.name}}</span><span style="float: right;">￥{{item.bf}}元</span></div>

        <yd-accordion v-for="items,chindex in item.childrens" :key="chindex">
          <yd-accordion-item>
            <div slot="title" style="font-size: .3rem;color: #000000;margin-left: .3rem;">{{items.name}}</div>
            <div style="font-size: .25rem;padding: .3rem;color: #999999;margin-left: .6rem;"><span>{{items.name}}</span><span style="float: right;">￥{{items.bf}}元</span></div>

            <yd-accordion v-for="itemss,ccindex in items.childrens" :key="ccindex">
              <yd-accordion-item>
                <div slot="title" style="font-size: .3rem;color: #000000;margin-left: .6rem;">{{itemss.name}}</div>
                <div style="font-size: .25rem;padding: .3rem;color: #999999;margin-left: .9rem;"><span>{{itemss.name}}</span><span style="float: right;">￥{{itemss.bf}}元</span></div>
              </yd-accordion-item>
            </yd-accordion>
          </yd-accordion-item>
        </yd-accordion>
      </yd-accordion-item>
    </yd-accordion>

  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
        orderDeail:{},
        insuranceId:'',
        items:{},
        tbOrderBaseInfo:{},
        gifts:{},
      }
    },
    mounted(){
      this.insuranceId = this.$route.query.insuranceId;
      this.insuranceOrders();
    },
    methods:{
      gotoback(){
        this.$router.go(-2);
      },
      insuranceOrders(){
        const  that=this;
        baseHttp(this,'/api/insurance/order',{'orderId':this.insuranceId},'get','加载中...',function (data) {
          that.items=data.order.items;
          that.tbOrderBaseInfo=data.order.tbOrderBaseInfo;
          that.gifts=data.order.gifts;
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .xxzx5{
    margin-top: 30%;
    color: #d41d0f;

  }

</style>
<style>
  #policydetail .yd-cell:after{
    border-bottom: none;
  }
</style>
