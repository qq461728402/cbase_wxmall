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
                :compress="70"
                inputAccept="image/*"
                :url="uploadURL">
          <img :src="customerinfo.avatar" class="messimg" style="height: 0.8rem;width: 0.8rem" >
        </vue-core-image-upload>
        </div>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">真实姓名：</span>
        <yd-input slot="right" placeholder="请输入真实姓名" v-model="customerinfo.customerNickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input slot="right"  placeholder="请输入昵称" v-model="customerinfo.customerNickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right"  placeholder="请输入手机号码" v-model="customerinfo.customerPhone"  :show-clear-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性别：</span>
        <div slot="right">
          <yd-radio-group v-model="customerinfo.customerGender" color="#F00">
            <yd-radio val="男"><span>男</span></yd-radio>
            <yd-radio val="女"><span>女</span></yd-radio>
            <yd-radio val="保密"><span>保密</span></yd-radio>
          </yd-radio-group>
        </div>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button  size="large" type="primary" style="background-color: #d41d0f; margin: auto;width: 80%;margin-top: 20px;font-size: .3rem;" @click.native="repInfo">修改</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,uploadURL} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'customerinfo'
      ])
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    data() {
      return {
        radio5:'',
        uploadURL:uploadURL,
        tag:{tag:'repUserInfo'},
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
            this.customerinfo.avatar=res.result[0].url;
            this.customerinfo.mediaId=res.result[0].id;
          }
        }
      },
      /*获取用户信息*/
      getuserInfo(){
        const  that =this;
        baseHttp(this,'/api/personal/info',{},'get','',function (data){
          if(data){
            this.$store.dispatch('getCustomerInfo', data.info);



            that.$store.dispatch('setUserInfo',data.info);
          }
        })
      },
      /*修改个人信息*/
      repInfo(){
        baseHttp(this,'/api/personal/info/update',this.customerinfo,'post','修改中...',data=> {
          this.$dialog.toast({
            mes: '修改成功!',
            timeout: 1000,
            icon: 'success',
            callback: ()=> {
                this.getuserInfo();
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
