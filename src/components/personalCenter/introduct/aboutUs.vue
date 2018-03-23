<template>
  <yd-layout style="background-color: white">
    <yd-navbar slot="navbar" title="关于新世纪大坪商都" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="container">
      <div class="detail top_line">
        <h6 class="title">大坪商都</h6>
        <section class="content">
          <p><img src="@/assets/aboutUs/589d23291ff53.png"></p>
          <p><span style="font-size: 14px;">新世纪百货大坪商都地处大坪黄金地段，拥有5个经营楼面，主营化妆品、黄金珠宝、男女服饰、家居寝用、童用童玩及生活超市的大型综合性商场，囊括众多大众知名品牌，引领品质化的都市消费潮流，竭诚为顾客提供温馨、周到的品质服务，同时配有2000个停车位让顾客的购物之旅更为轻松快捷。舒适、愉悦的购物环境，餐饮、娱乐、电影院等丰富的配套业态，让每一位顾客都能在大坪商都充分感受购物乐趣</span>
          </p>
          <p><img src="@/assets/aboutUs/58a274101ab91.jpg" title="QQ图片20170214110439.jpg"></p>
          <p style="white-space: normal;"><strong><span style="font-size: 14px; color: rgb(255, 0, 0);">B1F 精致生活馆</span></strong><span style="font-size: 14px;">（食品超市、家居寝用、生活电器、锅具、玻陶）</span>
          </p>
          <p style="white-space: normal;"><strong><span style="font-size: 14px; color: rgb(255, 0, 0);">1F 璀璨名品馆&nbsp;</span></strong><span style="font-size: 14px;">(黄金钟表、化妆品、甜品站、珠宝、女鞋女包、饰品）</span>
          </p>
          <p style="white-space: normal;"><strong><span style="font-size: 14px; color: rgb(255, 0, 0);">2F 风尚淑女馆</span></strong><span style="color: rgb(0, 0, 0);"><span
            style="font-size: 14px;">（</span><span style="font-size: 14px;">少淑装、内睡衣、配饰）</span></span></p>
          <p style="white-space: normal;"><strong><span style="font-size: 14px; color: rgb(255, 0, 0);">3F 雅致名媛馆</span></strong><span style="font-size: 14px;">（童装童玩、仕女装、羊绒）</span>
          </p>
          <p style="white-space: normal;"><strong><span style="font-size: 14px; color: rgb(255, 0, 0);">4F 都会绅士馆</span></strong><span
            style="font-size: 14px;">（男鞋男包、运动休闲、男装、饰品、贵宾厅）</span></p>
          <p><span style="font-size: 14px;"><br></span></p>
          <p><span style="font-size: 14px;">交通线路</span></p>
          <p><span style="font-size: 14px;"></span></p>
          <p><span style="font-size: 14px;">◆乘车路线</span></p>
          <p><span style="font-size: 14px;">a.南坪：乘坐819路、839路，石油路下车即可</span></p>
          <p><span style="font-size: 14px;">b.杨家坪：乘坐476路，在马家堡下车即可</span></p>
          <p><span style="font-size: 14px;">c.江北：乘坐128路、118路、138路在石油路下车即可</span></p>
          <p><span style="font-size: 14px;">d.沙坪坝：乘坐467路，在石油路下车即可</span></p>
          <p><span style="font-size: 14px;">◆地铁</span></p>
          <p><span style="font-size: 14px;">a.南坪：轨道交通3号线→轨道交通1号线，石油路下车即可</span></p>
          <p><span style="font-size: 14px;">b.杨家坪：轨道交通2号线→轨道交通1号线，石油路下车即可</span></p>
          <p><span style="font-size: 14px;">c.江北：轨道交通3号线→轨道交通1号线，石油路下车即可</span></p>
          <p><span style="font-size: 14px;">d.沙坪坝：轨道交通1号线，石油路下车即可</span></p>
          <p><span style="font-size: 14px;"><img src="@/assets/aboutUs/58a2615999a74.jpg" title="QQ图片20170214094654.jpg">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>
          </p>
          <p><span style="font-size: 14px;"><br></span><br></p></section>
      </div>
    </div>
    <!-- 底部导航 -->
    <!-- 底部导航最多能添加4个选项 -->
    <!-- 统计代码 -->
    <p class="hide bdtongji">
    </p>
  </yd-layout>
</template>
<script type="text/babel">
  const vm = {
    data() {
      return {}
    },
    mounted(){

    },
    methods: {
      gotoback(){
        this.$router.go(-1);
      },
    },

  }
  export default vm;
</script>
<style scoped>
  @import '../../../assets/css/detail.css';
  @import '../../../assets/css/mobile_module.css';
</style>
