<template>
  <yd-layout id="prolist">
    <yd-navbar slot="navbar" title="商品列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div slot="navbar" id="my_search" style="background-color: #ffffff">
      <yd-flexbox style="margin:8px 0;margin-left: 20px">
        <yd-flexbox-item id="searchId">
          <form action="javascript:return true;">
            <span class="icon_search"></span>
            <input type="search" class="search" placeholder="点击搜索"  @keyup.enter="search()" v-model="queryKey">
          </form>
        </yd-flexbox-item>
        <div class="classification" @click="changeClass">
          <yd-icon slot="icon" name="changyongfenlei" size=".42rem" custom color="#dcdcdc" v-if="theme==1"></yd-icon>
          <yd-icon slot="icon" name="liebiao" size=".42rem" custom color="#dcdcdc" v-else-if="theme==4"></yd-icon>
        </div>
      </yd-flexbox>
    </div>
    <yd-flexbox slot="navbar">
      <yd-flexbox-item>
        <yd-button size="large" type="hollow" bgcolor="#fff" :color="zh"  @click.native="comprehensive()">综合
        </yd-button>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-button  size="large" type="hollow" bgcolor="#fff" :color="xl"  @click.native="sales()">销量</yd-button>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-button size="large" type="hollow" bgcolor="#fff" :color="jg" @click.native="priceSor()">价格
          <icon v-if="sortType==1" name="jg-sx" :scale="1.5"></icon>
          <icon v-if="sortType==2" name="jg-jx" :scale="1.5"></icon>
          <icon v-if="jg=='#6d6d6d'" name="jg-mr" :scale="1.5"></icon>
        </yd-button>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <yd-button size="large" bgcolor="#fff" type="hollow"  @click.native="screenIng()" color="#6d6d6d">筛选
          <icon name="sx" :scale="1.5"></icon>
        </yd-button>
      </yd-flexbox-item>
    </yd-flexbox>
    <!--描述：商品列表-->
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <productlist slot="list" :productlist="list" :theme="theme"  @gotoDetail="gotoDetail"></productlist>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-popup v-model="show4" position="right" width="70%">
      <div class="splb2" style="margin-bottom: 1rem" slot="top">
        <p class="splb3">价格区间</p>
        <div>
          <input class="splb4" type="number" v-model="minPrice"  placeholder="最高价" style="border-radius: 3px;">
          <input class="splb5" type="number" v-model="maxPrice" placeholder="最低价" style="border-radius: 3px;">
        </div>
      </div>
      <div class="splb2" style="margin-bottom: 1rem">
        <p class="splb3">品牌</p>
        <ul v-for="item,index in screenlist" :key="index" class="brandlist">
          <li class="firstli">
            <p>{{index}}</p>
          </li>
          <li v-for="(brand,brandindex) in item" :key="brandindex"  class="brandName">
            <div style="padding: 0.2rem 0" @click="brand.select=!brand.select">
              <p style="width: 90%" :class="{'color':brand.select==true}">{{brand.brandName}}</p><yd-icon slot="icon" name="gou" size=".25rem" custom color="#d41d0f" v-if="brand.select==true"></yd-icon>
            </div>
          </li>
        </ul>
      </div>
      <div slot="bottom">
        <yd-button size="large" type="hollow" class="screeningButton" @click.native="reset()">重置</yd-button>
        <yd-button size="large" type="danger" bgcolor="#d41d0f" color="#ffffff" class="screeningButton" @click.native="screenOk()">确定</yd-button>
      </div>
    </yd-popup>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import productlist from '../../../views/productList'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'scrollPosion',
      ])
    },
    components: {
      productlist
    },
    data() {
      return {
        theme:1,
        categoryId:'',
        page:1,
        pageSize:10,
        sortType:0,//1 2 3
        minPrice:'',//1 2 3
        maxPrice:'',//1 2 3
        queryKey:'',
        show4: false,
        zh:'#ff0000',
        xl:'#6d6d6d',
        jg:'#6d6d6d',
        list:[],
        screenlist:[],
        selectscreenlist:[],
        priceSorting:1,//1 2 3
      }
    },
    mounted(){
      const _this=this;
      document.getElementById("scrollView").addEventListener('scroll',()=> {
        var top = document.getElementById("scrollView").scrollTop;
        _this.$store.dispatch('setscrollPosion',top);
      })
    },
    beforeRouteEnter(to, from, next) {
      next(function (vm) {
        if(from.name!='productsDetail'){
          vm.categoryId='';
          if(vm.$route.query.categoryId){
            vm.categoryId = vm.$route.query.categoryId;
          }
          vm.queryKey='';
          if(vm.$route.query.queryKey) {
            vm.queryKey=vm.$route.query.queryKey;
          }
          vm.show4=false;
          vm.xl='#6d6d6d';
          vm.zh='#ff0000';
          vm.jg='#6d6d6d';
          vm.list=[];
          vm.sortType=0;
          vm.page=1;
          vm.products();
        }else{
          document.getElementById("scrollView").scrollTop=vm.scrollPosion;
        }
      })
    },

    methods:{
      gotoback(){
        this.$router.go(-2);
      },
      changeClass(){
        if(this.theme==1){
          this.theme=4;
        }else{
          this.theme=1;
        }
      },
      search(){
        this.loadList();
      },
      /*筛选*/
      screenIng(){
        this.show4=!this.show4;
        var arr= Object.keys(this.screenlist)
        if(arr&&arr.length>0){
          return;
        }else{
          this.mallbrands();
        }
      },
      /*重置*/
      reset(){
        for (var key in this.screenlist){
          this.screenlist[key].forEach(function (item) {
            item.select=false;
          });
        }
        this.maxPrice=""
        this.minPrice="";
      },
      screenOk(){
        this.show4=!this.show4;
        var brandIds=[];
        for (var key in this.screenlist){
          this.screenlist[key].forEach(function (item) {
            if( item.select==true){
              brandIds.push(item.brandId);
            }
          });
        }
        this.selectscreenlist=brandIds;
        this.loadList();
      },
      mallbrands(){
        const that=this;
        baseHttp(this,'/api/brand/store/brands',{store:this.$store.getters.store},'get','',function (data){
          for (var key in data.brands){
            data.brands[key].forEach(function (item) {
                item.select=false;
            });
          }
          that.screenlist=data.brands;
        })
      },
      products(){
        var pars={categoryId:this.categoryId,page:this.page,pageSize:this.pageSize}
        if(this.sortType.length!=0){
          pars.sortType=this.sortType;
        }
        if(this.maxPrice.length!=0){
          pars.maxPrice=this.maxPrice;
        }
        if(this.minPrice.length!=0){
          pars.minPrice=this.minPrice;
        }
        if(this.queryKey.length!=0){
          pars.queryKey=this.queryKey;
        }
        if(this.selectscreenlist.length!=0){
          pars.brandIds=this.selectscreenlist.join(",");
        }
        const that=this;
        baseHttp(this,'/api/mall/products',pars,'post',this.page==1?'加载中...':'',function (data){
          if(that.page==1){
            if(data.skus) {
              that.list=data.skus;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              that.list=[];
            }
          }else{
            if(data.skus){
              that.list=that.list.concat(data.skus);
              if(data.skus&&that.page==data.totalPages){
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              }else{
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            }else{
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }
        })
      },
      priceSor(){
        this.xl='#6d6d6d';
        this.zh='#6d6d6d';
        this.jg='#ff0000';
        if (this.sortType==1){
          this.sortType=2;
        }else if(this.sortType==2||this.sortType==''||this.sortType==3){
          this.sortType=1;
        }
        this.loadList();
      },
      /*销量*/
      sales(){
        this.xl='#ff0000';
        this.zh='#6d6d6d';
        this.jg='#6d6d6d';
        this.sortType=3;
        this.loadList();
      },
      /*综合*/
      comprehensive(){
        this.xl='#6d6d6d';
        this.zh='#ff0000';
        this.jg='#6d6d6d';
        this.sortType=0;
        this.loadList();
      },
      loadList(){
        this.page=1;
        this.products();
      },
      loadMore(){
        this.page=this.page+1;
        this.products();
      },
      /**跳转至详情**/
      gotoDetail(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId}});
      }
    },
  }
  export default vm;
</script>
<style scoped>
  .splb2{
    margin:15px;
    display: block;
    background-color: #FFFFFF;
  }
  .splb3{
    background-color: #FFFFFF;
    color: #000000;
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }
  .splb4{
    border: 1px solid #D9D9D9;
    margin-top: 10px;
    height: 30px;
    width: 45%;
    float: right;
    padding: 10px;
  }
  .splb5{
    border: 1px solid #D9D9D9;
    margin-top: 10px;
    height: 30px;
    width: 45%;
    float: left;
    padding: 10px;
  }
  .splb6{
    margin-top: 60px;
  }
  .icon_search {
    background: url(../../../assets/img/search.png) no-repeat;
    background-size: 20px 20px;
  }
  #searchId form .search {
    width: 100%;
    height: 30px;
    border-radius: 15px;
    padding-left: 0.6rem;
    padding-right:0.2rem;
  }
  #searchId input{
    border: none;
    resize: none;
    outline: none;
    -webkit-appearance: none;
    background-color: #f5f5f5;
  }
  #searchId form .icon_search {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 30px;
    top: 13px;
  }
  .classification{
    width: 15%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    padding-right: 10px;
  }
  .screeningButton{
    width: 50%;font-size: .3rem;float: left;border-radius:0px
  }
  .brandlist{
    background-color: #ffffff;
  }
  .brandlist li{
    border-bottom: 1px solid #e3e3e3;
  }
  .brandlist .firstli{
    background-color: #f5f5f5;
    padding:0.1rem 0;
    color: #999;
    padding-left: 0.2rem
  }
  .brandlist .brandName{
    padding-left: 0.2rem;
    background-color: #ffffff;
    color: #000;
  }
  .brandlist .brandName .color{
    color:#d41d0f;
    float: left;
  }
</style>
<style>
  #prolist .yd-btn-block{
    margin-top: 0px;
    font-size: 0.27rem;
    border-radius:0px
  }
</style>
