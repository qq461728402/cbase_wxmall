<template>
  <yd-layout id="reperInfo">
    <yd-navbar slot="navbar" title="修改用户信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group style="margin-top: 0.1rem">
      <yd-cell-item>
        <span slot="left">头像：</span>
        <div slot="right">
          <vue-core-image-upload
            inputOfFile="file"
            :credentials="false"
            :crop="false"
            :data="tag"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            url="https://www.cqssqm.com/api/file/upload">
            <img :src="userInfo.avatar" class="messimg" style="height: 0.8rem;width: 0.8rem" >
          </vue-core-image-upload>
        </div>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">真实姓名：</span>
        <yd-input slot="right" placeholder="请输入真实姓名" v-model="userInfo.name"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input slot="right"  placeholder="请输入昵称" v-model="userInfo.nickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" readonly  placeholder="请输入手机号码" v-model="userInfo.phone" disabled :show-clear-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性别：</span>
        <div slot="right">
          <yd-radio-group v-model="userInfo.sex" color="#F00">
            <yd-radio val="1"><span>男</span></yd-radio>
            <yd-radio val="0"><span>女</span></yd-radio>
            <yd-radio val="2"><span>保密</span></yd-radio>
          </yd-radio-group>
        </div>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button  size="large" type="primary" style="background-color: #d41d0f; margin: auto;width: 80%;margin-top: 20px;font-size: .3rem;" @click.native="repInfo">修改</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  const vm= {
    data() {
      return {
        userInfo:{},
        radio5:'',
        tag:{tag:'repUserInfo'},
      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    activated(){
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getuserInfo();
      }
    },
    mounted(){

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      imageuploaded(res) {
        if (res.code == 200) {
          if(res.result&&res.result.length>0){
            this.userInfo.avatar=res.result[0].url;
            this.userInfo.mediaId=res.result[0].id;
          }
        }
      },
      /*获取用户信息*/
      getuserInfo(){
        const  that =this;
        baseHttp(this,'/api/personal/info',{},'get','',function (data){
          if(data){
            that.userInfo=data.info;
          }
        })
      },
      /*修改个人信息*/
      repInfo(){
        const  that =this;
        baseHttp(this,'/api/personal/info/update',this.userInfo,'post','修改中...',function (data) {
          that.$dialog.toast({
            mes: '修改成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
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
  .messimg{
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
</style>
<style>
  #reperInfo .yd-flexbox-item.mess_2.yd-flexbox-item-center{
    height:1.2rem;
    padding-left: .3rem;
  }
  #reperInfo .yd-flexbox.mess_3.yd-flexbox-vertical{
    padding-top: 0.15rem;
  }
  #reperInfo .yd-cell-left{
    width: 1.8rem;
  }
  #reperInfo .yd-cell:after{
    border-bottom: none;
  }
</style>
