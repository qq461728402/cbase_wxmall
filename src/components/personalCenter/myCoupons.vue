<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="我的优惠券" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-tab :callback="switchlist">
      <yd-tab-panel label="未使用优惠券" tabkey="1"></yd-tab-panel>
      <yd-tab-panel label="已使用优惠券" tabkey="2"></yd-tab-panel>
      <yd-tab-panel label="已过期优惠券" tabkey="3"></yd-tab-panel>
    </yd-tab>

    <div v-if="state==1">
      <ul class="coupon" v-if="unusedlist.length!=0">
        <li v-for="item in unusedlist">
          <yd-flexbox style="height: 1.5rem">
            <div style="height: 100%;padding: 0.2rem;width:2rem" class="couponBg">
              <p style="font-size: .3rem; font-weight: bold;color: #ffffff;">￥<em style="font-size: 0.6rem">{{item.discount}}</em> </p>
              <span style="color: #FFFFFF;">{{item.orderRequirement>0?'满'+item.orderRequirement+'可用':'无金额门槛'}}</span>
            </div>
            <yd-flexbox-item style="padding-left: 0.15rem">
              <p style="min-height:1rem;font-size: 0.3rem">{{item.description}}</p>
              <div style="display: block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                <span style="padding: 3px 0">有效期:{{item.startTime |formatDate}}—{{item.endTime |formatDate}}</span>
              </div>
            </yd-flexbox-item>
            <div class="ribbon-wxmall-green" v-if="item.quantity>1">
              <div class="ribbon-green">{{'x'+item.quantity}}</div>
            </div>
          </yd-flexbox>
        </li>
      </ul>
      <div style="text-align: center;" v-else>
        <p><img src="../../assets/img/noupons.png" width="30%" style="margin-top: 30%"></p>
        <p style="color: #cdcdcd;font-size: 0.3rem">没有券</p>
      </div>
    </div>
    <div v-else-if="state==2">
      <ul class="coupon1" v-if="usedlist.length!=0">
        <li  v-for="item in usedlist">
          <yd-flexbox style="height: 1.5rem">
            <div style="height: 100%;background-color: #BBBBBB;padding: 0.2rem;width:2rem">
              <p style="font-size: .3rem; font-weight: bold;color: #ffffff;">￥<em style="font-size: 0.6rem">{{item.discount}}</em> </p>
              <span style="color: #FFFFFF;">{{item.orderRequirement>0?'满'+item.orderRequirement+'可用':'无金额门槛'}}</span>
            </div>
            <yd-flexbox-item style="padding-left: 0.15rem">
              <p style="min-height:1rem;font-size: 0.3rem">{{item.description}}</p>
              <div style="display: block;color: #707070">
                <span style="padding: 3px 0">{{item.startTime |formatDate}}—{{item.endTime |formatDate}}</span>
              </div>
            </yd-flexbox-item>
          </yd-flexbox>
        </li>
      </ul>
      <div style="text-align: center;" v-else>
        <p><img src="../../assets/img/noupons.png" width="30%" style="margin-top: 30%"></p>
        <p style="color: #cdcdcd;font-size: 0.3rem">没有券</p>
      </div>
    </div>
    <div v-else>
      <ul class="coupon1" v-if="expiredlist.length!=0">
        <li v-for="item in expiredlist">
          <yd-flexbox style="height: 1.5rem">
            <div style="height: 100%;background-color: #BBBBBB;padding: 0.2rem">
              <p style="font-size: .3rem; font-weight: bold;color: #ffffff;">￥<em style="font-size: 0.6rem">{{item.discount}}</em> </p>
              <span style="color: #FFFFFF;">{{item.description}}</span>
            </div>
            <yd-flexbox-item style="padding-left: 0.15rem">
              <p style="min-height:1rem;font-size: 0.3rem;color: #707070">{{item.name}}</p>
              <div style="display: block;color: #707070">
                <span style="padding: 3px 0">{{item.startTime |formatDate}}—{{item.endTime |formatDate}}</span>
              </div>
            </yd-flexbox-item>
          </yd-flexbox>
        </li>
      </ul>
      <div style="text-align: center;" v-else>
        <p><img src="../../assets/img/noupons.png" width="30%" style="margin-top: 30%"></p>
        <p style="color: #cdcdcd;font-size: 0.3rem">没有券</p>
      </div>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,formatDate} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  const vm= {
    data() {
      return {
        isCookie:'',
        expiredlist:[],
        unusedlist:[],
        usedlist:[],
        state:'1',
      }
    },
    filters: {
      formatDate: function (value) {
        if (!value) return ''
        var date = new Date(value);
        return formatDate(date,'yyyy-MM-dd');
      }
    },
    mounted(){
      this.state='1';
      this.getunused();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      //获取用户已经使用的优惠券
      getexpired(){
        const  that =this;
        baseHttp(this, '/api/coupon/expired', {}, 'get', '加载中...', function (data) {
          if(data.coupons)that.expiredlist=data.coupons;
        });
      },
      //获取用户未使用的优惠券
      getunused(){
        const  that =this;
        baseHttp(this, '/api/coupon/unused', {}, 'get', '加载中...', function (data) {
          if(data.coupons)that.unusedlist=data.coupons;
        });
      },
      //获取用户已使用的优惠券
      getused(){
        const  that =this;
        baseHttp(this, '/api/coupon/used', {}, 'get', '加载中...', function (data) {
          if(data.coupons)that.usedlist=data.coupons;

        });
      },
      switchlist(label,tabkey){
        this.state=tabkey;
        if(tabkey=='1'){
          if(this.unusedlist.length!=0)return;
          this.getunused();
        }else if(tabkey=='2'){
          if(this.usedlist.length!=0)return;
          this.getused();
        }else if(tabkey=='3'){
          if(this.expiredlist.length!=0)return;
          this.getexpired();
        }
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .coupon{list-style:none;}
  .coupon li{margin:0.15rem;background:#FFFFFF;}
  .coupon li:before,
  .coupon li:after{content: "";width:0.2rem;background-size: 0.4rem 0.1rem;background-color:#efeef6}
  .coupon li:before{height:1.5rem;float: left;background-position: 100% 35%;
    background-image: linear-gradient(-45deg, #4290db 25%, transparent 25%, transparent),
    linear-gradient(-135deg, #4290db 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #4290db 75%),
    linear-gradient(-135deg, transparent 75%, #4290db 75%);
  }
  #coupon .yd-popup-content{
    background-color: #efeef6;
  }
  .coupon1{list-style:none;}
  .coupon1 li{margin:0.15rem;background:#FFFFFF;}
  .coupon1 li:before,
  .coupon1 li:after{content: "";width:0.2rem;background-size: 0.4rem 0.1rem;background-color:#efeef6}
  .coupon1 li:before{height:1.5rem;float: left;background-position: 100% 35%;
    background-image: linear-gradient(-45deg, #bbbbbb 25%, transparent 25%, transparent),
    linear-gradient(-135deg, #bbbbbb 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #bbbbbb 75%),
    linear-gradient(-135deg, transparent 75%, #bbbbbb 75%);
  }
  #coupon1 .yd-popup-content{
    background-color: #efeef6;
  }
  .yd-tab-panel{
    background-color: #efeef6;
  }

  .couponBg{
    background: -webkit-linear-gradient(left, #4290db , #5877da); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #4290db, #5877da); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #4290db, #5877da); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #4290db , #5877da); /* 标准的语法（必须放在最后） */
  }

  .ribbon-wxmall-green {
    width: 0.8rem;
    height: 1rem;
    top: -0.25rem;
    overflow: hidden;
    position: relative;
  }
  .ribbon-green {
    color: #333;
    text-align: center;
    text-shadow: rgba(255, 255, 255, 0.5) 0px 1px 0px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    position: relative;
    left: 0.05rem;
    top: 0.08rem;
    width: 1rem;
    background-color: #ff8500;
    color: white;
    -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  }
  .ribbon-green:before, .ribbon-green:after {
    content: "";
    border-top: 1px solid #ff8500;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    position: absolute;
    bottom: -1px;
  }
  .ribbon-green:before {
    left: 0;
  }
  .ribbon-green:after {
    right: 0;
  }

</style>
