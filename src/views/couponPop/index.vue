<!--提货码-->
<template>
    <div id="popup">
        <yd-popup v-model="show" position="center" width="80%">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">推荐码：</span>
                    <yd-input slot="right" required v-model="txcode" placeholder="请输入推荐码(可不填)"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button size="large" type="primary" @click.native="confirm">购买</yd-button>
        </yd-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                txcode: '',
                show: false,
                item:'',
            };
        },
        components: {},
        name: 'couponPop',
        methods: {
            init(item){
                this.txcode = '';
                this.item=item;
                this.show = !this.show;
            },
            confirm(){
                this.$emit('confirmok',this.item,this.txcode)
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
