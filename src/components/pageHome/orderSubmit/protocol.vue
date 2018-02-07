<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="退换货须知" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div style="padding: 0.2rem;background-color: #fff">
      <div v-html="pl"></div>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {getStore} from '../../../config/mUtils'
  import {baseHttp,formatDate,isEmptyObject} from '../../../config/env'
  const vm= {
    data() {
      return {
        pl:'',
      }
    },
    mounted(){
      this.getprotocol();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      getprotocol(){
        const that = this;
        baseHttp(this, '/api/system/help?helpId=1', {}, 'get', '获取中...', function (data) {
          that.pl=data.contents
        })
      }
    },
  }
  export default vm;
</script>
<style>

</style>
