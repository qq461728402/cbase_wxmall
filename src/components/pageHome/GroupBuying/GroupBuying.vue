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
    <yd-list theme="4">
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
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  const vm= {
    data() {
      return {
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
        items:[],
      }
    },
    mounted(){
      this.loadList();
    },
    methods: {
      loadList() {
        const that = this;
        baseHttp(this, '/api/promotion/list', {'promotionType': 'GROUPON'}, 'get', '加载中...', function (data) {
          that.items = data.promotions;
          that.$dialog.toast({
            mes: that.items.length > 0 ? '为您更新了' + that.items.length + '条内容' : '已是最新内容'
          });
          that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        })
      }
    }
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
