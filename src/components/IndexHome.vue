<template>
  <yd-layout id="home" style="background-color: #fff">
    <yd-navbar slot="navbar" title="首页" bgcolor="#d41d0f" color="#FFF">
    </yd-navbar>
    <div slot="navbar" style="text-align: center;background-color: #fff">
      <yd-flexbox style="margin:8px 0">
        <div style="width: 22%;height: 30px;line-height: 30px" @click="gotocitychoose">
          <span class="city">{{cityname.length==0?'获取中...':cityname}}</span>
        </div>
        <yd-flexbox-item style="border: 1px solid #eee;border-radius: 5px;">
          <form action="javascript:return true;">
            <input type="search" style="border: 0px;outline:none;cursor: pointer; height: 30px;"  placeholder=""  @keyup.13="search()" v-model="searchValue">
          </form>
        </yd-flexbox-item>
        <div style="width: 15%;height: 30px;line-height: 30px">
          <a href="tel:966888"><yd-icon slot="icon" name="kefu" size=".42rem" custom color="#979797"></yd-icon></a>
        </div>
      </yd-flexbox>
    </div>

    <!--<yd-cell-group v-if="showcar" slot="navbar">-->
      <!--<yd-cell-item arrow @click.native="gotocarlist">-->
        <!--<img slot="icon" style="height: 0.6rem" :src="carInfo.logo">-->
        <!--<span slot="left" style="color:#d41d0f;">{{carInfo.type}}</span>-->
      <!--</yd-cell-item>-->
    <!--</yd-cell-group>-->

    <!--banner-->
    <yd-slider autoplay="3000">
      <yd-slider-item  v-for="item,index in banner.items" :key="index">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </yd-slider-item>
    </yd-slider>


    <!--<div v-if="!showcar" style="position: relative;top: -0.5rem; height: 1rem;width: 80%;background-color: #ffffff;z-index: 5;margin: auto;border-radius: 0.5rem;border: 1px solid #f5f5f5" @click="gotochoosecar">-->
      <!--<yd-flexbox>-->
        <!--<div>-->
          <!--<img src="../assets/img/add.png" style="height: 0.5rem;margin:auto 0.3rem auto 0.3rem">-->
        <!--</div>-->
        <!--<yd-flexbox-item>-->
          <!--<yd-flexbox direction="vertical">-->
            <!--<yd-flexbox-item style="height: 0.5rem;line-height: 0.4rem;padding-top: 0.1rem"><span style="font-size: 0.3rem">添加爱车享优惠</span> </yd-flexbox-item>-->
            <!--<yd-flexbox-item style="height: 0.5rem"><span>任性红包等你拿</span></yd-flexbox-item>-->
          <!--</yd-flexbox>-->
        <!--</yd-flexbox-item>-->
      <!--</yd-flexbox>-->
    <!--</div>-->

    <yd-grids-group :rows="3"  :class="{'yd-show-car':!showcar}" v-if="primaryMenu.code" id="primaryMenu">
      <yd-grids-item @click.native="gotoinsurance(item)" v-for="item,index in primaryMenu.items" :key="index">
        <img slot="icon" :src="item.img" style="height: 100%">
        <span slot="text" style="font-weight: bold;display: block;font-size: .25rem;color: #d41d0f;" v-cloak>{{item.title}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <div align="center" style="background-color: #ffffff;" v-if="advertisement.code">
      <img :src="item.img" style="width: 85%;margin-top: .15rem;" v-for="item in advertisement.items" @click="gotofluid(item)"/>
    </div>

    <yd-grids-group :rows="5" v-if="secondaryMenu.code" id="secondaryMenu">
      <yd-grids-item @click.native="gotocarproduct(item)" v-for="item,index in secondaryMenu.items" :key="index">
        <img slot="icon" :src="item.img" style="height: 100%;">
        <span slot="text" style="font-size: 0.25rem">{{item.title}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <!--coupon-->
    <swiper :options="swiperOption1" style="padding-bottom: .15rem;padding-top: .15rem;border-bottom: 10px solid #f5f5f5;background-color: #fff">
        <swiper-slide v-for="item,index in coupon.items" :key="index" width="100%">
          <img  style="width: 100%;" :src="item.img" @click="gotofluid(item)" >
        </swiper-slide>
    </swiper>

    <div v-for="codeitem in config" style="background-color: #fff;">
      <div v-if="codeitem.template=='gridView'&&codeitem.code!='brand'" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          </span>
          </span><span class="line"></span>
        </div>
        <swiper :options="swiperOption"  ref="mySwiper" id="gridView">
          <swiper-slide v-for="itemlst,index in codeitem.items" :key="index">
            <yd-grids-group :rows="3" item-height="100px">
              <yd-grids-item  v-for="item,index1 in itemlst" :key="index1" @click.native="gotofluid(item)">
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
      <div v-else-if="codeitem.template=='rowSpan'" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          </span>
          </span><span class="line"></span>
        </div>
        <div class="rowSpan">
          <div class="rowSpanLeft">
            <img :src="codeitem.items[0].img"  @click="gotofluid(codeitem.items[0])"/>
          </div>
          <div class="rowSpanRigth">
            <img style="width: 100%; border-bottom: 1px solid #edeeef" :src="codeitem.items[1].img" @click="gotofluid(codeitem.items[1])">
            <img style="width: 50%; border-right: 1px solid #edeeef;float: left" :src="codeitem.items[2].img" @click="gotofluid(codeitem.items[2])">
            <img style="width: 50%;float: right" :src="codeitem.items[3].img" @click="gotofluid(codeitem.items[3])">
          </div>
        </div>
      </div>
      <div v-else-if="codeitem.template=='fluid'" class="codeitemView">
        <div class="codeitemTitle">
          <span class="line"></span>
          <span class="txt"><yd-icon name="discount" size=".3rem" color="#999"></yd-icon>{{codeitem.title}}</span>
          </span>
          </span><span class="line"></span>
        </div>
        <div style="overflow: hidden; font-size: 0;">
          <div v-for="item in codeitem.items" @click="gotofluid(item)"><img :src="item.img" style="width: 100%;border-bottom: 10px solid #f5f5f5;" /></div>
        </div>
      </div>
    </div>

    <yd-backtop></yd-backtop>

    <yd-tabbar slot="tabbar" activeColor="#d41d0f">
      <yd-tabbar-item title="首页" link="/" active>
          <yd-icon name="shouye" slot="icon" size="0.54rem" custom></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类"  link="/home/carProducts" >
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
<script>
import {baseHttp} from '../config/env'
import {setStore,getStore} from '../config/mUtils'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getLocation} from '../config/weichatPay'
export default {
  name: 'IndexHome',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      mySwiper:'',
      isCookie:false,
      cityname:'',
      weixinInfo:{},
      config:[],
      banner:{},
      primaryMenu:{},
      secondaryMenu:{},
      advertisement:{},
      gridViewlst:[],
      coupon:{},
      showcar:false,
      carInfo:{},
      signatureInfo:{},
      quantity:0,
      tops:'0rem',
      searchValue:'',
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOption1:{
        slidesPerView :1,
        centeredSlides : false,
        autoHeight:true,
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted(){
//    this.$dialog.alert({mes: '商城内测中请勿下单!'});
    var carInfo = getStore('carInfo');
    if (carInfo.type){
      this.carInfo=carInfo;
      this.showcar=true;
      this.tops='-0.5rem';
    }
    if(getStore('cityInfo').cityname){
      this.cityname=getStore('cityInfo').cityname;
    }
    var indexInfo =getStore('indexInfo');
    if(indexInfo.length>0){
      this.config=indexInfo;
      const  that=this;
      if(this.config instanceof Array){
        that.config.forEach(function (item) {
          if ("banner" == item.code) {
            that.banner = item;
          } else if ("primaryMenu" == item.code) {
            that.primaryMenu = item;
          } else if ("secondaryMenu" == item.code) {
            that.secondaryMenu = item;
          } else if ("coupon" == item.code) {
            that.coupon = item;
          } else if('advertisement'==item.code){
            that.advertisement = item;
          }
          else if ("gridView" == item.template&&item.code!='brand') {
            var result = [];
            for (var i = 0, len = item.items.length; i < len; i += 6) {
              result.push(item.items.slice(i, i + 6));
            }
            item.items = result;
          }
        })
      }
    }
    this.signature();
    this.getConfig();
  },
  beforeRouteEnter(to, from, next) {
    next(function (vm) {
      var carInfo = getStore('carInfo');
      if (carInfo.type){
        vm.carInfo=carInfo;
        vm.showcar=true;
        vm.tops='-0.5rem';
      }else{
        vm.carInfo={};
        vm.showcar=false;
        vm.tops='0rem';
      }
      if(getStore('cityInfo').cityname){
        vm.cityname=getStore('cityInfo').cityname;
      }
      vm.getConfig();
      var tempUserInfo=getStore("userInfo");
      vm.isCookie=tempUserInfo.token?true:false;
      if(tempUserInfo.token){
        vm.getCartsQuantity();
      }
    });
  },
  beforeRouteLeave(to,from,next){
    next(function (vm) {

    });
  },
  methods:{
    getConfig(){
      const that=this;
      baseHttp(this,'/api/index/config',{},'get','加载中...',function (data) {
        console.log(data);
        that.config=data.config;
        setStore('indexInfo',data.config);
        if(that.config instanceof Array) {
          that.config.forEach(function (item) {
            if ("banner" == item.code) {
              that.banner = item;
            } else if ("primaryMenu" == item.code) {
              that.primaryMenu = item;
            } else if ("secondaryMenu" == item.code) {
              that.secondaryMenu = item;
            } else if ("coupon" == item.code) {
              that.coupon = item;
            } else if ("gridView" == item.template&&item.code!='brand') {
              var result = [];
              for (var i = 0, len = item.items.length; i < len; i += 6) {
                result.push(item.items.slice(i, i + 6));
              }
              item.items = result;
            }
          })
        }
      })
    },
    /*获取购物车数量*/
    getCartsQuantity(){
      const  that =this;
      baseHttp(this,'/api/carts/cartsQuantity',{},'get','',function (data) {
        if(data.quantity)that.quantity=data.quantity;
      })
    },
    gotoindex(){
      this.$router.push({ path: 'stores'})
    },
//    查询服务
    search(){
      this.$router.push({ path: '/home/productsList', query: { queryKey:this.searchValue}});
      console.log(111);
    },
    gotoinsurance(item){
        if(item.title=='车险'){
          this.$router.push({ path: '/home/insuranceList'})
        }else if(item.title=='做保养'){
          this.$router.push({ name: 'carmaintain',query:{type:'upkeep'},meta:{title:'汽车保养'}})
        }else if(item.title=='汽车美容'){
          this.$router.push({ name: 'carmaintain',query:{type:'decoration'},meta:{title:'汽车美容'}})
        }
    },
//    选择城市
    gotocitychoose(){
      this.$router.push({ path: 'home/chooseCity'})
    },
//    车品商城
    gotocarproduct(item){
      var url=item.url;
      var index=url.lastIndexOf("\?");
      url=url.substring(index+1,url.length);
      var theRequest = new Object();
      var strs = url.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
      console.log(theRequest);
      this.$router.push({ path: 'home/carProducts', query: { categoryId:theRequest.categoryId}})
    },
//  进入领券中心
    gotofluid(item){
      console.log(item);
      if (item.title=='领券入口'){
        this.$router.push({ path: '/home/getcoupons'});
      }else if(item.title=='保养专区2'){
        this.$router.push({ path: '/home/maintain',query:{categoryId:144,brandId:10}});
      }
    },
    gotocarlist(){
      if (this.isCookie==true){
        this.$router.push({ path: 'home/CarChoose'})
      }else{
        this.$router.push({ name: 'loginWithCode'})
      }
    },
    gotochoosecar(){
      if (this.isCookie==true){
        this.$router.push({ path: 'home/CarChoose'})
      }else{
        this.$router.push({ name: 'loginWithCode'})
      }
    },
    signature(){
      const  that =this;
      baseHttp(this,'/wechat/jsapi/signature',{'url':window.location.href},'post','',function (data) {
        if(data.signature)
        {
          that.signatureInfo=data.signature;
          that.getLocation();
        }
      })
    },
    getLocation(){
      const  that =this;
      getLocation(this.signatureInfo,function (success) {
         console.log(success);
          var map = new BMap.Map('');
          var point = new BMap.Point(success.longitude,success.latitude);
          var geoc = new BMap.Geocoder();
          geoc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            var data = {
              latitude: success.latitude,
              longitude: success.longitude,
              cityname: addComp.district
            };
            setStore("cityInfo",data);
            that.cityname=data.cityname;
            that.locityName=data.cityname;
          });
      },
      function (fail) {
        console.log(fail);
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .city{
    padding-right: 15px;
    background: url(../assets/img/pull-down.png) no-repeat;
    background-position:right;
    background-size: 15px 15px;
    font-size: 0.3rem;
  }
  .codeitemView{
    border-bottom: 10px solid #f5f5f5;
    background-color: #fff;
  }
  .codeitemTitle{
    border-bottom: 1px solid #ebeced;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .codeitemTitle .line {
    display: inline-block;
    width: .5rem;
    border-top: 1px solid #ccc ;

  }
  .codeitemTitle .txt {
    color: #000000;
    font-size: 0.3rem;
    vertical-align: -8%;
  }

  .codeitemTitle span{
    color: #ccc;
  }
  .rowSpan{
    overflow: hidden;
    border-bottom: 1px solid #ebeced;
  }
  .rowSpanLeft{
    width: 40%;float: left;border-right: 1px solid #ebeced;text-align: center;margin:0 auto
  }
  .rowSpanLeft img{
    width: 100%;
  }
  .rowSpanRigth{
    width: 59%; float:right;
  }
  .rowSpanRigth img{
    width: 100%;
  }
</style>
<style>
  #home .yd-cell-box{
    margin-bottom:0px;
  }
  #home .yd-cell:after{
    border-bottom:0px
  }
  #home .yd-cell-right{
    min-height: 0.5rem;
  }
  #home .yd-show-car{
    margin-top: -0.5rem
  }
  #home .yd-grids-item:after{
    border-bottom:none;
  }

  #home .yd-backtop {
    bottom: 1.5rem;
  }

  #primaryMenu .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before{
    border-right:none;
  }
  #primaryMenu .yd-grids-3:before{
    border-bottom:none;
  }
  #primaryMenu .yd-grids-item:after{
    border-bottom:none;
  }

  #secondaryMenu .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before{
    border-right: none;
  }
  #secondaryMenu .yd-grids-5:before{
    /*border-bottom:1px solid #edeeef !important;*/
    border-bottom:none;
  }
  #gridView .yd-grids-3:before{
    border-bottom: none !important;
  }

  #gridView .yd-grids-3 .yd-grids-item:not(:nth-child(3n)):before{
    border-right: 1px solid #edeeef;
  }
  #gridView .yd-grids-item:after{
    border-bottom: 1px solid #edeeef !important;
  }

  #gridView .swiper-button-next{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAYAAAAm56DSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDN0UyN0EzQ0I2MDExRTdCQkFCQzZDNjg5RDU0QjA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJDN0UyN0E0Q0I2MDExRTdCQkFCQzZDNjg5RDU0QjA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkM3RTI3QTFDQjYwMTFFN0JCQUJDNkM2ODlENTRCMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkM3RTI3QTJDQjYwMTFFN0JCQUJDNkM2ODlENTRCMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5E5AqKAAABGUlEQVR42mJkYGAwZqASYGKgIhg1bNSw4WPYmjVr1ECYKoZpaGioBwYGztq7d68xxYbp6OhsPnDgQLGDg0PvlStXfCkOM2dn57Pr169P09TULCbGQIIREBIScmvy5MlRKioqkW/fvm2gODYLCgqe5efnp3Nzc6vhM5DopDFz5szPIANZWFh4f/z4sSw9PZ0XXQ0jqSUtyJBp06Ztfvbs2TJZWdlZyHIspBgESnf+/v692AwiyZsgg0Dp7ubNm7OwGUS0y0DJQl1dPe369eu9oPRHdgSADAKls40bNxbjM4igyx4/fpwmISHhC0q4oPRGdqIFGSQqKuqQk5MTRYxBeJMGLB2B0hexkURyOhsttkcNGzWMLoYBBBgAE7Zsl1paXhwAAAAASUVORK5CYII=")!important;
    right: 0 !important;
  }
  #gridView .swiper-button-prev{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAYAAAAm56DSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFNzFBRjFDQ0I2MDExRTc5ODY2RDlDQkFCRkI3NjZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFNzFBRjFEQ0I2MDExRTc5ODY2RDlDQkFCRkI3NjZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUU3MUFGMUFDQjYwMTFFNzk4NjZEOUNCQUJGQjc2NkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU3MUFGMUJDQjYwMTFFNzk4NjZEOUNCQUJGQjc2NkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6+zIFGAAABDUlEQVR42mJkYGAwZqASYGKgIhg1bNSw4W/YmjVr1ECYYsP27t1rHBgYOEtDQ0MdmzwLsQZduXLFV1NTs/jAgQPFzs7OZ8l2Gcyg9evXp+EyiCiXvX37toGbm1tt8uTJUQUFBc/wqWUhxqD8/Pz0mTNnfiYrNtPT03l//PixjIWFhZdYg0CAEVtJ+/jx4zQpKamorKwsX2INwmkYzEAJCQnfjRs3FoeEhNyiKNHKysrOunnz5ixQusKVSIl2GXKyUFdXTwMZrKOjs5mi7AQyAORVUDoDGUyRy5DzpL+/f++LFy82g4KAorwJioScnJwoUVFRB1DkUJQ3QQCaTNIp9uZosT1q2KhhdDUMIMAAeoFsxdIhoU8AAAAASUVORK5CYII=")!important;
    left:0!important;
  }

</style>
