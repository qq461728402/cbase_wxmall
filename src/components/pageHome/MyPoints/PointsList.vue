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
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp} from '@/config/env'
  import {Button} from 'vant';
  import integral from '@/views/integral'
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
        this.$router.push({path: '/home/PointsDetail',query:{'promotionSkuId':item.promotionSkuId}})
      }
    },
    activated(){
      this.loadList();
    },
  }
  export default vm;
</script>

