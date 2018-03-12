<template>
  <div class="goods-item">
    <div class="thumb center-img">
      <img :src="goods.skuModel.image">
    </div>
    <div class="detail">
      <div class="goods-info">
        <div class="title">{{goods.skuModel.skuName}}</div>
        <div class="meta">
          <div class="price pull-left"><span><em>¥</em>{{goods.skuModel.price}}</span> <span class="del_price"><em>¥</em>{{goods.skuModel.salePrice}}</span></div>
        </div>
      </div>
    </div>
  </div>

  <yd-list theme="3">
    <yd-list-item v-for="item, key in list" :key="key" >
      <img slot="img" :src="item.img" style="filter: grayscale(100%);">
      <span slot="title" style="font-weight: normal;color: #000;">{{item.title}}</span>
      <yd-list-other slot="other">
        <div>
          <span class="demo-list-price" style="color: red;"><em>¥</em>{{item.price}}</span>
          <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through">¥{{item.w_price}}</span>
        </div>
      </yd-list-other>
      <yd-list-other slot="other" style="margin-top: .2rem;">
        <div>
          <div style="width:1.5rem;border:1px solid #f48f18;border-radius: 1rem;float: left;height: .5rem;overflow: hidden">
            <div style="position: relative;line-height: .5rem;text-align: center;font-size: .2rem;color: #f48f18;overflow: hidden;border-radius: 1rem;">
              <div class="yiqiang" style="width: 100%;"></div>
              <span>已抢</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        <div>
          <yd-button type="warning" style="width: 1rem;height: .5rem;background-color: #999999">已结束</yd-button>
        </div>
      </yd-list-other>
    </yd-list-item>
  </yd-list>
</template>
<script type="text/babel">
  import {Button} from 'vant';
  export default {
    components: {
      [Button.name]:Button,
    },
    name: 'goods',
    props:['goods'],
    methods:{
      gotoDetail(item){
        this.$emit('gotoDetail',item);
      }
    },
  }
</script>
<style scoped>
  .goods-item{
    display: block;
    position: relative;
    width: auto;
  }
  .goods-item .thumb {
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
  .goods-item .title {
    line-height: 1.5;
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
  .meta {
    position: relative;
    bottom: 0.2rem;
  }
  .goods-item .price {
    font-size: 0.25rem;
    margin: 0;
    padding-bottom: 0;
    display: inline-block;
  }
  .goods-item .price .del_price{
    color: #999;
    font-size: 0.2rem;
    text-decoration: line-through
  }

  .goods-item .detail .price {
    padding-bottom: 8px;
    font-size: 0.25rem;
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
    background: url(../../assets/img/2listicon_shouqing@2x.png) no-repeat 50%;
    background-size: 60% auto;
    background-color: rgba(0,0,0,.3);
  }
</style>
