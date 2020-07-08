<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="number" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {

    methods: {
        countChange(){
            // console.log(this.$refs.number.value)
            this.$emit('func', parseInt(this.$refs.number.value))
        }
    },

    // max 数据是父组件异步请求过来的数据 可以使用 watch 监听max数据
    watch: {
        max: function(newVal, oldVal){
            // console.log(newVal, oldVal)
            mui('.mui-numbox').numbox().setOption('max', newVal)
        }
    },

    props: ['max'] 
}
</script>

<style lang="scss" scoped>

</style>