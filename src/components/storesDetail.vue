<template>
  <yd-layout id="stroeDetail">
    <yd-navbar slot="navbar" title="门店详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="/stores" slot="left">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-slider autoplay="3000" style="min-height: 4rem">
      <yd-slider-item  v-for="urlImg in urls" :key="urlImg">
        <img :src="urlImg">
      </yd-slider-item>
    </yd-slider>
    <yd-cell-group style="margin-bottom: 0px;">
      <yd-cell-item style="padding-top: 0.1rem;padding-bottom: 0.1rem">
            <span slot="left" style="width: 100%;">
            	<p><div style="font-size: 0.35rem;overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{storeInfo.storeName}}</div></p><!--店名称-->
            	<p>
                <span style="color: #999;font-size: .27rem;">总订单&nbsp;<em style="color: #ff7d49;">{{storeInfo.orderCount?storeInfo.orderCount:'0'}}</em></span><!--总订单-->
                <span style="color: #999;font-size: .27rem;">|</span>
                <span style="color: #999;font-size: .27rem;">总评价&nbsp;<em style="color: #ff7d49;">{{storeInfo.ratesCount?storeInfo.ratesCount:'0'}}</em></span><!--总评价-->
              </p>
            	<div style="color: #717273;overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{storeInfo.storeAddress}}</div><!--店地址-->
            </span>
            <span slot="right" style="border-left: 1px solid #D9D9D9;margin-right: 0px;">
             <a class="yd-tabbar-item  yd-tabbar-active" @click="signature()" style="margin-left: 0.2rem">
               <yd-icon name="location" size=".6rem" color="rgb(255, 125, 73)"></yd-icon>
               <span class="yd-tabbar-txt" style="color: #999;">{{distancekm}}</span>
             </a>

              <!--<p><span style="color: #999;">{{storeInfo.range}}km</span></p><!--距离范围-->
              <!--<p><span style="color: #999;">导航</span></p>-->
            </span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group title="门店简介" style="margin-top: 0.2rem">
      <p style="padding: 0.3rem;text-indent : 0.6rem;letter-spacing:2px;color: #717273;font-size: 0.3rem">{{storeInfo.desc}}</p>
    </yd-cell-group>

    <yd-cell-group v-if="1==2" style="margin-bottom: .2rem;margin-top: .2rem;height: 1rem; width: 100%;background-color: #FFFFFF;line-height: 1rem;">
      <div style="margin: .2rem;">
        <div style="float: left;font-size: .3rem;">团购活动</div>
        <div style="font-size: .3rem;float: right;">{{carInfo.type}}</div>
      </div>

    </yd-cell-group>

    <yd-cell-group v-if="1==2" style="margin-bottom: 0px;">
      <yd-step  theme="2" style="padding-top:.2rem;">
        <yd-step-item id="stepone">
          <span slot="bottom" style="color: #999;font-size: .2rem;">在线选购商品</span>
        </yd-step-item>
        <yd-step-item id="steptwo">
          <span slot="bottom" style="color: #999;font-size: .2rem;">发送验证码到手机</span>
        </yd-step-item>
        <yd-step-item id="stepthree">
          <span slot="bottom" style="color: #999;font-size: .2rem;">到店凭码服务</span>
        </yd-step-item>
      </yd-step>
    </yd-cell-group>
    <yd-checklist color="#d41d0f" v-model="checkservices" v-if="1==2">
      <yd-checklist-item v-for="item in serviceModelList" :val="item" :key="item" @click.native="selectItem(item)">
        <yd-flexbox style="padding: 15px 0;">
          <yd-flexbox-item align="top">
            <p>
              <span style="font-size: .3rem;color: #000000;">{{'服务项目:'+item.serviceName}}</span><!--服务项目名称-->
            </p>
            <p>
              <span style="color: #999;font-size: .27rem;">{{item.description}}</span><!--副标题-->
              <span style="float: right;color: #d41d0f;">服务费:&yen;{{item.servicePrice}}</span><!--价格-->
            </p>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-checklist-item>
    </yd-checklist>
    <div slot="tabbar" style="margin: 0;width: 100%;height: 1rem;background-color: white" v-if="1==2">
      <yd-button size="large"
                 style="background-color: #363636; margin: auto; float: left;width: 60%;border-radius: inherit;font-size: 0.3rem;text-align:left;padding-left: 0.2rem">合计:&yen;{{totalMoney}}
        </br><span style="font-size: 0.2rem"> (以实际结算为准)</span>
      </yd-button>
      <yd-button size="large" type="primary" style="background-color: #d41d0f; margin: auto; float: right;width: 40%;border-radius: inherit" @click.native="sure">去结算</yd-button>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {openLocation} from '../config/weichatPay'
  const vm= {
    data() {
      return {
        id:'',
        urls:[],
        isCookie: false,
        storeInfo: {},
        carInfo: {},
        weixinInfo: {},
        latitude: '',
        longitude: '',
        medias: [],
        services: [],
        checkservices: [],
        serviceModelList: [],
        totalMoney: 0,
        pointA:'',
        distancekm:'计算中',

      }
    },
    watch: {
      checkservices: {
        deep: true,
        handler: function (val, oldval) {
          this.calculateMoney();
        },
      }
    },
    mounted(){
      this.id=this.$route.query.id;
      this.getStroeDetail();
    },
    methods:{
      getMyPoint (itemPoint) {
        var self = this
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (res) {
          self.pointA = new BMap.Point(res.point.lng, res.point.lat)  // 通过浏览器获得我的经纬度
          self.getDistance(itemPoint);
        })
      },
      getDistance (itemPoint) {
        var map = new BMap.Map('');
        var pointB = new BMap.Point(parseFloat(itemPoint.lng), parseFloat(itemPoint.lat))  // 店铺的经纬度
        var distance = (map.getDistance(this.pointA, pointB) / 1000).toFixed(2) // 保留小数点后两位
        this.distancekm=distance+'km';
      },

      getStroeDetail(){
        const that=this;
       this.apiRequest('/api/store/detail',{'merchantId': this.id},'get','加载中...',function (data) {
          console.log(data);
          if(data.urls)that.urls=data.urls;
          if (data.store)that.storeInfo = data.store;
          if (data.store.medias)that.medias = data.store.medias;
          if (data.serviceModelList)that.serviceModelList = data.serviceModelList;
          if(data.store.longitude&&data.store.latitude){
            var point1={lng:data.store.longitude,lat:data.store.latitude};
            that.getMyPoint(point1);
          }

        })
      },
      /*计算安装项目*/
      calculateMoney(){
        var total = 0.0;
        for (var key in this.checkservices) {
          total += parseFloat(this.checkservices[key].servicePrice);
        }
        this.totalMoney = total;
      },
      selectItem(item){
        this.checkservices.splice(0, this.checkservices.length);
        this.checkservices.push(item);
      },
      signature(){
        const  that =this;
       this.apiRequest('/wechat/jsapi/signature',{'url':window.location.href},'post','',function (data) {
          if(data.signature) {
            that.weixinInfo=data.signature;
            that.getLocation();
          }
        })
      },
      getLocation(){
        const  that =this;
        openLocation(this.weixinInfo,this.storeInfo,function (success) {

        },
          function (fail) {

          })
      }
    },
  }
  export default vm;
</script>
<style scoped>
  .yd-accordion-title{
    width: 80%;
  }
  a.mdxq1 {
    margin-left: 15px;
  }
  #stepone > em{
    background-color: #ec0055;
  }
  #steptwo > em{
    background-color: #6a68ec;
  }
  #stepthree > em{
    background-color: #51cb1b;
  }
  .yd-step-item-bottom span{
    color: #666768 !important;
    font-size: 0.15rem !important;
  }
  .yd-step-item:not(:first-child):before {
    background: -webkit-linear-gradient(left, #ec0055 , #6a68ec); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ec0055, #6a68ec); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ec0055, #6a68ec); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ec0055 , #6a68ec); /* 标准的语法（必须放在最后） */
  }
  .yd-step-item:last-child:before {
    background: -webkit-linear-gradient(left, #6a68ec ,#51cb1b ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6a68ec, #51cb1b); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6a68ec, #51cb1b); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6a68ec , #51cb1b); /* 标准的语法（必须放在最后） */
  }

</style>
<style>
  #stroeDetail .yd-cell-left{
    width: 80%;
  }
  #stroeDetail .yd-cell-right{
    width: 20%;
  }
</style>
