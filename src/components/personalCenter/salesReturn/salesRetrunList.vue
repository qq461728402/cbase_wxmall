<template>
  <yd-layout id="salesRetrunlist">
    <yd-navbar slot="navbar" title="退货订单列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-tab slot="navbar" :callback="switchlist">
      <yd-tab-panel label="全部"  tabkey="all" :active="type==1"></yd-tab-panel>
      <yd-tab-panel label="待退货" tabkey="CONFIRMED" :active="type==2"></yd-tab-panel>
      <yd-tab-panel label="待退款" tabkey="SHIPPED" :active="type==3"></yd-tab-panel>
      <yd-tab-panel label="已完成" tabkey="FINISHED" :active="type==4"></yd-tab-panel>
    </yd-tab>

    <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <div slot="list"  class="or_1" v-for="item,index in refundlist" :key="index" @click="gotogoodsDetail(item)">
          <yd-cell-item>
            <span slot="left" class="or_2">订单编号：{{item.orderNumber}}</span><!--退货编号-->
            <span slot="right" class="or_3">{{item.orderStatus}}</span><!--退货状态-->
          </yd-cell-item>
          <yd-flexbox>
            <div class="or_4">
              <img class="or_5" :src="item.url"><!--退货单图片-->
            </div>
            <yd-flexbox-item class="or_6">
              <yd-flexbox direction="vertical" class="or_7">
                <yd-flexbox-item><span class="or_8">{{item.skuName}}</span></yd-flexbox-item><!--退货商品名-->
                <yd-flexbox-item><span class="or_9">共{{item.quantity}}件</span><span class="or_10">&yen;{{item.totleFee}}</span></yd-flexbox-item><!--件数和价格-->
                <!--<yd-flexbox-item><span class="or_11">安装门店：{{item.md_title}}</span></yd-flexbox-item><!--安装门店-->
              </yd-flexbox>
            </yd-flexbox-item>
          </yd-flexbox>
          <hr style="border: none;border-bottom:8px solid #f5f5f5;"/>
        </div>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <div class="noProduct" v-if="refundlist.length==0" ref="gwc" >
      <img src="../../../assets/img/cleanOder.png">
      <p>您还没有退货订单</p>
    </div>

  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie} from '../../../config/env'
  import  {getStore,removeStore,setStore} from '../../../config/mUtils'
  const vm= {
    data() {
      return {
        type:'',
        page: 1,
        pageSize: 10,
        status:'',
        ordernum:{},
        refundlist:[],
      }
    },
    mounted(){
      this.type =this.$route.query.type;
      if(this.type==1){
        this.status='all';
      }else if(this.type==2){
        this.status='CONFIRMED';
      }else if(this.type==3){
        this.status='SHIPPED';
      }else if(this.type==4){
        this.status='FINISHED';
      }
      this.page=1;
      this.goodsrefundlist();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      switchlist:function (label,tabkey) {
        this.status=tabkey;
        this.page=1;
        this.goodsrefundlist();
      },
      goodsrefundlist(){
        var pars={'page':this.page,'pageSize':this.pageSize}
        if(this.status.length!=0){
          pars.status=this.status;
        }
        const  that =this;
        baseHttp(this,'/api/refund/orders',pars,'get',this.page==1?'加载中...':'',function (data){
          if(that.page==1){
            if(data.orders) {
              that.refundlist=data.orders;
              that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              that.refundlist=[];
            }
          }else{
            if(data.orders){
              that.refundlist=that.refundlist.concat(data.orders);
              if(data.orders&&data.orders.length != this.pageSize){
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

      beforeRouteEnter(to, from, next) {
        console.log(from);
        next(function (vm) {
          if(from.name=='personalCenter'){
            if(vm.type==1){
              vm.status='all';
            }else if(vm.type==2){
              vm.status='CONFIRMED';
            }else if(vm.type==3){
              vm.status='SHIPPED';
            }else if(this.type==4){
              vm.status='FINISHED';
            }
            vm.page=1;
            vm.goodsrefundlist();
          }else{
            vm.page=1;
            vm.goodsrefundlist();
          }
        });
      },
      beforeRouteLeave(to,from,next){

        next(function (vm) {

        });
      },

      /* 下拉刷新 */
      pullList() {
        this.page=1;
        this.goodsrefundlist();
      },
      /* 上拉加载更多 */
      loadList() {
        this.page=this.page+1;
        this.goodsrefundlist();
      },
      /*进入商品详情*/
      gotogoodsDetail(item){
        setStore("returnInfo",item);
        this.$router.push({ name: 'salesRetrunDetail'});
      },
    },

  }
  export default vm;
</script>
<style scoped>
  div.or_1{
    background-color: #FFFFFF;
  }
  span.or_2{
    color:#6e6f70;
  }
  span.or_3{
    color:#d41d0f;
  }
  div.or_4{
    overflow:hidden;
    padding: 0.15rem;
    height: 1.8rem;
    width: 1.8rem;
  }
  img.or_5{
    height: 1.5rem;
    width: 1.5rem
  }

  span.or_8{
    font-size: 0.3rem;
  }
  span.or_9{
    color: #6e6f70;
    font-size: 0.25rem;
    line-height: 0.5rem;
  }
  span.or_10{
    color: #d41d0f;
    font-size: 0.3rem;
    line-height: 0.5rem;
    float: right;
    padding-right:.24rem;
  }
  span.or_11{
    padding-right:.24rem;
    color: #6e6f70;
    font-size: .25rem;
  }


  .noProduct {
    text-align: center;
    padding: 20% 0 0 0
  }
  .noProduct img {
    width: 1.5rem;
    height: 1.5rem
  }
  .noProduct p {
    font-size: 13px;
    color: #666;
    line-height: 40px
  }
  .noProduct a {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #df3448;
    border-radius: 2px;
    color: #df3448;
    margin-top: 10px
  }

</style>
<style>
  #salesRetrunlist div.yd-flexbox-item.or_6.yd-flexbox-item-center{
    height:1.8rem
  }
  #salesRetrunlist div.yd-flexbox.or_7.yd-flexbox-vertical{
    padding-top: 0.15rem
  }
</style>
