<template>
  <yd-layout id="addAddress">
    <yd-navbar slot="navbar" title="收货地址" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">收货人姓名</span>
        <yd-input slot="right" v-model="addressInfo.receiver" ref="username"  placeholder="请输入收货人姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号</span>
        <yd-input slot="right" v-model="addressInfo.phone" ref="mobile"  regex="mobile" placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">所在地区</span>
        <input slot="right" type="text" style="padding: 0px;
    margin-bottom: 0px;" @click.stop="show1 = true" v-model="model1" readonly placeholder="请选择所在地区">
      </yd-cell-item>
      <yd-cityselect v-model="show1" :callback="result1" :items="areas" :ready="ready"  ref="cityselectDemo"></yd-cityselect>
      <yd-cell-item>
        <span slot="left">详细地址</span>
        <yd-textarea slot="right"  placeholder="请输入详细地址" maxlength="100" v-model="addressInfo.detail" ></yd-textarea>
      </yd-cell-item>

      <yd-cell-item type="label">
        <div slot="left">设为默认地址</div>
        <yd-switch slot="right" v-model="addressInfo.isDeafult" color="#d41d0f"></yd-switch>
      </yd-cell-item>

    </yd-cell-group>
    <yd-button slot="tabbar" size="large" type="primary" color="#fff" bgcolor="#d41d0f" @click.native="save()" class="address_1">保存并使用</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  const vm= {
    data() {
      return {
        addressInfo:{detail:''},
        maintain:'',//判断是不是维护 1 不是 2 是
        addressId:'',
        username:'',
        mobile:'',
        show1: false,
        model1: '',
        ready:false,
        areas:[],
        ydswitch: false,
      }
    },
    mounted(){
      this.getarea();
      this.maintain =this.$route.query.ismaintain;
      if(this.maintain==2){
        this.addressId=this.$route.query.addressId;
        this.getDetail();
      }else{
        this.addressInfo={detail:''};
        this.model1='';
      }

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      result1(ret) {
        this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
        this.addressInfo.state=ret.itemValue1;
        this.addressInfo.stateName=ret.itemName1;
        this.addressInfo.city=ret.itemValue2;
        this.addressInfo.cityName=ret.itemName2;
        this.addressInfo.districtName=ret.itemName3;
        this.addressInfo.district=ret.itemValue3;
      },
      getarea(){
        const  that =this;
        baseHttp(this,'/api/city/areas',{},'get','',function (data) {
          that.areas=data.areas
          that.ready=true;
        })
      },
      getDetail(){
        const  that =this;
        baseHttp(this, '/api/personal/addr',{'addressId':this.addressId}, 'get', '加载中...', function (data) {
          that.addressInfo=data.addr;
          if(that.addressInfo.isDeafult==1){
            that.addressInfo.isDeafult=true;
          }else{
            that.addressInfo.isDeafult=false;
          }
          that.model1=data.addr.stateName+' '+data.addr.cityName+' '+data.addr.districtName;
        })
      },
      //提交订单
      save() {
        const input = this.$refs.mobile;
        //判断条件
        if(this.addressInfo.receiver.length==0){
          vues.$dialog.toast({mes: '请输入收货人姓名!', timeout: 1000});
          return;
        }else if(this.addressInfo.phone.length==0||input.valid==false){
          this.$dialog.toast({mes: '请输入正确手机号', timeout: 1000});
          return;
        }
        else if(this.model1.length==0){
          this.$dialog.toast({mes: '请选择所在地区', timeout: 1000});
          return;
        }
        else if(this.addressInfo.detail.length==0){
          this.$dialog.toast({mes: '请输入详细地址', timeout: 1000});
          return;
        }
        this.addressInfo.isDeafult==true?this.addressInfo.isDeafult=1:this.addressInfo.isDeafult=0;
        if(this.maintain==2){
          this.rperAddress();
        }else{
          this.addAddress();
        }
      },
      //修改地址
      rperAddress(){
        this.addressInfo.addressId=this.addressId;
        const that =this;
        baseHttp(this, '/api/personal/addr/update', this.addressInfo, 'post', '修改中...', function (data) {
          that.$dialog.toast({
            mes: '修改成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.$router.go(-1);
            }
          });
        })
      },
      //添加地址
      addAddress(){
        const  that =this;
        baseHttp(this, '/api/personal/addr/add', this.addressInfo, 'post', '添加中...', function (data) {
          that.$dialog.toast({
            mes: '添加成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.$router.go(-1);
            }
          });
        })
      }
    },
  }
  export default vm;
</script>
<style>
  #addAddress .yd-cell-left{
    width: 2rem;
    white-space:normal;
  }
  #addAddress .yd-btn, .yd-btn-block{
    border-radius: 0px;
  }
  #addAddress button.address_1.yd-btn-block{
    font-size: .3rem;
    width: 80%;
    left: 10%;
    bottom: 10px;
    font-size: .3rem;
    border-radius: 3px;
  }
</style>
