<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="团购频道" bgcolor="#d41d0f" color="#FFF">
      <router-link>
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
    <goodlist :goodlist="items" @gotoDetail="gotoDetail"></goodlist>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {Button} from 'vant';
  import  goodlist from '../../../views/goodList'
  const vm= {
    components: {
      [Button.name]:Button,
      goodlist,
    },
    data() {
      return {
        items:[],
      }
    },
    mounted(){
      this.loadList();
    },
    methods: {
      loadList() {
        const that = this;
        baseHttp(this, '/api/promotion/list', {'promotionType': 'GROUPON'}, 'get', '加载中...', function (data) {
          that.items = data.promotions;
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      },
      gotoDetail(item){
        this.$router.push({path: '/home/GroupBuyDetail',query:{'promotionId':item.promotionId,'promotionType':'GROUPON'}})
      }
    },
    activated(){
      this.loadList();
    },
  }
  export default vm;
</script>
