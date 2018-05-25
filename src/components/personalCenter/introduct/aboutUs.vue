<template>
  <yd-layout style="background-color: white">
    <yd-navbar slot="navbar" title="关于" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
     <div v-html="html"></div>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import { mapGetters} from 'vuex'
  const vm = {
    computed: {
      ...mapGetters([
        'storeinfo'
      ])
    },
    data() {
      return {
        html:'',
      }
    },
    mounted(){
      var baseInfo=this.$store.getters.baseInfo;
      this.html=this.storeinfo.storeDesc;
    },
    methods: {
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
