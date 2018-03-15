<template>
  <yd-layout id="orderAppraise">
    <yd-navbar slot="navbar" title="订单评价" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-cell-group v-for="item,index in orderItems" :key="index" style="margin-top: 0.2rem">
      <yd-cell-item>
        <span slot="left" class="thumb"><img  :src="item.imageUrl"></span>
        <div slot="left">
          <p>评分</p><yd-rate v-model="item.rank" color="#d41d0f" active-color="#d41d0f"></yd-rate>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入您的评价？" maxlength="100" v-model="item.desc"></yd-textarea>
      </yd-cell-item>

      <yd-grids-group :rows="5">
        <yd-grids-item v-for="imgs,index1 in item.images" :key="index1">
          <div slot="else" style="text-align: center;" >
            <img :src="imgs.url" style="height: 1.2rem;max-width: 1.2rem">
            <img src="../../assets/img/delete.png" style="height: 0.3rem;width: 0.3rem;position: absolute;right: 0rem" @click="delImage(index,item)">
          </div>
        </yd-grids-item>
        <yd-grids-item v-if="item.wait==true">
          <div slot="else" style="text-align: center;" >
            <icon name="wait" spin :scale="7"></icon>
          </div>
        </yd-grids-item>
        <yd-grids-item type="a">
          <vue-core-image-upload slot="else" style="text-align: center;"
            inputOfFile="file"
            :credentials="false"
            :crop="false"
            :data="item.data"
            :compress="70"
            :multiple-size="5"
            @imageuploading="imageuploading"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            :url=uploadURL>
            <img src="../../assets/img/addImages.png" class="messimg" style="height: 1.2rem;width: 1.2rem">
          </vue-core-image-upload>
        </yd-grids-item>
      </yd-grids-group>
    </yd-cell-group>
    <yd-button size="large" type="primary" class="pj_7" @click.native="submit()">提交</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,uploadURL} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  const vm= {
    data() {
      return {
        orderItems: [],
        images: [],
        upimages: [],
        orderId: '',
        uploadURL:uploadURL,
      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    mounted(){
      this.orderId =this.$route.query.orderId;
      var oderItemsInfo = this.$route.params;
      var appraiselst = [];
      if(oderItemsInfo.constructor == Array){
        for(var i=0;i<oderItemsInfo.length;i++){
          var item={};
          for (var key in oderItemsInfo[i]){
            item[key]=oderItemsInfo[i][key];
          }
          item.desc = '';
          item.rank = 5;
          item.mediaIds = '';
          item.images = [];
          item.wait=false;
          item.data= {tag:'appraise',index:i};
          appraiselst.push(item);
        }
        this.orderItems = appraiselst;
      }else{

      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      imageuploading(data,headers){
        this.orderItems[headers.index].wait=true;
      },
      imageuploaded(res,data) {
        var upimageItem = {};
        upimageItem.id = res.result[0].id;
        upimageItem.url= res.result[0].url;
        this.orderItems[data.index].images.push(upimageItem);
        this.orderItems[data.index].wait=false;
      },
      delImage(index, item) {
        item.images.shift(index);
      },
      submit(){
        var appraiselst=[];
        this.orderItems.forEach(function (item) {
          var parment={};
          parment.desc = item.desc;
          parment.rank = item.rank;
          var imgeurl=[];
          item.images.forEach(function (upImage) {
            imgeurl.push(upImage.id);
          });
          parment.mediaIds=imgeurl.join(",");
          parment.skuId=item.skuId;
          appraiselst.push(parment);
        })
        const  that=this;
        baseHttp(this,'/api/mall/reviewAdd',{'data':JSON.stringify(appraiselst),'orderId':this.orderId},'post','评论中...',function (data) {
          that.$dialog.toast({
            mes: '评论成功!',
            timeout: 1000,
            icon: 'success',
            callback: function () {
              that.gotoback();
            }
          });
        })
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .thumb {
    float: left;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #e5e5e5;
    text-align: center;
    margin-right: 0.2rem;
  }
  .thumb img {
    vertical-align: middle;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    border: 0;
  }
</style>
<style>
  #orderAppraise .pj_7.yd-btn-block.yd-btn-primary {
    background-color: #d41d0f;
    margin: auto;
    width: 80%;
    margin-top: 20px;
    font-size: .3rem;
  }
  #orderAppraise  span.yd-rate.score {
    margin-left: .3rem;
  }
  #orderAppraise .yd-cell-box {
    margin-bottom: 0px;
  }

  #orderAppraise label.yd-checkbox.pj_6 {
    margin-left: .35rem;
    margin-top: .35rem;
    font-size: .3rem;
  }
  #orderAppraise .yd-grids-item {
     padding: 0.1rem 0;
   }

  #orderAppraise .yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
    border-right: none;
  }

  #orderAppraise .yd-grids-item:after {
    border-bottom: none;
  }
</style>
