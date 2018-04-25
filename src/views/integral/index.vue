<!--积分列表-->
<template>
  <yd-list :theme="theme" id="integral">
    <yd-list-item v-for="item, key in list" :key="key" @click.native="gotoDetail(item)" >
      <img slot="img" v-lazy="item.image">
      <span slot="title" style="font-weight: normal;color: #000;">{{item.skuName}}</span>
      <yd-list-other slot="other">
        <div>
          <span class="demo-list-price" style="color: red;">{{item.bonusPoints}}积分</span>
          <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through" v-if="item.salePrice&&item.salePrice.length>0"><em>¥</em>{{item.salePrice}}</span>
        </div>
        <div>
          <van-button type="danger" size="small" class="pull-right">积分兑换</van-button>
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
    name: 'integral',
    props:['list','theme'],
    methods:{
      gotoDetail(item){
        this.$emit('gotoDetail',item);
      }
    },
  }
</script>
<style scoped>
</style>
<style>
  #integral .yd-list-img{
    position: relative;
    background-color: #f4f4f4;
  }
  #integral .yd-list-img img{
    border: 0;
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
  .yd-list-theme4 .yd-list-item .yd-list-title{
    height: 1.34rem;
  }
</style>
