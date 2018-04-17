<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="会员卡显示" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>


    <p>
      <a href="#/user/Card"><yd-icon name="error-outline" style="color: #999999;position: fixed;left: 10px;top: 10px;"></yd-icon></a>
      <img src="../../assets/xinjian/zm.png" style="width: 80%;border-radius: 10px;" @click="showToggle" v-show="isShow" />
      <i v-show="isShow" style="position: fixed;font-style: normal;bottom: 25%;font-size: 13px;display: block;color: white; text-shadow: black 0.1em 0.1em 0.2em">会员卡号：{{txm}}</i>
      <svg id="barcode" style="width: 70%;position: fixed;" v-show="isShow"></svg>
      <img src="../../assets/xinjian/fm.png" style="width: 80%;border-radius: 10px;" @click="showToggle" v-show="!isShow"/>
    </p>


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
      JsBarcode("#barcode", this.txm, {
        width: 5,
        height: 150,
        displayValue:false
      });
      //调整大小
      (function () {
        function resize() {
          var p = document.getElementsByTagName('p')[0];
          var html = document.getElementsByTagName('html')[0];
          var width = html.clientWidth;//客户端宽度
          var height =  html.clientHeight;//客户端高度
          var max = width > height ? width : height;
          var min = width > height ? height : width;
          p.style.width = max + "px";
          p.style.height = min + "px";
        }
        resize();
        window.addEventListener("resize", resize)//事件监听
      })();
    },
    methods:{
      showToggle:function(){
        this.isShow = !this.isShow
      },
      Card(){
        this.$router.push({ name: 'Show'});
      },
    },
  }
  export default vm;
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  html {
    /*用于 获取 屏幕的可视宽高*/
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  p {
    /*让 p 初始 width 和 height 就 等于 页面可视区域的 宽高*/
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    /*背景样式*/
    background-color: #fff;
    color: #FFF;
    letter-spacing: 4px;
    font-size: 28px;
    /*居中样式*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (orientation:portrait) {
    /*竖屏样式*/
    p {
      transform-origin: 0 0;
      transform: rotateZ(90deg) translateY(-100%);
    }
  }
</style>
