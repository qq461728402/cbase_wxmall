<!--验证码登陆-->
<template>
  <yd-layout class="login">
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--<transition>-->
      <!--<router-view></router-view>-->
    <!--</transition>-->
    <yd-navbar slot="navbar" title="登录" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group class="login_1" v-if="iscodelogin==true">
      <yd-cell-item>
        <span slot="left">手机号</span>
        <yd-input slot="right" regex="mobile" ref="customerPhone" v-model="loginpas.customerPhone"  max="20" placeholder="请输入手机号"></yd-input>
        <yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" type="warning" run-str="{%s}s" init-str="获取验证码" reset-str="重新获取" style="min-width:1.5rem"></yd-sendcode>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">验证码</span>
        <yd-input slot="right" type="password" v-model="loginpas.validateCode" placeholder="请输入验证码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group class="login_1" v-else>
      <yd-cell-item>
        <span slot="left">手机号</span>
        <yd-input slot="right" regex="mobile" ref="customerPhone" v-model="loginpas.customerPhone"  max="20" placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码</span>
        <yd-input slot="right" type="password" v-model="loginpas.Password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <div class="login_2">
      <label class="login_3"><a class="login_4" @click="gotoprotocol">《用户协议》</a><span>没有账号 <a @click="gotoref" class="login_4">请注册</a></span>
      </label>
    </div>
    <yd-button size="large" type="primary" class="login_5" @click.native="login">登 录</yd-button>

    <div style="padding-bottom: 10px"></div>
    <div class="login_2">
      <label class="login_3"><span>{{iscodelogin==false?'记不住密码?':'收不到验证码?'}}</span><a class="login_4" @click="iscodelogin=!iscodelogin">{{iscodelogin==false?'请用短信登录':'请用密码登录'}}</a><br>
        </span>
      </label>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../config/env'
  import {setStore,getStore} from '../../config/mUtils'
  import md5 from 'js-md5'
  const vm= {
    data() {
      return {
        isCookie:false,
        iscodelogin:true,
        loginpas:{},
        start1: false,//发送验证码
        id:'',
      }
    },
    methods:{
        gotoback(){
            this.$router.go(-1);
        },
      sendCode1() {
        const input = this.$refs.customerPhone;
        if(this.loginpas.customerPhone==undefined||this.loginpas.customerPhone==0){
          this.$dialog.toast({
            mes: '请输入手机号',
            timeout: 1000
          });
          return;
        }else if(this.loginpas.customerPhone!=0&& input.valid==false){
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }
        const that =this;
        baseHttp(this,'/api/customer/sendMessage',{'customerPhone':this.loginpas.customerPhone},'post','发送中...',function (data) {
          that.$dialog.toast({
            mes: '发送成功!',
            timeout: 1000,
            icon: 'success'
          });
          that.start1 = true;
        });
      },
      login(){
        if(this.iscodelogin==true){
            this.loginWithCodes();
        } else{
            this.loginWithPass();
        }
      },
      loginWithCodes(){
        const input = this.$refs.customerPhone;
        if(this.loginpas.customerPhone==undefined||this.loginpas.customerPhone==0){
          this.$dialog.toast({
            mes: '请输入手机号',
            timeout: 1000
          });
          return;
        }else if(this.loginpas.customerPhone!=0&& input.valid==false){
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }else if (this.start1==false){
          this.$dialog.toast({
            mes: '请获取验证码',
            timeout: 1000
          });
          return;
        }
        else if(this.loginpas.validateCode==undefined){
          this.$dialog.toast({
            mes: '请输入验证码',
            timeout: 1000
          });
          return;
        }
        const  that=this;
        baseHttp(this,"/api/customer/logWithCode",this.loginpas,'post','登录中...',function (data) {
          that.$dialog.toast({
            mes: '登录成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              if(data.car){
                if(data.car.type){
                  setStore('carInfo',data.car);
                }
              }
              setStore('userInfo',data);
              that.$router.go(-1);
            }
          });
        });
      },
      loginWithPass(){
        const  that =this;
        const input = this.$refs.customerPhone;
        if(this.loginpas.customerPhone==undefined||this.loginpas.customerPhone==0){
          this.$dialog.toast({
            mes: '请输入手机号',
            timeout: 1000
          });
          return;
        }else if(this.loginpas.customerPhone!=0&& input.valid==false){
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }
        else if(this.loginpas.Password==undefined){
          this.$dialog.toast({
            mes: '请输入密码',
            timeout: 1000
          });
          return;
        }
        this.loginpas.customerPassword= md5(this.loginpas.Password);
        baseHttp(this,'/api/customer/login',this.loginpas,'post','登录中...',function (data) {
          that.$dialog.toast({
            mes: '登录成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              if(data.car){
                if(data.car.type){
                  setStore('carInfo',data.car);
                }
              }
              setStore('userInfo',data);
              that.$router.go(-1);
            }
          });
        });
      },
      gotoref(){
        this.$router.push({ name: 'register', params: { userId: 123 }})
      },
      gotoprotocol(){
        this.$router.push({ name: 'userProtocol',params:{us:10000}})
      },
      gotogo(){

      },
      gotologin(){

      },
      fetchDate(to,from){
        console.log(to);
        console.log(from);
       this.id= from.params.us;
      },
      activated(){
        //根据key名获取传递回来的参数，data就是map
        eventBus.$on('choiceHospital', function(data){
          //赋值给首页的附近医院数据模型
          this.nearestOrg = data;
        }.bind(this));
      },
    },
    mounted(){
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if (this.isCookie==true){
        this.$router.go(-1);
      }
    },
    watch: {
      "$route": "fetchDate"
    },

  }
  export default vm;
</script>
<style scoped>
  .login_2{
    padding:0px 10px;
  }
  .login_3{
    font-size: .3rem;
  }
  .login_4{
    color: #00B4FF;
  }
  .login_1{
    margin-top: 10px;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .5s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
<style>
  .login .yd-cell-left{
    width: 2rem;
    white-space:normal;
  }

  .login button.login_5.yd-btn-block.yd-btn-primary{
    background-color: #d41d0f;
    margin: auto;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: .3rem;
  }
</style>
