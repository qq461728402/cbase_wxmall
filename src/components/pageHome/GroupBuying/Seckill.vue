<template>
  <yd-layout style="background-color: #FFFFFF" id="seckill">
    <yd-navbar slot="navbar" title="限时秒杀" bgcolor="#d41d0f" color="#FFF">
      <router-link>
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <ul class="yd-scrollnav-tab-item" style="color: rgb(255, 255, 255); height: 0.9rem;" id="scroll" slot="navbar">
      <li :class="{'yd-scrollnav-current':selettype==item.type}" style="color: rgb(245, 245, 245);" v-for="item in startTimes" @click="switchlist(item.type,$event)">
        <div style="width: 100%;display:table;margin: auto;height: 0.9rem;text-align: center">
          <div style="vertical-align:middle;display:table-cell;">
              <p style="font-size: 0.25rem">{{item.name}}</p>
              <p style="font-size: 0.2rem">{{item.des}}</p>
            </div>
        </div>
      </li>
    </ul>
    <div style="display: block">
       <img src="http://image.bitauto.com/dealer/news/1601163/3e0c97c8-d392-44c8-9671-4039491f0749.jpg" style="width: 100%">
    </div>
    <van-row style="line-height: 30px;background-color: #E9E9E9">
      <van-col offset="1" span="8"><span style="font-size: 0.25rem;color: #d41d0f">疯狂抢购&nbsp;限时秒杀</span></van-col>
      <van-col offset="5" span="9" style="text-align: right"> <yd-countdown :time="seckillTime"  done-text="正在抢购" id="times">
        <span><em>{%d}</em></span>天
        <span><em>{%h}</em></span>小时
        <span><em>{%m}</em></span>时
        <span><em>{%s}</em></span>秒
      </yd-countdown></van-col>
    </van-row>

    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <ul class="bulk_goods">
        <li class="goods-item" v-for="item, key in promotions" :key="key" @click="gotoDetail(item)">
          <div class="thumb center-img">
            <img :src="item.image">
          </div>
          <div class="detail">
            <div class="goods-info">
              <div class="title">{{item.skuName}}</div>
            </div>
            <div class="from-shop">
              <van-row style="line-height: 30px">
                <van-col span="8" class="price"> <span><em>¥</em>{{item.price}}</span></van-col>
                <van-col offset="8" span="8"><van-button :disabled="item.avaliable==false" type="danger" size="small" class="pull-right">{{item.avaliable==false?'活动结束':'立即抢购'}}</van-button></van-col>
              </van-row>
              <van-row>
                <van-col span="8" class="del_price"><span><em>¥</em>{{item.salePrice}}</span></van-col>
                <van-col span="8" style="text-align: right;font-size: 0.2rem;color: #999;">已售{{((item.stock-item.stockAvaliable)/item.stock*100).toFixed(2)}}%</van-col>
                <van-col span="7" offset="1" style="margin-top: 7px"><van-progress :show-pivot="showpivot" color="#ed5050" :percentage="(item.stock-item.stockAvaliable)/item.stock*100" /></van-col>
              </van-row>
            </div>
          </div>
        </li>
      </ul>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {Button,Col,Row,Progress} from 'vant';
  const vm = {
    components: {
      [Row.name]:Row,
      [Col.name]:Col,
      [Button.name]:Button,
      [Progress.name]:Progress,
    },
    data() {
      return {
        showpivot:false,
        selettype:1,//默认为第一个
        startTimes:[],
        promotions:[],//所有的列表
        seckillTime:'',//秒杀时间
      }
    },
    mounted(){

    },
    methods: {
      switchlist(key,e) {
        this.selettype=key;
        var seckillTime =this.startTimes[key-1].seckillTime;
        this.seckillTime=seckillTime/1000;
        document.getElementById('scroll').scrollLeft=e.currentTarget.offsetLeft-10;
        this.loadList(seckillTime);
      },
      starttimes(){
        const that = this;
        baseHttp(this, '/api/promotion/seckill/starttimes', {'store':'1'}, 'get', '加载中...', function (data) {
          if(data.startTimes){
            that.startTimes=[];
            data.startTimes= data.startTimes.sort();//排序
            var sortTime=0;
            data.startTimes.forEach(function (item) {
                if(data.currentTime>item) {
                    sortTime=item;
                }
            });
            var i=0;
            data.startTimes.forEach(function (item) {
              var date = new Date(item);
              var dates = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':'+ (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
              if(item<sortTime){
                that.startTimes.push({name:dates,des:'已开抢',type:(i+1),seckillTime:item});
              }else if(item==sortTime){
                that.startTimes.push({name:dates,des:'抢购进行中...',type:(i+1),seckillTime:item});
                that.seckillTime=item/1000;
                that.loadList(item);
              }
              else {
                that.startTimes.push({name:dates,des:'未开始',type:(i+1),seckillTime:item});
              }
              i++;
            })
          }
        })
      },
      loadList(startTime) {
        const that = this;
        baseHttp(this, '/api/promotion/seckill/model', {'startTime': startTime,'store':'1'}, 'get', '加载中...', function (data) {
          if(data.model){
             if(data.model.promotions){
               that.promotions=data.model.promotions;
             }
          }
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      },
      gotoDetail(item){
        if(item.avaliable==false){
          return;
        }
        this.$router.push({path: '/home/GroupBuyDetail',query:{'promotionId':item.promotionId,'promotionType':'SECKILL'}})
      }
    },
    activated(){
      this.starttimes();
    },
  }
  export default vm;
</script>
<style scoped>
  .bulk_goods{
    position: relative;
  }
  ul {
    list-style: none;
  }
  .bulk_goods li{
    border-bottom: 1px solid #e5e5e5;
  }
  .bulk_goods .goods-item{
    display: block;
    position: relative;
    width: auto;
  }
  .bulk_goods .goods-item .thumb {
    float: left;
    position: relative;
    width: 2rem;
    height: 2rem;
    background-color: #f4f4f4;
    text-align: center;
    margin:0.2rem;
  }
  .bulk_goods .goods-item .badge:before {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: " ";
    border-style: solid;
    border-width: 0.18rem;
    border-color: #cccccc;
    z-index: 1;
    opacity:0.8
  }
  .goods-item .detail {
    position: relative;
    font-size: 0.25rem;
    height: 2.4rem;
    margin-left: 2.2rem;
  }
  .goods-item .thumb img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }
  .center-img img {
    max-width: 100%;
    max-height: 100%;
    border: 0;
    vertical-align: middle;
  }
  .bulk_goods .goods-item .badge .num {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.24rem;
    line-height: 1.5;
    margin-left: 3px;
    z-index: 2;
  }
  .bulk_goods .goods-item .title {
    line-height: 1.5;
    height: 0.9rem;
    padding-top: 0.2rem;
    margin-bottom: 0.2rem;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
  }
  .bulk_goods .meta {
    position: relative;
    zoom: 1;
    width: 100%;
    padding-right: 20px;
  }
  .bulk_goods .goods-item .price {
    font-size: 0.25rem;
    margin: 0;
    padding-bottom: 0;
    display: inline-block;
  }
  .del_price{
    color: #999;
    font-size: 0.2rem;
    text-decoration: line-through
  }
  .goods-item .detail .price {
    font-size: 0.3rem;
    color: #ff525e;
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
  .goods-item .from-shop {
    position: absolute;
    left:0.2rem;
    bottom: 0.2rem;
    width: 100%;
    padding-right: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .goods-item .thumb .sell-out-60 {
    background-size: 60% auto;
  }
  .goods-item .thumb .sell-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(../../../assets/img/2listicon_shouqing@2x.png) no-repeat 50%;
    background-size: 60% auto;
    background-color: rgba(0,0,0,.3);
  }
  #times span{
    color: #ffffff;
    background-color: #000000;
    border-radius: 2px;
    padding: 0 2px;
  }
</style>
<style>
  #seckill .yd-scrollnav-tab-item::-webkit-scrollbar {
    display: none
  }
  #seckill .yd-scrollnav-tab-item{
    overflow-x:scroll;
    flex:initial;
    background-color: #31343d;
  }
  #seckill .yd-scrollnav-tab-item>li{
    min-width: 1.5rem;
    background-color: #31343d;
  }
  #seckill .yd-scrollnav-tab-item>li.yd-scrollnav-current{
    background-color: #ff001e;
  }
</style>
