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
      <div style="padding: 0.2rem" v-for="item,index in orderItems.item" :key="index">
        <goods :item="item" goodsType="submit" :showQuantity="true"></goods>
      </div>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem;border-bottom: 1px solid #eeeeee;">
      <div class="type">
        <p>服务类型</p>
        <yd-button :class="{anniu:returnType=='MAINTENANCE'}" @click.native="returnType='MAINTENANCE'">维修</yd-button>
        <yd-button :class="{anniu:returnType=='RETURN'}" @click.native="returnType='RETURN'">退货</yd-button>
        <yd-button :class="{anniu:returnType=='EXCHANGE'}" @click.native="returnType='EXCHANGE'">换货</yd-button>
      </div>
      <yd-cell-item v-if="1==2">
        <span slot="left">用户名：</span>
        <yd-input slot="right"  max="20" placeholder="请输入用户名"  v-model="orderItems.contactName" ref="contactName"></yd-input>
      </yd-cell-item>
      <yd-cell-item v-if="1==2">
        <span slot="left">手机号：</span>
        <yd-input slot="right"  regex="mobile" placeholder="请输入手机号码"  v-model="orderItems.contactPhone" ref="contactPhone"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem" title="问题描述">
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入问题详细描述？" maxlength="100" v-model="applyRequest.desc" ref="desc"></yd-textarea>
      </yd-cell-item>
      <yd-grids-group :rows="5">
        <yd-grids-item v-for="imgs,index1 in upImages" :key="index1">
          <div slot="else" style="text-align: center;" >
            <img :src="imgs.url" style="height: 1.2rem;max-width: 1.2rem">
            <img src="@/assets/img/delete.png" style="height: 0.3rem;width: 0.3rem;position: absolute;right: 0rem" @click="delImage(index1)">
          </div>
        </yd-grids-item>
        <yd-grids-item v-if="upLoad==true">
          <div slot="else" style="text-align: center;" >
            <icon name="wait" spin :scale="7"></icon>
          </div>
        </yd-grids-item>
        <yd-grids-item type="a">
          <vue-core-image-upload slot="else" style="text-align: center;"
                                 inputOfFile="file"
                                 inputAccept="image/*"
                                 :data="data"
                                 :compress="10"
                                 :multiple-size="5"
                                 @imageuploading="imageuploading"
                                 @imageuploaded="imageuploaded"
                                 :max-file-size="5242880"
                                 :url=uploadURL>
            <img src="@/assets/img/addImages.png" class="messimg" style="height: 1.2rem;width: 1.2rem">
          </vue-core-image-upload>
        </yd-grids-item>
      </yd-grids-group>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 0.2rem;border-bottom: 1px solid #eeeeee;">
      <div class="type">
        <p>商品退回方式</p>
        <yd-button :class="{anniu:shippingType=='DELIVERY'}" @click.native="shippingType='DELIVERY'">快递至商城</yd-button>
        <yd-button :class="{anniu:shippingType=='SELF_DELIVERY'}" @click.native="shippingType='SELF_DELIVERY'">送货至自提点</yd-button>
        <p style="color: #999999;padding-top: .2rem!important;font-size: 0.23rem">商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。商城不收取快递附加费。</p>
      </div>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" class="thlb7" @click.native="submit()">提交申请</yd-button>
    </yd-button-group>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,uploadURL} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import  goods from '@/views/goods'
  const vm= {
    components: {
      goods,
      'vue-core-image-upload': VueCoreImageUpload,
    },
    data() {
      return {
        data:{tag:'return'},
        returnType:'MAINTENANCE',//默认维修 RETURN  MAINTENANCE EXCHANGE
        shippingType:'DELIVERY',//默认快递 DELIVERY：快递 SELF_DELIVERY：送货到自提点
        orderItems:{},
        orderId:'',
        dess:'',
        flag:'',//1 表示整单退 2 表示单品退
        uploadURL:uploadURL,
        images: [],
        item:{},
        upLoad:false,
        upImages:[],
        applyRequest:{},
      }
    },
    mounted(){
      this.flag=this.$route.query.flag;
      if(this.flag==1){
        this.applyRequest.orderId=this.$route.query.orderId;
      }else{
        this.applyRequest.skuId=this.$route.query.orderId;
      }
      this.applyRequest.desc='';
      this.orderId = this.$route.query.orderId;
      var orderItems= JSON.parse(getStore('refundInfo'));
      this.orderItems = orderItems;
    },
    methods:{
      imageuploading(data,headers){
          this.upLoad=true;
      },
      imageuploaded(res,data) {
         this.upLoad=false;
        var upimageItem = {};
        upimageItem.id = res.result[0].id;
        upimageItem.url= res.result[0].url;
        this.upImages.push(upimageItem);
      },
      delImage(index) {
        this.upImages.shift(index);
      },
      gotoback(){
        this.$router.go(-1);
      },
      submit(){
        if(this.applyRequest.desc.length==0){
          this.$dialog.toast({mes: '请输入问题描述!', timeout: 1000})
           return;
        }
        this.applyRequest.returnType=this.returnType;
        this.applyRequest.shippingType=this.shippingType;
        var quantity=0;
        this.orderItems.item.forEach(function (item) {
          quantity+=item.quantity;
        })
        this.applyRequest.quantity=quantity;
        var medias=[];
        this.upImages.forEach(function (item) {
          medias.push(item.id);
        })
        if(medias.length>0){
          this.applyRequest.medias=medias.join(',');
        }
        if (this.flag.length==0)return;
        const that=this;
        var applyRefundAPI='/api/return/apply';//单品退
        var refundApplyOrder='/api/return/applyOrder';//整单退
        baseHttp(this,this.flag==1?refundApplyOrder:this.flag==2?applyRefundAPI:'',this.applyRequest,'post','申请中...',function (data){
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
  .type{
    padding-bottom: 0.2rem;
    padding-left: .3rem;
    background-color: #ffffff;
  }
  .type p{
    font-size: .3rem;
    padding-top: .3rem;
    padding-bottom: .2rem;
  }
  .type button{
    margin-right: 0.2rem;
    border-radius:0;
    background-color: #ffffff;
    color: #999999;
    border: 1px solid #999999;
    font-size: .25rem;
    padding: 0 0.2rem;
    min-width: 0.8rem;
  }
  .type .anniu{
    color: red;
    border: 1px solid red;
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
  #fillsales .yd-grids-item {
    padding: 0.1rem 0;
  }
  #fillsales .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
    border-right: none;
  }
  #fillsales .yd-grids-item:after {
    border-bottom: none;
  }
  #fillsales .yd-cell-title{
    padding-top: .2rem;
    padding-bottom: .2rem;
    padding-left: .3rem;
    background-color: #ffffff;
    color: #000000;
  }
</style>
