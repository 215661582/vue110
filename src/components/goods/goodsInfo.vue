<template>
    <div class="goodsinfo-container">
        <!-- 小球动画 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="isball" ref="myball"></div>
        </transition>
        

        <!-- 图片 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :lunbotuList="LunBoTuList" :isfull="false"></swipe>
                </div>
            </div>
        </div>

        <!-- 购买 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>
                        市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="new-price">￥{{ goodsInfo.sell_price }}</span>
                    </p>
					<p class="buy">购买数量：<numbox :max="goodsInfo.stock_quantity" @func="getCount"></numbox></p>
					<p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
				</div>
			</div>
		</div>


        <!-- 商品参数 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsInfo.goods_no }}</p>
					<p>库存情况：{{ goodsInfo.stock_quantity }}</p>
					<p>上架时间：{{ goodsInfo.add_time | dataFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>

    </div>
</template>

<script>
// 导入numbox 组件
import numbox from '../subcomponents/goodsInfo_numbox.vue'

// 导入轮播图组件
import swipe from '../subcomponents/swipe.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            
            goodsInfo: {},  // 商品信息
            
            LunBoTuList: [], // 轮播图数据
            
            isball: false, // 小球标识符

            selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
        }
    },
    created(){ 
        this.getGoodsInfo(),
        this.getLunBoTuList()
    },
    methods: {
        // 获取轮播图数据
        getLunBoTuList(){
            this.$http.get('api/getthumimages/'+ this.id).then(result => {
                if(result.body.status === 0 ){
                    result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.LunBoTuList = result.body.message
                }
            })
        },

        // 获取商品信息
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+ this.id).then(result => {
                if(result.body.status === 0 ){
                    this.goodsInfo = result.body.message[0]
                }
            })
        },
        // 跳去图文页面
        goDesc(id){
            this.$router.push({ name: 'goodsdesc', params: {id} })
        },
        // 跳去评论页面
        goComment(id){
            this.$router.push({ name: 'goodscomment', params: {id} })
        },

        // 加入购物车动画
        addToShopCar(){
            this.isball = !this.isball

            // 收集数据 组成一个对象
            // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
            var shopCarData = {
                id: this.goodsInfo.id,
                count: this.selectedCount,
                price: this.goodsInfo.sell_price,
                selected: true
            }
            this.$store.commit('addShopCarData',shopCarData)
        },
        beforeEnter(el){
            el.style.transform = 'translate(0,0)'
        },
        enter(el,done){
            el.offsetWidth
            // 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
            //  如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()
            const ballPosition = this.$refs.myball.getBoundingClientRect()
            const badgePosition = document.getElementById('badge').getBoundingClientRect()
            // console.log(ballPosition)
            // console.log(badgePosition)
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top
            // el.style.transform = 'translate(' + 159 + 'px,' + 209  + 'px)'
            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = 'all 0.5s cubic-bezier(.47,-0.26,1,.7)'
            done()
        },
        afterEnter(el){
            this.isball = !this.isball
        },
        
        // 子组件向父组件传值
        getCount(count){
            this.selectedCount = count
            // console.log('当前父组件-----' +  this.selectedCount)
        } 
    },
    components: {
        'numbox': numbox,
        'swipe': swipe
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    .new-price {
        font-size: 18px;
        color: red;
    }
    // .buy {
    //     display: flex;
    //     vertical-align: middle;
    // }
    .mui-card-footer {
        display: block;
        button {
            margin-bottom: 15px;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        left: 79px;
        top: 412px;
        z-index: 99;
    }
}
</style>