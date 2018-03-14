<!--商品列表-->
<template>
  <ul class="bulk_goods">
    <li class="goods-item" v-for="item, key in productlist" :key="key" @click="gotoDetail(item)">
      <div class="thumb">
        <img :src="item.url">
        <i class="sell-out sell-out-60" v-if="item.isAvalible==false"></i>
      </div>
      <div class="detail">
        <div class="goods-info">
          <div class="title">{{item.skuName}}</div>
          <div class="meta">
            <p class="price"><span><em>¥</em>{{item.salePrices}}</span> <span class="del_price" v-if="item.retailPrices"><em>¥</em>{{item.retailPrices}}</span>
            </p>
            <div style="height: 0.4rem">
              <span style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem">已售&nbsp<span style="color:#ff7d49">{{item.salesCount?item.salesCount:'0'}}</span> |&nbsp;<span style="color: #6e6f70;">评论</span>&nbsp;<span style="color:#ff7d49 ">{{item.reviewCount?item.reviewCount:'0'}}</span></span><span v-if="item.isAvalible==false" style="font-weight: bold;color: #d41d0f;">{{(item.unAvalibleReson)}}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script type="text/babel">
  import {Col,Row} from 'vant';
  export default {
    components: {
      [Row.name]:Row,
      [Col.name]:Col,
    },
    name: 'productlist',
    props:['productlist'],
    methods:{
      gotoDetail(item){
        console.log(item.skuId);
        this.$emit('gotoDetail',item);
      }
    },
  }
</script>
<style scoped>
  .bulk_goods{
    position: relative;
    background-color: #ffffff;
  }
  ul {
    list-style: none;
  }
  .bulk_goods li{
    border-bottom: 1px solid #f5f5f5;
    padding: 0.2rem;
  }
  .bulk_goods .goods-item{
    display: block;
    position: relative;
    width: auto;
  }
  .bulk_goods .goods-item .thumb {
    float: left;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #f4f4f4;
    text-align: center;
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
    height: 1.5rem;
    margin-left: 1.8rem;
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
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.28rem;
  }
  .bulk_goods .meta {
    bottom: 0;
    position: absolute;
    width: 100%;
  }
  .bulk_goods .goods-item .price {
    font-size: 0.25rem;
    margin: 0;
    padding-bottom: 0;
    display: inline-block;
  }
  .bulk_goods .goods-item .price .del_price{
    color: #999;
    font-size: 0.2rem;
    text-decoration: line-through
  }
  .goods-item .detail .price {
    font-size: 0.28rem;
    color: #ff525e;
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
    background: url(../../assets/img/2listicon_shouqing@2x.png) no-repeat 50%;
    background-size: 60% auto;
    background-color: rgba(0,0,0,.3);
  }
</style>
