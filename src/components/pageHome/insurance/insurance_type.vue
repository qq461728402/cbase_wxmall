<template>
  <yd-layout id="insurancetype">
    <yd-navbar slot="navbar" title="险种选择" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group  slot="navbar">
      <yd-cell-item arrow>
        <span slot="left">车辆信息选择</span>
        <select slot="right" style="color: black" v-model="value"  @change="chooseBrand(value)">
          <option :value="index"   v-for="item,index in data.items" selected="selected">
            {{item.brand}}
          </option>
        </select>
      </yd-cell-item>
    </yd-cell-group>
    <ul class="bg_ul">
      <li v-for="item,index in items" :key="index">
        <yd-checkbox v-model="item.checked" shape="circle" :disabled="!item.canCancel" color="#F00">{{item.productInsuranceName}}<span class="money">¥{{item.itemAmount|num2P}}</span>
        </yd-checkbox>
        <!--children-->
        <div v-if="item.bes.length>0&&item.checked==true" style="border-top: 1px solid #eeeeee;margin-top: 0.2rem">
          <ul class="bf_ul">
               <li @click="show(item.bes,item.selectbes,index)">
                 <span class="yd-checkbox-text" style="font-size: 14px">保费:{{item.selectbes.bf_a|num2P}}&nbsp;&nbsp;
                 保额:{{item.selectbes.be_a|num2P}}</span><span class="yd-cell-arrow" style="float: right;padding-right:.24rem"></span>
               </li>
               <li @click="changeBjmp(item.bf_bjmp,item.selectbes,index)">
                 <label class="yd-checkbox yd-checkbox-circle"><span class="yd-checkbox-icon" :class="{'selectyd-checkbox-icon':item.bf_bjmp==true}" style="width: 20px; height: 20px; color: rgb(255, 0, 0);"> <i style="width: 6px; height: 12px;"></i></span> <span class="yd-checkbox-text">保费不计免赔<span  class="money">{{item.selectbes.bf_bjmp| num2P}}</span></span></label>

               </li>
          </ul>
        </div>
        <div v-if="item.children">
          <ul class="bg_ul" v-if="item.children.length>0&&item.checked==true">
            <li v-for="childernitem,index1  in item.children" :key="index1">
              <yd-checkbox v-model="childernitem.checked" shape="circle" color="#F00">{{childernitem.productInsuranceName}}<span class="money">¥{{childernitem.itemAmount|num2P}}</span></yd-checkbox>
              <!--children-->
              <div style="border-top: 1px solid #eeeeee;margin-top: 0.2rem" v-if="childernitem.bes.length>0&&childernitem.checked==true">
                <ul class="bf_ul">
                  <li @click="show(childernitem.bes,childernitem.selectbes,index1)">
                 <span class="yd-checkbox-text" style="font-size: 14px">保费:{{item.selectbes.bf_a|num2P}}&nbsp;&nbsp;
                 保额:{{item.selectbes.be_a|num2P}}</span><span class="yd-cell-arrow" style="float: right;padding-right:.24rem"></span>
                  </li>
                  <li>
                    <yd-checkbox v-model="item.bf_bjmp"  shape="circle" color="#F00">保费不计免赔<span class="money">{{item.selectbes.bf_bjmp |num2P}}</span></yd-checkbox>
                  </li>
                </ul>
               </div>
              <div v-if="childernitem.children">
                <ul class="bg_ul" v-if="childernitem.children.length>0&&childernitem.checked==true">
                  <li v-for="childern2item  in childernitem.children">
                    <yd-checkbox v-model="childern2item.checked" shape="circle" color="#F00">{{childern2item.productInsuranceName}}<span class="money">¥{{childern2item.itemAmount|num2P}}</span></yd-checkbox>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div slot="tabbar" style="margin: 0;width: 100%;height: 1rem;background-color: white">
      <yd-button  size="large" style="background-color: #363636; margin: auto; float: left;width: 60%;border-radius: inherit;font-size: 0.3rem;text-align:left;padding-left: 0.2rem"><p style="font-weight: bold">合计:{{data.totalMoney|num2P}}
        </br><span style="font-size: 0.2rem"> (含增值税,以实际结算为准)</span></p>
      </yd-button>
      <yd-button  size="large" type="primary" style="background-color: #d41d0f; margin: auto; float: right;width: 40%;border-radius: inherit" @click.native="sure">确认</yd-button>
    </div>

    <yd-popup v-model="show1" position="center" width="80%">
      <ul class="bf_ul">
        <li v-for="bf in bfitem" :class="{'select':bf.bf_a==bfselect.bf_a,'no_select':bf.bf_a!=bfselect.bf_a}" @click="chosebf(bf)">
            <span class="yd-checkbox-text" style="font-size: 14px;margin-left: 0.5rem">保费:{{bf.bf_a| num2P}}&nbsp;&nbsp;
                 保额:{{bf.be_a| num2P}}</span>
        </li>
      </ul>
    </yd-popup>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {setStore,getStore} from  '../../../config/mUtils'
  const vm= {
    data() {
      return {
        show1:false,
        tbid:'',
        brand:'',
        data:{},
        value:0,
        items:[],
        shows:false,
        bfitem:[],
        bfselect:{},
        rowOne:0,
      }
    },
    watch:{
      items:{
        deep:true,
        handler:function(val,oldval){
          console.log(1);
          this.calculateMoney();
        },
      },
    },
    mounted(){
      this.getInsuranceQuotation();
    },

    beforeRouteEnter(to, from, next) {
      next(function (vm) {

      });
    },
    beforeRouteLeave(to,from,next){
      if(to.name=='insuranceSure'){
        to.meta.keepAlive=true;
      }
      next(function (vm) {

      });
      console.log(to);
    },

    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      show(bes,selectbes,index){
        this.rowOne=index;
        this.bfselect=selectbes;
        this.bfitem=bes;
        this.show1=!this.show1;
      },
      changeBjmp(bf,selectbes,index){
        var b=bf;
        if(b==false){
          var bfs=parseFloat(selectbes.bf_a) +parseFloat(selectbes.bf_bjmp);
          bfs=bfs+'';
          this.$set(this.items[index],'itemAmount',bfs);
        }else{
          this.$set(this.items[index],'itemAmount',selectbes.bf_a);
        }
        this.$set(this.items[index],'bf_bjmp',!bf);
      },
      chosebf(bf){
        this.show1=!this.show1;
        this.$set(this.items[this.rowOne],'selectbes',bf);
        if(this.items[this.rowOne].bf_bjmp==true){
          var bfs=parseFloat(bf.bf_a) +parseFloat(bf.bf_bjmp);
          bfs=bfs+'';
          this.$set(this.items[this.rowOne],'itemAmount',bfs);
        }else{
          this.$set(this.items[this.rowOne],'itemAmount',bf.bf_a);
        }


      },
      chooseBrand(value){
        this.tbid=this.data.items[value].tbid;
        this.brand=this.data.items[value].brand;
        this.baofeiDeal(this.data.items[value].items);
      },
      getInsuranceQuotation(){
        const  that=this;
        baseHttp(this, '/api/insurance/getQuotations', {}, 'get', '加载中...', function (data) {
          data.totalMoney=0;
          that.data=data;
          if(that.data.items.length>0){
            that.tbid=that.data.items[0].tbid;
            that.brand=that.data.items[0].brand;
            that.baofeiDeal(that.data.items[0].items);
          }else{
            that.$dialog.alert({mes: '暂时未获取险种请等待！',callback:function () {
                that.gotoback();
            }});
          }
        })
      },
      baofeiDeal(itemss){
        itemss.forEach(function (item) {
          if(item.bes.length>0){
            item.bf_bjmp=false;
            item.bes.forEach(function (bes) {
              if(item.itemAmount==bes.bf_a){
                item['selectbes']=bes;
              }
            })
          }
          if(item.children&&item.children.length>0){
            item.children.forEach(function (childrenItem) {
              if(childrenItem.bes.length>0){
                 childrenItem.bf_bjmp=false;
                 childrenItem.bes.forEach(function (childernbes) {
                  if(childrenItem.itemAmount==childernbes.bf_a){
                    childrenItem.selectbes=bes;
                  }
                })
              }
            })
          }
        })
        this.items=itemss;
      },
      calculateMoney(){
        var allMoney=0.0;
        var zzsMoney=0.0;
        this.items.forEach(function (item) {
          if(item.checked==true){
            if(item.productInsuranceId!=2&&item.productInsuranceId!=28){
                zzsMoney+=parseFloat(item.itemAmount);
            }
            allMoney+=parseFloat(item.itemAmount);
            if(item.children&&item.children.length>0){
              item.children.forEach(function (childrenItem) {
                if(childrenItem.checked==true){
                  allMoney+=parseFloat(childrenItem.itemAmount);
                  if(childrenItem.productInsuranceId!=2&&childrenItem.productInsuranceId!=28){
                    zzsMoney+=parseFloat(childrenItem.itemAmount);
                  }
                }
                if(childrenItem.children&&childrenItem.children.length>0){
                  childrenItem.children.forEach(function (children2Item) {
                    if(children2Item.checked==true){
                      allMoney+=parseFloat(children2Item.itemAmount);
                      if(children2Item.productInsuranceId!=2&&children2Item.productInsuranceId!=28){
                        zzsMoney+=parseFloat(children2Item.itemAmount);
                      }
                    }
                  })
                }
              })
            }
          }
        })
        this.data.totalMoney= Math.round((allMoney+zzsMoney*0.06)*100)/100;
      },
      sure(){
        var setItem=[];
        this.items.forEach(function (item) {
          if(item.checked==true){
            if(item.bes.length>0){
              var sureItem={'id':item.productInsuranceId,'xzmc':item.productInsuranceName,'be':item.selectbes.be_a,'bf':item.selectbes.bf_a};
              setItem.push(sureItem);
              if(item.bf_bjmp==true){
                var sureItem={'id':item.relatedId,'xzmc':item.productInsuranceName+'不计免赔','be':item.selectbes.be_a,'bf':item.selectbes.bf_bjmp};
                setItem.push(sureItem);
              }
            }else{
              var sureItem={'id':item.productInsuranceId,'xzmc':item.productInsuranceName,'be':item.insuredValue,'bf':item.itemAmount};
              setItem.push(sureItem);
            }
            if(item.children&&item.children.length>0){
              item.children.forEach(function (childernItem) {
                if(childernItem.checked==true){
                  var sureItem={'id':childernItem.productInsuranceId,'xzmc':childernItem.productInsuranceName,'be':childernItem.insuredValue,'bf':childernItem.itemAmount};
                  setItem.push(sureItem);
                  if(childernItem.children&&childernItem.children.length>0){
                    childernItem.children.forEach(function (childern2Item) {
                      if(childern2Item.checked==true){
                        var sureItem={'id':childern2Item.productInsuranceId,'xzmc':childern2Item.productInsuranceName,'be':childern2Item.insuredValue,'bf':childern2Item.itemAmount};
                        setItem.push(sureItem);
                      }
                    })
                  }
                }
              })
            }
          }
        });
        const  that=this;
        baseHttp(this, '/api/insurance/totleFee', {'tbid':this.tbid,'brand':this.brand,'contents':JSON.stringify(setItem)}, 'post', '正在获取报价...', function (data) {
          if (data.gifts.length>0){
             data.gifts.forEach(function (item) {
              item.select=false;
            });
          }
          setStore("insuranceInfo",data);
          that.$router.push({ name: 'insuranceSure'});
        })
      },
    },

  }
  export default vm;
</script>
<style scoped>
  .bg_ul{
    padding-left: 0.2rem;
    background-color: #ffffff;
  }
  .bg_ul li{
    padding: 0.2rem 0;
    border-bottom: 1px solid #eeeeee;
  }
  .bg_ul li:last-child{
    border-bottom: 0px solid #eeeeee;
  }

  .bg_ul .divclass{
    padding: 0.1rem 0.1rem 0.1rem 0.7rem;
  }
  .money{
    padding-left: 10px;
    color: red;
  }
  .bf_ul{
    padding-left: 0.2rem;
    background-color: #ffffff;
  }
  .bf_ul li{
    padding: 0.2rem 0;
    border-bottom: 1px solid #eeeeee !important;
  }
  .select{
    background: url(../../../assets/img/select1.png) left center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
  .no_select{
    background: url(../../../assets/img/unselectedv1.png) left center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
  .selectyd-checkbox-icon{
    background-color:#f00;
    border-color:#f00;
  }
  .selectyd-checkbox-icon>i{
    -webkit-transform: translate(-50%,-50%) rotate(45deg) scale(1);
    transform: translate(-50%,-50%) rotate(45deg) scale(1);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }

</style>
<style>
  #insurancetype .yd-cell-left{
    width: 2.1rem;
    white-space:normal;
  }
  #insurancetype .yd-popup-content{
    height: 240px;
  }


</style>
