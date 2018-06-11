<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="我的发票" bgcolor="#d41d0f" color="#FFF">
            <router-link to="" slot="left" @click.native="gotoback()">
                <yd-navbar-back-icon color="#FFF"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-pullrefresh :callback="pullList" ref="pullrefreshDemo" >
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <article class="receipt" slot="list">
                    <ul>
                        <li v-for="item in  invoiceList">
                            <div class="fle">
                                <div class="cell">{{'流水号'+item.outTradeNo}}</div>
                                <time></time>
                            </div>
                            <div class="fle">
                                <div class="cell">
                                    <div class="name">电子发票</div>
                                    <p class="price">&yen;{{item.orderTatal}}</p>
                                </div>
                                <div @click="gotoSign(item)">
                                    <span class="sign writing">查看发票</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </article>
           </yd-infinitescroll>
         </yd-pullrefresh>

      <div class="noProduct" v-if="invoiceList.length==0">
        <img src="../../../assets/img/cleanOder.png">
        <p>您还没有发票单</p>
      </div>
    </yd-layout>
</template>
<script type="text/ecmascript-6">
    import {baseHttp, getCookie, formatDate} from '@/config/env'
    import { mapGetters } from 'vuex'
    const vm = {
        data() {
            return {
                invoiceList: [],
                page: 1,
                pageSize: 10,
            }
        },
        computed: {
            ...mapGetters([
                'customerinfo'
            ])
        },
        mounted(){
            this.page=1;
            this.invoicelist();
        },
        methods: {
            /* 下拉刷新 */
            pullList() {
                this.page=1;
                this.invoicelist();
            },
            /* 上拉加载更多 */
            loadList() {
                this.page=this.page+1;
                this.invoicelist();
            },
            invoicelist(){
                var pars = {page: this.page, pageSize: this.pageSize,customerId:this.customerinfo.customerId};
                baseHttp(this, '/api/invoice/list', pars, 'get', this.page == 1 ? '加载中...' : '', data=> {
                    if(this.page==1){
                        if(data.data.recordList) {
                            this.invoiceList=data.data.recordList;
                            this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
                        }else{
                            this.oderlist=[];
                            this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
                        }
                    }else{
                        if(data.recordList){
                            this.oderlist=this.oderlist.concat(data.data.recordList);
                            if(data.data.recordList&&data.data.recordList.length != this.pageSize){
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                            }else{
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                            }
                        }else{
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        }
                    }
                })
            },
            gotoback(){
                this.$router.go(-1);
            },
            gotoSign(item){
                window.location.href=item.invoiceUrl;
            }
        },
    }
    export default vm;
</script>
<style scoped>
    .fle,
    .fle-v-center {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .fle .cell {
        width: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .receipt li {
        margin-bottom: .2rem;
        background-color: #fff;
    }

    .receipt li .fle {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-line-pack: center;
        align-content: center
    }

    .receipt li > div {
        padding: 0.25rem .25rem;
        border-bottom: 1px solid #f5f5f5;
    }

    .receipt li > div:first-child {
        padding: 0 .25rem;
        line-height: 0.92rem;
        color: #a8a5a5
    }

    .receipt li .name {
        font-size: 0.25rem;
        margin-bottom: .22rem
    }

    .receipt li .price {
        color: #d53129
    }

    .receipt li .sign {
        padding: .22rem;
        color: #fff;
        border-radius: 4px
    }

    .receipt li .writing {
        background-color: #ffb400
    }

    .receipt li .writed {
        background-color: #39ae05
    }


    .noProduct {
      text-align: center;
      padding: 20% 0 0 0
    }
    .noProduct img {
      width: 1.5rem;
      height: 1.5rem
    }
    .noProduct p {
      font-size: 13px;
      color: #666;
      line-height: 40px
    }

</style>
