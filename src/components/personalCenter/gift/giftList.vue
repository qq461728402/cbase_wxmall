<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="我的礼品" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group  v-for="gifts,index1 in giftlist" v-if="gifts!=null" :key="index1">
      <yd-cell-item>
        <span slot="left" class="or_2">保单编号：{{gifts.orderNumber}}</span><!--订单编号-->
        <span slot="right" style="color: green" v-if="gifts.alloted==true">已发放</span>
        <span slot="right" style="color: #d41d0f" v-else>未发放</span>
      </yd-cell-item>
      <ul class="giftlist">
        <li v-for="item,index in gifts.gifts" :key="index">
          <yd-flexbox style="min-height: 1rem">
            <div>
              <img src="../../../assets/img/gift.png" style="width: 0.5rem;height: 0.5rem">
            </div>
            <yd-flexbox-item>{{item.name+':'+item.giftAmount}}</yd-flexbox-item>
            <div v-if="item.relatedOrderId!=null" ><yd-button type="hollow" @click.native="gotodetail(item)">查看</yd-button></div>
            <div v-if="item.canOrder==true" style="padding-right: 0.2rem"><yd-button @click.native="appointment(item)" type="hollow">预约</yd-button></div>
          </yd-flexbox>
        </li>
      </ul>
    </yd-cell-group>
    <div class="noProduct" v-if="giftlist.length==0" ref="gifts">
      <yd-icon slot="icon" name="mylp" size="1.5rem" color="#999999" custom></yd-icon>
      <p>您还没有赠品</p>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  const vm= {
    data() {
      return {
        giftlist:[],
      }
    },
    mounted(){
      this.giftslist();
    },
    activated(){
      this.giftslist();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      giftslist(){
        const  that =this;
       this.apiRequest('/api/insurance/gifts',{},'post','加载中...',function (data) {
          if(data.gifts)that.giftlist=data.gifts;
        });
      },
      appointment(item){
        this.$router.push({ name: 'giftAppoint',query:{skuId:item.skuId,itemId:item.id}});
      },
      gotodetail(item){
        this.$router.push({ name: 'orderDetail', query: { orderId: item.relatedOrderId}});
      }
    },

  }
  export default vm;
</script>
<style scoped>
  .giftlist{
    background-color: #ffffff;
    padding-left: 0.2rem;
  }
  .giftlist li{
    border-bottom: 1px solid #edeeef;
  }
  .giftlist li:last-child{
    border-bottom: 0;
  }

  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }
  .noProduct img {
    width: 1.5rem;
    height: 1.5rem
  }
  .noProduct p {
    font-size: 13px;
    color: #666;
    line-height: 40px
  }
  .noProduct a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }
</style>
