<template>
  <yd-layout id="chooseCity">
    <yd-navbar slot="navbar" title="城市选择" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div>
      <city :is-show.sync='city.isShow' :on-choose='city.onChoose' :city-data='city.cityData' :local-city='city.localCity'
        :star-city='city.starCity'
        :close="close"
      ></city>
    </div>
  </yd-layout>
</template>
<script type="text/babel">
  import city from 'vue-city';

  import {setStore,getStore} from  '../../../config/mUtils'
  const vm= {
    data(){
      return {
        city: {
          isShow: true,
          cityData: [],
          onChoose: null,
          localCity: {},
          starCity: []
        },
        city2: {
          isShow: true,
          cityData: [],
          onChoose: null,
          localCity: {},
          starCity: []
        },
      }
    },
    components: {
      city,
    },
    mounted(){
      const that = this;
      this.getCityInfo();
      this.city.onChoose = function(res){
        that.$store.dispatch('setCityName',res.cityName);
        this.$router.go(-1);
      }
    },
    methods: {
      gotoback(){
        this.$router.go(-1);
      },
      getCityInfo: function(){
        const that=this;
        var locatingCity=this.$store.state.basicStorage.locatingCity;
        var cityData=[];
       this.apiRequest('/api/city/all',{},'get','加载中...',function (data){
          for(var key in data.areas){
              data.areas[key].forEach(function (item) {
                  cityData.push({
                    cityId: item.id,
                    cityName: item.name,
                    citySpell: item.zipcode,
                    cityFirstLetter: item.initial,
                  })
              })
          }
          that.city.cityData = cityData;
        });

        this.city.starCity = [
          {
            cityId: 167,
            cityName: "北京市",
            citySpell: "BEIJING",
            cityFirstLetter: "B",
          },
          {
            cityId: 166,
            cityName: "上海市",
            citySpell: "SHANGHAI",
            cityFirstLetter: "S",
          },
          {
            cityId: 165,
            cityName: "天津市",
            citySpell: "TIANJIN",
            cityFirstLetter: "T",
          },{
            cityId: 301,
            cityName: "重庆市",
            citySpell: "CHONGQIN",
            cityFirstLetter: "C",
          }
        ]
        this.city.localCity = {
          cityId: 301,
          cityName: locatingCity,
          citySpell: "YUZHONGQU",
          cityFirstLetter: "Y",
        }
      },
      choiceCity: function(){
        this.city.isShow = true;
      },
      close(){

      }
    },
    activated(){
      var locatingCity=this.$store.state.basicStorage.locatingCity;
      this.city.localCity = {
        cityId: 301,
        cityName: locatingCity,
        citySpell: "YUZHONGQU",
        cityFirstLetter: "Y",
      }
    }
  }
  export default vm;
</script>
<style>
  #chooseCity .xin-widget-citys{
    position:inherit;
    font-size:0.3rem;
    margin:0rem;
  }
  #chooseCity .xin-widget-citys-letnav ol li{
    font-size:0.25rem
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header .xin-widget-citys-iptbox input{
    font-size: 0.3rem;
    line-height:0.5rem;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-list dl dd{
    height:0.8rem;
    line-height: 0.8rem;
    font-size:0.25rem;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-local{
    height:0.8rem;
    line-height: 0.8rem;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-list dl dt{
    height:0.4rem;
    line-height: 0.4rem;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header{
    height:0.8rem;
  }
  #chooseCity .xin-widget-citys-searchlist{
    top: .82rem;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header a{
    display: none;
  }
  #chooseCity .xin-widget-citys .xin-widget-citys-searchlist li{
    height:0.8rem;
    line-height: 0.8rem;
  }
</style>
