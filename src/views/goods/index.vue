<template>
  <div class="goods-item" @click="gotoDetail(item)">
    <div class="thumb center-img">
      <img :src="item.imageUrl" v-if="goodsType=='submit'">
      <img :src="item.url" else>
      <i class="sell-out sell-out-60" v-if="goodsType=='submit'&&item.available==false"></i>
    </div>
    <div class="detail">
      <div class="goods-info">
        <div class="title">{{item.skuName}}</div>
        <div class="meta" v-if="goodsType=='submit'">
          <van-row>
            <van-col span="12">
              <div class="price"><span><em>¥</em>{{item.salePrice}}</span> <span class="del_price" v-if="item.salePrice"><em>¥</em>{{item.retailPrice}}</span>
              </div>
            </van-col>
            <van-col span="11" style="text-align: right;font-size: 0.2rem;color: #999;">
              <div v-if="showQuantity==true">{{'x'+item.quantity}}</div>
            </van-col>
          </van-row>
        </div>
        <div class="meta" v-else>
          <van-row>
            <van-col span="12">
              <div class="price"><span><em>¥</em>{{item.totleFee}}</span> <span class="del_price" v-if="item.salePrice"><em>¥</em>{{item.salePrice}}</span>
              </div>
            </van-col>
            <van-col span="11" style="text-align: right;font-size: 0.2rem;color: #999;">
              <div v-if="showQuantity==true">{{'x'+item.quantity}}</div>
            </van-col>
          </van-row>
        </div>

      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {Col,Row} from 'vant';
  export default {
    components: {
      [Row.name]:Row,
      [Col.name]:Col,
    },
    name: 'goods',
    props: ['item','showQuantity','goodsType'],
    methods: {
      gotoDetail(item){
        this.$emit('gotoDetail', item);
      }
    },
  }
</script>
<style scoped>
  .goods-item {
    display: block;
    position: relative;
    width: auto;
  }
  .goods-item .thumb {
    float: left;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #f4f4f4;
    text-align: center;
  }
  .goods-item .badge:before {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: " ";
    border-style: solid;
    border-width: 0.18rem;
    border-color: #cccccc;
    z-index: 1;
    opacity: 0.8
  }
  .goods-item .detail {
    position: relative;
    font-size: 0.25rem;
    height: 1.5rem;
    margin-left: 1.7rem;
  }
  .goods-item .thumb img {
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
  .goods-item .badge .num {
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
    bottom: 0;
    position: absolute;
    width: 100%;
  }
  .goods-item .price {
    font-size: 0.25rem;
    margin: 0;
    padding-bottom: 0;
    display: inline-block;
  }
  .goods-item .price .del_price {
    color: #999;
    font-size: 0.2rem;
    text-decoration: line-through
  }
  .goods-item .detail .price {
    padding-bottom: 8px;
    font-size: 0.25rem;
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
    background-color: rgba(0, 0, 0, .3);
  }
</style>
