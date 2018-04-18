<!--商品列表-->
<template>
  <div id="hotlist">
    <yd-list  :theme="theme">
      <yd-list-item v-for="item, key in productlist" :key="key" @click.native="gotoDetail(item)" >
        <div slot="img">
          <img v-lazy="item.url">
          <i class="sell-out" v-if="item.isAvalible==false"></i>
        </div>
        <span slot="title" style="font-weight: normal;color: #000;">{{item.skuName}}</span>
        <yd-list-other slot="other">
          <div>
            <span class="demo-list-price" style="color: red;"><em>¥</em>{{item.salePrices}}</span>
            <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through"><em>¥</em>{{item.retailPrices}}</span>
          </div>
          <div>
            <span style="color: #6e6f70;">已售&nbsp<span style="color:#ff7d49">{{item.salesCount?item.salesCount:'0'}}</span> |&nbsp;<span style="color: #6e6f70;">评论</span>&nbsp;<span style="color:#ff7d49 ">{{item.reviewCount?item.reviewCount:'0'}}</span></span><span v-if="item.isAvalible==false" style="font-weight: bold;color: #d41d0f;">{{(item.unAvalibleReson)}}</span>
          </div>
        </yd-list-other>
      </yd-list-item>
    </yd-list>
  </div>

</template>
<script type="text/babel">
  import {Col,Row} from 'vant';
  export default {
    components: {
      [Row.name]:Row,
      [Col.name]:Col,
    },
    name: 'productlist',
    props:['productlist','theme'],
    methods:{
      gotoDetail(item){
        console.log(item.skuId);
        this.$emit('gotoDetail',item);
      }
    },
  }
</script>
<style scoped>
  .sell-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(../../assets/img/2listicon_shouqing@2x.png) no-repeat 50%;
    background-size: 60% auto;
    background-color: rgba(0,0,0,.3);
  }
</style>
<style>
  #hotlist .yd-list-img{
    position:relative;
    background-color: #ffffff;
  }
  #hotlist .yd-list-theme4 .yd-list-item .yd-list-title{
    height: 1rem;
  }
  #hotlist .yd-list-theme4 .yd-list-item .yd-list-img{
    width:1.5rem;
    padding:0.75rem 0;
  }
  #hotlist .yd-list-img img, .yd-list-mes{
    background-color: transparent;
  }
</style>
