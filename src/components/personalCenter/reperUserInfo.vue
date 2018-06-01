<template>
  <yd-layout id="reperInfo">
    <yd-navbar slot="navbar" title="修改用户信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group style="margin-top: 0.1rem" title="基本资料">
      <yd-cell-item>
        <span slot="left">头像：</span>
        <div slot="right">
          <vue-core-image-upload
                inputOfFile="file"
                :credentials="false"
                :crop="false"
                :data="tag"
                @imageuploaded="imageuploaded"
                :max-file-size="5242880"
                :compress="70"
                inputAccept="image/*"
                :url="uploadURL">
          <img :src="avatar" class="messimg" style="height: 0.8rem;width: 0.8rem">
        </vue-core-image-upload>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">姓名：<i style="color: red">*</i></span>
        <yd-input slot="right" placeholder="请输入真实姓名" v-model="customerinfo.customerNickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">性别：<i style="color: red">*</i></span>
        <div slot="right">
          <yd-radio-group v-model="customerinfo.customerGender" color="#F00">
            <yd-radio val="男"><span>男</span></yd-radio>
            <yd-radio val="女"><span>女</span></yd-radio>
            <yd-radio val="保密"><span>保密</span></yd-radio>
          </yd-radio-group>
        </div>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">出生日期：</span>
        <yd-datetime type="date" v-model="customerBirthday" start-date="1949-01-01 15:13" end-date="2018-01-01 22:21" slot="right"></yd-datetime>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">邮箱：</span>
        <yd-input slot="right" v-model="customerEmail" :debug="true" regex="email" placeholder="请输入邮箱地址"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">家庭地址：</span>
        <input slot="right" type="text" v-model="addressMessage" placeholder="请输入家庭地址">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">爱好：</span>
        <input slot="right" type="text" v-model="hobby" placeholder="请输入爱好">
      </yd-cell-item>

      <yd-cell-item arrow type="label">
        <span slot="left">年收入：</span>
        <select slot="right" v-model="income">
          <option value="">请选择年输入</option>
          <option :value=item  v-for="item in incomelist">{{item}}</option>
        </select>
      </yd-cell-item>
      <yd-cell-item arrow type="label">
        <span slot="left">职业：</span>
        <select slot="right" v-model="customerSalutation">
          <option value="">请选择职业</option>
          <option :value=item  v-for="item in professionallist">{{item}}</option>
        </select>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="自定义标签">
      <yd-cell-item arrow type="label">
        <span slot="left">购物性格：</span>
        <select slot="right" v-model="consumeCharacter">
          <option value="">请选择购物性格</option>
          <option :value=item  v-for="item in consumeCharacterlist">{{item}}</option>
        </select>
      </yd-cell-item>
      <yd-cell-item arrow type="label">
        <span slot="left">消费方式：</span>
        <select slot="right" v-model="consumeTrend">
          <option value="">请选择消费方式倾向</option>
          <option :value=item  v-for="item in consumeTrendlist">{{item}}</option>
        </select>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">支付方式：</span>
        <yd-checkbox-group v-model="payTrend" slot="right" color="#F00" size="16">
          <yd-checkbox shape="circle" :val="item" v-for="item,index in payTrendlist" :key="index"></yd-checkbox>
        </yd-checkbox-group>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">关注产品：</span>
        <yd-checkbox-group v-model="attentionProduct" slot="right" color="#F00" size="16">
          <yd-checkbox shape="circle" :val="item" v-for="item,index in attentionProductlist" :key="index"></yd-checkbox>
        </yd-checkbox-group>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">关注品牌：</span>
        <yd-checkbox-group v-model="attentionBrand" slot="right" color="#F00" size="16">
          <yd-checkbox shape="circle" :val="item" v-for="item,index in attentionBrandlist" :key="index"></yd-checkbox>
        </yd-checkbox-group>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">产品关注点：</span>
        <yd-checkbox-group v-model="productAttentionPoint" slot="right" color="#F00" size="16">
          <yd-checkbox shape="circle" :val="item" v-for="item,index in productAttentionPointlist" :key="index"></yd-checkbox>
        </yd-checkbox-group>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button  size="large" type="primary" style="background-color: #d41d0f; margin: auto;width: 80%;margin-top: 20px;font-size: .3rem;" @click.native="repInfo">提交</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp,getCookie,uploadURL} from '../../config/env'
  import  {getStore,removeStore} from '../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { mapGetters } from 'vuex'
  const vm= {
    computed: {
      ...mapGetters([
        'customerinfo'
      ])
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    data() {
      return {
        avatar:'',
        addressMessage:'',
        consumeCharacter:'',
        consumeCharacterlist:['有钱任性','最强大脑','完美主义','看我心情'],
        consumeTrend:'',
        consumeTrendlist:['线上','线下','线上线下融合'],
        payTrend:[],
        payTrendlist:['现金','支付宝','微信','银联卡','其他'],
        attentionProduct:[],
        attentionProductlist:['空调','冰洗','彩电','厨卫','生活','数码','潮品'],
        attentionBrand:[],
        attentionBrandlist:['国际品牌','国内品牌','合资品牌'],
        productAttentionPoint:[],
        productAttentionPointlist:['节能','智能','健康','创新'],
        hobby:'',
        customerSalutation:'',
        professionallist:['政府部门','事业单位','教师','医生','律师','银行职员','自由职业','其他'],
        income:'',
        incomelist:['3-8万','8-15万','15-30万','30-100万','100万及以上','其他'],
        customerEmail:'',
        customerBirthday:'',
        radio5:'',
        uploadURL:uploadURL,
        tag:{tag:'repUserInfo'},
      }
    },
    mounted(){
      this.avatar=this.customerinfo.avatar;
      this.income= this.customerinfo.income;
      this.hobby= this.customerinfo.hobby;
      this.addressMessage=this.customerinfo.addressMessage;
      this.customerBirthday=this.customerinfo.customerBirthday;
      this.customerEmail=this.customerinfo.customerEmail;
      this.customerSalutation=this.customerinfo.customerSalutation;
      var customerTags =JSON.parse(this.customerinfo.customerTags);
      this.consumeTrend=customerTags.consumeTrend;
      this.consumeCharacter= customerTags.consumeCharacter;
      this.payTrend=customerTags.payTrend.split('|');
      this.attentionProduct=customerTags.attentionProduct.split('|');
      this.attentionBrand=customerTags.attentionBrand.split('|');
      this.productAttentionPoint=customerTags.productAttentionPoint.split('|');
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      imageuploaded(res) {
        if (res.code == 200) {
          if(res.result&&res.result.length>0){
            this.avatar=res.result[0];
//            this.customerinfo.mediaId=res.result[0].id;
          }
        }
      },
      /*获取用户信息*/
      getuserInfo(){
        baseHttp(this,'/api/personal/info',{},'get','获取中...',data=>{
          if(data){
            this.$store.dispatch('getCustomerInfo', data.info);
            this.gotoback();
          }
        })
      },
      /*修改个人信息*/
      repInfo(){
        this.customerinfo.avatar=this.avatar;
        this.customerinfo.income=this.income;
        this.customerinfo.hobby=this.hobby;
        this.customerinfo.addressMessage=this.addressMessage;
        this.customerinfo.customerBirthday=this.customerBirthday;
        this.customerinfo.customerEmail=this.customerEmail;
        this.customerinfo.customerSalutation=this.customerSalutation;
        var customerTags ={};
        customerTags.consumeTrend=this.consumeTrend;
        customerTags.consumeCharacter=this.consumeCharacter;
        customerTags.payTrend=this.payTrend.join('|');
        customerTags.attentionProduct=this.attentionProduct.join('|');
        customerTags.attentionBrand=this.attentionBrand.join('|')
        customerTags.productAttentionPoint= this.productAttentionPoint.join('|');
        this.customerinfo.customerTags=JSON.stringify(customerTags);


        baseHttp(this,'/api/personal/info/update',this.customerinfo,'post','提交中...',data=> {
          this.$dialog.toast({
            mes: '提交成功!',
            timeout: 1000,
            icon: 'success',
            callback: ()=> {
                this.getuserInfo();
            }
          });
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  .messimg{
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
</style>
<style>
  #reperInfo .yd-flexbox-item.mess_2.yd-flexbox-item-center{
    height:1.2rem;
    padding-left: .3rem;
  }
  #reperInfo .yd-flexbox.mess_3.yd-flexbox-vertical{
    padding-top: 0.15rem;
  }
  #reperInfo .yd-cell-left{
    width: 1.8rem;
  }
  #reperInfo .yd-cell:after{
    border-bottom: none;
  }
  #reperInfo .yd-cell-right{
    text-align:left;
    justify-content:flex-start;
  }
  #reperInfo .yd-cell-right select{
    color: #555;
  }
</style>
