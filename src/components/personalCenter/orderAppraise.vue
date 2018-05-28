<template>
  <yd-layout id="orderAppraise">
    <yd-navbar slot="navbar" title="订单评价" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group v-for="item,index in orderItems" :key="index" style="margin-top: 0.2rem">
      <yd-cell-item style="padding: 0.2rem 0">
        <span slot="left" class="thumb"><img :src="item.imageUrl"></span>
        <div slot="left">
          <span>评分</span><yd-rate v-model="item.rank" color="#d41d0f" active-color="#d41d0f" size="24px" padding=".1rem"></yd-rate>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请输入您的评价？" maxlength="100" v-model="item.desc"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <van-cell-group style="margin-top: 0.2rem">
      <van-cell title="门店满意度:">  <yd-rate size="20px" v-model="value" :show-text="['不满意','一般','满意']" count="3" color="#ffaa00" active-color="#ffaa00" padding=".1rem"></yd-rate> </van-cell>
      <van-cell title="送货满意度:">  <yd-rate size="20px" v-model="value1" :show-text="['不满意','一般','满意']" count="3" color="#ffaa00" active-color="#ffaa00" padding=".1rem"></yd-rate> </van-cell>
      <van-cell title="安装满意度:">  <yd-rate size="20px" v-model="value2" :show-text="['不满意','一般','满意']" count="3" color="#ffaa00" active-color="#ffaa00" padding=".1rem"></yd-rate> </van-cell>
    </van-cell-group>
    <yd-button size="large" type="primary" class="pj_7" @click.native="submit()">提交</yd-button>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
  import {baseHttp,getCookie,uploadURL} from '@/config/env'
  import  {getStore,removeStore} from '@/config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { RadioGroup, Radio,Cell, CellGroup } from 'vant';
  import { mapGetters } from 'vuex'
  export default{
    computed: {
      ...mapGetters([
        'customerinfo'
      ])
    },
    data() {
      return {
        storeId:0,
        storeServiceRating:'',
        deliveryServiceRating:'',
        installationServiceRating:'',
        reviewDescription:'',
        reviewRating:'',
        value:3,
        value1:3,
        value2:3,
        orderItems: [],
        orderNumber: '',
        uploadURL:uploadURL,
      }
    },
    components: {
      [RadioGroup.name]:RadioGroup,
      [Radio.name]:Radio,
      [Cell.name]:Cell,
      [CellGroup.name]:CellGroup,
      'vue-core-image-upload': VueCoreImageUpload,
    },
    mounted(){
      this.storeId=this.$route.query.storeId;
      this.orderNumber =this.$route.query.orderNumber;
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
          appraiselst.push(item);
        }
        this.orderItems = [appraiselst[0]];
      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      submit(){
        this.storeServiceRating=this.value==3?'SATISFIED':this.value==2?'COMMONY':'UNSATISFY';
        this.deliveryServiceRating=this.value1==3?'SATISFIED':this.value1==2?'COMMONY':'UNSATISFY'
        this.installationServiceRating=this.value2==3?'SATISFIED':this.value2==2?'COMMONY':'UNSATISFY'
        this.orderItems.forEach(item=> {
          this.reviewDescription= item.desc;
          this.reviewRating = item.rank;
        });
        var pram=
        {customerId: this.customerinfo.customerId, deliveryServiceRating: this.deliveryServiceRating,
                installationServiceRating:  this.installationServiceRating,
                merchantId: this.storeId,
                orderNumber:  this.orderNumber,
                reviewDescription: this.reviewDescription,
                reviewRating:  this.reviewRating,
                storeServiceRating: this.storeServiceRating
        }
        baseHttp(this,'/api/order/saveReview',pram,'post','提交评论中...', data=> {
          this.$dialog.toast({
            mes: '评论成功!',
            timeout: 1000,
            icon: 'success',
            callback:  ()=> {
              this.gotoback();
            }
          });
        })
      },
    },
  }
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
  #appraise_rate .yd-cell-right{
    width:auto;
    flex:0;

  }
</style>
