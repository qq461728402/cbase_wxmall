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
          <p class="areaInfo">{{address.addressStateName+address.addressCityName+ address.addressDistrictName+ address.addressStreet}}</p>
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
        <select slot="right" class="main_3" v-model="orderData.payment">
          <option v-for="item in oderdefault.payments" :value='item.id'>{{item.description}}</option>
        </select>
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
      <yd-cell-item arrow @click.native="mshowfp">
        <span slot="left">发票</span>
        <span slot="right" style="font-size: 0.3rem">{{invoice.invoiceType=='NO'?'无需发票':invoice.invoiceType=='PERSONAL'?'个人-商品明细':'公司-商品明细'}}</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="getCoupon()">
            <span slot="left">优惠券<span v-if="selectCoupons.length>0" style="border: 1px solid #d41d0f;padding: 0.05rem;font-size: 0.2rem !important;color: #d41d0f;border-radius: 0.1rem;margin-left: 0.1rem">{{'已选择'+selectCoupons.length+'张'}} </span> </span>
        <span slot="right" style="font-size: 0.3rem" v-if="availableCount==0">无可用</span>
        <span slot="right" style="font-size: 0.3rem" v-else-if="couponsMoney==0">{{'可用优惠券'+available.length+'张'}}</span>
        <span slot="right" style="font-size: 0.3rem;color:#d41d0f" v-else>{{'-'+couponsMoney+'元'}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">是否使用积分</span>
        <yd-switch slot="right" v-model="isBonusPointsUsed" :disabled="bonusPoints==0"></yd-switch>
      </yd-cell-item>
      <yd-cell-item v-if="isBonusPointsUsed">
        <span slot="left">抵扣积分(共{{bonusPoints}}积分)</span>
        <span slot="right"> <yd-spinner :max="bonusPoints>(orderData.subTotal+orderData.serviceFee-couponsMoney)?(orderData.subTotal+orderData.serviceFee-couponsMoney):bonusPoints" unit="1" v-model="bonusPointsUsed"></yd-spinner> </span>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" :placeholder="(carInfo==false&&isNeedService==true)?'请输入留言(必填)':'请输入留言(选填)'" v-model="msg" maxlength="30"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <div class="products">
      <div class="yd-accordion-title" style="border-bottom: 1px solid #e3e3e3">
        <span style="padding-left: 0.3rem;font-size: 0.3rem">订单商品</span>
      </div>
      <div>
        <h3>商品</h3>
        <ul class="por" slot="list">
          <li v-for="item in orderData.items">
            <goods :item="item" goodsType="submit" :showQuantity="true"></goods>
          </li>
        </ul>
        <div v-if="orderData.gifts&&orderData.gifts.length>0">
          <h3>赠品</h3>
          <ul class="sever">
            <li v-for="gift in orderData.gifts">
              <yd-flexbox style="margin-left: 16px">
                <yd-flexbox-item>
                  <div class="titlediv">
                    <p>{{gift.skuName}}</p>
                    <p style="color: #999">{{gift.description}}</p>
                  </div>
                </yd-flexbox-item>
                <div style="margin-right: 0.2rem;width: 1rem;text-align: right" class="titlediv">
                  <p style="color: #df3448">&yen;{{gift.salePrice}}</p>
                  <p style="color: #999">×{{gift.quantity}}</p>
                </div>
              </yd-flexbox>
            </li>
          </ul>
        </div>
        <div v-if="orderData.needService">
          <h3>服务</h3>
          <ul class="sever">
            <li v-for="service in orderData.services">
              <yd-flexbox style="margin-left: 16px">
                <yd-flexbox-item>
                  <div class="titlediv">
                    <p>{{service.serviceName}}</p>
                    <p style="color: #999">{{service.description}}</p>
                  </div>
                </yd-flexbox-item>
                <div style="margin-right: 0.2rem;width: 1rem;text-align: right" class="titlediv">
                  <p style="color: #df3448">&yen;{{service.servicePrice}}</p>
                  <p style="color: #999">×{{service.quantity}}</p>
                </div>
              </yd-flexbox>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="payinfo">
      <p><span class="label">商品总额</span> <span class="price">&yen;{{orderData.subTotal}}</span></p>
      <p><span class="label">服务费</span> <span class="price">&yen;{{orderData.serviceFee}}</span></p>
      <p><span class="label">运费</span> <span class="price">&yen;{{orderData.shipmentFee}}</span></p>
      <p><span class="label">优惠券</span> <span class="price discount">-&yen;{{couponsMoney}}</span></p>
      <p v-if="isBonusPointsUsed"><span class="label">积分抵扣金额</span> <span class="price discount">-&yen;{{bonusPointsUsed}} </span></p>
      <div style="padding-top: 0.3rem"  id="hyxz">
        <yd-checkbox  v-model="checkbox1" shape="circle" color="#d41d0f" size="16"></yd-checkbox><span style="font-size: 12px;text-decoration:underline;color: #d41d0f" @click="gotopro()">《退换货须知》</span>
      </div>
    </div>
    <div style="margin-bottom: 1.5rem"></div>
    <div slot="tabbar" class="submitorder">
      <div style="width: 60%;text-align: left;padding-left: 0.2rem">实付款:&yen;<span v-if="isBonusPointsUsed">{{orderData.total-couponsMoney- bonusPointsUsed}}</span><span v-else>{{orderData.total-couponsMoney}}</span> </div>
      <div class="subbtn" style="width: 40%" @click="gotoplay">提交订单</div>
    </div>
    <yd-popup v-model="chooseCoupon" position="bottom" height="60%" id="coupon">
      <yd-tab :callback="switchlist" slot="top">
        <yd-tab-panel label="可用优惠券" tabkey="1">
        </yd-tab-panel>
        <yd-tab-panel label="不可用优惠券" tabkey="2">
        </yd-tab-panel>
      </yd-tab>
      <div v-if="available.length!=0&&tabkey=='1'" >
        <div class="warnTxt" v-if="selectCoupons.length>0">
          <span style="line-height: 0.6rem">您已选中优惠券{{selectCoupons.length}}张,共可抵用<span style="color: #eb0026">&yen;{{couponsMoney}}元</span> </span>
        </div>
        <ul class="coupon" style="min-height: 10rem">
          <li v-for="couponitem in available">
            <yd-flexbox style="height: 1.5rem">
              <div style="height: 100%;padding: 0.2rem;width:2rem" class="couponBg">
                <p style="font-size: .3rem; font-weight: bold;color: #ffffff;">￥<em style="font-size: 0.6rem">{{couponitem.discount}}</em> </p>
                <span style="color: #FFFFFF;">{{couponitem.orderRequirement>0?'满'+couponitem.orderRequirement+'可用':'无金额门槛'}}</span>
              </div>
              <yd-flexbox-item style="padding-left: 0.15rem">
                <p style="min-height:1rem;font-size: 0.3rem">{{couponitem.description}}</p>
                <div style="display: block">
                  <span style="padding: 3px 0">{{couponitem.startTime |formatDate}}—{{couponitem.endTime |formatDate}}</span>
                  <yd-badge type="disabled" style="margin-right: 0.2rem;float: right;" v-if="selectCoupons.indexOf(couponitem)===-1"
                            @click.native="selectCoupon(couponitem)">立即使用
                  </yd-badge>
                  <yd-badge type="danger" style="margin-right: 0.2rem;background-color: #d41d0f;float: right;" v-else @click.native="selectCoupon(couponitem)">已选择
                  </yd-badge>
                </div>
              </yd-flexbox-item>
            </yd-flexbox>
          </li>
        </ul>
      </div>
      <ul class="coupon1" v-else-if="unavailable.length!=0&&tabkey=='2'" style="min-height: 10rem">
        <li v-for="couponitem in unavailable">
          <yd-flexbox style="height: 1.5rem">
            <div style="height: 100%;background-color: #BBBBBB;padding: 0.2rem;width:2rem">
              <p style="font-size: .3rem; font-weight: bold;color: #ffffff;">￥<em style="font-size: 0.6rem">{{couponitem.discount}}</em> </p>
              <span style="color: #FFFFFF;">{{couponitem.orderRequirement>0?'满'+couponitem.orderRequirement+'可用':'无金额门槛'}}</span>
            </div>
            <yd-flexbox-item style="padding-left: 0.15rem">
              <p style="min-height:1rem;font-size: 0.3rem">{{couponitem.description}}</p>
              <div style="display: block;color: #707070">
                <span style="padding: 3px 0">{{couponitem.startTime |formatDate}}—{{couponitem.endTime |formatDate}}</span>
              </div>
            </yd-flexbox-item>
          </yd-flexbox>
        </li>
      </ul>
      <div style="text-align: center;height: 10rem" v-else>
        <p><img src="../../../assets/img/myyhq.png" width="30%"></p>
        <p>没有券？</p>
        <p style="color: #999999;line-height: .5rem;">去领券中心看看吧</p>
        <p style="line-height: 1.5rem;">
          <yd-button type="hollow" style="background-color: #D9D9D9;border:1px solid #999999 ;width: 20%;" @click.native="coupons">去看看</yd-button>
        </p>
      </div>
    </yd-popup>
  </yd-layout>
</template>
<script type="text/babel">
  import {getStore,removeStore} from '@/config/mUtils'
  import {baseHttp,formatDate,isEmptyObject} from '@/config/env'
  import {wexinPay,wftPay} from '@/config/weichatPay'
  import { mapGetters } from 'vuex'
  import { Row, Col,Cell, CellGroup } from 'vant';
  import goods from '../../../views/goods'
  const vm= {
    computed: {
      ...mapGetters([
        'invoice',
      ])
    },
    components: {
      goods,
      [Row.name]:Row,
      [Col.name]:Col,
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
    },
    data() {
      return {
        distribut:'DELIVERY',
        distribution:[{'type':'DELIVERY','name':'快递'},{'type':'SELF_DELIVERY','name':'门店自提'}],
        checkbox1:true,
        getorderInfo:{},
        spinner1:1,
        startDate: '2018-1-1',
        endDate: '2018-1-1',
        orderDate: '',
        orderData: {},
        oderdefault: {},
        address: {'lastName': '', 'phonePrimary': ''},
        chooseCoupon: false,
        oderdefault: {},
        availableCount: 0,//可用优惠券
        available: [],
        unavailable: [],
        defuletCoupons: {},//默认优惠券
        selectCoupons: [],//选中优惠券
        couponsMoney: 0.0,
        personCheckbox: true,
        unitCheckbox: false,
        msg: '',
        storeName: '',
        isNeedService: false,
        isBonusPointsUsed:false,
        bonusPointsUsed:0,
        bonusPoints:0,
        payInfo: {},
        tabkey:'1',
        paytotalFee:0,
        carInfo:false,
      }
    },
    filters: {
      formatDate: function (value) {
        if (!value) return ''
        var date = new Date(value);
        return formatDate(date,'yyyy-MM-dd');
      }
    },
    watch: {
      personCheckbox: {
        handler: function (val, oldval) {
          if (val == true) {
            this.unitCheckbox = false;
          }
        }
      },
      distribut:{
        handler:function (val,oldval) {
            if(val=='DELIVERY'){
              this.isNeedService==false;
              this.storeName = "";
              this.orderData.serviceShop = '';
              this.confirmOder();
            }else{
              this.isNeedService==true;
              this.confirmOder();
            }
        }
      },
      unitCheckbox: {
        handler: function (val, oldval) {
          if (val == true) {
            this.personCheckbox = false;
          }
        }
      },
      selectCoupons: {
        deep: true,
        handler: function (val, oldval) {
          var copMoney = 0.0;
          for (var key in val) {
            copMoney += val[key].discount;
          }
          this.couponsMoney = copMoney;
        },
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
        const that = this;
        baseHttp(this, '/api/order/defaultInfo', {}, 'get', '获取中...', function (data) {
          that.oderdefault = data;
          if (data.address)that.address = data.address;
          if(data.bonusPoints){
            that.bonusPoints=data.bonusPoints;
            that.bonusPointsUsed=data.bonusPoints;
          }
          if(!data.carInfo)that.carInfo=false;else that.carInfo=true;
          that.confirmOder();
        })
      },
      /*确认订单信息*/
      confirmOder(){
        var oderInfo = this.getorderInfo;
        oderInfo.serviceShop = this.orderData.serviceShop;
        oderInfo.isNeedService=this.isNeedService;
        if (this.address.lastName.length > 0) {
          oderInfo.lastName = this.address.lastName;
          oderInfo.primaryPhone = this.address.phonePrimary;
          oderInfo.city = this.address.addressCity;
          oderInfo.district = this.address.addressDistrict;
          oderInfo.state = this.address.addressState;
          oderInfo.street = this.address.addressStreet;
        }
        const that = this;
        baseHttp(this, '/api/order/confirm', {'data': JSON.stringify(oderInfo)}, 'post', '', function (data) {
          that.orderData = data.orderData;
          that.bonusPointsUsed=that.bonusPointsUsed>(that.orderData.subTotal+that.orderData.serviceFee)?(that.orderData.subTotal+that.orderData.serviceFee):that.bonusPointsUsed;
          if(data.orderData.preorderTime){
            var day3 = new Date(data.orderData.preorderTime);
            that.startDate= formatDate(day3,'yyyy-MM-dd');
            that.endDate=that.getEndDate(data.orderData.preorderTime);
          }
          if (data.orderData.shippingType != 'BOTH') {
            that.isNeedService = data.orderData.shippingType != 'DELIVERY';
          }
          if (that.oderdefault.payments.length > 0) {
            that.orderData.payment = that.oderdefault.payments[0].id;
          }
        })
        this.couponsOder();
      },
      couponsOder(){
        var oderInfo = this.getorderInfo;;
        const that = this;
        oderInfo.serviceShop = this.orderData.serviceShop;
        oderInfo.isNeedService = this.isNeedService;
        baseHttp(this, '/api/order/coupons', {'data': JSON.stringify(oderInfo)}, 'post', '', function (data) {
          if (data.availableCount)that.availableCount = data.availableCount;
          if (data.available)that.available = data.available
          if (data.unavailable) that.unavailable = data.unavailable;
          var select1Coupons = [];
          if (that.available.length > 0) {
            that.defuletCoupons = data.available[0];
            select1Coupons.push(data.available[0]);
          }
          that.selectCoupons = select1Coupons;
          var copMoney = 0.0;
          for (var key in select1Coupons) {
            copMoney += select1Coupons[key].discount;
          }
          that.couponsMoney = copMoney;
        })
      },
      getEndDate(value){
        var day3 = new Date(value);
        day3.setTime(day3.getTime() + 32 * 24 * 60 * 60 * 1000);
        return day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();
      },
      /*获取优惠券信息*/
      getCoupon(){
        this.chooseCoupon = !this.chooseCoupon;
      },
      gotoAddress(){
        this.$router.push({name:'addressList'});
      },
      selectCoupon(item){
        if(this.selectCoupons.indexOf(item) !== -1){
          this.selectCoupons=[];
        }else{
          var tempCoupn=[];
          tempCoupn.push(item);
          this.selectCoupons=tempCoupn;
        }
      },
      mshowfp() {
        this.$router.push({name: 'invoiceInfo'})
      },
      changes(index){
        if (index == 1) {
          unitCheckbox = false;
        } else {
          personCheckbox = false;
        }
      },
      switchlist(label, tabkey){
        this.tabkey=tabkey;
      },
      /*领券中心*/
      coupons(){
        this.$router.push({ path: '/home/getcoupons'});
      },
      /*退货协议*/
      gotopro(){
        this.$router.push({ name: 'protocol'});
      },
      gotoback(){
        this.$router.go(-1);
      },
      /*去支付*/
      gotoplay() {
        this.orderData.isNeedService = this.isNeedService;
        if(this.checkbox1==false){
          this.$dialog.toast({mes: '请确认用户须知', timeout: 1000});
          return;
        }
        if (this.address.lastName.length == 0 && this.orderData.isNeedService == false) {
          this.$dialog.toast({mes: '请选择地址', timeout: 1000});
          return;
        } else if (this.orderData.payment.length == 0) {
          this.$dialog.toast({mes: '请选择支付方式', timeout: 1000});
          return;
        }
        this.orderData.invoiceTitle = this.invoice.invoiceTitle;
        this.orderData.taxNumber =this.invoice.taxNumber;
        this.orderData.invoiceType = this.invoice.invoiceType;
        if(this.carInfo==false&&this.msg.length==0&&this.orderData.isNeedService == true){
          this.$dialog.toast({mes: '请输入留言', timeout: 1000});
          return;
        }
        this.orderData.isBonusPointsUsed=this.isBonusPointsUsed;
        if(this.isBonusPointsUsed==false){
          this.orderData.bonusPointsUsed=0;
        }else{
          this.orderData.bonusPointsUsed=this.bonusPointsUsed;
        }
        this.orderData.msg = this.msg;
        this.orderData.preorderTime = this.orderDate;
        this.orderData.coupons = [];
        const that = this;
        this.selectCoupons.forEach(function (item) {
          that.orderData.coupons.push(item.code);
        });
        this.orderData.lastname = this.address.lastName;
        this.orderData.primaryPhone = this.address.phonePrimary;
        this.orderData.city = this.address.addressCity;
        this.orderData.district = this.address.addressDistrict;
        this.orderData.state = this.address.addressState;
        this.orderData.street = this.address.addressStreet;
        baseHttp(this, '/api/order/checkout', {'data': JSON.stringify(this.orderData)}, 'post', '提交中...', function ( data) {
          that.paytotalFee=data.total_fee;
          if(data.total_fee){
            if (data.total_fee==0){
              this.$router.replace({ name: 'myOderList', query: { type: 1 }})
            }else{
              that.perPay(data);
            }
          }else{
            this.$router.replace({ name: 'myOderList', query: { type: 1 }})
          }
        });
      },
      perPay(data){
        const that = this;
        baseHttp(this, '/api/order/prePay', data, 'post', '提交中...', function (data) {
          that.payInfo = data.payInfo;
          window.location.href ="https://pay.swiftpass.cn/pay/jspay?token_id="+that.payInfo.token_id+"&showwxtitle=1";
//          wftPay(data.payInfo,function (res) {
//            if (res.err_msg == "get_brand_wcpay_request:ok") {
//              that.$router.replace({ name: 'orderSuccess', params: { payMoney:that.paytotalFee}})
//            }else if(res.err_msg =="get_brand_wcpay_request:cancel"){
//              that.$router.replace({ name: 'myOderList', query: { type:2}})
//            }else if(res.err_msg =="get_brand_wcpay_request:fail"){
//              that.$dialog.toast({
//                mes: '支付失败! 请重新支付',
//                timeout: 2000,
//              });
//            }
//          },function (fail) {
//            that.$dialog.toast({
//              mes: '支付失败! 请重新支付',
//              timeout: 2000,
//            });
//          })
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

