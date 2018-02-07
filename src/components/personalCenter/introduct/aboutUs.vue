<template>
  <yd-layout style="background-color: white">
    <yd-navbar slot="navbar" title="关于商社车管家" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="introduct" style="padding: 25px 15px 5px 15px;">
      <h3 style="color: #4d4d4d;text-align: center;font-weight: bold;font-size: .3rem;">行业标杆，汽车专家</h3>
      <div class="info" >
        <p style="font-size: .25rem; color: #666666;line-height: .5rem;margin-bottom: .3rem; position: relative;padding-left:.3rem;">商社汽贸隶属重庆百货大楼股份有限公司，注册资金人民币1亿元，是专门从事汽车销售及后市场服务的经营实体。旗下拥有超过20家4S店和综合服务机构，覆盖重庆主城及区县市场。代理<u>保时捷、奔驰、奥迪、一汽大众，上海大众、上海通用别克、通用雪佛兰、广州本田、东风日产、进口现代、东风悦达起亚、奇瑞</u>等12个品牌。</p>
      </div>
    </div>
    <div class="introduct" style="padding: 25px 15px 5px 15px;">
      <h3 style="color: #4d4d4d;text-align: center;font-weight: bold;font-size: .3rem;">商社车管家</h3>
      <div class="info" >
        <p style="font-size: .25rem; color: #666666;line-height: .5rem;margin-bottom: .3rem; position: relative;padding-left:.3rem;">商社车管家平台隶属于重庆商社集团-商社汽贸</p>
        <p style="font-size: .25rem; color: #666666;line-height: .5rem;margin-bottom: .3rem; position: relative;padding-left:.3rem;">“商社车管家“是商社汽贸基于车辆的全生命周期服务，为有车一族打造的管家式服务平台，利用现有的4S店服务体系，一站式为车主解决车险、保养、维修、年检、救援、二手车,汽车租赁、养车用车等用车问题，为车主提供专业高效、优惠便捷、有温度的管家式汽车后生活服务!“商社车管家”拥有车商城和微信公众号两个移动互联网服务平台，实现车生活相关业务的商品展示、在线交易；</p>
      </div>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {

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
  .content p {
    line-height: 30px;
    font-size: 0.875em;
    color: #585858;
  }
  .introduct .info p::after{
    position: absolute;
    content: "";
    top: 8px;
    left: 0;
    height: 7px;
    width: 7px;
    background-color: #d41d0f;
    border-radius: 5px;
  }
  .info{
    border-left: none;
    padding: 10px 0 10px 0;
  }
</style>
