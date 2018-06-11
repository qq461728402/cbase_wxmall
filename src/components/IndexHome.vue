<template>
  <yd-layout id="home" style="background-color: #fff">
    <div style="text-align: center;background-color:rgba(212, 29, 15, 0);position: fixed;width: 100%;max-width: 750px; z-index: 101;" id="my_search" >
      <yd-flexbox style="margin:8px 0;">
        <div style="width: 22%;height: 30px;line-height: 30px" @click="gotocitychoose">
          <span class="city">{{cityName}}</span>
        </div>
        <yd-flexbox-item id="searchId">
          <form action="javascript:return true;">
            <span class="icon_search"></span>
            <input type="search" class="search" placeholder="点击搜索"  @keyup.enter="search()" v-model="searchValue">
          </form>
        </yd-flexbox-item>
        <div style="width: 15%;height: 30px;line-height: 30px">
          <a :href="'tel:'+storeinfo.systemPhone">
            <yd-icon slot="icon" name="kefu" size=".42rem" custom color="#ffffff"></yd-icon>
          </a>
        </div>
      </yd-flexbox>
    </div>
    <!--banner-->
    <yd-slider autoplay="3000"  style="height:3.5rem" id="my_banner">
      <yd-slider-item v-for="item,index in banner.items" :key="index" @click.native="gotoinsurance(item)">
        <img :src="item.img">
      </yd-slider-item>
    </yd-slider>
    <yd-grids-group :rows="5" v-if="primaryMenu.code" id="primaryMenu">
      <yd-grids-item @click.native="gotoinsurance(item)" v-for="item,index in primaryMenu.items" :key="index">
        <img slot="icon" v-lazy="item.img"  style="height: 100%">
        <span slot="text" style="display: block;font-size: .25rem;color: #000000;" v-cloak>{{item.title}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <div align="center" style="background-color: #ffffff;" v-if="advertisement.code">
      <img :src="item.img" style="width: 85%;margin-top: .15rem;" v-for="item in advertisement.items" @click="gotofluid(item)"/>
    </div>
    <yd-grids-group :rows="5" v-if="secondaryMenu.code" id="secondaryMenu">
      <yd-grids-item @click.native="gotocarproduct(item)" v-for="item,index in secondaryMenu.items" :key="index">
        <img slot="icon" v-lazy="item.img" style="height: 100%;">
        <span slot="text" style="font-size: 0.25rem">{{item.title}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <!--coupon-->
    <swiper :options="swiperOption1" style="padding-bottom: .15rem;padding-top: .15rem;border-bottom: 10px solid #f5f5f5;background-color: #fff;" id="coupon">
      <swiper-slide v-for="item,index in coupon.items" :key="index" width="100%">
        <img style="width: 100%;height: 100%" :src="item.img" @click="gotofluid(item)">
      </swiper-slide>
    </swiper>
    <div v-for="codeitem in config" style="background-color: #fff;">
      <div v-if="codeitem.code=='gridView'" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          </span>
          </span><span class="line"></span>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" id="gridView">
          <swiper-slide v-for="itemlst,index in codeitem.items" :key="index">
            <yd-grids-group :rows="3" item-height="100px">
              <yd-grids-item v-for="item,index1 in itemlst" :key="index1" @click.native="gotofluid(item)">
                <div slot="else" style="text-align: center; overflow: hidden;height: 100%;width: 100%">
                  <img :src="item.img" style="margin: auto;height: 100%">
                </div>
              </yd-grids-item>
            </yd-grids-group>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <!-- swiper -->
      </div>
      <div v-else-if="codeitem.code=='rowSpan'&&codeitem.items.length>=5" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          <span class="line"></span>
        </div>
        <div class="rowSpan">
          <div class="rowSpanLeft">
            <div style="width: 100%;height: 100%">
              <div class="thumb">
                <img :src="codeitem.items[0].img" @click="gotofluid(codeitem.items[0])"/>
              </div>
            </div>
          </div>
          <div class="rowSpanRight">
            <div style="margin-left: 5%; width: 45%;height: 47.5%;float: left;margin-bottom: 2.5%">
              <div class="thumb">
                <img :src="codeitem.items[1].img" @click="gotofluid(codeitem.items[1])"/>
              </div>
            </div>
            <div style="margin-left: 5%;width: 45%;height: 47.5%;float: left;margin-bottom: 2.5%">
              <div class="thumb">
                <img :src="codeitem.items[2].img" @click="gotofluid(codeitem.items[2])"/>
              </div>
            </div>
            <div style="margin-left: 5%; width: 45%;height: 47.5%;float: left;">
              <div class="thumb">
                <img :src="codeitem.items[3].img" @click="gotofluid(codeitem.items[3])"/>
              </div>
            </div>
            <div style="margin-left: 5%;width: 45%;height: 47.5%;float: left;">
              <div class="thumb">
                <img :src="codeitem.items[4].img" @click="gotofluid(codeitem.items[4])"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="codeitem.code=='fluid'" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          <span class="line"></span>
        </div>
        <div style="overflow: hidden; min-height: 100px">
          <div v-for="item in codeitem.items" @click="gotofluid(item)" style="font-size: 0;">
            <img :src="item.img" style="width: 100%;"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hotproductsList.length>0" style="background-color: #f5f5f5">
      <div class="codeitemTitle" style="background-color: #ffffff">
        <span class="line"></span>
        <span class="txt"><yd-icon name="hothuorererexiao" size=".3rem" color="#d41d0f"  custom></yd-icon>热销商品</span>
        <span class="line"></span>
        <span style="position: absolute;right: .3rem;padding: 0 0 0 0.2rem" @click="gotoHotList">更多<yd-icon name="youjiantou" size=".2rem" color="#d41d0f" custom></yd-icon></span>
      </div>
      <div>
        <hotProductList :productlist="hotproductsList" theme="1"  @gotoDetail="gotoDetail"></hotProductList>
      </div>
      <div class="yd-list-donetip"><span>我是有底线的</span></div>
    </div>
    <yd-backtop></yd-backtop>
    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" type="a" active>
        <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" link="/category" >
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
  import {baseHttp} from '@/config/env'
  import {setStore, getStore} from '@/config/mUtils'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getLocation} from '@/config/weichatPay'
  import {bindEvent} from '@/config/event'
  import { mapGetters } from 'vuex'
  import hotProductList from '@/views/hotProductList/hotindex'
  export default {
    name: 'IndexHome',
    components: {
      swiper,
      swiperSlide,
      hotProductList
    },
    data () {
      return {
        hotproductsList:[],
        title:'',
        bl:'',
        mySwiper: '',
        weixinInfo: {},
        config: [],
        banner: {},
        primaryMenu: {},
        secondaryMenu: {},
        advertisement: {},
        gridViewlst: [],
        coupon: {},
        signatureInfo: {},
        searchValue: '',
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        swiperOption1: {
          slidesPerView: 1,
          centeredSlides: false,
          autoHeight: true,
        }
      }

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      ...mapGetters([
        'indexhomeScroll','quantity','storeinfo','cityName'
      ])
    },
    mounted(){
      bindEvent(this);
      this.getCartsQuantity();
      this.signature();
      this.getConfig();
    },
    beforeRouteEnter(to, from, next) {
      next(vm=> {
        document.title=vm.storeinfo.systemName;
        vm.searchValue='';
        document.getElementById("scrollView").scrollTop=vm.indexhomeScroll;
      });
    },
    methods: {
      getConfig(){
        var storeConfig=this.$store.state.basicStorage.configList
        const that = this;
        baseHttp(this, '/api/index/config', {}, 'get', storeConfig.length>0?'':'加载中...', function (data) {
          that.config = data.config;
          that.$store.dispatch('setConfig',data.config);
          if (that.config instanceof Array) {
            that.config.forEach(function (item) {
              if ("banner" == item.code) {
                that.banner = item;
              } else if ("primaryMenu" == item.code) {
                that.primaryMenu = item;
              } else if ("secondaryMenu" == item.code) {
                that.secondaryMenu = item;
              } else if ("coupon" == item.code) {
                that.coupon = item;
              } else if ("gridView" == item.code) {
                var result = [];
                for (var i = 0, len = item.items.length; i < len; i += 6) {
                  result.push(item.items.slice(i, i + 6));
                }
                item.items = result;
              }
            })
          }
          that.gethotproducts();
        })
      },
      gethotproducts(){
        document.title=this.storeinfo.systemName;
        baseHttp(this, '/admin/product/hotSku', {'store':this.storeinfo.storeId,'page':1,'pageSize':20}, 'get','', data=>{
          if (data.data &&data.data.recordList){
              this.hotproductsList=data.data.recordList;
            }
        })
      },
      gotoDetail(item){
        this.$router.push({ name: 'productsDetail',query:{skuId:item.skuId}});
      },
      gotoindex(){
        this.$router.push({path: 'stores'})
      },
//    查询服务
      search(){
        this.$router.push({path: '/home/productsList', query: {queryKey: this.searchValue}});
      },
      gotoinsurance(item){
        this.$router.push({path: item.url})
      },
//    选择城市
      gotocitychoose(){
        return;
        this.$router.push({path: 'home/chooseCity'})
      },
//    车品商城
      gotocarproduct(item){
        this.$router.push({path: item.url});
      },
//  进入领券中心
      gotofluid(item){
        console.log(item);
        this.$router.push({path: item.url});
      },
      gotocarlist(){
        this.$router.push({path: 'home/CarChoose'})
      },
      gotochoosecar(){
        this.$router.push({path: 'home/CarChoose'})
      },
      signature(){
        const that = this;
        if (window.location.href.indexOf('home/')!=-1){
          return;
        }
        baseHttp(this, '/wechat/jsapi/signature', {'url': window.location.href}, 'post', '', data=> {
          if (data.signature) {
            this.signatureInfo = data.signature;
            this.getLocation();
          }
        })
      },
      /*获取购物车数量*/
      getCartsQuantity(){
        return;
        baseHttp(this, '/api/carts/cartsQuantity', {}, 'get', '', data=> {
          if (data.quantity >= 0) {
            this.$store.dispatch('setQuantity', data.quantity);
          }
        })
      },
      getLocation(){
        getLocation(this.signatureInfo, success=> {
            console.log(success);
            var map = new BMap.Map('');
            var point = new BMap.Point(success.longitude, success.latitude);
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, rs=> {
              var addComp = rs.addressComponents;
              var data = {
                latitude: success.latitude,
                longitude: success.longitude,
                cityname: addComp.district
              };
              this.$store.dispatch('setCityName',data.cityname);
            });
          },
          function (fail) {
            console.log(fail);
          })
      },
      //进入热销商品
      gotoHotList(){
        this.$router.push({path: 'home/hotProductsList'})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .city {
    overflow-x:hidden;
    color: white;
    padding-right: 15px;
    background: url(../assets/img/pull-down.png) no-repeat;
    background-position: right;
    background-size: 15px 15px;
    font-size: 0.3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: white;
  }
  #searchId form .icon_search {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 24%;
    top: 13px;
  }
  .codeitemView {
    border-bottom: 10px solid #f5f5f5;
    background-color: #fff;
  }
  .codeitemTitle {
    border-bottom: 1px solid #ebeced;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .codeitemTitle .line {
    display: inline-block;
    width: .5rem;
    border-top: 1px solid #ccc;
  }
  .codeitemTitle .txt {
    color: #000000;
    font-size: 0.3rem;
    vertical-align: -8%;
  }
  .codeitemTitle span {
    color: #ccc;
  }
  .rowSpan {
    overflow: hidden;
    height: 3.5rem;
    border-bottom: 1px solid #ebeced;
    padding: 2%;
  }
  .rowSpanLeft {
    width: 36%;
    float: left;
    height: 100%;
  }
  .rowSpan .thumb{
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 0.2rem;
  }
  .rowSpan .thumb img {
    vertical-align: middle;
    position: absolute;
    margin: auto;
    left: 0rem;
    right: 0rem;
    top: 0rem;
    bottom: 0rem;
    max-width: 100%;
    max-height: 100%;
  }
  .rowSpanRight {
    width: 64%;
    float: right;
    height: 100%;
  }
  .icon_search {
    background: url(../assets/img/search.png) no-repeat;
    background-size: 20px 20px;
  }
</style>
<style>
  #home .yd-cell-box {
    margin-bottom: 0px;
  }
  #home .yd-scrollview:after{
    height:0
  }
  #home .yd-cell:after {
    border-bottom: 0px
  }

  #home .yd-cell-right {
    min-height: 0.5rem;
  }

  #home .yd-show-car {
    margin-top: -0.5rem
  }

  #home .yd-grids-item:after {
    border-bottom:none;
  }
  #home .yd-backtop {
    bottom: 1.5rem;
  }
  #home .yd-grids-icon{
    height:.9rem
  }
  #home .yd-grids-item{
    padding:0.2rem 0;
  }
  #primaryMenu .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
    border-right: none;
  }

  #primaryMenu .yd-grids-5:before {
    border-bottom: none;
  }

  #primaryMenu .yd-grids-item:after {
    border-bottom: none;
  }

  #secondaryMenu .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
    border-right: none;
  }

  #secondaryMenu .yd-grids-5:before {
    /*border-bottom:1px solid #edeeef !important;*/
    border-bottom: none;
  }

  #gridView .yd-grids-3:before {
    border-bottom: none !important;
  }

  #gridView .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before {
    border-right: 1px solid #edeeef;
  }

  #gridView .yd-grids-item:after {
    border-bottom: 1px solid #edeeef !important;
  }

  #gridView .swiper-button-next {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAYAAAAm56DSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDN0UyN0EzQ0I2MDExRTdCQkFCQzZDNjg5RDU0QjA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJDN0UyN0E0Q0I2MDExRTdCQkFCQzZDNjg5RDU0QjA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkM3RTI3QTFDQjYwMTFFN0JCQUJDNkM2ODlENTRCMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkM3RTI3QTJDQjYwMTFFN0JCQUJDNkM2ODlENTRCMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5E5AqKAAABGUlEQVR42mJkYGAwZqASYGKgIhg1bNSw4WPYmjVr1ECYKoZpaGioBwYGztq7d68xxYbp6OhsPnDgQLGDg0PvlStXfCkOM2dn57Pr169P09TULCbGQIIREBIScmvy5MlRKioqkW/fvm2gODYLCgqe5efnp3Nzc6vhM5DopDFz5szPIANZWFh4f/z4sSw9PZ0XXQ0jqSUtyJBp06Ztfvbs2TJZWdlZyHIspBgESnf+/v692AwiyZsgg0Dp7ubNm7OwGUS0y0DJQl1dPe369eu9oPRHdgSADAKls40bNxbjM4igyx4/fpwmISHhC0q4oPRGdqIFGSQqKuqQk5MTRYxBeJMGLB2B0hexkURyOhsttkcNGzWMLoYBBBgAE7Zsl1paXhwAAAAASUVORK5CYII=") !important;
    right: 0 !important;
  }

  #gridView .swiper-button-prev {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAYAAAAm56DSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFNzFBRjFDQ0I2MDExRTc5ODY2RDlDQkFCRkI3NjZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFNzFBRjFEQ0I2MDExRTc5ODY2RDlDQkFCRkI3NjZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUU3MUFGMUFDQjYwMTFFNzk4NjZEOUNCQUJGQjc2NkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU3MUFGMUJDQjYwMTFFNzk4NjZEOUNCQUJGQjc2NkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6+zIFGAAABDUlEQVR42mJkYGAwZqASYGKgIhg1bNSw4W/YmjVr1ECYYsP27t1rHBgYOEtDQ0MdmzwLsQZduXLFV1NTs/jAgQPFzs7OZ8l2Gcyg9evXp+EyiCiXvX37toGbm1tt8uTJUQUFBc/wqWUhxqD8/Pz0mTNnfiYrNtPT03l//PixjIWFhZdYg0CAEVtJ+/jx4zQpKamorKwsX2INwmkYzEAJCQnfjRs3FoeEhNyiKNHKysrOunnz5ixQusKVSIl2GXKyUFdXTwMZrKOjs5mi7AQyAORVUDoDGUyRy5DzpL+/f++LFy82g4KAorwJioScnJwoUVFRB1DkUJQ3QQCaTNIp9uZosT1q2KhhdDUMIMAAeoFsxdIhoU8AAAAASUVORK5CYII=") !important;
    left: 0 !important;
  }
  #primaryMenu img[lazy=error] {
    background: url(~@/assets/img/default.png);
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }
  #my_banner img[lazy=error] {
    background-color: #f5f5f5;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
    height: 3.5rem;
  }
  #coupon .swiper-wrapper{
    height: 100% !important;
  }
</style>
