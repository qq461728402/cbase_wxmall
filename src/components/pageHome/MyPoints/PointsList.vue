<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="积分中心" bgcolor="#d41d0f" color="#FFF">
      <router-link to="/home/MyPoints" slot="left">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div style="background: linear-gradient(90deg,#eb3c3c,#ff7459);box-shadow:0 2px 5px rgba(255,98,98,.4);width: 100%;height: 130px;">
      <div style="font-size: 14px;padding-top: 20px;text-align: center;color: rgba(76,0,0,.7);">可用积分</div>
      <div style="font-size: 48px;color: #ffffff;text-align: center">{{userInfo.bonus?userInfo.bonus:'0'}}</div>
      <div style="font-size: 12px;color: hsla(0,0%,100%,.7);text-align: center">小积分&nbsp;换好礼&nbsp;会员专享&nbsp;每月更新</div>
    </div>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <integral :list="items" :theme="theme" @gotoDetail="gotoDetail"></integral>
      <!--<ul class="bulk_goods">-->
        <!--<li class="goods-item" v-for="item, key in items" :key="key" @click="gotoDetail(item)">-->
          <!--<div class="thumb center-img">-->
            <!--<img :src="item.skuModel.image">-->
            <!--&lt;!&ndash;<span class="num">2人团</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="sell-out sell-out-60" v-if="1==2"></i>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="detail">-->
            <!--<div class="goods-info">-->
              <!--<div class="title">{{item.skuModel.skuName}}</div>-->
              <!--<div class="meta">-->
                <!--<div class="price pull-left">-->
                    <!--<span>{{item.skuModel.bonusPoints}}积分</span>-->
                    <!--<span class="del_price"><em>¥</em>{{item.skuModel.salePrice}}</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="from-shop">-->
              <!--<van-button style="border: 1px solid red;color: red" size="normal" class="pull-right">立即兑换</van-button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {Button} from 'vant';
  import integral from '../../../views/integral'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'userInfo',
      ])
    },
    components: {
      [Button.name]:Button,
      integral,
    },
    data() {
      return {
        theme:3,
        items:[],
      }
    },
    mounted(){
      this.loadList();
    },
    methods:{
      loadList() {
        const that = this;
        baseHttp(this, '/api/promotion/list', {'promotionType': 'EXCHANGE'}, 'get', '加载中...', function (data) {
          that.items = data.promotions;
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      },
      //积分兑换
      gotoDetail(item){
        this.$router.push({path: '/home/PointsDetail',query:{'promotionId':item.promotionId}})
      }
    },
    activated(){
      this.loadList();
    },
  }
  export default vm;
</script>

