<template>
  <div class="personal">
    <yd-navbar slot="navbar" title="个人中心" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <div style="height: 3.5rem; line-height: 3.5rem;text-align:center;" :style="bg">
      <img v-if="userInfo.avatar" @click="gotouser" alt=""  :src="userInfo.avatar" style="display: inline-block;height:2.5rem;width: 2.5rem;vertical-align: middle;border-radius: 50%"/>
      <img v-else @click="gotouser" alt=""  src="../assets/img/touxiang.png" style="display: inline-block;height: 60%;vertical-align: middle;"/>
    </div>
    <yd-cell-group style="margin-top: 0.2rem;margin-bottom:0px" >
      <yd-cell-item arrow>
        <yd-icon slot="icon" name="icon2-copy" size=".42rem" color="#d41d0f" custom></yd-icon>
        <span slot="left"><span>我的订单</span> </span>
        <span slot="right" @click="gotoallorder(1)">全部订单</span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-grids-group :rows="5" id="orderlist" style="margin-top: 0.2rem">
      <yd-grids-item @click.native="gotoallorder(2)">
        <yd-icon slot="icon" name="daifukuan" color="#68696b" custom></yd-icon>
        <div slot="else" v-if="ordernum.PURCHASED>0"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.PURCHASED}}</yd-badge></div>
        <span slot="text" style="color: #666666">待付款</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(3)">
        <yd-icon slot="icon" name="daishouhuo" color="#68696b" custom></yd-icon>
        <div slot="else" v-if="ordernum.SHIPPED+ordernum.CONFIRMED>0"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.SHIPPED+ordernum.CONFIRMED}}</yd-badge></div>
        <span slot="text" style="color: #666666">待收货</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(4)">
        <yd-icon slot="icon" name="daipingjia-copy" color="#68696b" custom></yd-icon>
        <div slot="else" v-if="ordernum.RECEIVED"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.RECEIVED}}</yd-badge></div>
        <span slot="text" style="color: #666666">待评价</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(5)">
        <yd-icon slot="icon" name="yiwancheng" color="#68696b" custom></yd-icon>
        <span slot="text" style="color: #666666">已完成</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoReturnOrder()">
        <yd-icon slot="icon" name="tuihuoguanli" color="#68696b" custom></yd-icon>
        <div slot="else"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;" v-if="1==2">2</yd-badge></div>
        <span slot="text" style="color: #666666">退货</span>
      </yd-grids-item>
    </yd-grids-group>

    <yd-cell-group style="margin-top: 0.2rem;">
      <yd-cell-item arrow type="a" @click.native="gotoshopcar">
        <yd-icon slot="icon" name="gouwuche" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">我的购物车</span>
        <span slot="right" style="font-size: .3rem;">{{quantity}}件商品</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a"  @click.native="coupons">
        <yd-icon slot="icon" name="youhuiquan" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left"> 我的优惠券</span>
        <span slot="right" style="font-size: .3rem;"></span>
      </yd-cell-item>
      <yd-cell-item arrow type="a"  @click.native="mypolicy">
        <yd-icon slot="icon" name="baodanguanli" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">我的保单</span>
      </yd-cell-item>
      <yd-cell-item type="a" @click.native="gotobonushistroy()">
        <yd-icon slot="icon" name="jfxx" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">积分信息</span>
        <span slot="right">{{userInfo.bonus?userInfo.bonus:'0'}}积分</span>
      </yd-cell-item>

      <yd-cell-item arrow type="a" @click.native="gotoGitfs()">
        <yd-icon slot="icon" name="mylp" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">我的礼品</span>
      </yd-cell-item>

      <yd-cell-item arrow type="a" v-if="1==2">
        <yd-icon slot="icon" name="tuijian" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">推荐好友</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="exchange" type="a" href="#" v-if="1==2">
        <yd-icon slot="icon" name="duihuan" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">兑换专区</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="introduct" type="a">
        <yd-icon slot="icon" name="guanyu" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">关于商社车管家</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" href="tel:966888">
        <yd-icon slot="icon" name="kefu" size=".35rem" color="#999999" custom></yd-icon>
        <span slot="left">客服帮助</span>
        <span slot="right" style="font-size: .3rem;">966888</span>
      </yd-cell-item>


      <yd-popup v-model="isshowbounds" position="bottom" height="60%">
        <div style="height: 1rem;line-height: 1rem;border-bottom: 1px solid #edeeef" slot="top">
          <span style="font-size: 0.3rem;color: #666;padding-left: 0.2rem">积分历史</span>
          <div class="close" @click="isshowwl=false"></div>
        </div>
        <yd-timeline>
          <yd-timeline-item v-for="item,index in bonusPointsHistories" :key="index">
            <p>{{item.updatedReason}}</p>
            <p style="margin-top: 10px;" :class="{'grstyle':item.updatedType=='DECREMENT','redstyle':item.updatedType=='INCREMENT'}">{{item.updatedType=='DECREMENT'?'-':item.updatedType=='INCREMENT'?'+':''}}{{item.updatedValue}} <span>&nbsp;&nbsp;&nbsp;{{item.updatedTimestamp|formatDate1}}</span> </p>
          </yd-timeline-item>
        </yd-timeline>
      </yd-popup>

    </yd-cell-group>
  </div>
</template>
<script type="text/babel">
  import {getCookie,baseHttp} from "../config/env"
  import {getStore,setStore} from "../config/mUtils"
  const vm= {
    data() {
      return {
        isCookie:false,
        isshowbounds:false,
        bonusPointsHistories:[],
        quantity:0,
        ordernum:{'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0,'REFUNDING':0},
        shearView:false,
        shearData:{},
        userInfo:{},
        bg:{
          backgroundImage: "url(" + require("../assets/img/grbj.png") + ")",
        }
      }
    },
    activated(){
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getOrderStatus();
        this.getuserInfo();
      }else{
        this.userInfo={};
        this.quantity=0;
        this.ordernum={'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0,'REFUNDING':0};
      }
    },
    methods:{
      /*获取用户信息*/
      getuserInfo(){
        const  that =this;
        baseHttp(this,'/api/personal/info',{},'get','',function (data) {
          if(data){
            that.userInfo=data.info;
          }
        })
      },
      gotouser(){
        if (this.isCookie==true){
          this.$router.push({name:'userInfo'});
        }else{
          this.$router.push({ name: 'loginWithCode'})
        }
      },
      /*加入订单*/
      gotoallorder(index) {
        if (this.isCookie==true){
          this.$router.push({ path: '/personalCenter/myOderList', query: { type: index }})
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      /*进入退货订单*/
      gotoReturnOrder(){
        if (this.isCookie==true){
          this.$router.push({ name: 'salesRetrunList', query: { type: 1 }})
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      /*购物车*/
      gotoshopcar() {
        if (this.isCookie==true){
          this.$router.push({ path: '/shoppingCart'});
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      /*门店*/
      gotostore() {

      },
      /*我的优惠券*/
      coupons() {
        if (this.isCookie==true){
          this.$router.push({ name: 'myCoupons'});
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      /*我的保单*/
      mypolicy(){
        if (this.isCookie==true){
          this.$router.push({ name: 'policyList'});
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      /*兑换*/
      exchange() {

      },
      /*关于*/
      introduct() {

      },
      gotoGitfs(){
        if (this.isCookie==true){
          this.$router.push({ name: 'giftList'});
        }else{
          this.$router.push({ name: 'loginWithCode'});
        }
      },
      gotobonushistroy(){
        if (this.isCookie==true){
          const  that =this;
          baseHttp(this,'/api/customer/bonusPointsHistories',{},'get','获取中...',function (data) {
            if(data.histories.length>0){
              that.bonusPointsHistories=data.histories;
              that.isshowbounds=true;
            }
          });
        }
      },
      /*获取订单数量*/
      getOrderStatus(){
        const  that =this;
        baseHttp(this,'/api/order/status',{},'get','',function (data) {
          if(data.status){
            for(var key in data.status){
              that.ordernum[key]=data.status[key];
            }
          }
        })
      },
      introduct(){
        this.$router.push({ name: 'aboutUs'});
      },
    },
    mounted(){
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getOrderStatus();
        this.getuserInfo();
      }
    },
  }
  export default vm;
</script>
<style>
  .personal .yd-cell:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 0px solid #b2b2b2;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0
  }
  .personal .hairline .yd-scrollview{
    margin-top:0px
  }
  .personal .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before{
    border-right:0px !important;
  }
  .personal .yd-grids-5:before{
    border-bottom:0px !important;
  }
</style>
<style scoped>

</style>
