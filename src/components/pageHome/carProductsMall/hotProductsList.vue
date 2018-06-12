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
    <!--描述：商品列表-->
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <hotProductList slot="list" :productlist="list" theme="1"  @gotoDetail="gotoDetail"></hotProductList>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/babel">

  import hotProductList from '@/views/hotProductList/hotindex'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'scrollPosion',
      ])
    },
    components: {
      hotProductList
    },
    data() {
      return {
        theme:1,
        categoryId:'',
        page:1,
        pageSize:10,
        queryKey:0,//1 2 3
        list:[],
      }
    },
    mounted(){
      document.getElementById("scrollView").addEventListener('scroll',()=> {
        var top = document.getElementById("scrollView").scrollTop;
        this.$store.dispatch('setscrollPosion',top);
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
          vm.list=[];
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
      products(){
        var pars={categoryId:this.categoryId,page:this.page,pageSize:this.pageSize}
        if(this.queryKey.length!=0){
          pars.queryKey=this.queryKey;
        }
        this.apiRequest('/admin/product/hotSku',pars,'get',this.page==1?'加载中...':'',data=>{
          if(this.page==1){
            if(data.data.recordList) {
              this.list=data.data.recordList;
              this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              this.list=[];
            }
          }else{
            if(data.data.recordList){
              this.list=[...this.list,...data.data.recordList];
              if(data.data.recordList&&this.page==data.data.endIndex){
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              }else{
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            }else{
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }
        })
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
