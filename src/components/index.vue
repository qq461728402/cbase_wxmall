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
  const vm= {
    data() {
      return {
        quantity:0,
        currentPath:'',
        isCookie:getStore("token").length>0?true:false
      }
    },
    mounted(){
      this.currentPath=this.$route.path;
      if(this.isCookie==true){
          this.getCartsQuantity();
      }
    },
    methods:{
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity)that.quantity = data.quantity;
        })
      },
      gotoCars(){
        if (this.isCookie==true){
          this.$router.push({name:'shoppingCart'});
        }else{
          this.$router.push({ name: 'loginWithCode'})
        }
      },
    },
    watch:{
      $route(to,from){
        if(this.isCookie==true){
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
