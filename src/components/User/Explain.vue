<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="积分使用说明" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>


    <yd-pullrefresh :callback="getshuju" ref="pullrefreshDemo">
      <yd-accordion accordion style="margin: .3rem;border: 1px solid #dddddd;border-radius: 3px">
        <yd-accordion-item title="会员卡使用说明" open style="font-size: .3rem">
          <div style="padding: .24rem;">
            <p v-for="(item, index) in items" :key="index" style="margin-top: 5px;">{{item.title}}</p>
            <!--<p>2、积分奖励：凭积分可兑换好礼。如：现金券、优惠券、实物奖励等尊宠礼遇。</p>
            <p>3、会员活动：不定期邀请微信会员参加线上游戏和商家活动。</p>-->
          </div>
        </yd-accordion-item>
      </yd-accordion>
    </yd-pullrefresh>


  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
        items:[],
      }
    },
    mounted(){
      this.getshuju();
    },
    methods:{
      getshuju() {

      }
    },
  }
  export default vm;
</script>
<style>

</style>
