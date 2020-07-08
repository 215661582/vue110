<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="number" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    // 在dom都生成的时候执行
    mounted(){
        // 动态生成的需要初始化
        mui('.mui-numbox').numbox()
        // console.log(this.goodsid)
    },
    methods: {
        // 当商品数量改变 公共数据也要改变
        countChange(){
            // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
            this.$store.commit('updateGoodsInfo',{
                id: this.goodsid,
                count: this.$refs.number.value
            })
            // console.log(this.goodsid,this.$refs.number.value)
        },
    },
    props: ['initcount','goodsid']
}
</script>

<style lang="scss" scoped>

</style>