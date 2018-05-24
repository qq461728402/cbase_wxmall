<template>
  <yd-layout id="carPro">
    <yd-navbar slot="navbar" title="商品分类" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="yd-scrolltab">
      <div class="yd-scrolltab-nav">
        <div class="yd-scrolltab-item" :class="{'yd-scrolltab-active':careItem.select}" v-for="careItem,index in categories" :key="index" @click="selectItem(index)">
          <div class="yd-scrolltab-icon"><i class="demo-icons-category1"></i></div>
          <div class="yd-scrolltab-title" style="font-size: .25rem;">{{careItem.categoryName}}</div>
        </div>
      </div>
      <div class="yd-scrolltab-content">
        <div v-if="caturl&&caturl.length>0">
          <img :src="caturl" width="100%">
        </div>
        <yd-grids-group :rows="3">
          <yd-grids-item v-for="item,index in catItemlist" :key="index" :link="{ path: 'item.link'}">
            <img slot="icon" v-lazy="item.imgUrl">
            <span slot="text">{{item.categoryName}}</span>
          </yd-grids-item>
        </yd-grids-group>
      </div>
    </div>
    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" link="/home">
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" type="a" active>
        <yd-icon slot="icon" size="0.54rem" name="fenlei" custom></yd-icon>
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
<script type="text/ecmascript-6">
  import {baseHttp} from '../../../config/env'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'quantity'
      ])
    },
    data() {
      return {
        initindex:0,
        nums:10,
        categories:[],
        catItemlist:[],
        cacheCatItemList:[],
        caturl:'',
        caturllist:[],
        selectcategoryId:''
      }
    },
    mounted(){
      if(this.$route.query.hasOwnProperty("categoryId")){
        this.selectcategoryId = this.$route.query.categoryId;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(function (vm) {
          if(from.name=='home'){
            if(vm.$route.query.hasOwnProperty("categoryId")){
              vm.selectcategoryId = vm.$route.query.categoryId;
            }
          }
        vm.getData();
      });
    },
    methods:{
      gotoback(){
        this.$router.go(-2);
      },
      getData(){
        var l=this.$store.state.basicStorage.categoryList;
        if(l.length>0){
          this.categories=l;
          this.cacheCatItemList=this.categories;
          for (var key in this.categories){
            if(this.selectcategoryId.length>0&&this.selectcategoryId==this.categories[key].categoryId){
              this.categories[key].select=true;
              this.selectItemCategories(this.categories[key].categoryId,key);
            }else if(this.selectcategoryId.length==0&&key==this.initindex){
              this.categories[key].select=true;
              this.selectItemCategories(this.categories[key].categoryId,key);
            }else{
              this.categories[key].select=false;
            }
          }
          return;
        }
        const  that=this;
        baseHttp(this,'/api/mall/category',this.loginpas,'post','加载中...',function (data) {
          if(data.categories){
            that.cacheCatItemList=data.categories;
            for (var key in data.categories){
              if(that.selectcategoryId.length>0&&that.selectcategoryId==data.categories[key].categoryId){
                data.categories[key].select=true;
                that.selectItemCategories(data.categories[key].categoryId,key);
              }else if(that.selectcategoryId.length==0&&key==that.initindex){
                data.categories[key].select=true;
                that.selectItemCategories(data.categories[key].categoryId,key);
              }else{
                data.categories[key].select=false;
              }
            }
            that.categories=data.categories;
            that.$store.dispatch('setCategoryList', that.categories);
          }
        })
      },
      /*加载数据*/
      selectItemCategories(parentId,index){
        this.selectcategoryId=parentId+'';
        const that =this;
        this.catItemlist=that.cacheCatItemList[index].catItemlist!=undefined?that.cacheCatItemList[index].catItemlist:[];
        if(that.caturllist.length>=index){
          this.caturl=that.caturllist[index]?that.caturllist[index]:'';
        }
        if(this.catItemlist.length>0)return;
        baseHttp(this,'/api/mall/category',{'parentId':parentId},'post',this.catItemlist.length==0?'加载中...':'',function (data){
          if(data.categories){
            that.caturllist[index]=data.url;
            that.cacheCatItemList[index].catItemlist=data.categories;
            that.catItemlist=data.categories;
            that.caturl=data.url;
          }else{
            that.caturllist[index]='';
            that.cacheCatItemList[index].catItemlist=[];
            that.catItemlist=[];
          }
        })
      },
      selectItem(index){
        for(var key in this.categories){
          if (key==index){
            this.categories[index].select=true;
          }else{
            this.categories[key].select=false;
          }
        }
        this.selectItemCategories(this.categories[index].categoryId,index);
      },
      gotoList(item){
        console.log(item);
        this.$router.push({path:item.link});
      }
    },
  }
  export default vm;
</script>
<style>
  #carPro .yd-scrolltab-item{
    min-width: 2rem;
  }
  #carPro .yd-grids-item:after{
    border-bottom:none ;
  }
  #carPro .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before{
    border-right: none;
  }
  #carPro .yd-grids-3:before{
    border-bottom: 0px;
  }
  #carPro .yd-scrolltab-content{
    padding:.02rem;
  }
  #carPro .yd-grids-txt{
    padding:0px
  }
  #carPro .yd-grids-icon{
    height:1.2rem
  }
  #carPro .yd-scrolltab-active{
    background-color: #f5f5f5;
  }
  #carPro .yd-scrolltab-active  .yd-scrolltab-title{
    color: #d41d0f;
  }
  #carPro .yd-scrolltab-nav{
    background-color: #ffffff;
  }
  #carPro .yd-scrolltab-content{
    background-color: #f5f5f5;
  }
  #carPro .yd-scrolltab-content > div{
      margin: 0.2rem;
  }
  #carPro .yd-scrolltab-active:before{
    border-right:0px;
  }
</style>
<style scoped>
  img[lazy=loaded] {

  }
  img[lazy=error] {
    background: url(~@/assets/img/default.png);
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }
</style>
