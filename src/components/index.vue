<template>
  <yd-layout>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" link="/home" :active="'/home'==currentPath">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" link="/category" :active="'/category'==currentPath">
        <yd-icon slot="icon" size="0.54rem" name="fenlei1" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" type="a" @click.native="gotoCars()" :active="'/shoppingCart'==currentPath">
        <yd-icon name="gouwuche" slot="icon" size="0.54rem" custom></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="quantity!=0" style="background-color: #d41d0f;">{{quantity}}</yd-badge>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="/personalCenter" :active="'/personalCenter'==currentPath">
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../config/env'
  import {setStore, getStore} from '../config/mUtils'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'quantity',
      ])
    },
    data() {
      return {
        currentPath:'',
      }
    },
    mounted(){
      this.currentPath=this.$route.path;
      this.getCartsQuantity();
      this.getuserInfo();
    },
    methods:{
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity>=0){
            that.$store.dispatch('setQuantity',data.quantity);
          }
        })
      },
      /*获取用户信息*/
      getuserInfo(){
        const  that =this;
        baseHttp(this,'/api/personal/info',{},'get','',function (data) {
          if(data){
            that.$store.dispatch('setUserInfo',data.info);
          }
        })
      },
      gotoCars(){
        this.$router.push({name:'shoppingCart'});
      },
    },
    watch:{
      $route(to,from){
        if(to.name=='/home'||to.name=='/category'||to.name=='/shoppingCart'||to.name=='/personalCenter'){
          this.getCartsQuantity();
        }
        this.currentPath=this.$route.path;
      }
    }
  }
  export default vm;
</script>
<style>

</style>
