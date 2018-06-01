<template>
  <yd-layout id="myoderlist">
    <yd-navbar slot="navbar" title="我的订单" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-tab slot="navbar" :callback="switchlist">
      <yd-tab-panel label="全部"  tabkey="ALL" :active="type==1"></yd-tab-panel>
      <yd-tab-panel :label="ordernum.PURCHASED>0?'待付款('+ordernum.PURCHASED+')':'待付款'" tabkey="PURCHASED" :active="type==2"></yd-tab-panel>
      <yd-tab-panel :label="(ordernum.PAID+ordernum.SHIPPED+ordernum.CONFIRMED)>0?'待收货('+(ordernum.SHIPPED+ordernum.CONFIRMED+ordernum.PAID)+')':'待收货'" tabkey="SHIPPED" :active="type==3"></yd-tab-panel>
      <yd-tab-panel :label="ordernum.NOT_COMMENT>0?'待评价('+ordernum.NOT_COMMENT+')':'待评价'" tabkey="NOT_COMMENT" :active="type==4"></yd-tab-panel>
      <yd-tab-panel label="已完成" tabkey="FINISHED" :active="type==5"></yd-tab-panel>
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
              <p class="orderNumber" v-if="item.orderType!='EXCHANGE'">总价:&nbsp;<span style="color: #313131">&yen;{{item.totleFee}}</span></p>
              <p class="orderNumber" v-else>积分:&nbsp;<span style="color: #313131">{{item.bonusPointsUsed}}</span></p>
            </van-col>
            <van-col span="12" style="text-align: right;padding-right: .2rem;">
              <yd-button type="hollow" style="border: 1px solid #d41d0f;color: #d41d0f;height: .5rem;margin-top: 0.15rem" v-if="item.status=='PURCHASED'" @click.native.stop="gotoPay(item)">去支付</yd-button>
              <yd-button type="hollow" style="border: 1px solid #d41d0f;color: #d41d0f;height: .5rem;margin-top: 0.15rem" v-else-if="item.status=='SHIPPED'" @click.native.stop="affirmOrder(item)">确认收货</yd-button>

              <yd-button type="hollow" style="border: 1px solid #d41d0f;color: #d41d0f;height: .5rem;margin-top: 0.15rem" v-else-if="statuses=='NOT_COMMENT'" @click.native.stop="appraise(item)">评价晒单</yd-button>

            </van-col>
          </van-row>
          <van-row style="padding: 0.2rem;">
            <goods :item="item" :showQuantity="false"></goods>
          </van-row>
          <hr style="border: none;border-bottom:8px solid #f5f5f5;"/>
        </div>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <div class="noProduct" v-if="oderlist.length==0&&isoderlist==true">
      <img src="../../assets/img/cleanOder.png">
      <p>您还没有相关订单</p>
    </div>
    <confirmpop v-if="isreceived"  @confirmok="confirmok" ref="confirmPop"></confirmpop>

  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,formatDate} from '@/config/env'
  import  {getStore,removeStore} from '@/config/mUtils'
  import {wexinPay,wftPay} from '@/config/weichatPay'
  import {Row, Col} from 'vant';
  import goods from '@/views/goods'
  import confirmpop from '@/views/confirmpop'
  const vm= {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      goods,
      confirmpop
    },
    data() {
      return {
        isreceived:false,
        isoderlist:false,
        type:'',
        page: 1,
        pageSize: 10,
        statuses:'',
        ordernum:{'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0,'PAID':0},
        oderlist:[],
        payInfo:{},
      }
    },
    mounted(){
      this.type=this.$route.query.type;
      if(this.type==1){
        this.statuses='ALL';
      }else if(this.type==2){
        this.statuses='PURCHASED';
      }else if(this.type==3){
        this.statuses='SHIPPED';
      }else if(this.type==4){
        this.statuses='NOT_COMMENT';
      }else if(this.type==5){
        this.statuses='FINISHED';
      }
      this.ordernum={'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0,'NOT_COMMENT':0,'PAID':0};
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
        var pars={page:this.page,pageSize:this.pageSize,store:this.$store.getters.store};
        if(this.statuses.length!=0&&this.statuses!='NOT_COMMENT'){
          pars.status=this.statuses;
        }
        var api ='/api/order/orders';
        if(this.statuses=='NOT_COMMENT'){
         api='/api/order/orders/nocomment';
        }
        const  that =this;
        baseHttp(this,api,pars,'get',this.page==1?'加载中...':'',function (data){
          if(that.page==1){
            if(data.orders) {
              that.isoderlist=false;
              that.oderlist=data.orders;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              that.isoderlist=true;
              that.oderlist=[];
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
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
      appraise(item){
        var orderItem = [{skuName:item.skuName,salePrice:item.totleFee,imageUrl:item.url}];
        if (this.canComment == false) {
          this.$dialog.toast({
            mes: '您不能评价该订单',
            timeout: 2000,
          });
          return;
        }
        this.$router.push({ name: 'orderAppraise',query:{orderNumber:item.number,storeId:item.storeId}, params:orderItem,meta:{title:'订单评价'}});

      },
      /*确认收货*/
      affirmOrder(item){
        if (item.storeId){
          this.isreceived = true;
          this.$nextTick( ()=> {
            this.$refs.confirmPop.init(item.orderId,item.storeId)
          })
        }else{
          this.$dialog.alert({mes: '订单异常!'});
        }
      },
      confirmok(){
          this.getOrderStatus();
          this.pullList();
      },
      /*进入商品详情*/
      gotoOderDetail(item){
        this.$router.push({ name: 'orderDetail', query: { orderId: item.orderId }});
      },
      gotoPay(item){
        this.$dialog.loading.open('支付中...');
        const  that= this;
        baseHttp(this,'/api/order/rePay',{'orderId':item.orderId},'post','',function (data){
          that.perPay(data);
        })
      },
      perPay(data){
        const that = this;
        baseHttp(this, '/api/order/prePay', data, 'post', '', function (data) {
          that.payInfo = data.payInfo;
          that.$dialog.loading.close();
//          window.location.href =  "https://pay.swiftpass.cn/pay/jspay?token_id="+that.payInfo.token_id+"&showwxtitle=1";
//          that.$store.dispatch('setrouter',that.$route.fullPath);
//          that.$router.push({ name: 'orderpay', query: { token_id: that.payInfo.token_id }})
          wftPay(data.payInfo,function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              that.$router.replace({ name: 'orderSuccess', params: { payMoney:that.paytotalFee}})
            }else if(res.err_msg =="get_brand_wcpay_request:cancel"){

           }else if(res.err_msg =="get_brand_wcpay_request:fail"){
              that.$dialog.toast({
                mes: '支付失败! 请重新支付',
                timeout: 2000,
              });
            }
          },function (fail) {
            that.$dialog.toast({
              mes: '支付失败! 请重新支付',
              timeout: 2000,
            });
          })
        });
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
