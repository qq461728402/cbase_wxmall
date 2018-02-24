<template>
  <yd-layout style="background-color: #fff" class="m-style">
    <yd-navbar slot="navbar" title="门店" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <yd-cell-group slot="navbar">
      <yd-cell-item>
            <span slot="right" style="border: 1px solid #D9D9D9;width: 55px; text-align: center;border-radius: 4px;">
                <div @click="show4 = true"><yd-icon slot="icon" name="type" size=".24rem" color="#c5c5c5"></yd-icon>
                  <span slot="left" v-cloak>筛选</span></div>
            </span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <ul class="storeList">
        <li v-for="item in stores" @click="gotoDetail(item)">
          <yd-flexbox>
            <div style="overflow:hidden; padding: 0.15rem;height: 1.8rem;width: 1.8rem">
              <img :src="item.logo" style="height: 1.5rem;width: 1.5rem">
            </div>
            <yd-flexbox-item style="height:1.8rem">
              <yd-flexbox direction="vertical" style="padding-top: 0.15rem;padding-right: .15rem;">
                <yd-flexbox-item><div style="font-size: 0.3rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{item.storeName}}</div></yd-flexbox-item>
                <yd-flexbox-item><span style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem">评价&nbsp<span style="color:#ff7d49">{{item.ratesCount?item.ratesCount:'0'}}</span> |总订单&nbsp<span style="color:#ff7d49 ">{{item.orderCount?item.orderCount:'0'}}</span></span></yd-flexbox-item>
                <yd-flexbox-item><div style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{item.storeAddress}}</div></yd-flexbox-item>
              </yd-flexbox>
            </yd-flexbox-item>
          </yd-flexbox>
        </li>
      </ul>
    </yd-pullrefresh>
    <yd-popup v-model="show4" position="right" width="60%" style="z-index: 50;">
      <p style="padding: 0.2rem; font-size: 0.3rem;border-bottom: 1px solid #edeeef;width: 100%">地区</p>
      <div style="margin-top: 0.1rem;padding:0 0.1rem">
        <yd-button type="hollow"  @click.native="loadList()">全部地区</yd-button>
        <yd-button :type="areaitem.select==false?'hollow':'danger'" style="margin-top:0.1rem;margin-left:0.05rem;" v-for="areaitem,index in areas"  :key="index" @click.native="search(areaitem,index)">{{areaitem.name}}</yd-button>
      </div>
    </yd-popup>
    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" link="/">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类"  link="/home/carProducts" active>
        <yd-icon slot="icon" size="0.54rem" name="fenlei1" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="/shoppingCart">
        <yd-icon name="gouwuche" slot="icon" size="0.54rem" custom></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="quantity!=0" style="background-color: #d41d0f;">{{quantity}}</yd-badge>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="/personalCenter">
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>



</template>
<script type="text/babel">
  import {baseHttp} from '../config/env'
  import {setStore,getStore} from '../config/mUtils'
  const vm= {
    data() {
      return {
        show4: false,
        quantity:0,
        stores:[],
        areas:[],
        isCookie:false,
      }
    },
    activated(){
      this.loadList();
      var tempUserInfo=getStore("userInfo");
      this.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        this.getCartsQuantity();
      }
    },
    mounted(){

    },
    methods:{
      /*获取购物车数量*/
      getCartsQuantity(){
        const that = this;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', function (data) {
          if (data.quantity)that.quantity = data.quantity
        });
      },

      gotoDetail(item){
        this.$router.push({ path: 'stores/storesDetail',query: { id: item.id}})
      },
      loadList(){
        const that=this;
        baseHttp(this,'/api/store/list',{},'get','加载中...',function (data) {
          that.stores=data.stores;
          for (var key in data.areas){
            data.areas[key].select=false;
          }
          that.areas=data.areas;
          that.show4=false;
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      },
      search(item,index){
        const that=this;
        baseHttp(this,'/api/store/search',{area:item.id},'get','查询中...',function (data) {
          console.log(data);
          for (var key in that.areas){
            if (key !=index){
              that.areas[key].select=false;
            }
          }
          that.areas[index].select=true;
          that.stores=data.stores;
          that.show4=false;
        })
      },
    },
  }
  export default vm;
</script>
<style lang="css">
  .m-style .yd-cell-right{
    min-height: 0.7rem ;
  }
  .m-style .yd-cell-box{
    margin-bottom: 0px;
  }
  .m-style .yd-cell:after{
    border-bottom:0px
  }
</style>
<style lang="css" scoped>
  .storeList{
    background-color: #ffffff;
  }
  .storeList li{
    border-bottom: 1px solid #edeeef;
  }
  .storeList li:last-child{
    border-bottom: 0;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

</style>
