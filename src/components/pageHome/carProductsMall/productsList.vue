<template>
  <yd-layout id="prolist">
    <yd-navbar slot="navbar" title="商品列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
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
        <ul slot="list" style="background-color: #FFFFFF;">
          <li v-for="item,index in list" :key="index"  style="border-bottom: 1px solid #edeeef;">
            <yd-flexbox @click.native="gotoDetail(item)">
              <div style="overflow:hidden; padding: 0.15rem;height: 1.8rem;width: 1.8rem">
                <img :src="item.url" style="height: 1.5rem;width: 1.5rem">
              </div>
              <yd-flexbox-item style="height:1.8rem">
                <yd-flexbox direction="vertical" style="padding-top: 0.15rem;padding-right: 0.1rem">
                  <yd-flexbox-item><p style="overflow:hidden; text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size: 0.28rem ">{{item.skuName}}</p></yd-flexbox-item>
                  <yd-flexbox-item><p style="color:#d41d0f;font-size: 0.25rem;line-height: 0.5rem">&yen;{{item.salePrices}}&nbsp<span style="color:#6e6f70;text-decoration:line-through;">&yen;{{item.retailPrices}}</span></p></yd-flexbox-item>
                  <yd-flexbox-item><span style="color: #6e6f70;font-size: 0.25rem;line-height: 0.5rem">已售&nbsp<span style="color:#ff7d49">{{item.salesCount?item.salesCount:'0'}}</span> |&nbsp;<span style="color: #6e6f70;">评论</span>&nbsp;<span style="color:#ff7d49 ">{{item.reviewCount?item.reviewCount:'0'}}</span></span>&nbsp;<span v-if="item.isAvalible==false" style="font-weight: bold;color: #d41d0f;">{{(item.unAvalibleReson)}}</span></yd-flexbox-item>
                </yd-flexbox>
              </yd-flexbox-item>
            </yd-flexbox>
          </li>
        </ul>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-popup v-model="show4" position="right" width="70%">
      <div class="splb2">
        <p class="splb3">价格区间</p>
        <div>
          <input class="splb4" type="number" v-model="minPrice"  placeholder="最高价" style="border-radius: 3px;">
          <input class="splb5" type="number" v-model="maxPrice" placeholder="最低价" style="border-radius: 3px;">
        </div>
        <div class="splb6">

        </div>
      </div>
      <div class="splb2">
        <p class="splb3">品牌</p>
        <yd-checkbox-group v-model="selectscreenlist" color="#d41d0f">
          <yd-checkbox :val="item.brandId" shape="circle" v-for="item,index in screenlist" :key="index">{{item.brandName}}</yd-checkbox>
        </yd-checkbox-group>
      </div>
      <div style="margin-top: 2rem;">
        <yd-button size="large" type="danger" bgcolor="#d41d0f" color="#ffffff" style="width: 80%;margin-left:10%;font-size: .3rem;" @click.native="screenOk()">确定</yd-button>
      </div>
    </yd-popup>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  const vm= {
    data() {
      return {
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
      if(this.$route.query.categoryId){
        this.categoryId = this.$route.query.categoryId;
      }
      if(this.$route.query.queryKey){this.queryKey=this.$route.query.queryKey;}
      this.page=1;
      this.products();
    },
    methods:{
      gotoback(){
        this.$router.go(-2);
      },
      /*筛选*/
      screenIng(){
        this.show4=!this.show4;
        if(this.screenlist.length>0){
          return;
        }
        this.mallbrands();
      },
      screenOk(){
        this.show4=!this.show4;
        this.loadList();
      },
      mallbrands(){
        const that=this;
        baseHttp(this,'/api/mall/brands',{},'get','',function (data){
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
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId},meta:{title:'商品详情'}});
      }
    },

  }
  export default vm;
</script>
<style scoped>
  .splb2{
    margin:15px;
    background-color: #FFFFFF;
  }
  .splb3{
    background-color: #FFFFFF;
    color: #000000;
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
</style>
<style>
    #prolist .yd-btn-block{
      margin-top: 0px;
    }
</style>
