<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="积分中心" bgcolor="#d41d0f" color="#FFF">
      <router-link>
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>


    <div style="background: linear-gradient(90deg,#eb3c3c,#ff7459);box-shadow:0 2px 5px rgba(255,98,98,.4);width: 100%;height: 130px;">
      <div style="font-size: 14px;padding-top: 20px;font-weight: bold;text-align: center;color: rgba(76,0,0,.7);">你的可用积分</div>
      <div style="font-size: 48px;color: #ffffff;text-align: center">10</div>
      <div style="font-size: 14px;color: hsla(0,0%,100%,.7);text-align: center">V1 会员 ></div>
    </div>


    <div>
      <yd-step current="7" current-color="#F0870C">
        <yd-step-item>
          <span slot="top">1天</span>
          <span slot="bottom">+1</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">2天</span>
          <span slot="bottom">+2</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">3天</span>
          <span slot="bottom">+3</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">4天</span>
          <span slot="bottom">+4</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">5天</span>
          <span slot="bottom">+5</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">6天</span>
          <span slot="bottom">+6</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="top">7天</span>
          <span slot="bottom">+7</span>
        </yd-step-item>
      </yd-step>
    </div>


    <div style="text-align: center;width: 100%;height: 1rem;overflow: hidden;line-height: 1rem;">
      <yd-button type="danger" style="width: 2rem;border-radius: 1rem">签到</yd-button>
    </div>
    <div style="width: 100%;height: 10px; background-color: #eeeeee"></div>


    <div>
      <div style="font-size: 14px;width: 100%;text-align: center;padding-top: 20px;"><span>积分</span>&nbsp;<span style="font-weight: bold">兑好礼</span></div>
      <div style="width: 100%;text-align: center;color: #999999;padding-top: 10px;">小积分&nbsp;换好礼&nbsp;会员专享&nbsp;每月更新</div>
      <div style="padding-top: 10px;">
        <yd-list theme="3" style="border-top: 1px solid #eeeeee">
          <yd-list-item v-for="item, key in list" :key="key">
            <img slot="img" :src="item.img">
            <span slot="title" style="font-weight: normal;color: #000;">{{item.title}}</span>
            <yd-list-other slot="other">
              <div>
                <span class="demo-list-price" style="color: red;font-size: .3rem">{{item.price}}积分</span>
                <span class="demo-list-del-price" style="text-decoration:line-through;">¥{{item.w_price}}</span>
              </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
      </div>
      <div style="width: 100%;text-align: center;height: 2rem;line-height: 2rem">
        <yd-button type="hollow" style="width: 2rem;height: .8rem;border: 1px solid #999999;color: #666666;border-radius: 2rem" @click.native="gotoPointsList()">查看全部</yd-button>
      </div>
    </div>
    <div style="width: 100%;height: 10px; background-color: #eeeeee"></div>
    <div>
      <div style="font-size: 14px;width: 100%;text-align: center;padding-top: 20px;"><span>积分好礼</span>&nbsp;<span style="font-weight: bold">轻松得</span></div>
      <div style="width: 100%;text-align: center;color: #999999;padding-top: 10px;">聚少成多&nbsp;积小致巨</div>
      <div style="width: 100%;padding-top: 10px" align="center">
        <div>
          <img src="../../../assets/xinjian/gw1.png" style="width: 95%;border-radius: 3px">
        </div>
        <div style="margin-top: 10px">
          <img src="../../../assets/xinjian/gw2.png" style="width: 95%;border-radius: 3px">
        </div>
      </div>
      <div style="width: 100%;text-align: center;padding-top: 20px;">— 更多任务敬请期待 —</div>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
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

</style>
