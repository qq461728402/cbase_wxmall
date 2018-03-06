<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="团购频道" bgcolor="#d41d0f" color="#FFF">
      <router-link>
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>


    <!--轮播-->
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="itemb, key in banner" :key="key">
        <a href="">
          <img :src="itemb.img">
        </a>
      </yd-slider-item>
    </yd-slider>
    <!--轮播-->


    <!--菜单-->
    <yd-grids-group :rows="4">
      <yd-grids-item v-for="itemc, key in caidan" :key="key">
        <img slot="icon" :src="itemc.img" style="width: 30px;height: 30px">
        <span slot="text">{{itemc.name}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <!--菜单-->


    <!--商品展示-->
    <yd-list theme="3">
      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-list-item v-for="item, key in items" :key="key">
        <img slot="img" :src="item.skuModel.image">
        <span slot="title" style="font-weight: normal;color: #000;">{{item.skuModel.skuName}}</span>
        <yd-list-other slot="other">
          <div>
            <span class="demo-list-price" style="color: red;"><em>¥</em>{{item.skuModel.price}}</span>
            <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through">¥{{item.skuModel.salePrice}}</span>
          </div>
          <div>已团{{item.dan?item.dan:'0'}}单</div>
        </yd-list-other>
      </yd-list-item>
      </yd-pullrefresh>
    </yd-list>
    <!--商品展示-->



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
        /*list: [
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 156.23, w_price: 89.36,dan:15},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 256.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 356.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 456.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 156.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 256.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 356.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 456.23, w_price: 89.36},
        ],*/
        caidan:[
          {name:"女士",img:"http://joewee.mynatapp.cc/index/2018/2/女士-31b59978-b778-45e5-bde3-64ae61eafd96.jpg"},
          {name:"男士",img:"http://joewee.mynatapp.cc/index/2018/2/男士-ae8aa3fc-4240-4255-a9ee-6d88a74bb7c0.jpg"},
          {name:"母婴",img:"http://joewee.mynatapp.cc/index/2018/2/婴童-8c6b1a2f-97c1-403f-9d0b-5ecfd16ec17b.jpg"},
          {name:"更多",img:"http://joewee.mynatapp.cc/index/2018/2/更多-6ff434ca-dd09-44d5-8069-57a5ca13cc6e.jpg"}
        ],
        banner:[
          {img:"https://free.modao.cc/uploads3/images/1725/17259061/raw_1519280897.jpeg"},
          {img:"https://free.modao.cc/uploads3/images/1725/17259077/raw_1519280931.jpeg"},
          {img:"https://free.modao.cc/uploads3/images/1725/17259088/raw_1519280946.jpeg"},
          {img:"https://free.modao.cc/uploads3/images/1725/17259094/raw_1519280958.jpeg"}
        ],
        list:[],
        items:[],
        /*caidan:[],
        banner:[],*/

      }
    },
    mounted(){
      /*this.getshuju();*/
      this.getcuxiao();
    },
    methods:{
      loadList() {
        axios.get("http://130.130.88.111:8008/api/promotion/list?promotionType=GROUPON",{},"数据加载中...").then((response) => {
          const _list = response.data.promotions;
          console.log(_list);
          this.$dialog.toast({
            mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        }).catch( error => { console.log(error); });
      },
      getcuxiao() {
        axios.get("http://130.130.88.111:8008/api/promotion/list?promotionType=GROUPON",{},"数据加载中...").then((response) => {
          this.items = response.data.promotions;
          console.log(this.items);
        }).catch( error => { console.log(error); });
      },



    },

  }
  export default vm;
</script>
<style>
  .yd-grids-4:before{
    border-bottom: none;
  }
  .yd-grids-4 .yd-grids-item:not(:nth-child(4n)):before{
    border-right: none;
  }
</style>
