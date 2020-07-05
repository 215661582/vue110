// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入自己的 router 路由模块
import router from './router.js'

// 按需导入 'mint-ui'
// import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
// 导入全局 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入格式化时间的插件
import moment from 'moment'

// 定义全局过滤时间
Vue.filter('dataFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

// 缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



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