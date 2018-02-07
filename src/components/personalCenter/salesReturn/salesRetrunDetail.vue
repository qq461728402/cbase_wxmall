<template>
  <yd-layout id="salesRetrunDetail">
    <yd-navbar slot="navbar" title="退货订单详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-cell-group>
      <yd-cell-item>
        <span slot="left" class="or_2">订单编号：{{returnItem.orderNumber}}</span>
        <span slot="right" style="color:#d41d0f">{{orderStatus}}</span>
      </yd-cell-item>
      <yd-flexbox v-for="item,index in returnItemList" :key="index">
        <div class="or_4">
          <img class="or_5" :src="item.imageUrl">
        </div>
        <yd-flexbox-item class="or_6">
          <yd-flexbox direction="vertical" style="padding-right: 0.3rem">
            <yd-flexbox-item><p class="or_8">{{item.skuName}}</p></yd-flexbox-item>
            <yd-flexbox-item>
              <yd-flexbox>
                <yd-flexbox-item><span class="or_9" style="color: #d41d0f">&yen;{{item.salePrice}}</span></yd-flexbox-item>
                <yd-flexbox-item style="text-align: right"><span class="or_9">x{{item.quantity}}</span></yd-flexbox-item><!--件数-->
              </yd-flexbox>
            </yd-flexbox-item>
          </yd-flexbox>
        </yd-flexbox-item>
      </yd-flexbox>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem" v-if="returnItem.status!='PURCHASED'">
      <yd-cell-item  type="label">
        <span slot="left">收货人：{{orderInfo.name}}</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item  type="label">
        <span slot="left">联系电话：{{orderInfo.phone}}</span>
        <span slot="right"></span>
      </yd-cell-item>
      <yd-cell-item  type="label">
        <span slot="left">收货地址：{{orderInfo.addr}}</span>
        <span slot="right"></span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 0.2rem">
      <yd-cell-item  type="label">
        <span slot="left">申请原因：</span>
        <span slot="right">{{resons}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="问题详细描述！" readonly maxlength="100" v-model="descs"></yd-textarea>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">用户名：</span>
        <yd-input slot="right" v-model="returnItem.contactName" readonly placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">手机号：</span>
        <yd-input slot="right" v-model="returnItem.contactPhone" readonly placeholder="请输入手机号码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem" v-if="canship==true">
      <yd-cell-item>
        <span slot="left">快递单号：</span>
        <yd-input slot="right" v-model="kddh"  placeholder="请填写快递单号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group v-if="canship==true">
      <yd-button @click.native="openConfrim" size="large" class="thlb7">提交</yd-button>
    </yd-button-group>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
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
      this.returnItem = getStore("returnInfo");
      this.getOrder();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      getOrder(){
        const  that =this;
        baseHttp(this,'/api/refund/order',{'orderId':this.returnItem.orderId},'get','加载中...',function (data) {
          that.returnItemList=data.order.items;
          that.orderStatus=data.orderStatus;
          that.orderInfo=data.info;
          that.canship=data.canship;
          var returns= data.info.message.split("|");
          if(returns.length==2){
            that.resons=returns[0];
            that.descs=returns[1];
          }else{
            that.descs=returns[0];
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
        baseHttp(this, '/api/refund/return', {'orderId': this.returnItem.orderId, 'shipNumber': this.kddh}, 'post', '正在处理中...', function (data) {
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
  div.or_1{
    background-color: #FFFFFF;
  }
  span.or_2{
    color:#6e6f70;
  }
  span.or_3{
    color:#d41d0f;
  }
  div.or_4{
    overflow:hidden;
    padding: 0.15rem;
    height: 1.8rem;
    width: 1.8rem;
  }
  img.or_5{
    height: 1.5rem;
    width: 1.5rem
  }

  span.or_8{
    font-size: 0.3rem;
  }
  span.or_9{
    color: #6e6f70;
    font-size: 0.25rem;
    line-height: 0.5rem;
  }
  span.or_10{
    color: #d41d0f;
    font-size: 0.3rem;
    line-height: 0.5rem;
    float: right;
    padding-right:.24rem;
  }
  span.or_11{
    padding-right:.24rem;
    color: #6e6f70;
    font-size: .25rem;
  }


  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }
  .noProduct img {
    width: 1.5rem;
    height: 1.5rem
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

</style>
<style>
  #salesRetrunDetail div.yd-flexbox-item.or_6.yd-flexbox-item-center{
    height:1.8rem
  }
  #salesRetrunDetail div.yd-flexbox.or_7.yd-flexbox-vertical{
    padding-top: 0.15rem
  }
</style>
