<template>
  <yd-layout id="binding">
    <yd-navbar slot="navbar" title="会员卡绑定" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <p class="car_title">{{$store.state.basicStorage.title}}</p>
    <yd-cell-group style="margin: 0.2rem" :title="!isregister ?'请输入会员卡信息完成绑定':'请输入您的信息,验证手机号,完成开卡。'">
      <yd-cell-item v-if="isregister">
        <span slot="left">姓名</span>
        <yd-input slot="right" v-model="name" placeholder="请输入姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证</span>
        <yd-input slot="right" v-model="idNum" ref="idNum" regex="(^\d{15}$)|(^\d{17}([0-9]|X)$)" placeholder="请输入身份证"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号</span>
        <yd-input type="number" slot="right" ref="mobile" v-model="mobile" placeholder="请输入手机号码"></yd-input>
        <!-- ↓↓关键代码是这里↓↓ -->
        <yd-sendcode slot="right"
                     v-model="start1"
                     @click.native="sendCode1"
                     type="warning"
        ></yd-sendcode>
        <!-- ↑↑关键代码是这里↑↑ -->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">验证码</span>
        <yd-input slot="right" type="number" v-model="verifyCode" placeholder="请输入验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item  v-if="!isregister">
        <span slot="left">选择卡号</span>
         <div slot="right" style="width: 100%;text-align: left" id="carNO" v-if="carlist.length>0">
           <yd-radio-group v-model="cardno">
            <p v-for="item in carlist" ><yd-radio :val="item"></yd-radio></p>
           </yd-radio-group>
         </div>
      </yd-cell-item>
    </yd-cell-group>
    <div class="login_2">
        <yd-checkbox v-model="isdeal" color="#F00" size="16"><span style="line-height: 16px;font-size: 0.28rem">同意</span></yd-checkbox><span style="color:#d41d0f;font-size: 14px">《重百新世纪会员卡使用手册》</span>
    </div>
    <div style="text-align: center;margin-top: 0.6rem">
      <yd-button @click.native="gotoreg" style="background-color: #f44;width: 80%;height: 1rem;font-size: .3rem">{{isregister?'新会员注册':'会员卡绑定'}}</yd-button>
    </div>
    <div class="login_2" style="text-align: center">
      <label class="login_3"><a class="login_4" @click="isregister=!isregister">{{isregister==true?'已有会员卡去绑定':'新会员注册'}}</a><br>
        </span>
      </label>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '@/config/env'
  import isArray from 'lodash/isArray'
  const vm= {
    data() {
      return {
        name:'',//用户名称
        idNum:'',//身份证号
        mobile:'',//手机号码
        verifyCode:'',//验证码
        isregister:true,
        start1: false,
        isdeal:true,
        selectCarNo:'1',
        cardno:'',
        carlist:[],
      }
    },
    mounted(){
    },
    methods:{
      sendCode1() {
        const idNum = this.$refs.idNum;
        const mobile =this.$refs.mobile;
        if(this.idNum.length==0 || idNum.valid==false){
          this.$dialog.toast({
            mes: '请输入正确身份证号',
            timeout: 1000
          });
          return;
        }else if (this.mobile.length==0 ||mobile.vaild==false){
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }
        baseHttp(this,'/api/customer/sendSms',{'method':this.isregister?'SendSmsCreate':'SendSmsBand','mobile':this.mobile,'idNum':this.idNum,'ppid':'0'},'post','发送中...', data=>{
          this.$dialog.toast({
            mes: '发送成功!',
            timeout: 1000,
            icon: 'success'
          });
          if(this.isregister==false){
            if (isArray(data.msg)){
                this.carlist=data.msg;
            }else{
              this.carlist=data.msg.split(',');
            }
            if (this.carlist.length>0){
              this.cardno=this.carlist[0];
            }
          }
          this.start1 = true;
        });
      },
      gotoreg(){
        if (this.isregister){
          this.registers();
        }else{
          this.binds();
        }
      },
      registers(){
        const idNum = this.$refs.idNum;
        const mobile =this.$refs.mobile;
        if (this.name.length==0){
          this.$dialog.toast({
            mes: '请输入姓名',
            timeout: 1000
          });
          return;
        }else  if(this.idNum.length==0 || idNum.valid==false){
          this.$dialog.toast({
            mes: '请输入正确身份证号',
            timeout: 1000
          });
          return;
        }else if (this.mobile.length==0 ||mobile.vaild==false){
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
        else if(this.verifyCode.length==0){
          this.$dialog.toast({
            mes: '请输入验证码',
            timeout: 1000
          });
          return;
        }
        baseHttp(this,'/api/customer/register',{'name':this.name,'mobile':this.mobile,'idNum':this.idNum,'verifyCode':this.verifyCode,'ppid':'0','publicid':'0'},'post','注册中...', data=>{
            if (data &&data.code==200){
              this.$dialog.toast({
                mes: '注册成功!请绑定会员卡',
                timeout: 1000,
                icon: 'success'
              });
            }
        })
      },
      binds(){
        const idNum = this.$refs.idNum;
        const mobile =this.$refs.mobile;
        if(this.idNum.length==0 || idNum.valid==false){
          this.$dialog.toast({
            mes: '请输入正确身份证号',
            timeout: 1000
          });
          return;
        }else if (this.mobile.length==0 ||mobile.vaild==false){
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
        else if(this.verifyCode.length==0){
          this.$dialog.toast({
            mes: '请输入验证码',
            timeout: 1000
          });
          return;
        }
        baseHttp(this,'/api/customer/bind',{'mobile':this.mobile,'idNum':this.idNum,'verifyCode':this.verifyCode,'cardno':this.cardno,'ppid':'0','publicid':'0'},'post','绑定中...', data=>{
          if (data &&data.code==200){
            this.$dialog.toast({
              mes: '绑定会员卡成功',
              timeout: 1000,
              icon: 'success',
              callback:()=>{
                this.gotoback();
              }
            });
          }
        })
      },
      gotoback(){
        this.$router.go(-1);
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .car_title{
    line-height: 0.8rem;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.6rem 0;
    color:#d41d0f;
    font-weight: 500
  }
  .login_2{
    margin-top: 0.5rem;
    padding:0px 10px;
  }
  .login_3{
    font-size: .3rem;
  }
  .login_4{
    color: #d41d0f;
  }
</style>
<style>
  #binding .yd-cell-title{
    color: #5da368;
    font-size: 0.25rem;
  }
  #binding .yd-cell-left{
    width: 80px;
  }
  #binding .yd-checkbox{
    padding-right: 0px;
  }
  #carNO p{
    padding: 0.1rem 0.1rem;
  }
</style>
