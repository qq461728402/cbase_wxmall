<template>
  <yd-layout id="orderDetail">
    <yd-navbar slot="navbar" title="订单详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <yd-icon slot="icon" name="feedback" size=".42rem" color="#d41d0f"></yd-icon>
        <span slot="left" style="color: #D41D0F;">{{orderStatus}}</span>
        <span slot='right' style="float: right;color: #d41d0f" @click="showwl()">订单历史</span>
      </yd-cell-item>
      <hr class="ddxq_6"/>
      <yd-flexbox class="ddxq_7">
        <yd-flexbox-item class="ddxq_8">
          <p>订单编号<i style="float: right;">{{info.number}}</i></p>
          <p>下单时间<i style="float: right;">{{info.date}}</i></p>
          <p>收货人<i style="float: right;">{{info.name}}</i></p>
          <p v-if="info.needService==true">服务门店<i style="float: right;">{{info.serviceShopName}}</i></p>
          <p v-else-if="info.deliverNumber&&info.deliverNumber.length>0">快递单号<i style="float: right;">{{info.deliverNumber}}</i></p>
          <p>收货地址<i style="float: right;">{{info.addr}}</i></p>
          <p>支付方式<i style="float: right;">{{info.payType}}</i></p>
          <p v-if="info.preorderTime">预约时间<i style="float: right;">{{info.preorderTime | dateYY}}</i></p>
          <p>配送方式<i style="float: right;">{{order.shippingType=='SELF_DELIVERY'?'门店自提':order.shippingType=='DELIVERY'?'快递':'门店自提 快递'}}</i></p>
          <p v-if="info.needInvoice">发票类型<i style="float: right;">纸质发票</i></p>
          <p v-if="info.needInvoice">发票抬头<i style="float: right;">{{info.invocieType=='PERSONAL'?'个人:':info.invocieType=='COMPANY'?'公司:':'无需发票'}}
            {{info.invocieType!='NO'?info.invoiceTitle:''}}
          </i></p>
          <p v-if="info.invocieType=='COMPANY'&&info.needInvoice">单位税号<i style="float: right;">{{info.taxNumber}}</i></p>
        </yd-flexbox-item>
      </yd-flexbox>
    </yd-cell-group>
    <div class="products">
      <div class="yd-accordion-title" style="border-bottom: 1px solid #e3e3e3">
        <span style="padding-left: 0.3rem;font-size: 0.3rem">订单商品</span>
      </div>
      <div>
        <h3>商品</h3>
        <ul class="por" slot="list">
          <li v-for="item in order.items" @click.stop="gotoProdcut(item)">
            <goods :item="item" goodsType="submit" :isButton="canReturn&&item.canReturn" :showQuantity="true" @gotoAfterSales="gotoAfterSales"></goods>
          </li>
        </ul>
        <div v-if="order.needService">
          <h3>服务</h3>
          <ul class="sever">
            <li v-for="service in order.services">
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
    <div class="payinfo" v-if="order.orderType!='EXCHANGE'">
      <p><span class="label">商品总额</span> <span class="price">&yen;{{order.subTotal}}</span></p>
      <p><span class="label">服务费</span> <span class="price">&yen;{{order.serviceFee}}</span></p>
      <p><span class="label">运费</span> <span class="price">&yen;{{order.shipmentFee}}</span></p>
      <p v-if="order.couponOffer"><span class="label">优惠券</span> <span class="price discount">-&yen;{{order.couponOffer}}</span></p>
      <p v-if="order.isBonusPointsUsed==true"><span class="label">积分抵扣金额</span> <span class="price discount">-&yen;{{order.bonusPointsUsed}}</span></p>
      <p><span class="label">订单总额</span> <span class="price">&yen;{{order.total}}</span></p>
    </div>
    <yd-cell-group style="text-align: center;" v-show="showQRCode==true">
      <div style="padding: 0.2rem;">
        <p style="font-size: 0.3rem"><strong>订单二维码</strong></p>
        <p style="color: gray">让门店扫一扫,节省您与门店对接时间</p>
      </div>
      <div style="margin-left:25%;width: 50%;">
        <div id="qrcode" ref="qrcode" style="padding-bottom: 0.2rem;"></div>
      </div>
    </yd-cell-group>
    <div style="height: 1.2rem;width: 100%"></div>
    <div style="position:fixed;top:70%;right:0;z-index: 999;text-align: center;padding: 0.1rem;">
      <a :href="'tel:'+storeinfo.systemPhone">
        <yd-icon name="kfdh" size=".6rem" color="#d81e06" custom></yd-icon>
      </a>
    </div>
    <yd-cell-group slot="tabbar" style="margin-bottom: 0rem;" v-if="canCancel==true||canRefund==true||canReturn==true||canConfirm==true||canPay==true||canComment==true">
      <yd-cell-item type="a">
            <span slot="right">
            	<!--<yd-button type="hollow" v-if="canCancel==true" class="order_3" @click.native="cancleOrder()">取消订单</yd-button>-->
				<yd-button type="hollow" v-if="canRefund==true" class="order_3" @click.native="canclePayOrder()">申请退款</yd-button>
				<!--<yd-button type="danger" v-if="canReturn==true" class="order_3" color="#fff" @click.native="applyRefundAll()">申请售后</yd-button>-->
				<yd-button type="danger" v-if="canConfirm==true" class="order_3"  color="#fff" @click.native="affirmOrder()">{{info.needService==true?'待服务':'确认收货'}}
        </yd-button>
            	<yd-button type="danger" v-if="canPay==true" color="#fff" class="order_3" @click.native="payOrder()">立即支付</yd-button>
				<yd-button type="hollow"  class="order_3" v-if="canComment==true" @click.native="appraiseOrder()">评价晒单</yd-button>
            </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-popup v-model="isshowwl" position="bottom" height="60%">
      <div style="height: 1rem;line-height: 1rem;border-bottom: 1px solid #edeeef" slot="top">
        <span style="font-size: 0.3rem;color: #666;padding-left: 0.2rem">订单历史详情</span>
        <div class="close" @click="isshowwl=false"></div>
      </div>
      <yd-timeline>
        <yd-timeline-item v-for="(item,index) in histories" :key="index">
          <p>{{item.statusComments}}</p>
          <p style="margin-top: 10px;">{{item.dateAdded|formatDate}}</p>
        </yd-timeline-item>
      </yd-timeline>
    </yd-popup>

    <confirmpop v-if="isreceived"  @confirmok="gotoback" ref="confirmPop"></confirmpop>

  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp,getCookie,formatDate} from '@/config/env'
  import  {getStore,removeStore,setStore} from '@/config/mUtils'
  import {wexinPay,wftPay} from '@/config/weichatPay'
  import confirmpop from '@/views/confirmpop'
  import goods from '@/views/goods'
  import { mapGetters } from 'vuex'
  var QRCode = require('js-qrcode');
  const vm= {
    computed: {
      ...mapGetters([
        'storeinfo'
      ]),
    },
    components: {
      goods,
      confirmpop
    },
    data() {
      return {
        isreceived:false,
        isLocked: false,
        orderStatus: '',
        showQRCode: false,
        status: '',//PURCHASED 待付款  SHIPPED 待收货 RECEIVED 待评价  COMMENTED 完成
        orderId: '',
        info: {},
        order: {},
        qrcode: undefined,
        payInfo: {},
        canRefund: false,
        canCancel: false,
        canReturn: false,
        canPay: false,
        canConfirm: false,
        canViewShippmentHistory: false,
        canComment: false,
        isshowwl: false,
        histories: [],
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    mounted(){
      this.orderId =this.$route.query.orderId;
      this.setQrCode();
      this.getoderDetail();
      this.gethistoryOrder();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      setQrCode(){
        // 设置参数方式
        var container = document.querySelector('#qrcode');
        this.qrcode = new QRCode(container, {
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel   : 2,
        });
      },
      getoderDetail(){
        baseHttp(this, '/api/order/order', {'orderId': this.orderId}, 'get', '加载中...', data=> {
          if (data.info) {
            this.info = data.info;
            this.qrcode.make(data.info.number);
          }
          if (data.isLocked) {
            this.isLocked = data.isLocked;
          }
          if (data.showQRCode) {
            this.showQRCode = data.showQRCode;
          }
          if (data.order) {
            if (data.order.orderType=='EXCHANGE'){
              data.order.items.forEach(item =>{
                item.bonusPointsUsed=data.order.bonusPointsUsed;
              })
            }
            this.order = data.order;
          }
          if (data.status) {
            this.status = data.status;
          }
          if (data.orderStatus) {
            this.orderStatus = data.orderStatus;
          }
          if (data.canPay) {
            this.canPay = data.canPay;//是否可以付款
          }
          if (data.canCancel) {
            this.canCancel = data.canCancel;//是否可以申请取消订单
          }
          if (data.canRefund) {
            this.canRefund = data.canRefund;//是否可以申请退款(发货前)，
          }
          if (data.canConfirm) {
            this.canConfirm = data.canConfirm;//是否可以确认收货
          }
          if (data.canViewShippmentHistory) {
            this.canViewShippmentHistory = data.canViewShippmentHistory;//是否可以查看物流
          }
          if (data.canComment) {
            this.canComment = data.canComment;//是否可以评论
          }
          if (data.canReturn) {
            this.canReturn = data.canReturn;////是否可以申请售后服务（退货）
          }
        })
      },
      /*取消订单*/
      cancleOrder(){
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '您是否确定取消订单！',
          opts: () => {
            this.sureCancleOrder();
          }
        });
      },
      sureCancleOrder(){
        baseHttp(this, '/api/order/cancel', {'orderId': this.orderId}, 'post', '取消中...', data=> {
          this.$dialog.toast({
            mes: '取消成功!',
            timeout: 1000,
            icon: 'success',
            callback:  ()=> {
              this.gotoback();
            }
          });
        })
      },
      /*确认收货*/
      affirmOrder(){
        if (this.info.storeId){
           this.isreceived = true;
           this.$nextTick( ()=> {
            this.$refs.confirmPop.init(this.orderId,this.info.storeId)
            })
        }else{
          this.$dialog.alert({mes: '订单异常!'});
        }
      },
      /*申请退款*/
      canclePayOrder(){
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '您是否确定退款！',
          opts: () => {
            this.surecarRefund();
          }
        });
      },
      surecarRefund(){
        baseHttp(this, '/wechat/pay/refund', {'orderId': this.orderId}, 'post', '申请中...', data=> {
          this.$dialog.toast({
            mes: '申请成功!',
            timeout: 1000,
            icon: 'success',
            callback: ()=> {
              this.gotoback();
            }
          });
        })
      },
      /*订单支付*/
      payOrder(){
        this.$dialog.loading.open('支付中...');
        baseHttp(this, '/api/order/rePay', {'orderId': this.orderId}, 'post', '', data=> {
          this.perPay(data);
        })
      },
      perPay(data){
        const that = this;
        baseHttp(this, '/api/order/prePay', data, 'post', '', data=> {
          this.payInfo = data.payInfo;

//          window.location.href =  "https://pay.swiftpass.cn/pay/jspay?token_id="+that.payInfo.token_id+"&showwxtitle=1";
//          that.$store.dispatch('setrouter',that.$route.fullPath);
//          that.$router.push({ name: 'orderpay', query: { token_id: that.payInfo.token_id }})
          wftPay(data.payInfo,res=> {
            this.$dialog.loading.close();
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              that.$router.replace({ name: 'orderSuccess', query: { payMoney:that.paytotalFee}})
            }else if(res.err_msg =="get_brand_wcpay_request:cancel"){
              that.$router.replace({ name: 'myOderList', query: {type:2}})
            }else if(res.err_msg =="get_brand_wcpay_request:fail"){
              that.$dialog.toast({
                mes: '支付失败! 请重新支付',
                timeout: 2000,
              });
            }
          },function (fail) {
            this.$dialog.loading.close();
            that.$dialog.toast({
              mes: '支付失败! 请重新支付',
              timeout: 2000,
            });
          })
        });
      },
      gethistoryOrder(){
        const that = this;
        baseHttp(this, '/api/order/histories', {'orderId': this.orderId}, 'get', '加载中...', function (data) {
          if (data.histories) {
            that.histories = data.histories;
          }
        })
      },
      showwl(){
        if (this.histories.length == 0) {
          this.$dialog.toast({
            mes: '暂无订单历史',
            timeout: 1000
          });
          return;
        }
        this.isshowwl = !this.isshowwl;
      },
      /*进入商品详情*/
      gotoProdcut(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId},meta:{title:'商品详情'}});
      },
      /*订单评价*/
      appraiseOrder(){
        var orderItem = [];
        this.order.items.forEach(function (item) {
          orderItem.push(item);
        })
        if (this.canComment == false) {
          this.$dialog.toast({
            mes: '您不能评价该订单',
            timeout: 2000,
          });
          return;
        }
        this.$router.push({ name: 'orderAppraise',query:{orderNumber:this.info.number,storeId:this.info.storeId}, params:orderItem,meta:{title:'订单评价'}});
      },
      /*整单申请退货*/
      applyRefundAll(){
        var items = {'item': this.order.items}
        items.number = this.info.number;
        setStore("refundInfo",items);
        this.$router.push({ name: 'fillsalesRetrun',query:{orderId:this.orderId,flag:1}});
      },
      gotoAfterSales(item){
        var itemlst = [item];
        var items = {'item': itemlst}
        items.number = this.info.number;
        setStore("refundInfo",items);
        this.$router.push({ name: 'fillsalesRetrun',query:{orderId:this.orderId,skuId:item.skuId,flag:2}});
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .ddxq_6{
    border: none; border-bottom: 10px solid #f5f5f5;
  }
  .products, .products ul {
    border-bottom: 1px solid #eeeeee
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
    font-size: .3rem;
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

  .por li .imgdiv {
    margin: 0 .1rem
  }

  .por li .imgdiv img {
    height: 1.2rem;
    width: 1.2rem
  }

  .por li .titlediv {
    margin-left: .02rem
  }

  .por li .titlediv p {
    min-height: 1rem;
    margin-right: .2rem;
    color: #333;
    padding-top: .1rem
  }

  .por li .titlediv .price {
    color: #df3448;
    float: left
  }

  .por li .titlediv .count {
    float: right;
    margin-right: .3rem;
    color: #999
  }
  .sever li {
    padding: .1rem 0;
    border-bottom: 1px solid #eee
  }

  .sever li:first-child {
    border-top: 1px solid #eee
  }

  .sever li:last-child {
    border-bottom: 0 solid #eee
  }

  .sever li .imgdiv {
    margin: 0 .1rem
  }

  .sever li .imgdiv img {
    height: 1.2rem;
    width: 1.2rem
  }

  .sever li .titlediv {
    margin-left: .02rem
  }

  .sever li .titlediv p {
    margin-right: .2rem;
    color: #333;
    padding-top: .1rem
  }

  .sever li .titlediv .price {
    color: #df3448;
    float: left
  }

  .sever li .titlediv .count {
    float: right;
    margin-right: .3rem;
    color: #999
  }
  .payinfo {
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

  .payinfo p .label {
    font-size: .3rem;
    color: #666;
    float: left
  }

  .payinfo p .price {
    font-size: .25rem;
    color: #df3448;
    float: right
  }

  .payinfo p .price.discount {
    color: #47ab10
  }

  .payinfo p::after {
    content: "";
    display: table;
    clear: both
  }
  #qrcode img{
    width: 50% !important;
    height: 50% !important;
  }
</style>
<style>
  #orderDetail .yd-flexbox.ddxq_7.yd-flexbox-horizontal{
    padding: 15px 10px;
  }
  #orderDetail .yd-flexbox-item.ddxq_8.yd-flexbox-item-center{
    margin-left: 0.2rem;
    font-size: .25rem;
    color: #666666;
    line-height: .5rem;
  }
  #orderDetail .yd-flexbox.ddxq_9.yd-flexbox-horizontal{
    padding: 10px 10px;
  }
  #orderDetail .yd-flexbox-item.ddxq_10.yd-flexbox-item-center{
    margin-left: 10px;
    font-size: .3rem;
  }
  #orderDetail em.ddxq_11{
    float: right;
    margin-right: 10px;
  }
</style>
