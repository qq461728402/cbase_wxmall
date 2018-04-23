<template>
  <div class="show">
    <p>
      <yd-icon name="error-outline" @click.native="close" style="color: #999999;position: fixed;left: 10px;top: 10px;"></yd-icon>
      <img src="@/assets/xinjian/zm.png" style="width: 80%;border-radius: 10px;" @click="showToggle" v-show="isShow" />
      <i v-show="isShow" style="position: fixed;font-style: normal;bottom: 20%;font-size: 13px;display: block;color: white; text-shadow: black 0.1em 0.1em 0.2em">会员卡号：{{txm}}</i>
      <svg id="barcode" style="width: 70%;position: fixed;" v-show="isShow"></svg>
      <img src="@/assets/xinjian/fm.png" style="width: 80%;border-radius: 10px;" @click="showToggle" v-show="!isShow"/>
    </p>
  </div>
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
      init(carId){
        this.txm=carId;
        JsBarcode("#barcode", this.txm, {
          width: 5,
          height: 150,
          displayValue:false
        });
      },
      close(){
        this.$emit('close');
      },
      showToggle(){
        this.isShow = !this.isShow
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .show{
    position: absolute;left: 0;right:0;bottom: 0;top: 0;z-index:9
  }
  * {
    margin: 0;
    padding: 0;
  }
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  p {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #FFF;
    letter-spacing: 4px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (orientation:portrait) {
    p {
      transform-origin: 0 0;
      transform: rotateZ(90deg) translateY(-100%);
    }
  }
</style>
