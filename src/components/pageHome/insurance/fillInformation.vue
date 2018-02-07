<template>
  <yd-layout id="fillInfor">
    <yd-navbar slot="navbar" title="填写车主信息" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item arrow>
        <span slot="left">投保城市</span>
        <select slot="right" style="color: black" v-model="selected">
          <option v-for="option in options" :value="option.value">
            {{option.text}}
          </option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">车主姓名</span>
        <yd-input slot="right" ref="username"  v-model="username"  placeholder="请输入车主姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">车牌号<br></span>
        <div slot="right" style="text-align: left;width: 100%;"><yd-input  id="carNum" v-model="carvNo" ref="carvNo" :regex="carNo" placeholder="请输入车牌号" style="width: 65%;display: inline-flex!important;" :on-blur="getCarvNo"></yd-input>
          <div style="color: #d41d0f;float: right;line-height: 1rem">例:渝A88888</div>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证</span>
        <yd-input slot="right" v-model="sfz" ref="sfz"  :regex="idcard" placeholder="请输入身份证"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">联系电话</span>
        <yd-input slot="right" v-model="mobile" ref="mobile"  regex="mobile" placeholder="请输入联系电话"></yd-input>
      </yd-cell-item>
      <yd-cell-item class="infm_1">
        <span slot="left">上传身份证</span>
        <div slot="right" class="infm_2">
          <vue-core-image-upload class="infm_3"
            inputOfFile="file"
            :credentials="false"
            :crop="false"
            :data="datasfz"
            @imageuploading="imageuploading"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            url="https://www.cqssqm.com/api/file/upload">
            <img v-if="sfzzmurl.length>0" src="" v-lazy="sfzzmurl" style="width: 1.5rem;height: 1.5rem;">
            <img v-else src="../../../assets/img/addImages.png" style="width: 1.5rem;height: 1.5rem;">
          </vue-core-image-upload>
          <p class="infm_7">注:传身份证正面 <br>(因保险公司需要仅用于购买车险)</p>
        </div>
      </yd-cell-item>
      <yd-cell-item class="infm_1">
        <span slot="left">上传行驶证</span>
        <div slot="right" class="infm_2">
          <vue-core-image-upload class="infm_3"
            inputOfFile="file"
            :credentials="false"
            :crop="false"
            :data="dataxsz"
            @imageuploading="imageuploading"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            url="https://www.cqssqm.com/api/file/upload">
            <img v-if="sfzfmurl.length>0" src="" style="width: 1.5rem;height: 1.5rem;" v-lazy="sfzfmurl">
            <img v-else src="../../../assets/img/addImages.png" style="width: 1.5rem;height: 1.5rem;">
          </vue-core-image-upload>
          <p class="infm_7">注:因保险公司需要仅用于购买车险</p>
        </div>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button  size="large" type="primary" class="infm_12" @click.native="getQuotation">获取报价</yd-button>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  import {setStore,getStore} from  '../../../config/mUtils'
  import VueCoreImageUpload from 'vue-core-image-upload'
  const vm= {
    data() {
      return {
        datasfz:{tag:'insurance',type:'sfz'},
        dataxsz:{tag:'insurance',type:'xsz'},
        selected: '重庆市',
        options: [
          { text: '重庆市', value: '重庆市' },
          { text: '四川省', value: '四川省' },
          { text: '云南省', value: '云南省' }
        ],
        companyName:'',
        companyId:'',
        username:'',
        carvNo:'渝',
        submitpars:{},
        mobile:'',
        sfz:'',
        sfzzm:'',
        sfzfm:'',
        sfzzmurl:'',
        sfzfmurl:'',
        idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)",
        carNo: "^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z]{1}[a-zA-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$"
      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    mounted(){
      this.companyId = this.$route.query.companyId;
      this.companyName=this.$route.query.companyName;
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      imageuploading(){
        this.$dialog.loading.open('图片正在上传...');
      },
      imageuploaded(res,data) {
        this.$dialog.loading.close();
        console.log(res);
        if (res.code == 200) {
          if(data.type=='sfz'){
            this.sfzzmurl=res.result[0].url;
          }else{
            this.sfzfmurl=res.result[0].url;
          }
        }
      },
      /*输入车牌号失去焦点*/
      getCarvNo(){
        this.carvNo= this.carvNo.toLocaleUpperCase();
        const carvNo = this.$refs.carvNo;//车牌号
        if(this.carvNo.length!=0&& carvNo.valid==true){
          this.enquiredCarNo();
        }
      },
      enquiredCarNo(){
        const that=this;
        baseHttp(this, '/api/insurance/quotation/enquired', {'brand':this.carvNo}, 'post', '获取报价中...', function (data) {
          if(data.status!=0){
            that.carvNo='渝';
            that.$refs.carvNo.setFocus();
            that.$dialog.toast({mes: data.msg, timeout: 2000});
          }
        });
      },
      getQuotation(){
        const username = this.$refs.username;//用户名称
        const carvNo = this.$refs.carvNo;//车牌号
        const sfz = this.$refs.sfz;//身份证
        const mobile = this.$refs.mobile;//联系电话
        this.carvNo= this.carvNo.toLocaleUpperCase();
        if(this.username.length==0){
          this.$dialog.toast({
            mes: '请输入用户名',
            timeout: 1000
          });
          return;
        } else if(this.companyId.length==0){
          this.$dialog.toast({
            mes: '没有获取保险公司',
            timeout: 1000
          });
          return;
        }
        else if(this.carvNo.length==0){
          this.$dialog.toast({
            mes: '请输入车牌号',
            timeout: 1000
          });
          return;
        }else if(this.carvNo.length!=0&& carvNo.valid==false){
          this.$dialog.toast({
            mes: '请输入正确车牌号',
            timeout: 1000
          });
          return;
        }else if(this.sfz.length==0){
          this.$dialog.toast({
            mes: '请输入身份证',
            timeout: 1000
          });
          return;
        }else if(this.sfz.length!=0&& sfz.valid==false){
          this.$dialog.toast({
            mes: '请输入正确身份证',
            timeout: 1000
          });
          return;
        }else if(this.mobile.length==0){
          this.$dialog.toast({
            mes: '请输入手机号',
            timeout: 1000
          });
          return;
        }else if(this.mobile.length!=0&& mobile.valid==false){
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1000
          });
          return;
        }else if(this.sfzzmurl.length==0){
          this.$dialog.toast({
            mes: '请上传身份证正面',
            timeout: 1000
          });
          return;
        }else if(this.sfzfmurl.length==0){
          this.$dialog.toast({
            mes: '请上传行驶证',
            timeout: 1000
          });
          return;
        }
        var pars={'carNumber':this.carvNo,'carOwner':this.username,'identificationId':this.sfz,'insuredCity':this.selected,'primaryTelephone':this.mobile,'identificationImg':this.sfzzmurl,'vihicleLicenseImg':this.sfzfmurl,'companyId':this.companyId};
        const  that=this;
        baseHttp(this, '/api/insurance/saveInsuranceEnquire', pars, 'post', '获取报价中...', function (data) {
          that.$dialog.alert({mes: data.msg,callback:function () {
            that.gotoback();
          }});
        });
      },
    },
  }
  export default vm;
</script>
<style scoped>
  div.infm_2{
    text-align: left;
    width: 100%;
  }
  .infm_3{
    float: left;
    width: 1.5rem;
    height: 1.5rem;
  }
  div.infm_4{
    overflow: hidden;
    width: 1.5rem;
    height: 1.5rem;
    float: left;
  }
  div.infm_5{
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    background-color:rgba(0,0,0,.4);
    line-height: 1.5rem;
    text-align: center;
    color: white;
    font-size: 0.2rem;
  }
  img.infm_6{
    width: auto;
    height: auto;
    width: 100%;
  }
  .infm_7{
    margin-left: 1.8rem;
    min-height: 1.5rem;
    color: #d41d0f;
  }
  input.infm_8{
    display: none;
  }
  div.infm_9{
    overflow: hidden;
    width: 1.5rem;
    height: 1.5rem;
  }
  div.infm_10{
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    background-color:rgba(0,0,0,.4);
    line-height: 1.5rem;
    text-align: center;
    color: white;
    font-size: 0.2rem;
  }
  img.infm_11{
    float: left;
    width: auto;
    height: auto;
    width: 100%;
  }
  #carNum input{
    text-transform:uppercase;
  }
</style>
<style>
  #fillInfor .yd-cell-left{
    width: 2rem;
    white-space:normal;
  }
  #fillInfor div.yd-cell-item.infm_1{
    padding:0.24rem;
  }
  #fillInfor button.infm_12.yd-btn-block.yd-btn-primary{
    background-color: #d41d0f;
    margin: auto;
    width: 80%;
    margin-top: 20px;
  }
</style>
