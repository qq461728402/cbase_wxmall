<template>
  <yd-layout id="getcou">
    <yd-navbar slot="navbar" title="优惠券" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <ul class="yd-scrollnav-tab-item" style="color: rgb(255, 0, 0); height: 0.9rem;" id="scroll" slot="navbar" v-if="tablist.length>1">
      <li :class="{'yd-scrollnav-current':selettype==item.type}" style="color: rgb(51, 51, 51);" v-for="item in tablist" @click="switchlist(item.type,$event)"><i></i><span>{{item.name}}</span></li>
    </ul>
    <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div slot="list" v-for="item in couponslist" style="margin: 0.2rem;">
          <yd-flexbox style="background-size: 100% 100%;border-radius: 0.15rem" :style='bg' >
            <div  style="overflow:hidden; padding: 0.15rem;height: 1.8rem;width: 1.8rem;">
              <img src="@/assets/img/defuletCoupons1.png" style="height: 1.5rem;width: 1.5rem;border: 1px solid #f2f2f2" v-if="!item.imgUrl">
              <img :src="item.imgUrl" style="height: 1.5rem;width: 1.5rem" v-else>
            </div>
            <yd-flexbox-item style="height:1.8rem;">
              <yd-flexbox direction="vertical" style="padding-top: 0.15rem">
                <yd-flexbox-item><p style="font-size: 0.3rem;font-weight: bold;height: 1rem">{{item.name}}</p></yd-flexbox-item>
                <yd-flexbox-item><span style="font-size: 0.4rem;color: #f00;padding-right: 0.2rem">{{item.discount}}<i style="font-size: 0.25rem">现金劵</i></span><span style="color: #f00;background-color:#ffebdb;padding: 0.05rem;font-size: 0.25rem">{{item.orderRequirement>0?'满'+item.orderRequirement+'可用':'无金额门槛'}}</span>
                </yd-flexbox-item>
              </yd-flexbox>
            </yd-flexbox-item>
            <div align="center">
              <div style="width: 1.6rem;height: 1.5rem;padding: 0.15rem;">
                <yd-progressbar :progress="(item.quantity-item.quantityAvailable) / (item.quantity+0.0)" trail-width="10" stroke-width="10" stroke-color="#ffb7b8" trail-color="#f13130" fill-color="#ffffff">已抢
                  <yd-countup :endnum="(item.quantity-item.quantityAvailable) / (item.quantity+0.0)*100" :duration="0.5" suffix="%"></yd-countup>
                </yd-progressbar>
              </div>
              <div style="width: 1.6rem; text-align: center;padding-bottom: .15rem;">
                <yd-button type="danger" style="font-size: .25rem;width: 1rem" bgcolor="#f13130" color="#ffffff" @click.native.stop="getCoupos(item)">{{(item.bonusPoints&&item.bonusPoints>0)?(item.bonusPoints+'积分'):'立即购买'}}</yd-button>
              </div>
            </div>
          </yd-flexbox>
        </div>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip" style="display: none">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <div class="noProduct" v-if="couponslist.length==0&&count!=1">
      <img src="../../../assets/img/myyhq.png">
      <p>没有优惠券领取</p>
    </div>
    <couponpop v-if="isbuy" @confirmok="couponbuy" @cancel="couponcancel" ref="coupon"></couponpop>
  </yd-layout>
</template>
<script type="text/ecmascript-6">

  import {wftPay} from '@/config/weichatPay'
  import { mapGetters } from 'vuex'
  import couponpop from '@/views/couponPop'
  const vm= {
    computed: {
      ...mapGetters([
        'customerinfo',
      ])
    },
    components: {
      couponpop
    },
    data() {
      return {
        isbuy:false,
        page:1,
        pageSize:10,
        couponnum:{},
        couponslist:[],
        count:1,
        selettype:'CASH_COUPON',
        tablist:[{type:'CASH_COUPON',name:'现金券'}],
        bg:{
            background: "url(" + require("../../../assets/img/bj.jpg") + ")",
        }
      }
    },
    mounted(){
      this.page=1;
      this.couponlist(false);
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      switchlist(key,e) {
        this.selettype=key;
        document.getElementById('scroll').scrollLeft=e.currentTarget.offsetLeft-10;
        this.page=1;
        this.couponlist(false);
      },
      couponlist(isrefresh){
        var pars={page:this.page,pageSize:this.pageSize};
        pars.type=this.selettype;
        const  that =this;
       this.apiRequest('/api/coupon/list',pars,'get',(isrefresh==false&&this.page==1)?'加载中...':'',function (data) {
          that.count=2;
          if(that.page==1){
            if(data.coupons) {
              that.couponslist=data.coupons;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }else{
            if(data.coupons){
              that.couponslist=that.couponslist.concat(data.coupons);
              if(data.coupons&&data.coupons.length != this.pageSize){
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
        this.couponlist(true);
      },
      /* 上拉加载更多 */
      loadList() {
        this.page=this.page+1;
        this.couponlist(true);
      },
      /* 点击领取优惠券*/
      getCoupos(item){
        this.isbuy = true;
        this.$nextTick( ()=> {
          this.$refs.coupon.init(item)
        })
      },
      couponcancel(){
        this.isbuy=false;
      },
      couponbuy(item,code){
        this.isbuy=false;
       this.apiRequest('/api/order/prePayCoupon',{'confirmCode':code,'coupon_id':item.id,'customer_id': this.customerinfo.customerId},'get','正在购买', data => {
//          this.$store.dispatch('setrouter',that.$route.fullPath);
//          this.$router.push({ name: 'orderpay', query: { token_id: data.payInfo.token_id }})
          wftPay(data.payInfo,res=> {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              item.quantityAvailable=item.quantityAvailable-1;
              that.$dialog.alert({mes: '支付成功,请到我的优惠券查看'});
//              this.$router.replace({ name: 'orderSuccess', params: {payMoney:item.price}});
            }else if(res.err_msg =="get_brand_wcpay_request:cancel"){
              that.$dialog.toast({
                mes: '支付取消',
                timeout: 2000,
              });
            }else if(res.err_msg =="get_brand_wcpay_request:fail"){
              that.$dialog.toast({
                mes: '支付失败! 请重新支付',
                timeout: 2000,
              });
            }
          },fail=> {
            this.$dialog.toast({
              mes: '支付取消',
              timeout: 2000,
            });
          })

        })

      },
    },
  }
  export default vm;
</script>
<style scoped>
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
</style>

<style>
  #getcou .yd-scrollnav-tab-item::-webkit-scrollbar {
    display: none
  }
  #getcou .yd-scrollnav-tab-item{
    overflow-x:scroll;
    flex:initial;
    background-color: white;
  }
</style>
