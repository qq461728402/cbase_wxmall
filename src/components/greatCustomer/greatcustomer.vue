<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="大客户经理" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-accordion>
      <yd-accordion-item :title='greatcustomer.storeName' v-for="greatcustomer,index in greatcustomerList" :key="index" @click.native="getManagers(greatcustomer)" :ref="'accordion'+index">
        <div style="padding: .24rem;">
          <customer :customerlist="greatcustomer.getManagers"></customer>
        </div>
      </yd-accordion-item>
    </yd-accordion>

  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp} from '@/config/env'
  import customer from '@/views/customer'
  const vm= {
    data() {
      return {
          greatcustomerList:[],
      }
    },
    components:{
      customer
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
      getManagers(greatcustomer){
        greatcustomer.isOpen=!greatcustomer.isOpen
        if(greatcustomer.getManagers.length==0&&greatcustomer.isOpen==true){
          baseHttp(this, '/api/store/getManagers',{merchantId:greatcustomer.id},'get', '加载中...', data=> {
            if (data&&data.managers){
              greatcustomer.getManagers=data.managers;
            }
          })
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
