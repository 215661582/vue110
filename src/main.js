// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入包
import Vuex from 'vuex'
// 注册vuex到vue中
Vue.use(Vuex)

// 先读取本地存储 数据
var car = JSON.parse(localStorage.getItem('car') || '[]')

// new Vuex.Store() 实例，得到一个 数据仓储对象
var store = new Vuex.Store({
    state: {
        car: car  // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: {
        addShopCarData(state, shopCarData) {
            // 判断有没有此商品 有则 只添加购买数量   无则把新购物车数据追加到car中
            var flag = false

            state.car.some(item => {
                if (item.id === shopCarData.id) {
                    item.count += parseInt(shopCarData.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(shopCarData)
            }
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 当商品数量改变
        updateGoodsInfo(state, info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.count = parseInt(info.count )
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 删除商品
        removeShopCar(state, id){
            state.car.some( (item, i) => {
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 商品是否被选中
        updateGoodsSelected(state, info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
        
    },
    getters: {
        // 获取总件数
        getAllCount(state){
            var c = 0
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        // 获取每个商品的数量
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        // 获取商品选中状态
        getGoodsSelect(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            });
            return o
        },
        // 总价钱
        getAllCountPrice(state){
            var o = {
                count: 0,
                price: 0
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count
                    o.price += item.price * item.count
                }
            })
            return o
        }
    }
})



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
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
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
    router,
    store
})