<template>
  <yd-layout id="wechat">
    <yd-navbar slot="navbar" title="车辆列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <ul class="bg_ul">
        <li v-for="caritem in carlist1">
            <div style="position: relative;z-index: 2;left: 0;width: 100%;background-color: #fff;padding-top: 0.2rem;padding-bottom: 0.3rem" :class="{'select':caritem.default==1,'no_select':caritem.default!=1}" v-swiper @click="updatacar(caritem)">
              <yd-flexbox>
                <div>
                  <img :src="caritem.logo" style="height: 1rem;width: 1rem">
                </div>
                <yd-flexbox-item style="padding-left: 0.2rem">
                  <yd-flexbox direction="vertical">
                    <yd-flexbox-item style="height: 0.5rem;line-height: 0.5rem;"><span style="font-size: 0.3rem">{{caritem.type}}</span> </yd-flexbox-item>
                    <yd-flexbox-item style="height: 0.5rem;line-height: 0.5rem;color: #6e6f70;font-size: .25rem;"><span>{{caritem.name}}</span></yd-flexbox-item>
                  </yd-flexbox>
                </yd-flexbox-item>
              </yd-flexbox>
            </div>
            <div class="operate-box">
              <div class="operate-del" @click="deleteMsgEvent(caritem)">删除</div>
            </div>
        </li>
    </ul>
    <yd-button size="large" bgcolor="#d41d0f" color="#FFF" slot="tabbar" type="primary" shape="square" style="width: 80%;left: 10%; bottom: 10px;font-size: .3rem;" @click.native="gotocar">添加爱车</yd-button>

  </yd-layout>
</template>
<script type="text/babel">

  import {setStore,getStore} from '../../config/mUtils'
  const vm= {
    data() {
      return {
        carlist1:[],
      }
    },
    computed: {

    },
    methods:{
      //获取车辆信息
      carListf(){
        const  that =this;
       this.apiRequest('/api/car/list',{},'get','加载中...',function (data) {
          if (typeof data.items === 'object') {
              that.carlist1=data.items;
          }
        })
      },
      deleteMsgEvent(caritem){
        const  that =this;
        if (caritem.default==1){
          that.$dialog.toast({mes: '默认车辆不能删除!',timeout: 1000,})
          return;
        }
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '确定删除此车辆！',
          opts:function () {
            that.deletecar(caritem);
          }
        });
      },
      deletecar(caritem){
        const that =this;
       this.apiRequest( '/api/car/delete', {car:caritem.id}, 'post', '删除中...', function (data) {
          that.$dialog.toast({
            mes: '车辆删除成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.carListf();
            }
          });
        })
      },
      updatacar(item) {
        const that =this;
       this.apiRequest( '/api/car/update', {car:item.id}, 'post', '更新中...', function (data) {
          if(data.result){
            if(data.result.type){
              localStorage.setItem("carInfo",JSON.stringify(data.result));
            }
          }
          localStorage.setItem("need-refresh", 'true');
          that.$dialog.toast({
            mes: '车辆更新成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              that.carListf();
            }
          });
        })
      },
      gotocar(){
        this.$router.push({name: 'chooseCarInfo'})
      },
      gotoback(){
        this.$router.go(-1);
      },
    },
    mounted(){
     this.carListf();
    },
    directives: {
      swiper: {
        bind: function(element, binding) {
          var isTouchMove, startTx, startTy
          element.addEventListener('touchstart', function(e) {
            var touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            isTouchMove = false;
          }, false);
          element.addEventListener('touchmove', function(e) {
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy;
            if (distanceX < 0) { //右滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (Math.abs(distanceX) > 20) {
                  element.style.transition = "0.3s"
                  element.style.marginLeft = 0 + "px"
                }
              }
            } else { //左滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (distanceX < 156 && distanceX > 20) {
                  e.preventDefault()
                  element.style.transition = "0s"
                  element.style.marginLeft = -distanceX + "px"
                  isTouchMove = true
                }
              }
            }
            // e.preventDefault()
          }, false);
          element.addEventListener('touchend', function(e) {
            if (!isTouchMove) {
              return;
            }
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy,
              isSwipe = false
            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
              if (distanceX < 0) {
                return;
              }
              if (Math.abs(distanceX) < 60) {
                isSwipe = true
                element.style.transition = "0.3s"
                element.style.marginLeft = 0 + "px"
              } else {
                element.style.transition = "0.3s"
                element.style.marginLeft = "-64px"
              }
            }
          }, false);
        }
      }
    }
  }
  export default vm;
</script>
<style scoped>
  @import "../../assets/css/wechat.css";
  .header-box {
    position: relative;
    float: left;
    width: 1rem;
    height: 1rem;
    margin-right: 10px;
  }
  .operate-box {
    background-color: #fff;
    position: absolute;
    z-index: 1;
    height: 1.4rem;
    right: 0;
    top: 1px;
    display: flex;
  }
  .operate-box div {
      display: flex;
      justify-content: center;
      align-items: center;
      /*background-color: #c7c7cc;*/
      color: #fff;
      font-size: 18px;
      padding: 0 12px;
    }
  .operate-del {
    background-color: #ff3b30;
  }
  .bg_ul{
    position: relative;
    overflow-x: hidden;
    z-index: 1;
    padding-left: 0.2rem;
    background-color: #ffffff;
  }
  .bg_ul li{
    height:1.5rem;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;
  }
  .bg_ul li:last-child{
    border-bottom: 0px solid #eeeeee;
  }
  .select{
    background: url(../../assets/img/selectedv1.png) 99% center no-repeat;
    background-size: 0.5rem 0.5rem;
    margin-right: 0.2rem;
  }
  .no_select{
    background: url(../../assets/img/unselectedv1.png) 99% center no-repeat;
    background-size: 0.5rem 0.5rem;
    margin-right: 0.2rem;
  }
</style>
