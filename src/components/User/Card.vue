<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="会员中心" bgcolor="#d41d0f" color="#FFF"></yd-navbar>
        <div class="g-header" style="width: 100%;">
            <div class="m-content" @click="show">
                <img :src="iscarInfo.logo" class="back_img" v-if="iscarInfo.logo&&iscarInfo.logo.length>0">
                <!--<img v-else-if="isload" src="../../assets/img/vipCard.jpg" class="back_img">-->
                <img v-else-if="isload" src="../../assets/img/vipCardtest.jpg" class="back_img">
                <div style="position: absolute;top: 0.2rem;right:0.2rem;font-size: 0.3rem;color: #ffffff;height: 0.5rem;line-height: 0.5rem" v-if="1==2">
                    <img :src="iscarInfo.logo" style="max-height: 100%" >{{iscarInfo.storeName}}
                </div>
                <div class="m-info" v-if="iscarInfo.loyaltyNumber.length>0">
                    <div class="u-avatarUrl">
                        <img :src="iscarInfo.avatar">
                    </div>
                    <div class="m-right">
                        <div class="u-nickname">{{'卡号:' + iscarInfo.loyaltyNumber}}</div><!--会员卡卡号-->
                        <div class="u-nickname">{{'姓名:' + iscarInfo.customerName}}</div>
                    </div>
                </div>
                <div v-else-if="isload&&iscarInfo.loyaltyNumber.length==0" style="position: absolute;bottom: 0;width: 100%">
                    <div class="yd-cell-item" style="background-color: #fff;color: #000" @click.stop="binding">
                        <div class="yd-cell-left"><span class="yd-cell-icon"><i class="icon-custom-vip" style="font-size: 0.35rem; color: #000;"></i></span> <span style="color: #000">点击开通会员卡</span>
                        </div>
                        <div class="yd-cell-right yd-cell-arrow"></div>
                    </div>
                </div>
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item arrow @click.native="gotoUserInfo">
                <yd-icon slot="icon" name="shu" size=".35rem" color="#2e4057" custom></yd-icon>
                <span slot="left">会员信息完善</span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="getcoupons">
                <yd-icon slot="icon" name="youhuiquan2" size=".35rem" color="#2e4057" custom></yd-icon>
                <span slot="left">领取优惠券</span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="mycoupons">
                <yd-icon slot="icon" name="youhuiquan2" size=".35rem" color="#2e4057" custom></yd-icon>
                <span slot="left">我的优惠券</span>
                <span slot="right" v-if="iscarInfo.couponQuantity>0">可用<span style="color: red">{{iscarInfo.couponQuantity}}</span>张</span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="exchange">
                <yd-icon slot="icon" name="duihuan" size=".35rem" color="#2e4057" custom></yd-icon>
                <span slot="left">积分兑换</span>
                <span slot="right" v-if="iscarInfo.loyaltyNumber.length>0">{{iscarInfo.bonusPoints}}积分</span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="explain">
                <yd-icon slot="icon" name="shu" size=".35rem" color="#2e4057" custom></yd-icon>
                <span slot="left">积分规则和会员卡使用说明</span>
            </yd-cell-item>
        </yd-cell-group>
        <show v-if="isShow" ref="showcars" @close="closecar"></show>
    </yd-layout>
</template>
<script type="text/ecmascript-6">
    import show from '@/views/showcar'
    export default {
        components: {
            show
        },
        data() {
            return {
                loadIng:false,
                iscarInfo: {
                    customerName: '',
                    loyaltyNumber: '',
                    storeName: '',
                    bonusPoints: '',
                    other: '',
                    couponQuantity:0,
                    avatar:'',
                    background:'',
                    logo:'',
                },
                isShow: false,
                isload:false,
            }
        },
        activated(){
            this.isShow=false;
            this.loyalty();
        },
        methods: {
            //获取会员卡信息
            loyalty(){
                this.apiRequest('/api/customer/loyalty', {}, 'get', '', data => {
                    this.isload=true;
                    if (data && data.code == 200) {
                        this.iscarInfo = data;
                    }
                })
            },
            explain(){
                this.$router.push({name: 'Explain'});
            },
            binding(){
                this.$router.push({name: 'Binding'});
            },
            show(){
                if (this.iscarInfo.loyaltyNumber.length==0){
                    return;
                }
                this.isShow = true;
                this.$nextTick( ()=> {
                    this.$refs.showcars.init(this.iscarInfo.loyaltyNumber)
                })
            },
            closecar(){
                this.isShow=false;
            },
            //积分兑换
            exchange(){
                this.$router.push({path:'/home/PointsList'});
            },
            //我的优惠券
            mycoupons(){
                this.$router.push({ name: 'myCoupons'});
            },
            //领取优惠券
            getcoupons(){
                this.$router.push({path:'/home/getcoupons'})
            },
            //个人信息完善
            gotoUserInfo(){
                this.$router.push({name:'reperUserInfo'});
            },
        },
    }
</script>
<style scoped>
    .g-header .m-content {
        height: 4rem;
        /*background: url('../../assets/img/vipCard.jpg');*/
        /*background-size: 100% 100%;*/
        box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, .15);
        border-radius: .1rem;
        position: relative;
        overflow: hidden;
        margin: .3rem;
    }
    .g-header .m-info {
        padding-top: .8rem;
        padding-left: .4rem;
        overflow: hidden;
    }
    .g-header .u-avatarUrl {
        float: left;
    }

    .g-header .u-avatarUrl img {
        width: 1.5rem;
        height: 1.5rem;
        border: .02rem solid #ffffff;
        border-radius: 2rem;
    }

    .g-header .m-right {
        margin-left: 1.8rem;
        margin-top: .25rem;
        color: #fff;
    }

    .g-header .m-right .u-nickname {
        color: #fff;
        font-size: .3rem;
        line-height: .4rem;
        margin-bottom: .2rem;
        margin-right: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .g-header .m-right .u-level {
        display: inline-block;
        background-color: #ffffff;
        padding: .06rem;
    }

    .u-icon-txtV1 {
        background-position: 0 -94.72rem;
    }

    .u-icon-txtV1, .u-icon-txtV1Black {
        width: .3rem;
        height: .3rem;
        display: inline-block;
        vertical-align: middle;
        background-image: url(../../assets/xinjian/cardtubiao.png);
        background-repeat: no-repeat;
        background-size: 6.4rem 124.54667rem;
    }

    .g-header .m-score {
        margin: 1rem .3rem 0 .3rem;
        bottom: .6rem;
        /*width: 100%;*/
        padding: 0 .3rem;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
    }

    .g-header .m-score .m-txt {
        overflow: hidden;
        color: #FFF;
    }

    .g-header .m-score .m-txt .u-label {
        font-size: .3rem;
        float: left;
    }

    .g-header .m-score .m-txt .u-num {
        float: right;
        font-size: .3rem;
    }

    .g-header .m-score .m-txt .u-num span:first-child {
        font-size: .4rem;
    }

    .g-header .m-score .m-line {
        position: relative;
    }

    .g-header .m-score .m-line .u-bgLine {
        height: .1rem;
        background: #E4DBCB;
        border-radius: .15rem;
    }

    .g-header .m-score .m-line .active-line {
        position: absolute;
        top: 0;
        height: .1rem;
        background-color: #FBF7F0;
    }

    .g-header .helpIcon {
        position: absolute;
        right: .5rem;
        top: .5rem;
    }

    .u-icon-helpIconWhite {
        width: .5rem;
        height: .5rem;
        background: url(../../assets/xinjian/cardwenhao.png) no-repeat;
        background-size: 98%;
    }

    .u-icon {
        display: inline-block;
        vertical-align: middle;
    }

    /*----*/
    .m-card {
        margin-bottom: .2rem;
        background: #fff;
        overflow: hidden;
    }

    .m-card .title {
        padding: .5rem 0;
    }

    .m-card .mainTitle {
        font-size: .4rem;
        line-height: .4rem;
        text-align: center;
    }

    .m-card .subTitle {
        font-size: .3rem;
        line-height: .3rem;
        color: #7f7f7f;
        text-align: center;
    }
    .back_img{
        position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index:-1;
        width:100%
    }
</style>
