<template>
  <yd-layout id="reviews">
    <yd-navbar slot="navbar" title="评论列表" bgcolor="#d41d0f" color="#FFF">
      <router-link to="" slot="left" @click.native="gotoback()">
        <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-cell-item class="qbpj" style="background-color: #fff" slot="navbar">
      <span slot="left" class="qbpj1">全部评价 ({{reviewCount}})</span>
    </yd-cell-item>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <ul class="ulbg" slot="list">
          <li v-for="item,itemindex in reviewslist" :key="itemindex">
            <yd-flexbox>
              <div class="imgdiv"><img :src="item.avatar"></div>
              <yd-flexbox-item style="margin-left: 0.2rem">
                <yd-flexbox direction="vertical">
                  <yd-flexbox-item style="line-height: 0.6rem;font-size: 0.3rem">{{item.name}}</yd-flexbox-item>
                  <yd-flexbox-item>
                    <yd-rate v-model="item.level" size=".3rem" :readonly="true" color="#d41d0f" active-color="#d41d0f"></yd-rate>
                  </yd-flexbox-item>
                </yd-flexbox>
              </yd-flexbox-item>
              <div style="padding-right: .3rem;color: #9a9b9c">{{item.date}}</div>
            </yd-flexbox>
            <yd-flexbox style="margin-left: 1.4rem;margin-top: 0.2rem">
              <div style="color: #666869">{{item.desc}}</div><!--用户评论-->
            </yd-flexbox>
            <yd-flexbox style="margin-bottom: 0.2rem">
              <yd-lightbox class="pj_9">
                <yd-lightbox-img v-for="src,srcindex in item.reviewImgs" :key="srcindex" :src="src" class="xqpjtp1"></yd-lightbox-img>
              </yd-lightbox>
            </yd-flexbox>
            <div style="padding: .1rem;" v-if="item.childrens && item.childrens.length>0">
              <p style="background-color: #edeeef;padding: .2rem;" v-for="huifu in item.childrens">
                <span style="color: rgb(255, 125, 73);" >掌柜回复：</span>{{huifu.desc}}
              </p>
            </div>
          </li>
        </ul>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/babel">
  import {baseHttp} from '../../../config/env'
  const vm= {
    data() {
      return {
        productId: '',
        page: 1,
        reviewslist: [],
        reviewCount: '0',
      }
    },
    mounted(){
      this.productId = this.$route.query.skuId;
      this.page = 1;
      this.reviews1(false);
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      /*获取部分评论*/
      reviews1(isref){
        const that = this;
        baseHttp(this, '/api/mall/reviews', {'skuId': this.productId, 'page': this.page, 'pageSize': '10'}, 'get',(this.page==1&&isref==false)?'加载中...':'', function (data) {
          if (data.reviewCount)that.reviewCount = data.reviewCount;
          if (that.page == 1) {
            if (data.reviews)that.reviewslist = data.reviews;
            that.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
            that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
          } else {
            if (data.reviews)that.reviewslist = that.reviewslist.concat(data.reviews);
            if (data.reviews && data.reviews.length != that.pageSize) {
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            } else {
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          }
        })
      },
      /*刷新列表*/
      loadList(){
        this.page = 1;
        this.reviews1(true);
      },
      /*加载更多*/
      loadMore(){
        this.page = this.page + 1;
        this.reviews1(true);
      }
    },

  }
  export default vm;
</script>
<style scoped>
  .qbpj1 {
    color: #8f8f94;
  }
  .yd-list-loading {
    height: 0px;
    padding: 0px
  }
  .pj_9 {
    margin-left: 1.2rem;
    margin-top: .2rem;
  }
  .pj_9 img:not(:first-child){
    margin-left: 0.1rem;
  }
  .xqpjtp1 {
    float: left;
    width: 1.55rem;
    height: 1.55rem;
    padding-right: .1rem;
    padding-top: .1rem;
  }
  #reviews .yd-cell-item:not(:last-child):after {
    border-bottom: none;
  }
  .ulbg{
    background-color: #fff;
    margin-top: 0.2rem;
  }
  .ulbg li{
    border-bottom: 1px solid #ebeced;padding-top: 0.2rem
  }
  .imgdiv{
    width: 1rem;height: 1rem;overflow: hidden;border-radius: 50%;border: 1px solid #edeeef;margin-left: 0.2rem
  }
  .imgdiv img{
    width: 100%;height: 100%;
  }
  #reviews .yd-list-loading{
    height:0px;
    padding:0px
  }
</style>
