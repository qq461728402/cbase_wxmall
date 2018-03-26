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
    <div class="noProduct" v-if="items.length==0&&showNoProduct==true">
      <img src="../../../assets/img/groups.png">
      <p>暂无团购项目</p>
    </div>
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
        showNoProduct:false,
      }
    },
    mounted(){
      this.loadList();
    },
    methods: {
      loadList() {
        const that = this;
        baseHttp(this, '/api/promotion/list', {'promotionType': 'GROUPON'}, 'get', '加载中...', function (data) {
          if(data.promotions) {
            that.items =data.promotions ;
          }
          that.showNoProduct=true;
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
<style scoped>
  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }

  .noProduct img {
    width: 70px;
    height: 70px
  }

  .noProduct p {
    font-size: 13px;
    color: #666;
    line-height: 40px
  }

  .noProduct a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }
</style>
