<template>
    <div class="photoinfo-container">
        <h1>{{ photoInfo.title }}</h1>
        <p>
            <span>发表时间：{{ photoInfo.add_time | dataFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src" :slides="list" @close="handleClose"> -->
            <vue-preview :slides="list" class="preview-img" @close="handleClose"  @click="show(index)"></vue-preview>
        </div>
        
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        
        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 导入评论子组件
import comment from '../subcomponents/comment.vue'


export default {
    data() {
        return {
            id: this.$route.params.id,
            photoInfo: {},
            list: [] // 缩略图数据
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+ this.id).then(result => {
                if (result.body.status === 0){
                    this.photoInfo = result.body.message[0]
                } else {
                    Toast('获取数据失败')
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id ).then(result => {
                if (result.body.status === 0 ){
                    result.body.message.forEach((item,i) => {
                        item.msrc = item.src
                        item.w = 800
                        item.h = 800
                    });
                    this.list = result.body.message
                } else {
                    Toast('获取数据失败')
                }
            })
        },
        handleClose () {
            console.log('close event')
        },
        show (index) {
            this.$preview.open(index, this. previewlist);
        }
    },
    components: {
        'cmt-box' : comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 0 4px;
    h1 {
        font-size: 15px;
        color: #26a2ff;
        text-align: center;
        margin: 15px 0;
    }
    p {
        display: flex;
        justify-content: space-between;
    }
    .content {
        font-size: 13px;
        line-height: 30px;
    }
     .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
}
</style>