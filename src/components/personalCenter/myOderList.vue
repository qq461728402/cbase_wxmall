<template>
  <yd-layout id="myoderlist">
    <yd-navbar slot="navbar" title="我的订单" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-tab slot="navbar" :callback="switchlist">
      <yd-tab-panel label="全部"  tabkey="all" :active="type==1"></yd-tab-panel>
      <yd-tab-panel :label="ordernum.PURCHASED>0?'待付款('+ordernum.PURCHASED+')':'待付款'" tabkey="PURCHASED" :active="type==2"></yd-tab-panel>
      <yd-tab-panel :label="(ordernum.SHIPPED+ordernum.CONFIRMED)>0?'待收货('+(ordernum.SHIPPED+ordernum.CONFIRMED)+')':'待收货'" tabkey="SHIPPED,CONFIRMED" :active="type==3"></yd-tab-panel>
      <yd-tab-panel :label="ordernum.RECEIVED>0?'待评价('+ordernum.RECEIVED+')':'待评价'" tabkey="RECEIVED" :active="type==4"></yd-tab-panel>
      <yd-tab-panel label="已完成" tabkey="COMMENTED,FINISHED" :active="type==5"></yd-tab-panel>
    </yd-tab>
    <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div slot="list" class="or_1" v-for="item in oderlist" @click="gotoOderDetail(item)">
          <van-row class="orderHeard">
            <van-col span="12"><p class="orderNumber">订单编号:<span style="color: #313131">{{item.orderNumber}}</span></p></van-col>
            <van-col span="12" style="text-align: right;padding-right: .2rem"></van-col>
          </van-row>
          <van-row class="orderHeard">
            <van-col span="12">
              <p class="orderNumber" style="margin-bottom: 0.2rem">状态:&nbsp;<span :class="{'cancleOrder':item.status=='CANCELED'}">{{item.orderStatus}}</span></p>
              <p class="orderNumber">总价:&nbsp;<span style="color: #313131">&yen;{{item.totleFee}}</span></p>
            </van-col>
            <van-col span="12" style="text-align: right;padding-right: .2rem;">
              <yd-button type="hollow" style="border: 1px solid #d41d0f;color: #d41d0f;height: .5rem;margin-top: 0.15rem" v-if="item.status=='PURCHASED'" @click.native.stop="gotoPay(item)">去支付</yd-button>
            </van-col>
          </van-row>
          <van-row style="padding: 0.2rem;">
            <goods :item="item" :showQuantity="true"></goods>
          </van-row>
          <hr style="border: none;border-bottom:8px solid #f5f5f5;"/>
        </div>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <div class="noProduct" v-if="oderlist.length==0">
      <img src="../../assets/img/cleanOder.png">
      <p>您还没有相关订单</p>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,formatDate} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import {wexinPay} from '../../config/weichatPay'
  import {Row, Col} from 'vant';
  import goods from '../../views/goods'
  const vm= {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      goods
    },
    data() {
      return {
        type:'',
        page: 1,
        pageSize: 10,
        statuses:'',
        ordernum:{'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0},
        oderlist:[],
        payInfo:{},
      }
    },
    mounted(){
      this.type =this.$route.query.type;
      if(this.type==1){
        this.statuses='all';
      }else if(this.type==2){
        this.statuses='PURCHASED';
      }else if(this.type==3){
        this.statuses='SHIPPED,CONFIRMED';
      }else if(this.type==4){
        this.statuses='RECEIVED';
      }else if(this.type==5){
        this.statuses='COMMENTED,FINISHED';
      }
      this.ordernum={'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0};
      this.getOrderStatus();
      this.page=1;
      this.orderslist();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      switchlist:function (label,tabkey) {
        this.statuses=tabkey;
        this.page=1;
        this.oderlist=[];
        this.orderslist();
      },
      getOrderStatus(){
        const  that=this;
        baseHttp(this,'/api/order/status',{},'get','',function (data){
          if(data.status) {
            for(var key in data.status){
              that.ordernum[key]=data.status[key];
            }
          }
        })
      },
      orderslist(){
        var pars={page:this.page,pageSize:this.pageSize}
        if(this.statuses.length!=0){
          pars.statuses=this.statuses;
        }
        const  that =this;
        baseHttp(this,'/api/order/orders',pars,'get',this.page==1?'加载中...':'',function (data){
          if(that.page==1){
            if(data.orders) {
              that.oderlist=data.orders;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }
          }else{
            if(data.orders){
              that.oderlist=that.oderlist.concat(data.orders);
              if(data.orders&&data.orders.length != that.pageSize){
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              }else{
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            }else{
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }
        })
      },
      /* 下拉刷新 */
      pullList() {
        this.page=1;
        this.orderslist();
      },
      /* 上拉加载更多 */
      loadList() {
        this.page=this.page+1;
        this.orderslist();
      },
      /*进入商品详情*/
      gotoOderDetail(item){
        this.$router.push({ name: 'orderDetail', query: { orderId: item.orderId }});
      },
      gotoPay(item){
        const  that= this;
        baseHttp(this,'/api/order/rePay',{'orderId':item.orderId},'post','支付中...',function (data){
          that.perPay(data);
        })
      },
      perPay(data){
        const that = this;
        baseHttp(this, '/wechat/pay/unifiedorder', data, 'post', '支付中...', function (data) {
          that.payInfo = data.payInfo;
          that.wxPay();
        });
      },
      wxPay(){
        wexinPay(this.payInfo,function (succuess) {
          console.log(succuess);
        },function (err) {
          console.log(err);
        })
      },
    },
  }
  export default vm;
</script>
<style scoped>

  .orderHeard{
    padding: 0.2rem;
    border-bottom:1px solid #f5f5f5;
  }
  .orderHeard p {
    line-height: 0.3rem;
  }
  .orderHeard p  span{
    color: red;
  }
  .orderHeard .orderNumber {
    color:#6e6f70;
    font-size: .25rem
  }

  div.or_1{
    background-color: #FFFFFF;
  }
  span.or_2{
    color:#6e6f70;
  }
  span.or_3{
    color:#d41d0f;
    font-size: .3rem;
  }
  div.or_4{
    overflow:hidden;
    padding: 0.1rem;
    height: 1.8rem;
    width: 1.8rem;
  }
  img.or_5{
    height: 1.5rem;
    width: 1.5rem
  }

  span.or_8{
    min-height: 0.6rem;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    font-size: 0.3rem;
  }
  span.or_9{
    color: #6e6f70;
    font-size: 0.25rem;
    line-height: 0.5rem;
  }
  span.or_10{
    color: #ff7d49;
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
  span.or_11{
    float: right;
    padding-right:.24rem;
  }

  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }
  .noProduct img {
    width: 1.5rem;
    height: 1.5rem
  }
  .noProduct p {
    font-size: 13px;
    color: #666;
    line-height: 40px
  }
  .noProduct a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }
  .cancleOrder{
    color: gray !important;
  }
</style>
<style>
  #myoderlist button.or_12.yd-btn.yd-btn-primary{
    border: 1px solid red;
    background-color: #FFFFFF;
    color: red;
    height: .4rem;
    font-size: .3rem;
  }
  #myoderlist div.yd-flexbox-item.or_6.yd-flexbox-item-center{
    /*height:1.8rem*/
  }
  #myoderlist div.yd-flexbox.or_7.yd-flexbox-vertical{
    padding-top: 0.15rem
  }
</style>
