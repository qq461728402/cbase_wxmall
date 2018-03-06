<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="积分中心" bgcolor="#d41d0f" color="#FFF">
      <router-link to="/home/MyPoints" slot="left">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>


    <div style="background: linear-gradient(90deg,#eb3c3c,#ff7459);box-shadow:0 2px 5px rgba(255,98,98,.4);width: 100%;height: 130px;">
      <div style="font-size: 14px;padding-top: 20px;text-align: center;color: rgba(76,0,0,.7);">可用积分</div>
      <div style="font-size: 48px;color: #ffffff;text-align: center">10</div>
      <div style="font-size: 12px;color: hsla(0,0%,100%,.7);text-align: center">小积分&nbsp;换好礼&nbsp;会员专享&nbsp;每月更新</div>
    </div>
    <div style="width: 100%;height: 10px; background-color: #eeeeee"></div>


    <div>
      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <div style="border-bottom: 1px solid #d9d9d9;height: 4rem;overflow: hidden;width: 100%;" v-for="(item,index) in list" :key="index">
          <div style="float: left;">
            <div style="width: 4rem;height: 4rem;display: flex;flex-direction: column;justify-content: center;align-items: center">
              <img :src="item.img" style="width: 3rem;height: 3rem;">
            </div>
          </div>
          <div style="display: flex;flex-direction: column;justify-content: center;height: 4rem;">
            <h3 style="margin-bottom: .2rem;font-size: .3rem;line-height: 1.5;font-weight: 400;">{{item.title}}</h3>
            <div style="line-height: .4rem;margin-bottom: .4rem">
              <span style="font-size: .3rem;margin-right: .1rem;color: #b4a078;font-weight: 700">{{item.price}}</span>
              <span style="position: relative;font-size: .25rem;color: #999;margin-bottom: .4rem;text-decoration:line-through;"><em>￥</em>{{item.w_price}}</span>
            </div>
            <div>
              <yd-button type="hollow" style="border: 1px solid #b4a078;width: 2rem;font-size: .3rem;color: #b4a078;">立即兑换</yd-button>
            </div>
          </div>
        </div>
      </yd-pullrefresh>
    </div>







    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" link="/">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类"  link="/home/carProducts" >
        <yd-icon slot="icon" size="0.54rem" name="fenlei1" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="/shoppingCart">
        <yd-icon name="gouwuche" slot="icon" size="0.54rem" custom></yd-icon>
        <!--<yd-badge slot="badge" type="danger" v-if="quantity!=0" style="background-color: #d41d0f;">{{quantity}}</yd-badge>-->
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="/personalCenter">
        <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>
<script type="text/babel">
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  const vm= {
    data() {
      return {
        list: [
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 1560, w_price: 156.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 2560, w_price: 256.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 3560, w_price: 356.23},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 4560, w_price: 456.23},
        ],
        /*list:[],*/
        items:[],
        jifen:'',
        ji:[],

      }
    },
    mounted(){
      this.getshuju();
    },
    methods:{
      /*loadList() {
        axios.get("../static/data.json",{},"数据加载中...").then((response) => {
          const _list = response.data.list;
          this.$dialog.toast({
            mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        }).catch( error => { console.log(error); });
      },*/

      /*getshuju() {
        axios.get("../static/data.json",{},"数据加载中...").then((response) => {
          this.items = response.data.list;
          this.ji = response.data.jifen;
        }).catch( error => { console.log(error); });
      },*/
    },

  }
  export default vm;
</script>
<style>

</style>
