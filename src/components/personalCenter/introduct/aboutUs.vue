<template>
  <yd-layout style="background-color: white">
    <yd-navbar slot="navbar" title="关于新世纪大坪商都" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
     <div v-html="html"></div>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp} from '@/config/env'
  const vm = {
    data() {
      return {
        html:'',
      }
    },
    mounted(){
      this.aboutus();
    },
    methods: {
      aboutus(){
        baseHttp(this,'/api/store/baseInfo',{'merchantId':this.$store.getters.store},'get','',data=>{
          if(data){
            this.html=data;
          }
        })
      },
      gotoback(){
        this.$router.go(-1);
      },
    },

  }
  export default vm;
</script>
<style scoped>
  @import '../../../assets/css/detail.css';
  @import '../../../assets/css/mobile_module.css';
</style>
