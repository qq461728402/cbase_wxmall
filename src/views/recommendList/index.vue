<!--商品列表-->
<template>
  <div id="productlist">
    <yd-list  :theme="theme">
      <yd-list-item v-for="item, key in list" :key="key" @click.native="gotoDetail(item)" >
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
    name: 'recommendList',
    props:['list','theme'],
    methods:{
      gotoDetail(item){
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
   #productlist .yd-list-img{
    position:relative;
  }
   #productlist .yd-list-theme4 .yd-list-item .yd-list-title{
     height: 1rem;
   }
   #productlist .yd-list-theme4 .yd-list-item .yd-list-img{
     width:1.5rem;
     padding:0.75rem 0;
   }
</style>
