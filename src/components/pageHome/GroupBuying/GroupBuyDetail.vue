<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="商品详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index" class="thumb">
        <img :src="image"/>
      </van-swipe-item>
    </van-swipe>

    <van-cell-group id="active">
      <van-cell class="actvie" >
        <van-col span="10"><div class="price"><span>$33.00</span> <span class="del_price"><em>¥</em>$33</span></div></van-col>
        <van-col style="position: absolute;right: 10px"><div>距活动结束时间还剩</div><div><span>
          <yd-countdown slot="right" time="2018/09/08 00:00:00" id="times">
          <span><em>{%d0}</em><em>{%d1}</em><em>{%d2}</em></span> 天
          <span><em>{%h1}</em><em>{%h2}</em></span>小时
          <span><em>{%m1}</em><em>{%m2}</em></span>时
          <span><em>{%s1}</em><em>{%s2}</em></span>秒
        </yd-countdown></span></div></van-col>
      </van-cell>
      <van-cell>
        <div class="goods-title">[哈哈啊]aad发送到发顺丰哈市发哈水电费哈佛哈闪电发货</div>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 0.2rem">
      <van-cell>
        <van-col span="10" style="color:#9c9c9c">运费：500</van-col>
        <van-col span="14" style="text-align: right;color:#9c9c9c">剩余：400</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.2rem">
      <van-cell>
        <button class="security" v-for="securityitem in securitylst"><yd-icon name="gouxuan" size=".3rem" color="#ff7723"  custom></yd-icon>{{securityitem}}</button>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 0.2rem;margin-bottom: 1.2rem">
      <van-cell>
         商品详情
      </van-cell>
      <div class="detal">
        <img src="https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp">
        <img src="https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp">
        <img src="https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp">
        <img src="https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp">
      </div>
    </van-cell-group>


    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>

  </yd-layout>
</template>
<script type="text/babel">
  import { Swipe, SwipeItem,Cell,CellGroup,Col, GoodsAction, GoodsActionBigBtn,GoodsActionMiniBtn} from 'vant';
  const vm= {
    components: {
      [Swipe.name]:Swipe,
      [SwipeItem.name]:SwipeItem,
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
      [Col.name]:Col,
      [GoodsAction.name]:GoodsAction,
      [GoodsActionBigBtn.name]:GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]:GoodsActionMiniBtn,
    },
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp',
          'https://img.yzcdn.cn/upload_files/2015/01/16/bbbc927a68c9159f9d39ea84ed7a66d2.jpg?imageView2/2/w/980/h/980/q/75/format/webp'
        ],
        securitylst:['正品保障','正规发票','自营门店'],
      }
    },
    mounted(){

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
    },

  }
  export default vm;
</script>
<style scoped>
  .thumb {
    width: 100%;
    background-color: #f4f4f4;
    text-align: center;
  }
  .thumb img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .goods-title{
    font-size: 0.3rem;
    line-height: 1.5;
    font-weight:500;
    margin: 0.1rem 0;
  }
  .actvie{
    color:#ffffff;
    background-color: #ff002c;
    font-size: 12px;
    line-height:0.4rem;
  }
  .actvie .price{
    line-height: 0.8rem;
    font-size: 0.35rem;
    font-weight: bold;
  }
  .actvie .del_price{
    color: #ebeced;
    font-size: 0.25rem;
    text-decoration: line-through
  }
  #active .van-cell{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  #times span{
     color: #ff002c;
     background-color: #ffffff;
     border-radius: 2px;
     padding: 0 2px;
  }
  .security{
    line-height: 0.6rem;
    margin-right: 0.2rem;
    border: none;
  }
  .detal{
    width: 100%;
    text-align: center;
  }
  .detal img{
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
