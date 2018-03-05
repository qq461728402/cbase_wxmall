<template>
  <div style="background-color: #ffffff" id="invoice">
    <yd-navbar slot="navbar" title="发票信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-flexbox direction="vertical" style="padding-left:0.24rem">
      <yd-flexbox-item style="font-size: 0.3rem;padding: 0.1rem 0">发票类型</yd-flexbox-item>
      <yd-flexbox-item style="padding-bottom: 0.1rem">
        <yd-button type="hollow">纸质发票</yd-button>
      </yd-flexbox-item>
    </yd-flexbox>
    <hr style="border: none;border-bottom: 1px solid #D9D9D9;"/>
    <yd-flexbox direction="vertical" style="padding-left:0.24rem;padding-bottom: 0.24rem">
      <yd-flexbox-item style="font-size: 0.3rem;padding: 0.1rem 0">发票抬头</yd-flexbox-item>
      <yd-flexbox-item style="padding-bottom: 0.1rem">
        <yd-radio-group v-model="invoice.invoiceType" color="#F00">
          <yd-radio val="PERSONAL">个人</yd-radio>
          <yd-radio val="COMPANY">单位</yd-radio>
          <yd-radio val="NO">无需发票</yd-radio>
        </yd-radio-group>
      </yd-flexbox-item>
    </yd-flexbox>
    <hr style="border: none;border-bottom:.2rem solid #f5f5f5;"/>
    <yd-cell-group v-if="invoice.invoiceType=='PERSONAL'">
      <yd-cell-item>
        <span slot="left">个人：</span>
        <yd-input slot="right" v-model="invoice.invoiceTitle" placeholder="请输入个人姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">发票内容：</span>
        <yd-input slot="right" :disabled="true" v-model="invoice.invoiceinfos" placeholder="商品明细"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group v-else-if="invoice.invoiceType=='COMPANY'">
      <yd-cell-item><span slot="left">单位名称：</span>
        <yd-input slot="right" v-model="invoice.invoiceTitle" placeholder="请输入单位名称"></yd-input>
      </yd-cell-item>
      <yd-cell-item><span slot="left">单位税号：</span>
        <yd-input slot="right" v-model="invoice.taxNumber" placeholder="纳税人识别号或统一社会信用代码"></yd-input>
      </yd-cell-item>
      <yd-cell-item><span slot="left">发票内容：</span>
        <yd-input id="fpnr" slot="right" :disabled="true" placeholder="商品明细" v-model="invoice.invoiceinfos"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <div class="sure">
      <yd-button size="large" bgcolor="#d41d0f" color="#fff" type="danger" @click.native="invoiceok()">确定</yd-button>
    </div>
  </div>
</template>
<script type="text/babel">
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'invoice',
      ])
    },
    data() {
      return {
          spmx:'商品明细'
      }
    },
    mounted(){

    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      //确定发票信息
      invoiceok(){
        if (this.invoice.invoiceType == 'PERSONAL') {
          if (this.invoice.invoiceTitle.length == 0) {
            this.$dialog.toast({mes: '请输入发票信息', timeout: 1000});
            return;
          }
        } else if(this.invoice.invoiceType =='COMPANY') {
          if (this.invoice.invoiceTitle.length == 0) {
            this.$dialog.toast({mes: '请输入发票信息', timeout: 1000});
            return;
          } else if (this.invoice.taxNumber.length == 0) {
            this.$dialog.toast({mes: '请输入发票信息', timeout: 1000});
            return;
          }
        }
        this.$store.dispatch('setInvoice',this.invoice);
        this.gotoback();
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .sure{
    padding: 0.2rem;
    text-align: center;
  }
  .sure button{
    width: 80%;
  }
</style>
<style>
   #invoice .yd-btn-block{
     display:inline;
   }
</style>
