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
        <img v-lazy="img">
        <img v-lazy="img2">
        <img v-lazy="img2">
        <img v-lazy="img2">
        <img v-lazy="img">
        <img v-lazy="img">
        <img v-lazy="img">
        <img v-lazy="img">
        <img v-lazy="img">
        <img v-lazy="img">
      </div>
    </van-cell-group>
    <van-goods-action solt="tabbar">
      <van-goods-action-mini-btn icon="chat" text="客服" />
      <van-goods-action-mini-btn icon="cart" text="购物车" />
      <van-goods-action-big-btn text="开团" primary  @click="showBase=!showBase"/>
    </van-goods-action>
    <van-sku slot="tabbar"
             v-model="showBase"
             :sku="sku"
             :goods="goods"
             :goods-id="goodsId"
             :hide-stock="sku.hide_stock"
             :quota="0"
             :reset-stepper-on-hide="sku.resetStepperOnHide"
             :reset-selected-sku-on-hide="sku.resetSelectedSkuOnHide"
             @buy-clicked="gotoOder">
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">下一步</van-button>
        </div>
      </template>
    </van-sku>

  </yd-layout>
</template>
<script type="text/babel">
  import { Swipe, SwipeItem,Cell,CellGroup,Col, GoodsAction, GoodsActionBigBtn,GoodsActionMiniBtn,Sku,Button} from 'vant';
  import {baseHttp} from '../../../config/env'
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
      [Sku.name]:Sku,
      [Button.name]:Button,
    },
    data() {
      return {
        showBase:false,
        img:'https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp',
        img2:'https://img.yzcdn.cn/upload_files/2015/01/16/bbbc927a68c9159f9d39ea84ed7a66d2.jpg?imageView2/2/w/980/h/980/q/75/format/webp',
        images: [
          'https://img.yzcdn.cn/upload_files/2015/01/16/7a30ba768d2984b5e83c279afb6098a6.jpg?imageView2/2/w/980/h/980/q/75/format/webp',
          'https://img.yzcdn.cn/upload_files/2015/01/16/bbbc927a68c9159f9d39ea84ed7a66d2.jpg?imageView2/2/w/980/h/980/q/75/format/webp'
        ],
        promotionId:'',
        securitylst:['正品保障','正规发票','自营门店'],
        sku: {
          tree: [],
          list: [],
          none_sku: true, // 是否无规格商品
          messages: [ {
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0' // 是否必填 '1' 表示必填
          }],
          hide_stock: false, // 是否隐藏剩余库存
          resetStepperOnHide:true,//窗口隐藏时重置选择的商品数量
          resetSelectedSkuOnHide:true,//窗口隐藏时重置已选择的sku
        },
        goods: {},
        goodsId:'',
        endTime:'',//活动结束时间
      }
    },
    mounted(){
      this.promotionId =this.$route.query.promotionId;
      this.getDetail();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      getDetail(){
        const  that =this;
        baseHttp(this, '/api/promotion/detail', {'promotionId': this.promotionId}, 'get', '加载中...', function (data) {
          var tree=[];
          var promotion=data.promotion;
          promotion.endTime;
          if(promotion.attrs){
            promotion.attrs.forEach(function (item) {
              var treelst={};
              for(var key in item){
                treelst.k=key;
                treelst.k_s=key;
                treelst.v=[];
                for(var vkey in item[key]){
                  treelst.v.push({id:item[key][vkey],name:item[key][vkey]});
                }
              }
              tree.push(treelst);
            })
            that.sku.tree=tree;
          }
          if(promotion.skuModels){
            that.sku.none_sku=false;
            promotion.skuModels.forEach(function (item) {
              for (var key in item.attrs){
                eval("item."+key+"=\""+item.attrs[key]+"\"");
              }
              item.id=item.skuId;
              item.stock_num=item.stock;
              item.price=item.price*100;
            })
            that.sku.list=promotion.skuModels;
          }
          if(promotion.skuModels){
           var defelutModel = promotion.skuModels[0];
            that.sku.stock_num=defelutModel.stock;
            that.sku.price=defelutModel.price;
            that.sku.collection_id=defelutModel.skuId;
            that.goods.picture=defelutModel.image;
          }
        })
      },
      gotoOder(skuData){

      }
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
