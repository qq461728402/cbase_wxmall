<!--提货码-->
<template>
    <div id="popup">
        <div class="yd-dialog-black-mask" v-model="show">
            <div class="yd-confirm">
                <div class="yd-confirm-hd"><strong class="yd-confirm-title">温馨提示</strong></div>
                <div class="yd-confirm-bd">
                    <p>
                        确定<span style="color: red">{{item.price}}</span>元购买优惠券
                    </p>
                    <yd-cell-group>
                        <yd-cell-item>
                            <span slot="left">推荐码：</span>
                            <yd-input slot="right" v-model="txcode" placeholder="请输入推荐码(可不填)"></yd-input>
                        </yd-cell-item>
                    </yd-cell-group>
                </div>
                <div class="yd-confirm-ft"><div class="yd-confirm-btn default" @click="cancel">取消</div> <div  class="yd-confirm-btn primary" @click="confirm">确定</div></div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                txcode: '',
                show: false,
                item: '',
            };
        },
        components: {},
        name: 'couponPop',
        methods: {
            init(item){
                this.txcode = '';
                this.item = item;
                this.show = !this.show;
            },
            confirm(){
                this.$emit('confirmok', this.item, this.txcode);
                this.show = !this.show;
            },
            cancel(){
                this.$emit('cancel');
                this.show = !this.show;
            },
        },
    }
</script>
<style>
    #popup .yd-btn-block {
        margin-top: 0rem;
        height: 0.8rem;
    }

    #popup .yd-cell-box {
        margin-bottom: auto;
    }
    #popup .yd-confirm-ft>div.default {
        color: #353535;
    }
    #popup .yd-confirm-ft>div {
        position: relative;
        text-align: center;
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 0 2px;
    }
    #popup .yd-confirm-ft>div.primary {
        color: #0bb20c;
    }
    #popup .yd-cell-left{
        font-size: .25rem;
    }
    #popup .yd-input>input{
        font-size: .25rem;
    }
    #popup .yd-cell:after{
        border-bottom: 0px;
    }
    #popup .yd-confirm-bd>p{
        font-size: 0.3rem;margin-bottom: 0.1rem;color: #646464
    }
</style>
