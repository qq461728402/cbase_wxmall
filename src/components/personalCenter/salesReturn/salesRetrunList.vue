<template>
  <yd-layout id="salesRetrunlist">
    <yd-navbar slot="navbar" title="退货订单列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div slot="list"  class="or_1" v-for="item,index in refundlist" :key="index" @click="gotogoodsDetail(item)">
          <yd-cell-item>
            <span slot="left" class="or_2">服务单号：{{item.returnNumber}}</span>
            <span slot="right" class="or_3">{{item.type=='MAINTENANCE'?'维修':item.type=='RETURN'?'退货':'换货'}}</span>
          </yd-cell-item>
          <div class="item">
            <div class="thumb">
              <img  :src="item.itemModel.imageUrl">
            </div>
            <div class="detail">
              <div class="title">
                {{item.itemModel.skuName}}
              </div>
            </div>
          </div>
          <div class="states">
            <p>您的订单状态:<span>{{item.status=='PURCHASED'?'待审核':item.status=='CONFIRMED'?'已审核':item.status=='SHIPPED'?'已寄出':item.status=='CANCELED'?'已取消':'已完成'}}</span></p>
          </div>
        </div>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <div class="noProduct" v-if="refundlist.length==0&&isrefund==true">
      <img src="../../../assets/img/cleanOder.png">
      <p>您还没有售后订单</p>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {getCookie} from '@/config/env'
  import  {getStore,removeStore,setStore} from '@/config/mUtils'
  import { Cell, CellGroup,Row, Col } from 'vant';
  const vm= {
    components: {
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
      [Row.name]:Row,
      [Col.name]:Col,
    },
    data() {
      return {
        type:'',
        page: 1,
        pageSize: 10,
        ordernum:{},
        refundlist:[],
        isrefund:false,
      }
    },
    mounted(){
      this.page=1;
      this.goodsrefundlist();
    },
    activated(){
      this.goodsrefundlist();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      goodsrefundlist(){
        var pars={'page':this.page,'pageSize':this.pageSize}
        const  that =this;
       this.apiRequest('/api/return/returns',pars,'get',this.page==1?'加载中...':'',function (data){
          if(that.page==1){
            if(data.orders) {
              that.isrefund=false;
              that.refundlist=data.orders;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              that.isrefund=true;
              that.refundlist=[];
            }
          }else{
            if(data.orders){
              that.refundlist=that.refundlist.concat(data.orders);
              if(data.orders&&data.orders.length != this.pageSize){
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              }else{
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            }else{
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }
        })
      },
      /* 下拉刷新 */
      pullList() {
        this.page=1;
        this.goodsrefundlist();
      },
      /* 上拉加载更多 */
      loadList() {
        this.page=this.page+1;
        this.goodsrefundlist();
      },
      /*进入商品详情*/
      gotogoodsDetail(item){
        setStore("returnInfo",item);
        this.$router.push({ name: 'salesRetrunDetail',query:{retrunId:item.id}});
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .or_1{
    background-color: #FFFFFF;
    margin-bottom: 0.2rem;
  }
  span.or_2{
    color:#6e6f70;
  }
  span.or_3{
    color:#d41d0f;
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
  .item{
    padding: 0.2rem;
  }
   .item .thumb {
    float: left;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #f4f4f4;
    text-align: center;
  }
  .item .thumb img {
    vertical-align: middle;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    border: 0;
  }
  .item .detail {
    position: relative;
    font-size: 0.25rem;
    height: 1.5rem;
    margin-left: 1.8rem;
  }
  .item .title {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.28rem;
  }
  .states{
    padding: 0.2rem;
    font-size: 0.28rem;
    background-color: #e1e1e1;
    color:#6e6f70;
  }
  .states span{
    color:#d41d0f;
  }
</style>

