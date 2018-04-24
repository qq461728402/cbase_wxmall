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
                <yd-flexbox-item><p style="font-size: 0.3rem;font-weight: bold;height: 1rem">{{item.description}}</p></yd-flexbox-item>
                <yd-flexbox-item><span style="font-size: 0.4rem;color: #f00;padding-right: 0.2rem">{{item.discount}}</span><span style="color: #f00;background-color:#ffebdb;padding: 0.05rem;font-size: 0.25rem">{{item.orderRequirement>0?'满'+item.orderRequirement+'可用':'无金额门槛'}}</span>
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
                <yd-button type="danger" style="font-size: .25rem;width: 1rem" bgcolor="#f13130" color="#ffffff" @click.native.stop="getCoupos(item)">{{(item.bonusPoints&&item.bonusPoints>0)?(item.bonusPoints+'积分'):'立即领取'}}</yd-button>
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
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  const vm= {
    data() {
      return {
        page:1,
        pageSize:10,
        couponnum:{},
        couponslist:[],
        count:1,
        selettype:'OFFLINE_COUPON',
        tablist:[{type:'OFFLINE_COUPON',name:'代金券'}],
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
        baseHttp(this,'/api/coupon/list',pars,'get',(isrefresh==false&&this.page==1)?'加载中...':'',function (data) {
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
        if (item.bonusPoints>0){
          this.$dialog.confirm({
            title: '温馨提示',
            mes: '您确定积分兑换优惠券',
            opts: () => {
              this.sureCoupos(item);
            }
          });
        }else{
          this.sureCoupos(item);
        }
      },
      sureCoupos(item){
        baseHttp(this,'/api/coupon/get',{'couponId':item.id},'get','正在领取', data => {
          this.$dialog.toast({
            mes: '领取成功!',
            timeout: 2000,
          });
          item.quantityAvailable=item.quantityAvailable-1;
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
