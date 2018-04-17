<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="会员卡绑定" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>


    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">会员卡：</span>
        <input slot="right" type="text" placeholder="请输入会员卡">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">姓名：</span>
        <input slot="right" type="text" placeholder="请输入姓名">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证：</span>
        <input slot="right" type="number" placeholder="请输入身份证">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <input type="number" slot="right" placeholder="请输入手机号码">

        <!-- ↓↓关键代码是这里↓↓ -->
        <yd-sendcode slot="right"
                     v-model="start1"
                     @click.native="sendCode1"
                     type="warning"
        ></yd-sendcode>
        <!-- ↑↑关键代码是这里↑↑ -->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">验证码：</span>
        <input slot="right" type="number" placeholder="请输入验证码">
      </yd-cell-item>
    </yd-cell-group>
    <div style="text-align: center">
      <yd-button style="background-color: #f44;width: 50%;height: 40px;font-size: .3rem">确认</yd-button>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
        start1: false,
      }
    },
    mounted(){

    },
    methods:{
      sendCode1() {
        this.$dialog.loading.open('发送中...');
        setTimeout(() => {
          this.start1 = true;
          this.$dialog.loading.close();
          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          });
        }, 1000);
      }


    },
  }
  export default vm;
</script>
<style>

</style>
