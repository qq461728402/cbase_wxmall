<!--提货码-->
<template>
    <div id="popup">
        <yd-popup v-model="show" position="center" width="80%">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">提货码：</span>
                    <yd-input slot="right" required v-model="txcode" placeholder="请输入提货码"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button size="large" type="primary" @click.native="confirm">确认</yd-button>
        </yd-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import {baseHttp, getCookie, formatDate} from '@/config/env'
    export default {
        data(){
            return {
                txcode: '',
                show: false,
                orderId: '',
                storeId: '',
            };
        },
        components: {},
        name: 'confirmpop',
        methods: {
            init(orderId, storeId){
                console.log(orderId);
                this.orderId = orderId;
                this.storeId = storeId;
                this.txcode = '';
                this.show = !this.show;
            },
            confirm(){
                if (this.txcode.length == 0) {
                    this.$dialog.toast({mes: '请输入提货码'});
                    return;
                }
                baseHttp(this, '/api/order/checkoutCode', {'merchantId': this.storeId,'code':this.txcode}, 'post', '正在处理中...', data=> {
                    if (data && data.code==200 &&data.data==true){
                        baseHttp(this, '/api/order/received', {'orderId': this.orderId}, 'post', '', data=> {
                            this.show = !this.show;
                            this.$emit('confirmok');
                        })
                    }else{
                        this.$dialog.toast({mes: '提货码核销失败!'});
                    }
                })
            }
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
</style>
