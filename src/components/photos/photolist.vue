<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#item1mobile"
            v-for="item in cates"
            :key="item.id"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
         <router-link :to="'/home/photoinfo/' + item.id" tag="li" v-for="item in list" :key="item.id">
            <img v-lazy="item.img_url">
            <div class="info">
                <h3 class="info-title">{{ item.title }}</h3>
                <p class="info-body">{{ item.zhaiyao }}</p>
            </div>
        </router-link>
    </ul>
    <!-- <ul class="photo-list">
        <router-link :to="'/home/photoinfo/' + item.id" tag="li" v-for="item in list" :key="item.id">
            <img :src="item.img_url" alt="">
            <div class="info">
                <h3 class="info-title">{{ item.title }}</h3>
                <p class="info-body">{{ item.zhaiyao }}</p>
            </div>
        </router-link>
        
    </ul> -->
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
        cates: [],
        list: []
    }
  },
  created() {
    this.getCategory()
    this.getImgCateById(0)
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        var message = { title: "全部", id: 0 };

        result.body.message.unshift(message);
        this.cates = result.body.message;
      });
    },
    getImgCateById(cateId){
        this.$http.get('api/getimages/' + cateId).then(result => {
            // console.log(result.body)
            if(result.body.status === 0){
                this.list = result.body.message
            }else{
                Toast('图片查询失败')
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
    li {
        text-align: center;
        background-color: #ccc;
        box-shadow: 0 0 9px #999;
        margin-bottom: 10px;
        position: relative;
        img {
            width: 100%;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info {
            position: absolute;
            bottom: 0;
            color: #fff;
            text-align: left;
            max-height: 85px;
            background-color: rgba(0, 0, 0, .3);

            .info-title {
                font-size: 14px;
            }
            .info-body {
                color: #fff;
                font-size: 13px;
            }
        }
    }
    
}
</style>