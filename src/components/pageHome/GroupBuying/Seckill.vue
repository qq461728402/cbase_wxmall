<template>
  <yd-layout style="background-color: #FFFFFF">
    <yd-navbar slot="navbar" title="限时秒杀" bgcolor="#d41d0f" color="#FFF">
      <router-link>
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>


    <yd-tab>
      <yd-tab-panel label="10:00进行中" v-if="dqshijian<='10:00:00'">
        <div style="overflow: hidden;width: 100%;height: .8rem;line-height: .8rem;border-bottom: 1px solid #eeeeee;text-align: center;font-size: .3rem;">
          <yd-countdown :time="dates">
            <yd-icon name="time" size=".3rem"></yd-icon>
            <span>距本场结束</span>
            <span style="color: #333333;">{%h}<i>时</i></span>
            <span style="color: #333333;">{%m}<i>分</i></span>
            <span style="color: #333333;">{%s}<i>秒</i></span>
          </yd-countdown>
        </div>
          <yd-list theme="3">
            <yd-list-item v-for="item, key in list" :key="key" >
              <img slot="img" :src="item.img">
              <span slot="title" style="font-weight: normal;color: #000;">{{item.title}}</span>
              <yd-list-other slot="other">
                <div>
                  <span class="demo-list-price" style="color: red;"><em>¥</em>{{item.price}}</span>
                  <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through">¥{{item.w_price}}</span>
                </div>
              </yd-list-other>
              <yd-list-other slot="other" style="margin-top: .2rem;">
                <div>
                  <div style="width:1.5rem;border:1px solid #f48f18;border-radius: 1rem;float: left;height: .5rem;overflow: hidden">
                    <div style="position: relative;line-height: .5rem;text-align: center;font-size: .2rem;color: #f48f18;overflow: hidden;border-radius: 1rem;">
                      <div class="yiqiang" style="width: 50%;"></div>
                      <span>已抢</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <yd-button type="warning" style="width: 1rem;height: .5rem;">查看详情</yd-button>
                </div>
              </yd-list-other>
            </yd-list-item>
          </yd-list>
      </yd-tab-panel>
      <yd-tab-panel label="10:00已结束" v-else>
        <div style="overflow: hidden;width: 100%;height: .8rem;line-height: .8rem;border-bottom: 1px solid #eeeeee;text-align: center;font-size: .3rem;">
          <yd-countdown :time="dates">
            <yd-icon name="time" size=".3rem"></yd-icon>
            <span>距本场开始</span>
            <span style="color: #333333;">{%h}<i>时</i></span>
            <span style="color: #333333;">{%m}<i>分</i></span>
            <span style="color: #333333;">{%s}<i>秒</i></span>
          </yd-countdown>
        </div>
        <yd-list theme="3">
          <yd-list-item v-for="item, key in list" :key="key" >
            <img slot="img" :src="item.img" style="filter: grayscale(100%);">
            <span slot="title" style="font-weight: normal;color: #000;">{{item.title}}</span>
            <yd-list-other slot="other">
              <div>
                <span class="demo-list-price" style="color: red;"><em>¥</em>{{item.price}}</span>
                <span class="demo-list-del-price" style="font-size: .2rem;text-decoration:line-through">¥{{item.w_price}}</span>
              </div>
            </yd-list-other>
            <yd-list-other slot="other" style="margin-top: .2rem;">
              <div>
                <div style="width:1.5rem;border:1px solid #f48f18;border-radius: 1rem;float: left;height: .5rem;overflow: hidden">
                  <div style="position: relative;line-height: .5rem;text-align: center;font-size: .2rem;color: #f48f18;overflow: hidden;border-radius: 1rem;">
                    <div class="yiqiang" style="width: 100%;"></div>
                    <span>已抢</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              <div>
                <yd-button type="warning" style="width: 1rem;height: .5rem;background-color: #999999">已结束</yd-button>
              </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
      </yd-tab-panel>
    </yd-tab>
  </yd-layout>
</template>
<script type="text/babel">
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  const vm= {
    data() {
      return {
        dates:"",
        dates1:"",
        dates2:"",
        dates3:"",
        dqshijian:"",

        list:[],
        items:[],


        list: [
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 156.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 256.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 356.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 456.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258040/raw_1519277870.jpeg", title: "澳佳宝 深海无腥味鱼油胶囊400粒", price: 156.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258126/raw_1519278180.jpeg", title: "韩国AHC 强补水修复精华原液B5", price: 256.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258875/raw_1519280302.jpeg", title: "Guerlain/娇兰 法式之吻有色润唇膏", price: 356.23, w_price: 89.36},
          {img: "https://free.modao.cc/uploads3/images/1725/17258916/raw_1519280420.jpeg", title: "德国Doppelherz 双心 女性复合矿", price: 456.23, w_price: 89.36},
        ],
      }
    },
    mounted(){
      this.dates = CurentTime() + "10:00:00";
      console.log(this.dates);
      this.dates1 = CurentTime() + "14:00:00";
      console.log(this.dates1);
      this.dates2 = CurentTime() + "17:22:00";
      console.log(this.dates2);
      this.dates3 = CurentTime() + "23:00:00";
      console.log(this.dates3);
      //获取当前时间，格式YYYY-MM-DD
      function CurentTime(){
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var clock = year + "/";
        if(month < 10)
          clock += "0";
        clock += month + "/";
        if(day < 10)
          clock += "0";
        clock += day + " ";
        return(clock);
      };
      var d = new Date();
      var my_hours=(d.getHours()< 10 ? '0' + (d.getHours()):d.getHours());
      var my_minutes=(d.getMinutes()< 10 ? '0' + (d.getMinutes()):d.getMinutes());
      var my_seconds=(d.getSeconds()< 10 ? '0' + (d.getSeconds()):d.getSeconds());
      this.dqshijian=my_hours + ":" + my_minutes + ":" + my_seconds;
      console.log(this.dqshijian);

    },
    methods:{
    },


  }
  export default vm;
</script>
<style>
  .yd-grids-4:before{
    border-bottom: none;
  }
  .yd-grids-4 .yd-grids-item:not(:nth-child(4n)):before{
    border-right: none;
  }


  div.yiqiang{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(244,143,24,.15);
    overflow: hidden;
  }
</style>
