<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dataFormat }} </span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

// 导入 评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            newsinfo: {},
            id: this.$route.params.id
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id).then((result) => {
                // console.log(result.body.message[0])
                if(result.body.status === 0 ){
                    this.newsinfo = result.body.message[0]
                } else {
                    Toast('获取详情数据失败')
                }
            })
        }
    },
    components: {
        "comment-box": comment,
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 5px;
    .title {
        color: red;
        font-size: 16px;
        margin: 15px 0;
        text-align: center;
    }
    .subtitle {
        color: #226aff;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
}
</style>