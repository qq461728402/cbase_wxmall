<template>
  <yd-layout id="addresslist">
    <yd-navbar slot="navbar" title="收货地址列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="listItem" v-for="items,index in data.address" :key="index">
      <div class="item" :class="{'default':items.default==1}">
        <div class="addressinfo">
          <p style="font-size: 0.3rem">
            {{items.lastName}}
            <span class="tel">{{items.phonePrimary}}</span>
            <span class="defaulticon" v-if="items.default==1">默认</span>
          </p>
          <p style="font-size: 0.25rem">{{items.addressCityName+' '+items.addressStateName+' '+items.addressDistrictName+' '+items.addressStreet}}</p>
        </div>
        <img src="../../assets/img/edit.png" @click.stop="gotorap(items)">
      </div>
    </div>
    <yd-button slot="tabbar" size="large" type="primary" color="#fff" bgcolor="#d41d0f" @click.native="gotoadd()" class="list_1">新增收货信息</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  const vm= {
    data() {
      return {
        data:{},
        isCookie:getStore("token").length>0?true:false,
      }
    },
    mounted(){

    },
    activated(){
      this.addressList();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      addressList(){
        const  that =this;
        baseHttp(this,'/api/order/addressList',{},'get','加载中...',function (data) {
          that.data=data;
        });
      },
      //添加收货地址
      gotoadd(){
        this.$router.push({name:'addAddress',query:{'ismaintain':'1'}});
      },
      //修改收货地址
      gotorap(item){
        this.$router.push({name:'addAddress',query:{'ismaintain':'2','addressId':item.addressId}});
      },
      /*选择地址*/
      setDefault(item){
        const  that =this;
        var par={};
        par.isDeafult=1;
        par.addressId=item.addressId;
        baseHttp(this, 'updateAddressAPI', par, 'post', '选择中...', function (data) {
          that.$dialog.toast({
            mes: '选择成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
                that.gotoback();
            }
          });
        })
      },

    },

  }
  export default vm;
</script>
<style>
  #addresslist .yd-cell-left{
    width: 2rem;
    white-space:normal;
  }
  #addresslist .list_1.yd-btn-block{
    font-size: .3rem;
    width: 80%;
    left: 10%;
    bottom: 10px;
    font-size: .3rem;
    border-radius: 3px;
  }
</style>
<style scoped>
  .listItem {
    background: #eee;
    width: 100%;
    max-width: 750px
  }

  .listItem .item {
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    margin-top: 5px;
    padding: 15px 16px;
    position: relative
  }

  .listItem .item:first-child {
    margin-top: 0
  }

  .listItem .item .addressinfo {
    width: 84%;
    position: relative;
    padding-right: 15px
  }

  .listItem .item .addressinfo p:first-child {
    padding-bottom: 5px
  }

  .listItem .item .addressinfo p .tel {
    padding: 0 10px 0 15px
  }

  .listItem .item .addressinfo p .defaulticon {
    border: 1px solid #d41d0f;
    border-radius: 2px;
    padding: 2px 5px;
    color: #d41d0f;
    font-size: 0.2rem
  }

  .listItem .item .addressinfo p:last-child {
    font-size: 13px;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    color: #666
  }

  .listItem .item .addressinfo::after {
    content: "";
    position: absolute;
    height: 27px;
    width: 1px;
    background: #e3e3e3;
    right: 0;
    top: 50%;
    margin-top: -13.5px
  }

  .listItem .item img {
    width: 22px;
    position: absolute;
    right: 6%;
    top: 35%
  }

  .listItem .item.default {
    padding: 20px 16px;
    border: 0
  }

  .listItem .item.default::before, .listItem .item.default::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    background: url('../../assets/img/linedownv1.png') no-repeat;
    background-size: 100%;
    bottom: 0;
    left: 0;
    z-index: 2;
    max-width: 750px
  }

  .listItem .item.default::after {
    background: url('../../assets/img/lineupv1.png') no-repeat;
    background-size: 100%;
    top: 0;
    max-width: 750px
  }
</style>
