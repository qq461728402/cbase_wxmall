<template>
  <yd-layout id="orderSub">
    <yd-navbar slot="navbar" title="订单提交" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="userinfo" @click="gotoAddress()">
      <div class="defalutaddress" v-if="address.lastName.length>0">
        <div class="infomation" style="font-size: .3rem;">
          <span style="line-height: 0.5rem">{{address.lastName}}</span>
          <span style="line-height: 0.5rem">{{address.phonePrimary}}</span>
          <span style="border:1px solid #d41d0f;border-radius: 2px;padding: 2px 5px;color: #d41d0f;font-size: 0.2rem">默认</span>
          <p class="areaInfo">{{getaddress}}</p>
        </div>
        <span class="choose"></span>
      </div>
      <div class="defalutaddress" v-else>
        <p class="noaddressInfo">请设置地址</p>
        <span class="choose"></span>
      </div>
    </div>
    <yd-cell-group style="margin-top: 10px;z-index:-1">
      <yd-cell-item arrow type="label">
        <span slot="left">支付方式</span>
          <span slot="right" style="font-size: 0.3rem">积分兑换</span>
      </yd-cell-item>
      <yd-cell-item arrow type="label">
        <span slot="left">配送方式</span>
        <select slot="right" class="main_3" v-model="distribut" v-if="orderData.shippingType=='BOTH'">
          <option v-for="item in distribution" :value='item.type'>{{item.name}}</option>
        </select>
        <span slot="right" v-else  style="font-size: 0.3rem">
            {{orderData.shippingType=='DELIVERY'?'快递':'门店自提'}}
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入留言(选填)" v-model="msg" maxlength="30"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <div class="products">
      <div class="yd-accordion-title" style="border-bottom: 1px solid #e3e3e3">
        <span style="padding-left: 0.3rem;font-size: 0.3rem">订单商品</span>
      </div>
      <div>
        <h3>商品</h3>
        <ul class="por" slot="list">
          <li>
            <pointGoods :item="orderData"></pointGoods>
          </li>
        </ul>
      </div>
    </div>
    <div slot="tabbar" class="submitorder">
      <div style="width: 60%;text-align: left;padding-left: 0.2rem">所需积分:<span>{{orderData.bounsPoints}}</span> </div>
      <div class="subbtn" style="width: 40%" @click="gotoplay">积分兑换</div>
    </div>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {getStore,removeStore} from '@/config/mUtils'
  import {baseHttp,formatDate,isEmptyObject} from '@/config/env'
  import {wexinPay,wftPay} from '@/config/weichatPay'
  import { mapGetters } from 'vuex'
  import { Row, Col,Cell, CellGroup } from 'vant';
  import pointGoods from '@/views/pointGoods'
  const vm= {
    computed: {
      ...mapGetters([
        'invoice',
      ]),
      //拼接地址
      getaddress(){
          if (this.address.addressStateName&&this.address.addressStateName.length>0){
           return  this.address.addressStateName+this.address.addressCityName+ this.address.addressDistrictName+ this.address.addressStreet;
          }else{
            return '';
          }
      },
    },
    components: {
      pointGoods,
      [Row.name]:Row,
      [Col.name]:Col,
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
    },
    data() {
      return {
        distribut:'',
        distribution:[{'type':'DELIVERY','name':'快递'},{'type':'SELF_DELIVERY','name':'门店自提'}],
        checkbox1:true,
        getorderInfo:{},
        spinner1:1,
        orderDate: '',
        orderData: {
          bounsPoints:0,
          shippingType:'BOTH',
        },
        oderdefault: {},
        address: {'lastName': '', 'phonePrimary': ''},
        chooseCoupon: false,
        oderdefault: {},
        msg: '',
        payInfo: {},
        paytotalFee:0,
      }
    },
    mounted(){
      if(getStore("oderInfo").length>0){
        var orderI=getStore("oderInfo");
        this.getorderInfo=JSON.parse(orderI);
      }
      if(isEmptyObject(this.getorderInfo)){
        const that=this;
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '订单已经提交',
          opts:function () {
            that.$router.go(-1);
          }
        });
      }else{
        this.oderInfo();
      }
    },
    methods:{
      /*订单默认信息*/
      oderInfo(){
        baseHttp(this, '/api/order/defaultInfo', {}, 'get', '获取中...',  data => {
          this.oderdefault = data;
          if (data.address) {
            this.address = data.address;
          }
          this.confirmOder();
        })
      },
      /*确认订单信息*/
      confirmOder(){
        var oderInfo = this.getorderInfo;
        if (this.address.lastName.length > 0) {
          oderInfo.name = this.address.lastName;
          oderInfo.phone = this.address.phonePrimary;
          oderInfo.city = this.address.addressCity;
          oderInfo.district = this.address.addressDistrict;
          oderInfo.state = this.address.addressState;
          oderInfo.street = this.address.addressStreet;
        }
        baseHttp(this, '/api/promotion/exchange/confirm', {'data': JSON.stringify(oderInfo)}, 'get', '', data => {
          this.orderData = data.data;
        })
      },
      gotoAddress(){
        this.$router.push({name:'addressList'});
      },
      switchlist(label, tabkey){
        this.tabkey=tabkey;
      },
      /*退货协议*/
      gotopro(){
        this.$router.push({ name: 'protocol'});
      },
      gotoback(){
        this.$router.go(-1);
      },

      /*获取用户信息*/
      getuserInfo(){
        baseHttp(this, '/api/personal/info', {}, 'get', '', data => {
          if (data) {
            this.$store.dispatch('setUserInfo', data.info);
          }
        })
      },
      /*去兑换*/
      gotoplay() {
        if (this.address.lastName.length == 0) {
          this.$dialog.toast({mes: '请选择地址', timeout: 1000});
          return;
        }
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '您确定兑换此商品',
          opts: () => {
            baseHttp(this, '/api/promotion/exchange', {'data': JSON.stringify(this.orderData)}, 'post', '提交中...',data=> {
              this.$dialog.toast({
                mes: '兑换成功',
                timeout: 1500,
                icon: 'success',
                callback: ()=>{
                  this.getuserInfo();
                  this.$router.replace({ name: 'myOderList', query: { type: 1 }})
                }
              });
            });
          }
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .userinfo {
    position: relative;
    width: 100%;
    background: #fff
  }
  .userinfo::before, .userinfo::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    background: url('../../../assets/img/linedownv1.png') no-repeat;
    background-size: 100%;
    bottom: 0;
    left: 0;
    z-index: 2
  }
  .userinfo::after {
    background: url('../../../assets/img/lineupv1.png') no-repeat;
    background-size: 100%;
    top: 0
  }

  .userinfo .address .choose {
    content: "";
    position: absolute;
    background: url('../../../assets/img/cporder.png') no-repeat -600px -63px;
    width: 35px;
    right: 16px;
    height: 35px;
    zoom: .6;
    top: 50%;
    margin-top: -17.5px
  }

  .userinfo .address::after {
    content: "";
    display: table;
    clear: both
  }

  .userinfo .defalutaddress .infomation {
    color: #333;
    margin-left: 16px;
    padding: 12px 35px 10px 0;
    width: 100%;
    position: relative
  }

  .userinfo .defalutaddress .infomation div {
    float: left;
    margin-bottom: 4px
  }

  .userinfo .defalutaddress .infomation .name {
    position: relative;
    padding-left: 25px;
    height: 21px;
    overflow: hidden
  }

  .userinfo .defalutaddress .infomation .tel {
    position: relative;
    height: auto
  }

  .userinfo .defalutaddress .infomation .tel::after {
    display: none
  }

  .userinfo .defalutaddress .infomation::after {
    content: "";
    display: table;
    clear: both
  }

  .userinfo .defalutaddress .choose {
    content: "";
    position: absolute;
    background: url('../../../assets/img/cporder.png') no-repeat -600px -63px;
    width: 35px;
    right: 15px;
    top: 50%;
    margin-top: -17.5px;
    height: 35px;
    zoom: .6
  }

  .userinfo .defalutaddress::after {
    content: "";
    display: table;
    clear: both
  }

  .listItem .item, .payinfo {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3
  }

  .payinfo {
    background: #fff;
    padding: 10px 16px;
    margin-top: 10px;
    margin-bottom: 0.2rem;
  }

  .payinfo p span {
    line-height: 28px
  }

  .payinfo .label {
    color: #666;
    float: left
  }

  .payinfo .price {
    color: #df3448;
    float: right
  }

  .payinfo .price.discount {
    color: #47ab10
  }

  .payinfo p::after {
    content: "";
    display: table;
    clear: both
  }

  .products, .products ul {
    border-bottom: 1px solid #e3e3e3
  }
  .products {
    background: #fff
  }

  .products .desc {
    margin-left: 16px;
    border-top: 1px solid #e3e3e3;
    padding: 7px 15px 7px 0
  }

  .products .desc > p {
    font-size: 12px;
    color: #999
  }

  .products .desc > .infoTitle {
    font-size: 13px;
    color: #333;
    margin-bottom: 4px
  }

  .products h3 {
    color: #999;
    font-size: 12px;
    border-left: 3px solid #df3448;
    margin: 11px 0 11px 16px;
    font-weight: 400;
    padding-left: 8px;
    line-height: 12px
  }

  .products ul li {
    background: #fff;
    margin-left: 8px
  }

  .submitorder {
  }
  .submitorder .orderDesc {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fdffdf;
    color: #f57c33;
    font-size: 12px;
    text-align: center;
    position: relative;
    padding-right: 8px
  }

  .submitorder .orderDesc::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background-size: 100%;
    right: 15px;
    top: 9px
  }

  .submitorder div {
    width: 50%;
    float: left;
    text-align: center;
    color: #fff;
    background: rgba(34, 34, 34,1);
    font-size: .3rem;
    height: 48px;
    line-height: 48px
  }

  .submitorder div span {
    font-size: .3rem
  }

  .submitorder .subbtn {
    background: #df3448;
    font-size: .3rem
  }

  .submitorder::after {
    content: "";
    display: table;
    clear: both
  }

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
    background: url('../../../assets/img/linedownv1.png') no-repeat;
    background-size: 100%;
    bottom: 0;
    left: 0;
    z-index: 2;
    max-width: 750px
  }

  .listItem .item.default::after {
    background: url('../../../assets/img/lineupv1.png') no-repeat;
    background-size: 100%;
    top: 0;
    max-width: 750px
  }

  .invoice_list {
    list-style: none
  }

  .invoice_list .selected {
    background: url(../../../assets/img/select-2.png) no-repeat 0;
    background-size: 15px 15px;
    padding-left: 30px
  }

  .invoice_list li {
    line-height: 40px;
    height: 40px;
    background: url(../../../assets/img/select-3.png) no-repeat 0;
    background-size: 15px 15px;
    padding-left: 30px;
    border-bottom: 1px solid #f5f5f5
  }

  .invoice_list li:last-child {
    border-bottom: 0 solid #f5f5f5
  }

  .invoice_list li p {
    color: black
  }

  .warnTxt {
    background-color: #fff4da;
    padding-left: .2rem;
    height: .6rem;
    margin-bottom: .1rem
  }

  .por li {
    padding: .1rem 0;
    border-bottom: 1px solid #eee
  }

  .por li:first-child {
    border-top: 1px solid #eee
  }

  .por li:last-child {
    border-bottom: 0 solid #eee
  }

  .storeList {
    background-color: #fff
  }

  .storeList li {
    border-bottom: 1px solid #edeeef
  }

  .storeList li:last-child {
    border-bottom: 0
  }
  #orderSub .yd-textarea textarea {
    height: 0.8rem;
  }

  select.main_3 {
    direction: rtl;
    color: #535353;
  }

  .coupon {
    list-style: none;
  }

  .coupon li {
    margin: 0.15rem;
    background: #FFFFFF;
  }

  .coupon li:before,
  .coupon li:after {
    content: "";
    width: 0.2rem;
    background-size: 0.4rem 0.1rem;
  }

  .coupon li:before {
    height: 1.5rem;
    float: left;
    background-position: 100% 35%;
    background-image: linear-gradient(-45deg, #4290db 25%, transparent 25%, transparent),
    linear-gradient(-135deg, #4290db 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #4290db 75%),
    linear-gradient(-135deg, transparent 75%, #4290db 75%);
  }

  #coupon .yd-popup-content {
    background-color: #f0f2f6;
  }

  .coupon1 {
    list-style: none;
  }

  .coupon1 li {
    margin: 0.15rem;
    background: #FFFFFF;
  }

  .coupon1 li:before,
  .coupon1 li:after {
    content: "";
    width: 0.2rem;
    background-size: 0.4rem 0.1rem;
    background-color: #f0f2f6
  }

  .coupon1 li:before {
    height: 1.5rem;
    float: left;
    background-position: 100% 35%;
    background-image: linear-gradient(-45deg, #bbbbbb 25%, transparent 25%, transparent),
    linear-gradient(-135deg, #bbbbbb 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #bbbbbb 75%),
    linear-gradient(-135deg, transparent 75%, #bbbbbb 75%);
  }

  #coupon1 .yd-popup-content {
    background-color: #f0f2f6;
  }

  #orderSub .yd-tab-panel {
    background-color: #f0f2f6;
  }

  .areaInfo {
    background: url(../../../assets/img/areav1.png) no-repeat left center;
    background-size: 0.2rem 0.25rem;
    padding-left: 0.3rem;
    font-size: 0.25rem;
    color: #373737;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }

  .noaddressInfo {
    background: url(../../../assets/img/areav1.png) no-repeat left center;
    background-size: 0.2rem 0.25rem;
    padding-left: 0.3rem;
    font-size: 0.3rem;
    color: #373737;
    line-height: 1.5rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    margin-left: 0.3rem;
  }

  #orderSub div.yd-cell-item.main_1 {
    background: url(../../../assets/img/linedownv1.png) no-repeat;
    background-size: 100%;
    background-position: bottom;
  }

  .couponBg{
    background: -webkit-linear-gradient(left, #4290db , #5877da); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #4290db, #5877da); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #4290db, #5877da); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #4290db , #5877da); /* 标准的语法（必须放在最后） */
  }
</style>
<style>
  #orderSub .yd-checkbox-icon{
    z-index: 0;
  }
  #orderSub .yd-datetime-input{
    width: 2rem;
  }
  #hyxz .yd-checkbox-text{
    display: none ;
  }
  #hyxz .yd-checkbox{
    padding-right:5px;
  }
  #payMoney .van-cell{
    padding:5px 0;
  }
</style>

