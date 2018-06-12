<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="积分使用说明" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <yd-accordion accordion style="margin: .3rem;border: 1px solid #dddddd;border-radius: 3px">
      <yd-accordion-item title="会员卡使用说明" open style="font-size: .28rem">
        <div style="padding: .24rem;" v-html="description">
        </div>
      </yd-accordion-item>
    </yd-accordion>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  const vm= {
    data() {
      return {
        description:'',
      }
    },
    mounted(){
      this.getshuju();
    },
    methods:{
      getshuju() {
       this.apiRequest( '/api/customer/description', {}, 'get', '', data => {
          if (data && data.code == 200) {
            this.description = data.description;
          }
        })
      }
    },
  }
  export default vm;
</script>
<style>

</style>
