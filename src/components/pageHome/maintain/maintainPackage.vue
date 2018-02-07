<template>
  <yd-layout id="maintain">
    <yd-navbar slot="navbar" title="保养套餐" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="topHead" slot="navbar">
      <div class="models" style="height: 55px">
        <div class="left">
          <div v-if="carInfo.name">
            <img :src="carInfo.logo" style="height: 42px">
            <p class="title" style="height: 21px;line-height: 21px" v-cloak>{{carInfo.type}}</p>
            <p class="desc" style="height: 21px;line-height: 21px" v-cloak>{{carInfo.name}}</p>
          </div>
          <div v-else>
            <p class="title" style="height: 42px;line-height: 42px" v-cloak>请选择车辆</p>
          </div>
        </div>
        <div class="right" style="text-align: right">
          <span @click="gotocar">更换</span>
        </div>
      </div>
    </div>
    <ul class="yd-scrollnav-tab-item" style="color: rgb(255, 0, 0); height: 0.9rem;" id="scroll" slot="navbar">
      <li :class="{'yd-scrollnav-current':brandId==item.brandId}" style="color: rgb(51, 51, 51);" v-for="item in tablist" @click="switchlist(item.brandName,item.brandId,$event)"><i></i><span>{{item.brandName}}</span></li>
    </ul>
    <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div slot="list" style="padding:0 .24rem 0 0; border: 1px solid #D9D9D9;margin: .3rem;border-radius: 5px;" v-for="item in list" @click="gotoDeatil(item)">
          <div style="position: absolute;right: 0.311rem;"><img src="../../../assets/img/tuijian.png" style="width: .8rem;"/></div>
          <yd-flexbox style="box-sizing: content-box;">
            <div style="padding: 0.15rem;height: 2rem;width: 2rem">
              <img :src="item.url" style="height: 1.8rem;width: 1.8rem">
            </div>
            <yd-flexbox-item style="height:1.8rem;margin-left: .1rem;">
              <yd-flexbox direction="vertical">
                <yd-flexbox-item style="padding-top: .15rem;"><p style="font-size: 0.3rem;min-height: 1rem">{{item.skuName}}</p></yd-flexbox-item><!--商品名-->
                <yd-flexbox-item>
			                    <span style="color:red;font-size: 0.25rem;">&yen;{{item.salePrices}}&nbsp;
			                        <span style="color:#6e6f70;text-decoration:line-through;">&yen;{{item.retailPrices}}</span>
			                        <span style="float: right;">
			                         	<yd-button type="hollow" style="height: .55rem;border:1px solid #d41d0f;color: #d41d0f;"  @click.native.stop="gotoOrderConfirm(item)">立即购买</yd-button>
			                        </span>
			                    </span>
                </yd-flexbox-item><!--加入购物车-->
              </yd-flexbox>
            </yd-flexbox-item>
          </yd-flexbox>
        </div>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <!--选项卡-->

    <div slot="tabbar" style="padding-bottom: 0.2rem">
      <div align="center" style="padding-top: .3rem;">没有找到合适您的保养套餐？可以来试试</div>
      <div align="center" style="padding-top: .3rem;">
        <yd-button type="hollow" style="width: 85%;border:1px solid #d41d0f;color: #d41d0f;" @click.native="zzby">自助保养</yd-button>
      </div>
    </div>


  </yd-layout>
</template>
<script type="text/babel">
  import {getStore,setStore} from '../../../config/mUtils'
  import {baseHttp} from '../../../config/env'
  const vm = {
    data() {
      return {
        carInfo: {},
        categoryId: '',
        brandId: '',
        page: 1,
        pageSize: 10,
        list: [],
        tablist: [],
        totalPages: 1,
      }
    },
    mounted(){
      this.categoryId = this.$route.query.categoryId;
      this.brandId = this.$route.query.brandId;
      var carInfo = getStore('carInfo');
      if (carInfo.type) {
        this.carInfo = carInfo;
      }
      this.brandslist();
    },
    methods: {
      gotoback(){
        this.$router.go(-1);
      },
      brandslist(){
        var pars = {categoryId: this.categoryId}
        const  that =this;
        baseHttp(this, "/api/maintenance/brands", pars, 'get', '加载中...', function (data) {
          if (data.brands) {
            that.tablist = data.brands;
            that.products(false);
          }
        })
      },
      products(isrefresh){
        if (this.page > this.totalPages) {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        var pars = {categoryId: this.categoryId, page: this.page, pageSize: this.pageSize, sortType: '0'}
        pars.brandIds = this.brandId;
        const that = this;
        baseHttp(this, '/api/mall/products', pars, 'post', (this.page == 1&&isrefresh==false) ? '加载中...' : '', function (data) {
          if (data.totalPages) {
            that.totalPages = data.totalPages;
          }
          if (that.page == 1) {
            if (data.skus) {
              that.list = data.skus;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }
          } else {
            if (data.skus) {
              that.list = that.list.concat(data.skus);
              if (data.pageSize != that.pageSize) {
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              } else {
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            } else {
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
          }
        })
      },
      /* 下拉刷新 */
      pullList() {
        this.page = 1;
        this.products(true);
      },
      /* 上拉加载更多 */
      loadList() {
        this.page = this.page + 1;
        this.products(true);
      },
      switchlist(label, tabkey,e) {
        document.getElementById('scroll').scrollLeft=e.currentTarget.offsetLeft-10;
        this.brandId = tabkey;
        this.list = [];
        this.page = 1;
        this.products(false);
      },
      /*选择车辆*/
      gotocar(){
        this.$router.push({ name: 'carchoose'})
      },
      /*自主保养*/
      zzby() {
        this.$router.push({ name: 'carmaintain',query:{type:'upkeep'}})
      },
      gotoDeatil(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId},meta:{title:'商品详情'}});
      },
      gotoOrderConfirm(item){
        var oderInfo={};
        var carInfo = getStore('carInfo');
        if (carInfo.type){
          oderInfo.carDetailId=carInfo.id;
        }
        var cityInfo=getStore('cityInfo');
        if(cityInfo.cityName){
          oderInfo.location=cityInfo.cityName;
        }else{
          oderInfo.location='重庆';
        }
        oderInfo.orderType='GENERAL';
        var products=[];
        var product={};
        product.skuId=item.skuId;
        product.quantity=1;
        product.categoryId=item.categoryId;
        products.push(product);
        oderInfo.products=products;
        setStore("oderInfo",oderInfo);
        this.$router.push({ name: 'orderSubmit'});
      },
    },
    beforeRouteLeave(to,from,next){
      if(to.name=='carmaintain'){
        to.meta.title='汽车保养';
      }
      console.log(to);
      next(function (vm) {

      });
    },

  }
  export default vm;
</script>
<style scoped>
  .topHead {
    width: 100%;
    max-width: 750px
  }

  .topHead .models {
    background: #fff;
    padding: 0 15px 0 15px;
    border-bottom: 1px solid #d9d9d9
  }

  .topHead .models .left {
    float: left;
    height: 50px;
    width: 70%;
    padding: 8px 0 0 0
  }

  .topHead .models .left img {
    width: 42px;
    height: 42px;
    float: left;
    margin: 0 8px 0 0
  }

  .topHead .models .left .title {
    font-size: .3rem;
    margin-bottom: 0;
    color: #333
  }

  .topHead .models .left .desc {
    font-size: 12px;
    margin-bottom: 0;
    color: #999;
    white-space: nowrap
  }

  .topHead .models .left::after {
    content: "";
    display: table;
    clear: both
  }

  .topHead .models .right {
    float: right;
    width: 30%;
    height: 50px;
    line-height: 50px;
    font-size: .3rem;
    color: #666
  }

  .topHead .selectedBy {
    background: #fff;
    height: 49px;
    line-height: 49px;
    font-size: 13px;
    border-bottom: 1px solid #d9d9d9;
    color: #333;
    padding: 0 0 0 15px
  }

  .topHead .selectedBy .left {
    float: left
  }

  .topHead .selectedBy .left p .red {
    color: #f57c33
  }

  .topHead .selectedBy .left p .total {
    color: #999;
    margin-left: 10px
  }

  .topHead .selectedBy .right {
    float: right;
    color: #666;
    position: relative;
    width: 55px
  }

  .topHead .selectedBy .right::after {
    position: absolute;
    content: '';
    width: 7px;
    height: 13px;
    background: url(../../../assets/img/arrowv2.png) no-repeat;
    background-size: 100%;
    right: 15px;
    top: 17px
  }

  .topHead .selectedBy::after {
    content: "";
    display: table;
    clear: both
  }
</style>
<style>
  #maintain .yd-scrollnav-tab-item::-webkit-scrollbar {
    display: none
  }
  #maintain .yd-scrollnav-tab-item{
    overflow-x:scroll;
    flex:initial;
    background-color: white;
  }
  #maintain{
    background-color: white;
  }
  #maintain .yd-list-donetip{
    padding: 0px;
  }
</style>
