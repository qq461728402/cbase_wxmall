<template>
  <div class="show">
    <div style="margin: 1rem 0.4rem 0.4rem 0.4rem" id="qcode">
      <yd-cell-group style="text-align: center;border-radius: 0.1rem;">
        <div style="padding: 0.2rem;">
          <p style="font-size: 0.4rem"><strong>优惠券支付</strong></p>
          <p style="color: gray">让门店扫一扫,进行支付</p>
        </div>
        <div id="barcode" v-if="consumeCode.length>0">
          <barcode :value="consumeCode" :options="options"></barcode>
        </div>
        <div style="margin-left:20%;width: 60%;margin-top: 0.4rem">
          <div id="qrcode" ref="qrcode" style="padding-bottom: 0.4rem;"></div>
        </div>
        <div style="padding-bottom: 0.4rem;">
          <p v-if="expiredTime!=0">过期时间:{{expiredTime | formatDate}}<yd-icon slot="icon" name="shuaxin" size=".35rem" color="#2e4057" custom  style="margin-left: 0.2rem" @click.native="generate"></yd-icon></p>
        </div>
      </yd-cell-group>
      <yd-cell-group v-if="detail.length>0">
        <div style="padding: 0.2rem;">
          {{detail}}
        </div>
      </yd-cell-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueBarcode from '@xkeshi/vue-barcode'
  import {formatDate} from '@/config/env'
  var QRCode = require('js-qrcode');
  const vm= {
    components: {
      barcode:VueBarcode,
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        couponId:'',
        consumeCode:'',
        qrcode:'',
        expiredTime:0,
        detail:'',
        options:{width: 3, height: 80, displayValue:true},
      }
    },
    created(){

    },
    mounted(){
      this.couponId =this.$route.query.couponId;
       this.setQrCode();
       this.generate();
    },
    methods:{
      generate(){
       this.apiRequest( '/api/coupon/generate', {couponId:this.couponId}, 'get', '加载中...', data => {
          if (data && data.code == 200) {
            this.consumeCode = data.consumeCode;
            this.expiredTime=data.expiredTime;
            this.qrcode.make(data.consumeCode);
            this.detail=data.detail;
          }
        })
      },
      setQrCode(){
        var container = document.querySelector('#qrcode');
        this.qrcode = new QRCode(container, {
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel   : 3,
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .show{
    background-color: #5da368;
    position:absolute;left: 0;right:0;bottom: 0;top: 0;z-index:9
  }
  #barcode canvas{
    width: 6rem;
    height: 2rem;
  }
</style>
<style>
  #qcode .yd-cell{
    border-radius: 0.2rem;
  }
  #qcode .yd-cell:after{
    border-bottom: 0px;
  }
</style>
