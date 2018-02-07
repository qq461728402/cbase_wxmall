<template>
  <yd-layout id="insurance">
    <yd-navbar slot="navbar" title="购买保险" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-slider autoplay="2000" style="min-height: 4rem">
      <yd-slider-item v-for="item,index in data.banners" :key="index">
        <a :href="item.companylUrl">
          <img :src="item.imageUrl">
        </a>
      </yd-slider-item>
    </yd-slider>
    <p class="insur_1">合作机构</p>
    <ul class="insurancelist">
      <li v-for="item,index in data.companies" :key="index">
        <yd-flexbox class="insur_2">
          <yd-flexbox-item> <img :src="item.logoUrl" class="insur_3"></yd-flexbox-item>
          <yd-flexbox-item><span class="insur_4" v-cloak>{{item.companyName}}</span></yd-flexbox-item>
          <yd-flexbox-item><span class="insur_5">强烈推荐</span></yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="insur_6">
          <div class="insur_7" @click="gotoInfo(item)">
            <img src="../../../assets/img/raw_1505186072.png" class="insur_8"/>
            <p >获取报价</p>
          </div>
          <div class="insur_9">
            <div class="insur_10"></div>
          </div>
          <div class="insur_11" @click="gototype">
            <yd-badge type="danger" class="insur_12" v-if="quantity1>0">{{quantity1}}</yd-badge>
            <img src="../../../assets/img/raw_1505186456.png" class="insur_13"/>
            <p>选取险种</p>
          </div>
          <div class="insur_14">
            <div class="insur_15"></div>
          </div>
          <div class="insur_16" @click="mypolicy">
            <img src="../../../assets/img/raw_1505186573.png" class="insur_17"/>
            <p>保单完成</p>
          </div>
        </yd-flexbox>
      </li>
    </ul>
    <p class="insur_18">入会享大礼</p>
    <div style="overflow: hidden; width: 100%;text-align: center;">
      <div style="overflow: hidden; width: 100%;"><img :src="adImgs" style="width: 100%;"></div>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {setStore,getStore} from  '../../../config/mUtils'
  const vm= {
    data() {
      return {
        isCookie:false,
        data:{},
        quantity1:0,
        adImgs:''
      }
    },
    mounted(){
      console.log('xiong');
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getcompany();
        this.quantity();
      }
    },
    activated(){
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getcompany();
        this.quantity();
      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      /*获取保险公司信息*/
      getcompany(){
        const  that=this;
        baseHttp(this,'/api/insurance/company',{},'post','加载中...',function (data) {
          that.data=data;
          if(data.adImgs.length>0){
            that.adImgs=data.adImgs[0];
          }
        });
      },
      /*获取报价数量*/
      quantity(){
        const  that=this;
        baseHttp(this,'/api/insurance/quotation/quantity',{},'post','',function (data) {
          that.quantity1=data.quantity;
        });
      },
      gotoInfo(item){
        this.$router.push({ name: 'fillInformation', query: { companyId:item.companyId,companyName:item.companyName}});
      },
      gototype(){
        this.$router.push({ name: 'insurance_type'});
      },
      mypolicy(){
        this.$router.push({ name: 'policyList'});
      }

    },

  }
  export default vm;
</script>
<style scoped>

  .insurancelist li{
    border-top: 1px solid #d41d0f;
    background-color: #ffffff;
    margin-top: 10px;
    padding-bottom: 0.1rem;
  }
  .insurancelist li:first-child{
    margin-top: 0px;
  }
  .insurancelist li:last-child{
    /*border-bottom: 1px solid #d9d9d9;*/
    background-color: #ffffff;
  }
  .insurancelist li p{
    text-align: center;
    color: black;
    margin-top: 10px;
    font-size: .3rem;
  }



  p.insur_1{
    background-color: #ffffff;
    color: #000000;
    padding: 10px 10px;
    height: 45px;
    line-height: 25px;
    font-size: 0.3rem;
  }
  img.insur_3{
    height: 1rem;
    margin-top:0.2rem;
  }
  span.insur_4{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
  }
  span.insur_5{
    float: right;
    margin-bottom:0.62rem;
    margin-right: 0.1rem;
    padding: 0.03rem;
    background-color: #d41d0f;
    color: #ffffff;
    font-size: .25rem;
  }
  div.insur_7{
    width: 25%;
    text-align: center;
  }
  img.insur_8{
    height: 0.6rem;
    margin: auto;
  }
  div.insur_9{
    width:12.5%;
  }
  div.insur_10{
    height: 1px;
    background-color: #8bc34a;
    width: 50px;
  }
  div.insur_11{
    width: 25%;
    text-align: center;
  }


  img.insur_13{
    height: 0.6rem;
    margin: auto;
  }
  div.insur_14{
    width:12.5%;
  }
  div.insur_15{
    height: 1px;
    background-color: #0585fd;
    width: 50px;
  }
  div.insur_16{
    width: 25%;
    text-align: center;
  }
  img.insur_17{
    height: 0.6rem;
    margin: auto;
  }
  p.insur_18{
    background-color: #ffffff;
    color: #000000;
    padding: 10px 10px;
    height: 45px;
    line-height: 25px;
    font-size: 0.3rem;
    border-bottom: 1px solid #d41d0f;
    margin-top: 10px;
  }
  div.insur_19{
    text-align: center;
  }
  img.insur_20{
    height: 120px;
  }
</style>
<style>

  #insurance span.yd-badge.insur_12.yd-badge-danger{
    position: absolute;
    right: 37.5%;
  }
  #insurance .hairline .yd-scrollview{
    margin-top:0px;
  }
  #insurance .yd-grids-item:after{
    border-bottom:none;
  }
  #insurance div.yd-flexbox.insur_2.yd-flexbox-horizontal{
    text-align: center;
    height: 1rem;
  }
  #insurance div.yd-flexbox.insur_6.yd-flexbox-horizontal{
    margin-top: 15px;
    margin-bottom: 0.1rem;
  }

</style>
