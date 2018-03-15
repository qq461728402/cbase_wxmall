<template>
  <yd-layout id="fillsales">
    <yd-navbar slot="navbar" title="填写售后订单" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <div class="service">本次售后服务由<em>重庆百货</em>为您提供</div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left" class="or_2">订单编号：{{orderItems.number}}</span>
      </yd-cell-item>
      <yd-flexbox v-for="item,index in orderItems.item" :key="index">
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

    <yd-cell-group style="margin-top: 0.2rem;border-bottom: 1px solid #eeeeee;">
      <div class="type">
        <p>服务类型</p>
        <yd-button class="anniu">维修</yd-button>
        <yd-button class="anniu">退货</yd-button>
        <yd-button class="anniu">换货</yd-button>
      </div>
      <!--<yd-cell-item arrow type="label">
        <span slot="left">服务类型：</span>
        <select slot="right" style="color: black" v-model="reasons" ref="reason">
          <option value="退货">退货</option>
          <option value="换货">换货</option>
          <option value="维修">维修</option>
        </select>
      </yd-cell-item>-->
      <!--<yd-cell-item>
        <yd-textarea slot="right" maxlength="100" placeholder="问题详细描述" v-model="dess" ref="desc"></yd-textarea>
      </yd-cell-item>-->
      <yd-cell-item v-if="1==2">
        <span slot="left">用户名：</span>
        <yd-input slot="right"  max="20" placeholder="请输入用户名"  v-model="orderItems.contactName" ref="contactName"></yd-input>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">手机号：</span>
        <yd-input slot="right"  regex="mobile" placeholder="请输入手机号码"  v-model="orderItems.contactPhone" ref="contactPhone"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 10px" title="问题描述">
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入问题详细描述？" maxlength="100" v-model="dess" ref="desc"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>

    <div class="type" style="margin-top: 10px;height: 3rem!important;">
      <p>商品退回方式</p>
      <yd-button class="anniu" style="width: 1.5rem!important;">快递至商城</yd-button>
      <yd-button class="anniu" style="width: 1.5rem!important;color: #999999;border: 1px solid #999999;">送货至自提点</yd-button>
      <p style="color: #999999;padding-top: .2rem!important;">商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。商城不收取快递附加费。</p>
    </div>

    <yd-button-group>
      <yd-button size="large" class="thlb7" @click.native="submit()">提交申请</yd-button>
    </yd-button-group>

  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,uploadURL} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'

  const vm= {
    data() {
      return {
        orderItems:{},
        orderId:'',
        reasons:'',
        dess:'',
        flag:'',//1 表示整单退 2 表示单品退
        uploadURL:uploadURL,
        images: [],
        item:{},
      }
    },
    mounted(){
      this.orderId = this.$route.query.orderId;
      this.flag=this.$route.query.flag;
      var orderItems= JSON.parse(getStore('refundInfo'));
      this.reasons='退货';
      this.dess='',
      orderItems.desc='';
      orderItems.contactName='';
      orderItems.contactPhone='';
      orderItems.orderId=this.orderId;
      this.orderItems = orderItems;

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },

      submit(){
        const input = this.$refs.contactPhone;//电话号码
        this.orderItems.desc=this.reasons+"|"+this.dess;
        if (this.flag.length==0)return;
        const that=this;
        var applyRefundAPI='/api/refund/apply';//单品退
        var refundApplyOrder='/api/refund/applyOrder';//整单退
        baseHttp(this,this.flag==1?refundApplyOrder:this.flag==2?applyRefundAPI:'',this.orderItems,'post','申请中...',function (data){
          that.$dialog.toast({
            mes: '申请成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.gotoback();
            }
          });

        });
      }
    },

  }
  export default vm;
</script>
<style scoped>
  .service{
    background-color: #f8f8f8;
    padding: .2rem 0;
    text-align: center;
    color: #81838e;
    font-size: 13px;
    box-shadow: 0 2px 10px 0 #e3e2e2;
    z-index: 10;
    position: relative;
  }
  .service em{
    color: red;
  }


  .or_2{
    color:#6e6f70;
  }

  .or_4{
    overflow:hidden;
    padding: 0.15rem;
    height: 1.8rem;
    width: 1.8rem;
  }
  .or_5{
    height: 1.5rem;
    width: 1.5rem
  }
  .or_8{
    padding-top: 0.15rem;
    font-size: 0.3rem;
    min-height: 1.2rem;
  }
  .or_9{
    color: #6e6f70;
    font-size: 0.25rem;
    line-height: 0.5rem;
  }
  .or_10{
    color: #d41d0f;
    font-size: 0.3rem;
    line-height: 0.5rem;
    padding-right:.24rem;
  }
  .or_11{
    padding-right:.24rem;
    color: #6e6f70;
    font-size: .25rem;
  }

</style>
<style>
  #fillsales .yd-cell-box{
    margin-bottom:0rem;
  }
  #fillsales .yd-cell-right select{
    margin-left:.3rem;
  }
  #fillsales button.thlb7.yd-btn-block.yd-btn-primary{
    background-color:#d41d0f ;
    font-size: .3rem;
  }
  .type{
    height: 2rem;
    padding-left: .3rem;
    background-color: #ffffff;
  }
  .type p{
    font-size: .3rem;
    padding-top: .3rem;
    padding-bottom: .2rem;
  }
  .type .anniu{
    border-radius:0;
    background-color: #ffffff;
    color: red;
    border: 1px solid red;
    width: 1rem;
    font-size: .25rem;
  }

  .yd-cell-title{
    padding-top: .2rem;
    padding-bottom: .2rem;
    padding-left: .3rem;
    background-color: #ffffff;
    color: #000000;
  }
</style>
