<template>
  <yd-layout id="userInfo">
    <yd-navbar slot="navbar" title="用户信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">当前登录账号</span>
      </yd-cell-item>
      <ul class="news" @click="gotorep">
        <li class="link">
          <yd-flexbox>
            <div class="mess_1">
              <img :src="userInfo.avatar" class="messimg" >
            </div>
            <yd-flexbox-item class="mess_2">
              <yd-flexbox direction="vertical" class="mess_3">
                <yd-flexbox-item><span class="name">姓名：{{userInfo.name}}</span></yd-flexbox-item>
                <yd-flexbox-item><div class="title">手机：{{userInfo.phone}}</div></yd-flexbox-item>
              </yd-flexbox>
            </yd-flexbox-item>
            <div class="yd-cell-arrow">
            </div>
          </yd-flexbox>
        </li>
      </ul>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item arrow type="a" @click.native="repaddress()">
        <span slot="left">收货地址设置</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" @click.native="repcarInfo()" v-if="1==2">
        <span slot="left">车辆信息设置</span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-button  v-if="1==2" size="large" type="primary" style="background-color: #d41d0f; margin: auto;width: 80%;margin-top: 20px;font-size: .3rem;" @click.native="loginout">退出登录</yd-button>
  </yd-layout>

</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
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
      imageuploaded(res) {
        alert('111');
        console.log(res);
        if (res.errcode == 0) {
          this.src = res.data.src;
        }
      },
      /*收货地址*/
      repaddress(){
        this.$router.push({name:'addressList'});
      },
      /*车辆信息*/
      repcarInfo(){
        this.$router.push({ name: 'carchoose'})
      },
      /*修改用户信息*/
      gotorep(){
        this.$router.push({name:'reperUserInfo'});
      },
      /*退出登录*/
      loginout(){
        const  that =this;
        baseHttp(this,'/api/customer/logout',{},'post','正在退出...',function (data) {
          that.$dialog.toast({
            mes: '退出成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              removeStore("userInfo");
              removeStore("carInfo");
              that.$router.go(-1);
            }
          });
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .news{
    background-color: #FFFFFF;
  }
  .link{
    padding: .3rem;
    /*border-bottom: 1px solid #D9D9D9;*/
  }

  .mess_1{
    overflow:hidden;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 100%;
  }
  .messimg{
    border-radius: 50%;
    width: 100%;
    height:100%;
  }

  .name{
    font-size: 0.3rem;
    color: #6e6f70;
  }
  .title{
    color: #6e6f70;
    font-size: 0.3rem;
    line-height: 0.5rem;

  }
</style>
<style>
  #userInfo .yd-cell:after{
    border-bottom: none;
  }
  #userInfo  .yd-flexbox-item.mess_2.yd-flexbox-item-center{
    height:1.2rem;
    padding-left: .3rem;
  }
  #userInfo .yd-flexbox.mess_3.yd-flexbox-vertical{
    padding-top: 0.15rem;
  }
</style>
