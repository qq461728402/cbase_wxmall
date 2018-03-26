<template>
  <yd-layout id="salesRetrunDetail">
    <yd-navbar slot="navbar" title="售后订单详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left" class="or_2">服务单号：{{orderInfo.returnNumber}}</span>
        <span slot="right" style="color:#d41d0f">{{orderInfo.type=='MAINTENANCE'?'维修':orderInfo.type=='RETURN'?'退货':'换货'}}</span>
      </yd-cell-item>
      <div style="padding: 0.2rem" v-if="orderInfo.itemModel">
        <goods :item="orderInfo.itemModel" goodsType="submit" :showQuantity="false"></goods>
      </div>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 0.2rem">
      <div class="type"><p>服务类型:&nbsp;<span> {{orderInfo.status=='PURCHASED'?'待审核':orderInfo.status=='CONFIRMED'?'已审核':orderInfo.status=='SHIPPED'?'已寄出':orderInfo.status=='CANCELED'?'已取消':'已完成'}}</span></p></div>
      <div class="type"><p>商品退回:&nbsp;<span> {{orderInfo.shippingType=='DELIVERY'?'快递':orderInfo.shippingType=='SELF_DELIVERY'?'送货至门店':''}}</span></p></div>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 0.2rem">
      <yd-cell-item  type="label">
        <span slot="left">问题描述：</span>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="问题详细描述！" readonly  v-model="descs"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem" v-if="orderInfo.status!='PURCHASED'&&orderInfo.status!='CANCELED'">
      <yd-cell-item  type="label">
        <span slot="left">收货人：{{orderInfo.shipName}}</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item  type="label">
        <span slot="left">联系电话：{{orderInfo.shipPhone}}</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item  type="label">
        <span slot="left">收货地址：{{orderInfo.shipAddr}}</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item  type="label" v-if="orderInfo.status=='SHIPPED'">
        <span slot="left">快递单号：{{orderInfo.shipNumber}}</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 0.2rem" v-if="orderInfo.status=='CONFIRMED'&&orderInfo.shippingType=='DELIVERY'">
      <yd-cell-item>
        <span slot="left">快递单号：</span>
        <yd-input slot="right" v-model="kddh"  placeholder="请填写快递单号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <van-button v-if="orderInfo.status=='CONFIRMED'&&orderInfo.shippingType=='DELIVERY'" type="primary" bottom-action @click.native="openConfrim">提交</van-button>
    <van-button v-if="orderInfo.status=='PURCHASED'" type="primary" bottom-action @click.native="cancel">取消售后</van-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '@/config/env'
  import  {getStore,removeStore} from '@/config/mUtils'
  import { Button} from 'vant';
  import  goods from '@/views/goods'
  const vm= {
    components: {
      goods,
      [Button.name]:Button,
    },
    data() {
      return {
        returnId:'',
        orderInfo:{},
        returnItem: {},
        kddh: '',
        descs:'',
        resons:'',
        canship:false,
        returnItemList:[],
        orderStatus:'',
      }
    },
    mounted(){
      this.returnId=this.$route.query.retrunId;
      this.getOrder();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      getOrder(){
        const  that =this;
        baseHttp(this,'/api/return/return',{'returnId':this.returnId},'get','加载中...',function (data) {
          if(data.return){
            if(data.return.desc){
              that.descs=data.return.desc;
            }
            that.orderInfo=data.return;
          }
        })
      },
      openConfrim() {
        if (this.kddh.length == 0) {
          this.$dialog.toast({
            mes: '请填写快递单号',
            timeout: 1000
          });
          return;
        }
        const  that =this;
        baseHttp(this, '/api/return/deliver', {'returnId': this.returnId, 'shipNumber': this.kddh}, 'post', '正在处理中...', function (data) {
          that.$dialog.toast({
            mes: '取消成功!',
            timeout: 1000,
            icon: 'success',
            callback: function () {
              that.gotoback();
            }
          });
        })
      },
      cancel(){
        const  that =this;
        baseHttp(this, '/api/return/cancel', {'returnId': this.returnId}, 'post', '正在处理中...', function (data) {
          that.$dialog.toast({
            mes: '处理成功!',
            timeout: 1000,
            icon: 'success',
            callback: function () {
              that.gotoback();
            }
          });
        })
      }
    },
  }
  export default vm;
</script>
<style scoped>
  span.or_2{
    color:#6e6f70;
  }
  .type{
    padding: 0.2rem;
  }
  .type p{
    padding-left: 0.24rem;
    font-size: 0.3rem;
  }
  .type span{
    color: #d41d0f;
    font-size: 0.25rem;
  }
</style>
<style>
  #salesRetrunDetail div.yd-flexbox-item.or_6.yd-flexbox-item-center{
    height:1.8rem
  }
  #salesRetrunDetail div.yd-flexbox.or_7.yd-flexbox-vertical{
    padding-top: 0.15rem
  }
</style>
