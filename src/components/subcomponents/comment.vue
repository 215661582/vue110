<template>
    <div class="cmt-container">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="publish">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">  
                     第{{ i+1 }}楼  用户：{{ item.user_name }}  发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body">{{ item.content }}</div>
            </div>
            
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            pageindex: 1,
            comments: [],
            content: ''
        }
    },
    created(){
        this.getComment()
    },
    methods: {
        getComment(){ // 获取评论
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
            .then((result) => {
                // console.log(result.body)
                if(result.body.status === 0){
                    this.comments = this.comments.concat(result.body.message)
                } else {
                    Toast('获取评论失败!')
                }
            })
        },
        getMore(){ // 加载更多
            this.pageindex ++
            this.getComment()
        },
        publish(){ // 添加评论
            // 校验不能为空
            if(this.content.trim().length === 0 ){
                return Toast('评论内容不能为空')
            }

            // post请求
            this.$http.post('api/postcomment/'+ this.$route.params.id,{
                content: this.content.trim()
            }).then( result => {
                // console.log(result)
                if(result.body.status === 0 ){
                    // 把当前评论数据追加到评论中
                    // 拼接出一个评论对象
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.content.trim()
                    }
                    this.comments.unshift(cmt)
                    this.content = ''
                }else {
                    Toast('提交失败')
                }
            })
        }
    },
     props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
    h1 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                background-color: #ccc;
                line-height: 30px;
            }
        }
        .cmt-body {
            line-height: 35px;
            text-indent: 2em;
        }
    }
}
</style>