<template>
    <div class="shopcar-container">
        <div class="goods-list" v-for="item in goodslist" :key="item.id">
            <!-- 商品列表 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch 
                        @change="selectedChange(item.id, $store.getters.getGoodsSelect[item.id])" 
                        v-model="$store.getters.getGoodsSelect[item.id]">
                        </mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <div class="info-price">
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getAllCountPrice.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getAllCountPrice.price }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_number.vue'

export default {
    data() {
        return {
            goodslist: [] // 购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        // 获取购物车页面数据 
        // 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
        // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
        getGoodsList(){
            var idArr = []
            this.$store.state.car.forEach(item => {
                idArr.push(item.id)
            });
            // console.log(idArr)
            if(idArr.length <= 0) return
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',') ).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            })
        },
        // 删除商品
        remove(id, index){
            this.goodslist.splice(index, 1)
            this.$store.commit('removeShopCar', id)
        },
        // 商品选中
        selectedChange(id, val){
            // console.log( id, val )
            this.$store.commit('updateGoodsSelected',{
                id: id,
                selected: val
            })
        }
        
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
                height: 60px;
                margin-right: 5px;
            }
            
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h1 {
                    font-size: 13px;
                }
                .info-price{
                    display: flex;
                    align-items: center;
                }
                .price {
                    color: red;
                    font-size: 15px;
                    font-weight: 700;
                    margin-right: 5px;
                }
                a {
                    margin-left: 5px;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: 700;
                font-size: 16px;
            }
        }
    }
</style>