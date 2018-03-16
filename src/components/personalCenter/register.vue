<template>
  <div class="register">
    <yd-navbar slot="navbar" title="注册" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">国家:</span>
        <span slot="right" class="reg_3">中国</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" v-model="customerPhone" ref="customerPhone" regex="mobile" placeholder="+86"></yd-input>
        <!-- ↓↓关键代码是这里↓↓ -->
        <yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" type="warning" run-str="{%s}s" init-str="获取验证码" reset-str="重新获取" style="min-width:1.5rem"></yd-sendcode>
        <!-- ↑↑关键代码是这里↑↑ -->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">验证码：</span>
        <input slot="right" type="number" v-model="message" placeholder="请输入验证码">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <input slot="right" type="password" v-model="password"  placeholder="请输入密码">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认密码：</span>
        <input slot="right" type="password" v-model="rpassword"  placeholder="请再次输入密码">
      </yd-cell-item>
    </yd-cell-group>
    <div class="reg_agreement">收不到短信？<a class="reg_1">语音验证</a></div>
    <yd-button @click.native="regist" size="large" type="primary" class="reg_2">验证并注册</yd-button>
  </div>
</template>
<script type="text/babel">
  import {baseHttp} from '../../config/env'
  import  md5 from 'js-md5'
  const vm= {
    data() {
      return {
        message:'',
        password:'',
        rpassword:'',
        customerPhone:'',//手机号
        start1: false,//发送验证码
      }
    },
    methods: {
      gotoback(){
        this.$router;
        this.$router.go(-1);
      },
      sendCode1() {
        const input = this.$refs.customerPhone;
        if (this.customerPhone.length == 0 || input.valid == false) {
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }
        const that =this;
        baseHttp(this, "/api/customer/sendMessage", {'customerPhone': this.customerPhone}, 'post', '发送中...', function (data) {
          that.$dialog.toast({
            mes: '发送成功!',
            timeout: 1000,
            icon: 'success'
          });
          that.start1 = true;
        });
      },
      regist(){
        if (this.start1 == false) {
          this.$dialog.toast({
            mes: '请获取验证码',
            timeout: 1000
          });
          return;
        } else if (this.message.length == 0) {
          this.$dialog.toast({
            mes: '请输入验证码',
            timeout: 1000
          });
          return;
        } else if (this.password.length == 0) {
          this.$dialog.toast({
            mes: '请输入密码',
            timeout: 1000
          });
          return;
        }
        else if (this.password != this.rpassword) {
          this.$dialog.toast({
            mes: '确认密码错误',
            timeout: 1000
          });
          return;
        }
        const  that =this;
        baseHttp(this, "/api/customer/regist", {'customerPhone': this.customerPhone, 'message': this.message, 'customerPassword': md5(this.password)}, 'post', '注册中...', function (data) {
          that.$dialog.toast({
            mes: '注册成功!',
            timeout: 1000,
            icon: 'success',
            callback: function () {
              that.$router.go(-1);
            }
          });
        });
      },
    },
    mounted(){

    },
  }
  export default vm;
</script>
<style scoped>
  .register{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background-color: #fff;
  }
  .reg_agreement{margin:0.6rem 0 0;text-align: center;color:#999}
  div.reg_agreement{
    font-size: .3rem;
  }
  a.reg_1{
    color: #00B4FF;
  }
  span.reg_3{
    font-size: .3rem;
  }
</style>
<style>
  .register .yd-cell-left{
    width: 1.6rem;
    white-space:normal;
  }
  .register .yd-input{
    width: 66%;
  }
  .register button.reg_2.yd-btn-block.yd-btn-primary{
    background-color: #d41d0f;
    margin: auto;width: 80%;
    margin-top: 20px;
    font-size: .3rem;
  }
</style>
