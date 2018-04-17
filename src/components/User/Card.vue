<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="首页" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>


    <div class="g-header" style="width: 100%;">
      <div class="m-content m-content-active" @click="Show">
        <div class="m-info">
          <div class="u-avatarUrl">
            <img src="../../assets/xinjian/cardtouxiang.jpg">
          </div>
          <div class="m-right">
            <div class="u-nickname">{{txm}}</div><!--会员卡卡号-->
            <div class="u-level">
              <i class="level u-icon u-icon-txtV1"></i>
            </div>
          </div>
        </div>
        <div class="m-score">
          <div class="m-txt">
            <div class="u-label">积分值</div>
            <div class="u-num">
              <span>284</span>
              <span>/</span>
              <span>500</span>
            </div>
          </div>
          <div class="m-line">
            <div class="u-bgLine"></div>
            <div class="active-line" style="width:56.8%;"></div>
          </div>
        </div>
      </div>
      <a @click="Explain">
        <div class="helpIcon">
          <i class="u-icon u-icon-helpIconWhite"></i>
        </div>
      </a>
    </div>
    <!--<div class="g-header" style="width: 100%;" @click="showToggle" v-show="!isShow">
      <div class="m-content m-content-active">
        <div class="form-group" style="text-align: center">
          <svg id="barcode" style="width: 100%;"></svg>
        </div>
      </div>
    </div>-->


    <div class="m-card">
      <div class="title">
        <div class="mainTitle" style="margin-bottom:10px;">会员专享</div>
        <div class="subTitle">查看不同级别会员服务详情</div>
      </div>
    </div>


    <yd-cell-group>
      <yd-cell-item arrow @click.native="Binding">
        <span slot="left">点击开通会员卡</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">会员卡特权</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">领取优惠券</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">我的优惠券</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">积分兑换</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="Explain">
        <span slot="left">积分规则和会员卡使用说明</span>
      </yd-cell-item>
    </yd-cell-group>

  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
        isShow:true,
        txm:"DPSD1234567890",
      }
    },
    mounted(){
    },
    methods:{
      Explain(){
        this.$router.push({ name: 'Explain'});
      },
      Binding(){
        this.$router.push({ name: 'Binding'});
      },
      Show(){
        this.$router.push({ name: 'Show'});
      },
    },
  }
  export default vm;
</script>
<style>
  .g-header .m-content-active{
    background-image: linear-gradient(-134deg,#B4A078 0,#E7DAC0 100%)!important;
  }
  .g-header .m-content{
    height: 4rem;
    background-image: linear-gradient(-134deg,#959595 0,#C7C7C7 100%);
    box-shadow: 0 0 0.4rem 0 rgba(0,0,0,.15);
    border-radius: .1rem;
    position: relative;
    overflow: hidden;
    margin: .3rem .3rem .3rem .3rem;
  }
  .g-header .m-info{
    padding-top: .4rem;
    padding-left: .4rem;
    overflow: hidden;
  }
  .g-header .u-avatarUrl{
    float: left;
  }
  .g-header .u-avatarUrl img{
    width:1.5rem;
    height:1.5rem;
    border: .02rem solid #ffffff;
    border-radius: 2rem;
  }
  .g-header .m-right{
    margin-left: 2rem;
    margin-top: .4rem;
    color: #fff;
  }
  .g-header .m-right .u-nickname{
    color: #fff;
    font-size: .3rem;
    line-height: .4rem;
    margin-bottom: .2rem;
    margin-right: .5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .g-header .m-right .u-level{
    display: inline-block;
    background-color: #ffffff;
    padding: .06rem;
  }
  .u-icon-txtV1{
    background-position:0 -94.72rem;
  }
  .u-icon-txtV1, .u-icon-txtV1Black{
    width: .3rem;
    height: .3rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url(../../assets/xinjian/cardtubiao.png);
    background-repeat: no-repeat;
    background-size: 6.4rem 124.54667rem;
  }
  .g-header .m-score{
    margin: 1rem .3rem 0 .3rem;
    bottom: .6rem;
    /*width: 100%;*/
    padding: 0 .3rem;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
  .g-header .m-score .m-txt{
    overflow: hidden;
    color: #FFF;
  }
  .g-header .m-score .m-txt .u-label{
    font-size: .3rem;
    float: left;
  }
  .g-header .m-score .m-txt .u-num{
    float: right;
    font-size: .3rem;
  }
  .g-header .m-score .m-txt .u-num span:first-child{
    font-size: .4rem;
  }
  .g-header .m-score .m-line{
    position: relative;
  }
  .g-header .m-score .m-line .u-bgLine{
    height: .1rem;
    background: #E4DBCB;
    border-radius: .15rem;
  }
  .g-header .m-score .m-line .active-line{
    position: absolute;
    top: 0;
    height: .1rem;
    background-color: #FBF7F0;
  }
  .g-header .helpIcon{
    position: absolute;
    right: .5rem;
    top: .5rem;
  }
  .u-icon-helpIconWhite{
    width: .5rem;
    height: .5rem;
    background: url(../../assets/xinjian/cardwenhao.png) no-repeat;
    background-size: 98%;
  }
  .u-icon{
    display: inline-block;
    vertical-align:middle;
  }


/*----*/
  .m-card{
    margin-bottom: .2rem;
    background: #fff;
    overflow: hidden;
  }
  .m-card .title{
    padding: .5rem 0;
  }
  .m-card .mainTitle{
    font-size: .4rem;
    line-height: .4rem;
    text-align: center;
  }
  .m-card .subTitle{
    font-size: .3rem;
    line-height: .3rem;
    color: #7f7f7f;
    text-align: center;
  }
</style>
