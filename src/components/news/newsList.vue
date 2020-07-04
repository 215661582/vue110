<template>
  <div class="newList-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsLists" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id ">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p>
              <span>发表时间：{{ item.add_time | dataFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
      
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            newsLists: []
        }
    },
    created(){
        this.getnewsList()
    },
    methods: {
        getnewsList(){
            this.$http.get('api/getnewslist').then((result) => {
                console.log(result.body)
                if(result.body.status === 0 ){
                    this.newsLists = result.body.message
                } else {
                    Toast('新闻列表加载失败')
                }
            })
        }
    },
};
</script>


<style lang="scss" scoped>
.newList-container {
    h1 {
        font-size: 14px;
    }
    p {
        color: #226aff;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
}
</style>