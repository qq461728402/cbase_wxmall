<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="服务门店" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <!--选择门店-->
    <ul class="storeList">
      <li v-for="item,index in stores" @click="selectStore(index)">
        <yd-flexbox>
          <div style="overflow:hidden; padding: 0.15rem;height: 1.8rem;width: 1.8rem">
            <img :src="item.logo" style="height: 1.5rem;width: 1.5rem">
          </div>
          <yd-flexbox-item style="height:1.8rem;width:75%">
            <yd-flexbox direction="vertical" style="padding-top: 0.15rem">
              <yd-flexbox-item><span style="font-size: 0.3rem">{{item.storeName}}</span></yd-flexbox-item>
              <yd-flexbox-item><p style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem;  overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
                {{item.storeAddress}}</p></yd-flexbox-item>
              <yd-flexbox-item>
                                    <span style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem">评价<span style="color:#ff7d49">{{item.ratesCount?item.ratesCount:'0'}}</span> |总订单<span
                                      style="color:#ff7d49 ">{{item.orderCount?item.orderCount:'0'}}</span></span>
                                    <span style="float: right;margin-right: 0.1rem"> <button :class="{'storeSelectBtn':item.select,'storeNoselectBtn':!item.select}">
                                      {{item.select?'已选择':'选择'}}
                                    </button> </span>
              </yd-flexbox-item>
            </yd-flexbox>
          </yd-flexbox-item>
        </yd-flexbox>
      </li>
    </ul>
  </yd-layout>
</template>
<script type="text/babel">
  const vm = {
    data() {
      return {
        stores:[],
      }
    },
    mounted(){
      this.getStoreList();
    },
    methods: {
      gotoback(){
        this.$router.go(-1);
      },
      /*获取门店信息*/
      getStoreList(){
         var oderInfo = this.$route.params;
       this.apiRequest( '/api/order/serviceShops', {'data': JSON.stringify(oderInfo)}, 'post', '加载中...', function (data) {
          for (var key in data.stores) {
            data.stores[key].select = false;
          }
          that.stores = data.stores;
        })
      },
      /*选择门店*/
      selectStore(index){
        for (var key in this.stores) {
          this.stores[key].select = false;
        }
        this.stores[index].select = true;
        this.storeName = this.stores[index].storeName;
        this.orderData.serviceShop = this.stores[index].id;
        this.exchangeStore = false;
        this.confirmOder();
      },
    },

  }
  export default vm;
</script>
<style scoped>

  .storeList {
    background-color: #fff
  }

  .storeList li {
    border-bottom: 1px solid #edeeef
  }

  .storeList li:last-child {
    border-bottom: 0
  }

  .storeSelectBtn {
    background-color: #d41d0f;
    color: #fff;
    border: 0;
    padding: 0 .2rem;
    min-width: .3rem;
    border-radius: .1rem
  }

  .storeNoselectBtn {
    background-color: #fff;
    color: #d41d0f;
    border: 1px solid #d41d0f;
    padding: 0 .2rem;
    min-width: .3rem;
    border-radius: .1rem
  }
</style>
