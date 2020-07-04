// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入自己的 router 路由模块
import router from './router.js'

import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)

// 导入Mui 样式
import './lib/mui/css/mui.min.css'
// 字体图标
import './lib/mui/css/icons-extra.css'


// 导入 App 根组件
import app from './App.vue'


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})