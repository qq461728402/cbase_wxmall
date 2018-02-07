<template>
  <yd-layout id="fillsales">
    <yd-navbar slot="navbar" title="填写退货订单" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

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

    <yd-cell-group style="margin-top: 0.2rem">
      <yd-cell-item arrow type="label">
        <span slot="left">申请原因：</span>
        <select slot="right" style="color: black" v-model="reasons" ref="reason">
          <option value="商品需要维修">商品需要维修</option>
          <option value="收到商品有破损">收到商品有破损</option>
          <option value="商品错发/漏发">商品错发/漏发</option>
          <option value="发票问题、退运费">发票问题、退运费</option>
          <option value="收到商品不符合描述">收到商品不符合描述</option>
          <option value="商品质量有问题">商品质量有问题</option>
          <option value="未按约定时间发货">未按约定时间发货</option>
          <option value="七天内无理由退换货">七天内无理由退换货</option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" maxlength="100" placeholder="问题详细描述" v-model="dess" ref="desc"></yd-textarea>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">用户名：</span>
        <yd-input slot="right"  max="20" placeholder="请输入用户名"  v-model="orderItems.contactName" ref="contactName"></yd-input>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">手机号：</span>
        <yd-input slot="right"  regex="mobile" placeholder="请输入手机号码"  v-model="orderItems.contactPhone" ref="contactPhone"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-button-group>
      <yd-button size="large" class="thlb7" @click.native="submit()">提交</yd-button>
    </yd-button-group>

  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
        orderItems:{},
        orderId:'',
        reasons:'',
        dess:'',
        flag:'',//1 表示整单退 2 表示单品退
      }
    },
    mounted(){
      this.orderId = this.$route.query.orderId;
      this.flag=this.$route.query.flag;
      var orderItems=getStore('refundInfo');
      this.reasons='商品需要维修';
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
        const  that=this;
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
</style>
