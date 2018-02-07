<template>
  <yd-layout id="insurancesure">
    <yd-navbar slot="navbar" title="险种确认" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">车辆信息选择</span>
        <span slot="right">{{data.brand}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 10px" v-if="data.fees" title="保险信息">
      <yd-cell-item v-for="item,index in data.fees" :key="index">
        <span slot="left">{{item.xzmc}}</span>
        <span slot="right" style="color: red">{{item.bf}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group style="margin-top: 10px" title="收货地址" @click.native="gotoAddressList()">
      <div style="padding: 0.2rem" v-if="defelutaddress.lastName">
        <span style="line-height: 0.3rem;font-size: 0.25rem">{{defelutaddress.lastName}}&nbsp;</span><span style="line-height: 0.3rem;font-size: 0.25rem">{{defelutaddress.phonePrimary}}</span> <span style="border:1px solid #d41d0f;border-radius: 2px;padding: 2px 5px;color: #d41d0f;font-size: 0.2rem">默认</span>
        <p class="areaInfo">{{defelutaddress.addressStateName+defelutaddress.addressCityName+ defelutaddress.addressDistrictName+ defelutaddress.addressStreet}}</p>
        <span class="yd-cell-arrow" style="position: absolute;top: 53%;right: 15px;"></span>
      </div>
      <div v-else>
        <p class="noaddressInfo">请设置地址</p>
        <span class="yd-cell-arrow" style="position: absolute;top: 53%;right: 15px;"></span>
      </div>
    </yd-cell-group>

    <yd-cell-group style="margin-top: 10px" v-if="data.fees" title="选择礼包">
      <ul class="bg_ul">
        <li v-for="item,index in giftlist" :key="index" @click="selectgifs(item,index)">
          <label class="yd-checkbox yd-checkbox-circle"><span class="yd-checkbox-icon" :class="{'selectyd-checkbox-icon':item.select==true}" style="width: 20px; height: 20px; color: rgb(255, 0, 0);"> <i style="width: 6px; height: 12px;"></i></span><span class="yd-checkbox-text" style="font-size: 0.2rem;line-height:20px">{{item.name}}</span></label>
        </li>
      </ul>
    </yd-cell-group>

    <div slot="tabbar" class="sure_9">
      <yd-button  size="large" class="sure_10">实际支付:¥{{data.totleFee}}</yd-button>
      <yd-button  size="large" class="sure_11" @click.native="jdment">支付确认</yd-button>
    </div>
    <yd-popup v-model="showWarn" position="bottom" width="40%">
      <div style="display: flex;text-align:center;" slot="top">
        <p style="padding: 0.2rem;line-height: 0.3rem;font-size: 0.3rem;width: 97%">会员须知</p>
        <yd-icon style="padding: 0.1rem;" slot="icon" name="quxiao" color="#c1c2c3" size="0.4rem" custom @click.native="showWarn=!showWarn"></yd-icon>
      </div>
      <div style="padding: 0.2rem;">
        <p style="margin-top: 0.2rem;font-size: 0.25rem">1、  加入商社车管家会员可免费获赠新世纪购物卡、爱车全年保养（美容）套餐、会员积分、爱车免费全车检测等系列会员礼包；</p>
        <p style="font-size: 0.27rem">2、  获赠的礼包根据会员等级发放，会员礼包价值大小与会员等级高低相匹配；</p>
        <p style="font-size: 0.27rem">3、  会员礼包中的新世纪购物卡将以实物方式配送（或上门自提）。会员积分将自动累计至个人中心—我的积分，积分为1分对应1元现金，会员可在车管家微信商城购物时全额抵扣。爱车保养（美容）套餐及免费检测将以线上券的方式发放至个人中心，会员可在有效期内预约到店服务。</p>
      </div>
      <yd-button slot="bottom" style="background-color: #d41d0f;margin-bottom: 0px;margin-top:0px" size="large" type="primary" @click.native="okruel()">确定</yd-button>
    </yd-popup>


  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {setStore,getStore,removeStore} from  '../../../config/mUtils'
  const vm= {
    data() {
      return {
        show1:false,
        data:{},
        giftlist:[],
        giftItem:[],
        defelutaddress:{},
        payURL:'',
        showWarn:false,
        selectItem:{},
        dealRule:false,
        tempgift:{},
      }
    },
    mounted(){
      var insuranceInfo= getStore("insuranceInfo");
      if(!insuranceInfo.code){
        this.gotoback();
        return;
      }
      this.data= insuranceInfo;
      if(insuranceInfo.gifts.length>0) {
        this.giftlist = insuranceInfo.gifts;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(function (vm) {
        if(from.name=='insurance_type'){
          var insuranceInfo= getStore("insuranceInfo");
          vm.data=insuranceInfo;
          if(insuranceInfo.gifts.length>0) {
            vm.giftlist = insuranceInfo.gifts;
          }
        }
      });
    },
    beforeRouteLeave(to,from,next){
      next(function (vm) {

      });
    },
    activated(){
      this.addressList();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      gotoAddressList(){
        this.$router.push({name:'addressList'});
      },
      addressList(){
        const that =this;
        baseHttp(this,'/api/order/addressList',{},'get','加载中...',function (data) {
          if(data.address){
              data.address.forEach(function (addressItem) {
               if(addressItem.default==1){
                 that.defelutaddress=addressItem;
               }
            })
          }
        });
      },
      okruel(){
        this.dealRule=true;
        this.showWarn=false;
      },
      selectgifs(sleitem,index){
        if(this.dealRule==false){
          this.showWarn=true;
        }else{
          sleitem.select=!sleitem.select;
          if(sleitem.select==true){
            this.giftlist.forEach(function (item) {
              if(item.giftWrapId!=sleitem.giftWrapId){
                item.select=false;
              }
            })
          }
        }

      },
      jdment(){
        const  that =this;
        var seleltItem=false;
        this.giftlist.forEach(function (item) {
           if(item.select==true){
             seleltItem=true;
           }
        })
        if(this.giftlist.length>0&&seleltItem==false){
          this.$dialog.confirm({
            title: '温馨提示',
            mes: '您有礼包没有选择是否继续！',
            opts:function () {
              that.confirm1();
            }
          });
        }else{
          this.confirm1();
        }
      },
      confirm1(){
        var seleltItem=false;
        var giftWrapId='';
        this.giftlist.forEach(function (item) {
          if(item.select==true){
            seleltItem=true;
            giftWrapId=item.giftWrapId;
          }
        })
        if(this.giftlist.length>0&&seleltItem==false){
          if(!this.defelutaddress.lastName){
            this.$dialog.toast({mes: '请选择收货地址', timeout: 1000});
            return;
          }
        }
        var par={};
        var address={};
        par.tbid=this.data.tbid;
        par.brand=this.data.brand;
        par.contents=this.data.contents;
        par.giftWrapId=giftWrapId;
        par.zfje=this.data.totleFee;
        par.bussinessFee=this.data.bussinessFee;
        par.addrModel=address;
        par.taxFee=this.data.taxFee;
        if(this.defelutaddress){
          address.receiver=this.defelutaddress.lastName;
          address.phone=this.defelutaddress.phonePrimary;
          address.state=this.defelutaddress.addressState;
          address.city=this.defelutaddress.addressCity;
          address.district=this.defelutaddress.addressDistrict;
          address.detail=this.defelutaddress.addressStreet;
        }
        const that =this;
        baseHttp(this,'/api/insurance/confirm',{'data':JSON.stringify(par)},'post','提交中...',function (data) {
          window.location.href = "http://wx.cxcq.cpic.com.cn/weixinpay/JSAPIPay.aspx?tbid="+par.tbid+"&fee=0.01&partnerid=cpicshangshe&backUrl="+'http://joewee.mynatapp.cc';
        });
      }
    },
  }
  export default vm;
</script>
<style scoped>
  .areaInfo{
    background: url(../../../assets/img/areav1.png) no-repeat left center;
    background-size: 0.2rem 0.25rem;
    padding-left: 0.3rem;
    font-size: 0.25rem;
    color: #373737;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .noaddressInfo{
    background: url(../../../assets/img/areav1.png) no-repeat left center;
    background-size: 0.2rem 0.25rem;
    padding-left: 0.3rem;
    font-size: 0.3rem;
    color: #373737;
    line-height: 1rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    margin-left: 0.3rem;
  }
  .selectyd-checkbox-icon{
    background-color:#f00;
    border-color:#f00;
  }
  .selectyd-checkbox-icon>i{
    -webkit-transform: translate(-50%,-50%) rotate(45deg) scale(1);
    transform: translate(-50%,-50%) rotate(45deg) scale(1);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .bg_ul{
    padding-left: 0.2rem;
    background-color: #ffffff;
  }
  .bg_ul li{
    padding: 0.2rem 0;
    border-bottom: 1px solid #eeeeee;
  }
  .bg_ul li:last-child{
    border-bottom: 0px solid #eeeeee;
  }
  .sure_9{
    margin: 0;
    width: 100%;
    height: 1rem;
    background-color: white
  }
   .sure_10{
    background-color: #363636;
    color: #ffffff;margin: auto;
    float: left;
    width: 50%;
    border-radius: inherit;
    font-size: 0.3rem;
  }
   .sure_11{
    background-color: #d41d0f;
    margin: auto;
    float: right;
    width: 50%;
    border-radius: inherit;
    font-size: .3rem;
  }
</style>
<style>

</style>
