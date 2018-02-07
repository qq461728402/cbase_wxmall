<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="选择车辆信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <h3 style="color: #666;padding: 6px 0 6px 16px; border-bottom: 1px solid #d9d9d9;font-size: 16px">热门品牌</h3>
    <yd-grids-group :rows="4" id="hotbrand">
      <yd-grids-item v-for="hotitem,hotindex in hotBrands" :key="hotindex" @click.native="gettypes(hotitem)">
        <img slot="icon" v-lazy="hotitem.logo">
        <span slot="text">{{hotitem.name}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <ul v-for="item,index in brands" :key="index" class="brandlist">
      <li style="background-color: #f7f7f7;padding:0.1rem 0;color: #999;padding-left: 0.2rem">
          <p>{{item.initial}}</p>
      </li>
      <li style="background-color: #ffffff;padding: 0.2rem 0" v-for="brand,brandindex in item.data" :key="brandindex" @click="gettypes(brand)">
           <div style="float: left;padding-left: 0.2rem">
              <img style="height: 0.8rem;width: 0.8rem"  v-lazy="brand.logo">
           </div>
          <div style="height: 0.8rem;">
             <p style="line-height: 0.8rem;padding-left: 1.4rem">{{brand.name}}</p>
          </div>
      </li>
    </ul>
    <yd-popup v-model="seen" position="right" width="70%">
      <yd-cell-group :title="item.brandType" v-for="item,brandI in types" :key="brandI" id="typebrand">
        <yd-cell-item @click.native="gotocarModel(codeitem)" v-for="codeitem,codeI in item.codelst" :key="codeI">
          <span slot="left" v-cloak>{{codeitem.name}}</span>
        </yd-cell-item>
      </yd-cell-group>
    </yd-popup>
   <div style="position: absolute;top: 0;right: 0;left: 0;bottom: 0;z-index: 3;background-color: #fff" v-if="seen2">
     <div class="header">
       <span v-if="level>0" @click="le()">{{brandType}}>></span><span v-if="level>1" @click="level=1">{{disStr}}>></span><span v-if="level>2" @click="level=2">{{yearStr}}>></span> <span>{{level==1?'请选择发动机排量':level==2?'请选择生产年份':level==3?'请选择车型':''}}</span>
     </div>
     <div class="alternative">
       <span>{{level==1?'发动机排量':level==2?'生产年份':level==3?'选择车型':''}}</span>
     </div>
     <yd-cell-group v-if="level==1">
       <yd-cell-item v-for="items,disI in displacement" :key="disI" @click.native="gotocar(items)">
         <span slot="left">{{items}}</span>
       </yd-cell-item>
     </yd-cell-group>

     <yd-cell-group v-else-if="level==2">
       <yd-cell-item v-for="items,yearI in yearType" :key="yearI" @click.native="getType(items)">
         <span slot="left">{{items+"年生产"}}</span>
       </yd-cell-item>
     </yd-cell-group>

     <yd-cell-group v-else-if="level==3">
       <yd-cell-item v-for="items,typeI in typeType" :key="typeI" @click.native="chooseCar(items)">
         <span slot="left">{{items.name}}</span>
       </yd-cell-item>
     </yd-cell-group>
   </div>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {setStore,getStore} from  '../../../config/mUtils'
  const vm= {
    data() {
      return {
        brands:[],
        hotBrands: [],
        types:[],
        seen:false,
        seen2:false,
        displacement:[],
        yearType:[],
        typeType:[],
        level:0,
        brandType:'',
        disStr:'',
        yearStr:'',
        typeStr:'',
        typeId:'',
      }
    },
    mounted(){
      this.getbrands();
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      le(){
        this.level=0;
        this.seen2=false;
        this.seen=true;
      },
      getbrands () {
        const  that =this;
        baseHttp(this,'/api/car/brands',{},'get','加载中...',function (data) {
          var map = {}, dest = [];
          var arr = data.brands;
          for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai.initial]) {
              dest.push({
                initial: ai.initial,
                data: [ai]
              });
              map[ai.initial] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.initial == ai.initial) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }
          console.log(dest);
          that.brands = dest;
          that.hotBrands=data.hotBrands;
        })
      },
      gettypes(item){
        const  that=this;
        baseHttp(this,'/api/car/types',{'brandId':item.id},'post','加载中...',function (data) {
          var brandlist=[];
          for(var key in data.types){
            brandlist.push({'brandType':key,'codelst':data.types[key]});
          }
          that.types=brandlist;
          that.seen=!that.seen;
        })
      },
      gotocarModel(item){
        const  that=this;
        that.brandType=item.fullname;
        baseHttp(this,'/api/car/displacement',{'typeId':item.id},'post','加载中...',function (data) {
          that.typeId=item.id;
          that.displacement=data.displacement;
          that.seen=false;
          that.seen2=true;
          that.level=1;
        });

      },
      gotocar(item){
        const  that=this;
        baseHttp(this,'/api/car/yearType',{'typeId':this.typeId,'displacement':item},'post','加载中...',function (data) {
          that.level=2;
          that.disStr=item;
          that.yearType=data.yearType;
        });
      },
      getType(item){
        const  that=this;
        baseHttp(this,'/api/car/salesName',{'typeId':this.typeId,'displacement':this.disStr,'yearType':item},'post','加载中...',function (data) {
          that.yearStr=item;
          that.level=3;
          that.typeType=data.yearType;
        });
      },
      chooseCar(item){
        const  that=this;
        baseHttp(this, '/api/car/update', {car:item.id}, 'post', '加载中...', function (data) {
          that.$dialog.toast({
            mes: '车辆更新成功!',
            timeout: 1000,
            icon: 'success',
            callback:function () {
              if(data.result){
                if(data.result.type){
                  setStore("carInfo",data.result);
                  that.gotoback();
                }
              }
            }
          });
        })
      }
    },
  }
  export default vm;
</script>
<style scoped>
  .brandlist{
    background-color: #ffffff;
  }
  .brandlist li{
    border-bottom: 1px solid #e3e3e3;
  }
  .header{
    padding: 8px 8px;border-bottom: 1px solid #d9d9d9;background-color: white
  }
  .header span{
    font-size: 0.3rem;
  }
  .alternative{
    display: block;color: #666;padding: 8px; border-bottom: 1px solid #d9d9d9;
  }
  .alternative span{
    font-size: 0.25rem;
  }


  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 18px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>
<style>
  #hotbrand .yd-grids-icon img{
    height: 100%;
  }
  #hotbrand .yd-grids-4 .yd-grids-item:not(:nth-child(4n)):before{
    border-right:0px
  }
  #hotbrand .yd-grids-item{
    padding:0.15rem 0;
  }
  #hotbrand .yd-grids-item:after{
    border-bottom: 0px;
  }
  #typebrand .yd-cell-box{
    border-bottom: 0px;
  }
</style>
