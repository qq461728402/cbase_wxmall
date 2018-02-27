<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="车品商城" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {

      }
    },
    mounted(){

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
    },

  }
  export default vm;
</script>
<style>

</style>
