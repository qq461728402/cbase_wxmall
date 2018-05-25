<!--客服列表-->
<template>
  <ul class="bulk_goods">
    <li class="goods-item" v-for="item, key in customerlist" :key="key" @click="gotoDetail(item)">
      <div class="thumb center-img">
        <img :src="item.avatar">
      </div>
      <div class="detail">
        <div class="goods-info">
          <div class="title">{{item.name}}</div>
          <a :href="'tel:'+item.phone">
            <div class="meta">经理电话:<span class="tel"> {{item.phone}}</span></div>
          </a>
        </div>
      </div>
      <div class="introduction">
        <p>简介</p>
        <p v-if="item.remark">{{item.remark}}</p>
        <p v-else>暂无简介</p>
      </div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  import {Button} from 'vant';
  export default {
    components: {
      [Button.name]:Button,
    },
    name: 'customer',
    props:['customerlist'],
    methods:{
      gotoDetail(item){

      },
    },
  }
</script>
<style scoped>
  .bulk_goods{
    position: relative;
  }
  ul {
    list-style: none;
  }
  .bulk_goods li{
    border-bottom: 1px solid #f5f5f5;
    padding: 0.1rem;
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
    margin-left: 1.7rem;
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
    vertical-align: middle;
  }

  .bulk_goods .goods-item .title {
    margin-bottom: 0.2rem;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
  }
  .bulk_goods .goods-item .introduction{
    margin-top: 0.1rem;
  }
  .bulk_goods .goods-item .introduction >p {
    color: #646464;
    font-size: 0.25rem;
  }
  .bulk_goods .goods-item .introduction >p:first-child {
    color: #404040;
    font-size: 0.28rem;
  }
  .bulk_goods .meta {
    position: relative;
    zoom: 1;
    color: #646464;
  }
  .bulk_goods .meta .tel{
    color: #387ef5;
    text-decoration:underline;
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
    background: url(../../assets/img/2listicon_shouqing@2x.png) no-repeat 50%;
    background-size: 60% auto;
    background-color: rgba(0,0,0,.3);
  }
</style>
