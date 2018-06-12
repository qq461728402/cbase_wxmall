<template>
  <div class="show">
    <div style="margin: 0.2rem;border-radius: 0.1rem; position: absolute; top: 50%;">
      <yd-cell-group style="text-align: center;">
        <div style="padding: 0.2rem;">
          <p style="font-size: 0.3rem"><strong>展示优惠券</strong></p>
          <p style="color: gray">让门店扫一扫,节省您与门店对接时间</p>
        </div>
        <div style="width: 80%;margin-left: 10%">
          <barcode :value="value" :options="options" style="width: 70%;position: fixed;"></barcode>
        </div>
        <div style="margin-left:25%;width: 50%;">
          <div id="qrcode" ref="qrcode" style="padding-bottom: 0.2rem;"></div>
        </div>
      </yd-cell-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueBarcode from '@xkeshi/vue-barcode'

  var QRCode = require('js-qrcode');
  const vm= {
    components: {
      barcode:VueBarcode,
    },
    data() {
      return {
        value:'1234',
        txm:'',
        qrcode:'',
        options:{width: 5, height: 80, displayValue:false},
      }
    },
    mounted(){
        this.setQrCode();
    },
    methods:{
      init(carId){
        this.txm=carId;
       this.apiRequest( '/api/customer/dynamicCardNumber', {}, 'get', '生成条形码...', data => {
          if (data && data.code == 200) {
            this.value = data.cardNumber;
          }
        })
      },
      setQrCode(){
        // 设置参数方式
        var container = document.querySelector('#qrcode');
        this.qrcode = new QRCode(container, {
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel   : 2,
        });
        this.qrcode.make(data.info.number);
      },
      close(){
        this.$emit('close');
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .show{
    position:relative;left: 0;right:0;bottom: 0;top: 0;z-index:9
  }
</style>
