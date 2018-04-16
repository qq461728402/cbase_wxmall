<template id="personal">
  <yd-layout class="personal">
    <div class="mine_hearder" @click="gotouser()">
      <div class="user_icon">
         <img :src="userInfo.avatar">
      </div>
      <div class="user_detal">
        <p class="user_name">{{userInfo.nickname}}</p>
        <p class="user_des"> <yd-badge type="warning">会员</yd-badge></p>
      </div>
      <div class="manage_account">
        <span>用户管理</span>
        <div class="yd-cell-arrow" style="float: right">
        </div>
      </div>
    </div>
    <yd-cell-group style="margin-top: 0.2rem;margin-bottom:0px" >
      <yd-cell-item arrow>
        <yd-icon slot="icon" name="icon2-copy" size=".42rem" color="#d41d0f" custom></yd-icon>
        <span slot="left"><span>我的订单</span> </span>
        <span slot="right" @click="gotoallorder(1)">全部订单</span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-grids-group :rows="5" id="orderlist" style="margin-top: 0.2rem" >
      <yd-grids-item @click.native="gotoallorder(2)">
        <yd-icon slot="icon" name="daifukuan" color="#5181ee" custom></yd-icon>
        <div slot="else" v-if="ordernum.PURCHASED>0"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.PURCHASED}}</yd-badge></div>
        <span slot="text" style="color: #666666">待付款</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(3)">
        <yd-icon slot="icon" name="daishouhuo" color="#5181ee" custom></yd-icon>
        <div slot="else" v-if="(ordernum.SHIPPED+ordernum.CONFIRMED+ordernum.PAID)>0"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.SHIPPED+ordernum.CONFIRMED+ordernum.PAID}}</yd-badge></div>
        <span slot="text" style="color: #666666">待收货</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(4)">
        <yd-icon slot="icon" name="daipingjia-copy" color="#5181ee" custom></yd-icon>
        <div slot="else" v-if="ordernum.NOT_COMMENT"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;background-color: #d41d0f;">{{ordernum.NOT_COMMENT}}</yd-badge></div>
        <span slot="text" style="color: #666666">待评价</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoallorder(5)">
        <yd-icon slot="icon" name="yiwancheng" color="#5181ee" custom></yd-icon>
        <span slot="text" style="color: #666666">已完成</span>
      </yd-grids-item>
      <yd-grids-item @click.native="gotoReturnOrder()">
        <yd-icon slot="icon" name="tuikuanshouhou" color="#5181ee" custom></yd-icon>
        <div slot="else" v-if="ordernum.RETURN"><yd-badge slot="badge" type="danger" style="position:absolute;right: 0.1rem;top: 0.2rem;">{{ordernum.RETURN}}</yd-badge></div>
        <span slot="text" style="color: #666666">售后/服务</span>
      </yd-grids-item>
    </yd-grids-group>

    <yd-cell-group style="margin-top: 0.2rem;">
      <yd-cell-item arrow type="a" @click.native="gotoshopcar">
        <yd-icon slot="icon" name="gouwuche" size=".35rem" color="#00d3bf" custom></yd-icon>
        <span slot="left">我的购物车</span>
        <span slot="right" style="font-size: .3rem;">{{quantity}}件商品</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a"  @click.native="coupons">
        <yd-icon slot="icon" name="youhuiquan" size=".35rem" color="#5181ee" custom></yd-icon>
        <span slot="left"> 我的优惠券</span>
        <span slot="right" style="font-size: .3rem;"></span>
      </yd-cell-item>
      <yd-cell-item type="a" @click.native="gotobonushistroy()">
        <yd-icon slot="icon" name="jifen" size=".35rem" color="#ff003e" custom></yd-icon>
        <span slot="left">积分商城</span>
        <span slot="right">{{userInfo.bonus?userInfo.bonus:'0'}}积分</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" @click.native="gotoGitfs()" v-if="1==2">
        <yd-icon slot="icon" name="mylp" size=".35rem" color="#ffaa00" custom></yd-icon>
        <span slot="left">我的礼品</span>
      </yd-cell-item>

      <yd-cell-item arrow type="a" v-if="1==2">
        <yd-icon slot="icon" name="tuijian" size=".35rem" color="#ffaa00" custom></yd-icon>
        <span slot="left">推荐好友</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" @click.native="exchange" v-if="1==2" >
        <yd-icon slot="icon" name="duihuan" size=".35rem" color="#ffaa00" custom></yd-icon>
        <span slot="left">兑换专区</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="introduct" type="a">
        <yd-icon slot="icon" name="guanyu" size=".35rem" color="#2e4057" custom></yd-icon>
        <span slot="left">{{title?title:'关于'}}</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" :href="'tel:'+tel">
        <yd-icon slot="icon" name="kefu" size=".35rem" color="#ff003e" custom></yd-icon>
        <span slot="left">客服帮助</span>
        <span slot="right" style="font-size: .3rem;">{{tel}}</span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页"  link="/home">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" link="/category" >
        <yd-icon slot="icon" size="0.54rem" name="fenlei" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="/shoppingCart">
        <yd-icon name="gouwuche" slot="icon" size="0.54rem" custom></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="quantity!=0" style="background-color: #d41d0f;">{{quantity}}</yd-badge>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" type="a" active>
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>
<script type="text/babel">
  import {getCookie,baseHttp} from "../config/env"
  import {getStore,setStore} from "../config/mUtils"
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'userInfo',
        'quantity',
        'title'
      ])
    },
    data() {
      return {
        tel:'',
        isCookie:getStore("token").length>0?true:false,
        bonusPointsHistories:[],
        ordernum:{'PURCHASED':0,'SHIPPED':0,'CONFIRMED':0,'RECEIVED':0,'COMMENTED':0,'FINISHED':0,'REFUNDING':0,'NOT_COMMENT':0,'RETURN':0,'PAID':0},
        shearView:false,
        shearData:{},
        /*bg:{
          backgroundImage: "url(" + require("../assets/img/personbg.png") + ")",
        }*/
      }
    },
    activated(){
      var baseInfo=this.$store.getters.baseInfo;
      this.tel=baseInfo.storePhone;
      this.getOrderStatus();
    },
    methods:{
      gotouser(){
        this.$router.push({name:'userInfo'});
      },
      /*加入订单*/
      gotoallorder(index) {
        this.$router.push({ path: '/personalCenter/myOderList', query: { type: index },meta:{keepAlive:false}})
      },
      /*进入退货订单*/
      gotoReturnOrder(){
        this.$router.push({ name: 'salesRetrunList'})
      },
      /*购物车*/
      gotoshopcar() {
        this.$router.push({ path: '/shoppingCart'});
      },
      /*门店*/
      gotostore() {

      },
      /*我的优惠券*/
      coupons() {
        this.$router.push({ name: 'myCoupons'});
      },
      /*我的保单*/
      mypolicy(){
        this.$router.push({ name: 'policyList'});
      },
      /*兑换*/
      exchange() {

      },
      gotoGitfs(){
        this.$router.push({ name: 'giftList'});
      },
      gotobonushistroy(){
        this.$router.push({ name: 'PointsList'});
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
//    mounted(){
//      this.getOrderStatus();
//    },
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
  .personal .yd-grids-item{
    padding:.28rem 0;
  }
  .personal .yd-grids-item .yd-grids-icon i{
    font-size: 0.5rem !important;
  }
  #orderlist .yd-grids-txt{
    padding:0;
  }
</style>
<style scoped>
  .mine_hearder{
    height: 2.8rem;
    line-height: 2.8rem;
    background: linear-gradient(90deg,#eb3c3c,#ff7459);
    box-shadow:0 2px 5px rgba(255,98,98,.4);
    width: 100%;
  }
  .mine_hearder .user_icon{
    float: left;
    vertical-align: middle;
    margin-right: 0.2rem;
    margin-left: 0.6rem;
    position: relative;
  }
  .mine_hearder .user_icon img{
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    top:0.6rem
  }
  .mine_hearder .user_detal{
    float: left;
    color: #fff;
    margin-top: 0.8rem;
  }
  .mine_hearder .user_name{
    font-size: 0.3rem;
    font-weight: 600;
    line-height: 0.6rem;
  }
  .mine_hearder .user_des{
    font-size: 0.2rem;
    font-weight: 600;
    line-height: 0.2rem;
  }
  .manage_account {
    float: right;
    color: #E6B2B0;
    margin-right: 10px;
    font-size: 0.25rem;
  }
</style>

