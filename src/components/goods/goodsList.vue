<template>
    <div class="goods-list">

        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getJump(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="hot">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 商品列表
            goodsList: [],
            pageindex: 1
        }
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        // 获取商品列表
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex ).then(result => {
                // console.log(result.body.message)
                if(result.body.status === 0 ){
                    this.goodsList = this.goodsList.concat(result.body.message)
                }
            })
        },
        // 加载更多
        getMore(){
            this.pageindex ++
            this.getGoodsList()
        },
        getJump(id){
            // console.log(this)
            this.$router.push({ name: 'goodsinfo', params: {id} })
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    padding: 7px 7px 0 7px;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        margin-bottom: 7px;
        box-shadow: 0 0 8px #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        padding: 2px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .new {
                    font-size: 16px;
                    color: red;
                    font-weight: 700;
                }
                .old {
                    font-size: 12px;
                    margin-left: 10px;
                    text-decoration: line-through;
                }
            }
            .hot {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>