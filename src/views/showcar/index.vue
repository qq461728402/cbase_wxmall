<template>
  <div class="show">
    <p>
      <yd-icon name="error-outline" @click.native="close" style="color: #999999;position: fixed;left: 10px;top: 10px;"></yd-icon>
      <img v-if="background.length>0" :src="background" style="width: 80%;border-radius: 10px;" @click="showToggle"/>
      <img v-else-if="isload&&background.length==0" src="@/assets/xinjian/zm.png" style="width: 80%;border-radius: 10px;" @click="showToggle"/>
      <i v-if="isShow" style="position: fixed;font-style: normal;bottom: 20%;font-size: 13px;display: block;color: white; text-shadow: black 0.1em 0.1em 0.2em">会员卡号：{{txm}}</i>
      <barcode :value="value" :options="options" v-if="isShow&&value.length>0" style="width: 70%;position: fixed;"></barcode>
      <span v-html="description" style="position: absolute;right: 15%;left: 15%;top: 2rem;font-size: 0.35rem;font-weight: 500" v-if="!isShow"></span>
    </p>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueBarcode from '@xkeshi/vue-barcode'
  import {baseHttp} from '@/config/env'
  const vm= {
    components: {
      barcode:VueBarcode,
    },
    data() {
      return {
        isShow:true,
        isload:false,
        value:'',
        description:'',
        txm:'',
        background:'',
        options:{width: 5, height: 150, displayValue:true},
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
        baseHttp(this, '/api/customer/dynamicCardNumber', {}, 'get', '生成条形码...', data => {
          if (data && data.code == 200) {
            this.value = data.cardNumber;
            this.isload=true;
            this.description=data.description;
            if (data.background){
              this.background=data.background;
            }
          }
        })
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
  .fmc{
    background-image:linear-gradient(-135deg, #e48b0b 0, #9e620a 100%);
    width: 100%;
    height: 100%;
  }
</style>
