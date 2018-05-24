<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="大客户经理" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-accordion>
      <yd-accordion-item :title='greatcustomer.storeName' v-for="greatcustomer,index in greatcustomerList" :key="index" @click.native="getManagers(greatcustomer,index)" :ref="'accordion'+index">
        <div style="padding: .24rem;">

        </div>
      </yd-accordion-item>
    </yd-accordion>

  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp} from '@/config/env'
  const vm= {
    data() {
      return {
          greatcustomerList:[],
      }
    },
    mounted(){
        this.storelist();
    },
    methods:{
      storelist(){
        baseHttp(this, '/api/store/list',{},'get', '加载中...', data=> {
            if (data&&data.stores){
              data.stores.forEach(item =>{
                item.getManagers=[];
                item.isOpen=false;
              })
                this.greatcustomerList=data.stores;
            }
        })
      },
      getManagers(greatcustomer,index){



        greatcustomer.isOpen=!greatcustomer.isOpen;
        for (var i=0;i<greatcustomer.length;i++){
          eval('this.$refs.accordion'+i+'[0].closeItem()');
        }
        if ( greatcustomer.isOpen==false){
          eval('this.$refs.accordion'+index+'[0].openItem()');

        }
      },
      gotoback(){
        this.$router.go(-1);
      },
    },
  }
  export default vm;
</script>
<style>
  .yd-accordion-head:after{
    border-bottom: 1px solid #f5f5f5;
  }
</style>
