<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="礼品预约" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group style="margin-top: 10px;">
      <yd-cell-item arrow type="a" @click.native="getStoreList()">
        <span slot="left">服务门店</span>
        <span slot="right" class="main_2" v-if="storeName">{{storeName}}</span>
        <span slot="right" class="main_2" v-else>请选择服务门店</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">预约时间</span>
        <span slot="right"> <yd-datetime :start-date="startDate" :end-date="endDate" type="date" v-model="orderDate"></yd-datetime></span>
      </yd-cell-item>


    </yd-cell-group>
    <yd-button slot="tabbar" size="large" type="primary" style="margin: 0 10% 30%;width: 80%;background-color:#d41d0f " @click.native="yy">立即预约</yd-button>
    <yd-popup v-model="exchangeStore" position="bottom" height="60%">
      <div style="height: 1rem;line-height: 1rem;border-bottom: 1px solid #edeeef" slot="top">
        <span style="font-size: 0.3rem;color: #666;padding-left: 0.2rem">选择安装门店</span>
        <div class="close" @click="exchangeStore=false"></div>
      </div>
      <ul class="storeList">
        <li v-for="item,index in stores" @click="selectStore(index)">
          <yd-flexbox>
            <div style="overflow:hidden; padding: 0.15rem;height: 1.8rem;width: 1.8rem">
              <img :src="item.logo" style="height: 1.5rem;width: 1.5rem">
            </div>
            <yd-flexbox-item style="height:1.8rem;width:75%">
              <yd-flexbox direction="vertical" style="padding-top: 0.15rem">
                <yd-flexbox-item><span style="font-size: 0.3rem">{{item.storeName}}</span></yd-flexbox-item>
                <yd-flexbox-item><p style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem;  overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
                  {{item.storeAddress}}</p></yd-flexbox-item>
                <yd-flexbox-item>
                                    <span style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem">评价<span style="color:#ff7d49">{{item.ratesCount?item.ratesCount:'0'}}</span> |总订单<span
                                      style="color:#ff7d49 ">{{item.orderCount?item.orderCount:'0'}}</span></span>
                                    <span style="float: right;margin-right: 0.1rem"> <button :class="{'storeSelectBtn':item.select,'storeNoselectBtn':!item.select}">
                                      {{item.select?'已选择':'选择'}}
                                    </button> </span>
                </yd-flexbox-item>
              </yd-flexbox>
            </yd-flexbox-item>
          </yd-flexbox>
        </li>
      </ul>
    </yd-popup>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
        exchangeStore:false,
        startDate: '',
        endDate: '',
        storeName:'',
        orderDate:'',
        skuId:'',
        itemId:'',
        stores:[],
        merchantId:'',
      }
    },
    mounted(){
      this.skuId = this.$route.query.skuId;
      this.itemId = this.$route.query.itemId;
    },
    methods:{
      gotoback(){
        this.$router.go(-2);
      },
      getStoreList(){
        const that = this;
        if (this.stores.length > 0) {
          this.exchangeStore = !this.exchangeStore;
          return;
        }
        baseHttp(this,'/api/insurance/gift/sotres',{'skuId':this.skuId},'post','加载中...',function (data) {
          if(data.preorderTime){
            var day3 = new Date(data.preorderTime);
            that.startDate= formatDate(day3,'yyyy-MM-dd');
            that.endDate=that.getEndDate(data.preorderTime);
          }
          for (var key in data.stores) {
            data.stores[key].select = false;
          }
          that.stores = data.stores;
          that.$nextTick(function () {
            that.exchangeStore = !that.exchangeStore;
          });
        });
      },
      /*选择门店*/
      selectStore(index){
        for (var key in this.stores) {
          this.stores[key].select = false;
        }
        this.stores[index].select = true;
        this.storeName = this.stores[index].storeName;
        this.merchantId = this.stores[index].id;
        this.exchangeStore = false;
      },

      getAfterTomorrow(){
        var day3 = new Date();
        day3.setTime(day3.getTime() + 0 * 24 * 60 * 60 * 1000);
        return day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();
      },
      getEndDate(value){
        var day3 = new Date(value);
        day3.setTime(day3.getTime() + 32 * 24 * 60 * 60 * 1000);
        return day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();
      },
      yy(){
        if(this.merchantId.length==0){
          this.$dialog.toast({
            mes: '请输入选择服务门店',
            timeout: 1000
          });
          return;
        }else if(this.orderDate.length==0){
          this.$dialog.toast({
            mes: '请输入预约时间',
            timeout: 1000
          });
          return;
        }
        const  that=this;
        baseHttp(this,'/api/insurance/gift/preorder',{'skuId':this.skuId,'itemId':this.itemId,'preorderTime':this.orderDate,'merchantId':this.merchantId},'post','预约中...',function (data) {
          that.$dialog.toast({
            mes: '预约成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.gotoback();
            }
          });

        });
      }
    },
  }
  export default vm;
</script>
<style scoped>
  .storeList {
    background-color: #fff
  }

  .storeList li {
    border-bottom: 1px solid #edeeef
  }

  .storeList li:last-child {
    border-bottom: 0
  }

  .storeSelectBtn {
    background-color: #d41d0f;
    color: #fff;
    border: 0;
    padding: 0 .2rem;
    min-width: .3rem;
    border-radius: .1rem
  }

  .storeNoselectBtn {
    background-color: #fff;
    color: #d41d0f;
    border: 1px solid #d41d0f;
    padding: 0 .2rem;
    min-width: .3rem;
    border-radius: .1rem
  }
</style>
