<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="商品详情" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-tab style="margin-bottom: 50px">
      <yd-tab-panel label="商品">
        <yd-slider autoplay="3000">
          <yd-slider-item v-for="(item, index) in list" :key="index">
            <a href="">
              <img :src="item.img">
            </a>
          </yd-slider-item>
        </yd-slider>
        <div style="border-top: 1px solid #eeeeee;height: 120px;border-bottom: 10px solid #eeeeee">
          <p style="font-size: 14px;text-align: center;padding-top: 20px">澳佳宝 深海无腥味鱼油胶囊400粒</p>
          <p style="font-size: 12px;text-align: center;padding-top: 10px;color: #999999;">富含不饱和脂肪酸</p>
          <p style="text-align: center;padding-top: 10px">
            <em style="color: red;font-size: 16px;font-weight: bold">1560积分</em>
            <em style="text-decoration: line-through;font-size: 14px;color: #999999;">￥156.23</em>
          </p>
        </div>
        <div style="padding: .3rem;border-bottom: 10px solid #eeeeee;" @click="show1 = true">
          <span style="margin-left: .1rem"><yd-icon name="checkoff" style="color: red"></yd-icon><i>正品保障</i></span>
          <span style="margin-left: .1rem"><yd-icon name="checkoff" style="color: red"></yd-icon><i>正规发票</i></span>
          <span style="margin-left: .1rem"><yd-icon name="checkoff" style="color: red"></yd-icon><i>自营门店</i></span>
        </div>
        <yd-cell-group id="info">
          <yd-cell-item>
            <span slot="left" class="spxq14">商家</span>
            <span slot="left" class="spxq16">大坪商都</span>
          </yd-cell-item>
        </yd-cell-group>
      </yd-tab-panel>

      <yd-tab-panel label="详情">
        <yd-cell-item style="border-bottom: 1px solid #D9D9D9;" >
          <span slot="left" class="qbpj1"><em style="color: #d41d0f;font-size: .4rem;">|</em>&nbsp;规格参数</span>
        </yd-cell-item>
        <table class="gridtable">
          <tr style="height: .8rem;">
            <th>等级</th>
            <th></th>
          </tr>
          <tr style="height: .8rem;">
            <th>规格</th>
            <th></th>
          </tr>
          <tr style="height: .8rem;">
            <th>单位</th>
            <th></th>
          </tr>
          <tr style="height: .8rem;">
            <th>产地</th>
            <th></th>
          </tr>
        </table>
        <yd-cell-item style="border-top: 8px solid #f5f5f5;">
          <span slot="left" class="qbpj1"><em style="color: #D41D0F;font-size: .4rem;">|</em>&nbsp;商品详情</span>
        </yd-cell-item>
        <img src="" style="width: 100%;">
      </yd-tab-panel>

      <yd-tab-panel label="评价">
        <yd-cell-item class="qbpj" style="background-color: #fff">
          <span slot="left" class="qbpj1">全部评价(<span style="color: #d41d0f">{{pinglun>0?pinglun:0}}</span>)</span>
        </yd-cell-item>
        <ul style="background-color: #fff">
          <li style="border-bottom: 1px solid #ebeced">
            <yd-flexbox style="padding-top: 0.2rem">
              <div style="width: 1rem;height: 1rem;overflow: hidden;border-radius: 50%;border: 1px solid #edeeef;margin-left: 0.2rem ">
                <img src="" style="width: 100%;height: 100%;"></div>
              <yd-flexbox-item style="margin-left: 0.2rem">
                <yd-flexbox direction="vertical">
                  <yd-flexbox-item style="line-height: 0.6rem;font-size: 0.3rem">豆豆</yd-flexbox-item>
                  <yd-flexbox-item><yd-rate size=".3rem" color="#d41d0f" active-color="#d41d0f"></yd-rate></yd-flexbox-item>
                </yd-flexbox>
              </yd-flexbox-item>
              <div style="padding-right: .3rem;color: #9a9b9c">2018/03/05</div>
            </yd-flexbox>
            <yd-flexbox style="margin-left: 1.4rem;margin-top: 0.2rem">
              <div style="color: #666869">好好好</div><!--用户评论-->
            </yd-flexbox>
            <yd-flexbox style="margin-bottom: 0.2rem">
              <yd-lightbox class="pj_9">
                <yd-lightbox-img v-for="(item, index) in list" :key="index" :src="item.img" class="xqpjtp1"></yd-lightbox-img>
              </yd-lightbox>
            </yd-flexbox>
            <div style="padding: .1rem;">
              <p style="background-color: #edeeef;padding: .2rem;">
                <span style="color: rgb(255, 125, 73);" >官方回复：</span>哈哈哈
              </p>
            </div>
          </li>
        </ul>
        <yd-button size="large" class="pj_12" @click.native="gotoReview()">查看全部评论</yd-button>
      </yd-tab-panel>
    </yd-tab>


    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" />
      <van-goods-action-big-btn text="立即兑换" @click="showBase=!showBase" primary />
    </van-goods-action>


    <yd-popup v-model="show1" position="bottom" height="50%">
      <div style="display: flex;text-align:center;" slot="top">
        <p style="padding: 0.2rem;line-height: 0.4rem;font-size: 0.3rem;width: 98%">服务说明</p>
        <yd-icon slot="icon" name="quxiao" color="#c1c2c3" size="0.5rem" custom @click.native="show1 = false"></yd-icon>
      </div>
      <ul class="security">
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zpbz" color="#ff0000" size="0.35rem" custom></yd-icon>正品保障</p>
          <p style="color: #808390;padding-left: 0.4rem">配件由商社易配提供、装饰内容商品商社美容提供</p>
        </li>
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zymd" color="#5a62b4" size="0.35rem" custom></yd-icon>自营门店</p>
          <p style="color: #808390;padding-left: 0.4rem">商社汽贸旗下各品牌4S店提供线下服务</p>
        </li>
        <li>
          <p style="font-size: 0.3rem"><yd-icon slot="icon" name="zgfp" color="#5a62b4" size="0.35rem" custom></yd-icon>正规发票</p>
          <p style="color: #808390;padding-left: 0.4rem">提供个人发票、增值税普通发票和增值税专用发票，增值税发票需提供单位名称和税号。服务类商品由线下服务门店提供发票。</p>
        </li>
      </ul>
    </yd-popup>

  </yd-layout>
</template>
<script type="text/babel">
  import {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku
  } from 'vant';
  const vm= {
    components: {
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
      [Sku.name]:Sku
    },
    data() {
      return {
        showBase:'',
        show1:false,
        pinglun:12,


        list: [
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 1560, w_price: 156.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 2560, w_price: 256.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 3560, w_price: 356.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 4560, w_price: 456.23},
        ]

      }
    },
    mounted(){

    },
    methods:{

      gotoPointsList() {
        this.$router.push({ path: '/home/PointsList'})
      },

    },

  }
  export default vm;
</script>
<style>
.yd-icon-checkoff{
  font-size: .3rem!important;
}
.security{
  padding: 0 0.2rem;
}
.security li{
  padding: 0.2rem;
}
.security li:not(:last-child){
  border-bottom: 1px solid #ebf0f1;
}
.spxq14{
  color: rgb(129, 131, 142);
}
.spxq16{
  margin-left: 10px;
}
.qbpj1 {
  color: #8f8f94;
}
/*详情页面*/
table.gridtable {
  width: 100%;
  font-family: verdana,arial,sans-serif;
  font-size:.25rem;
  color:#8f8f94;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #D9D9D9;
  border-top: none;
}

  /*评价*/
.xqpjtp1 {
  float: left;
  width: 1.55rem;
  height: 1.55rem;
  padding-right: .1rem;
  padding-top: .1rem;
}
.pj_9 {
  margin-left: 1.2rem;
  margin-top: .2rem;
}
.pj_9 img:not(:first-child){
  margin-left: 0.1rem;
}
.pj_12.yd-btn-block.yd-btn-primary {
  margin-top: 0px;
  background-color: #FFFFFF;
  color: #8f8f94;
  font-size: .3rem;
}
</style>
