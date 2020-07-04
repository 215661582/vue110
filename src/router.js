import VueRouter from 'vue-router'

// 引入对应的路由组件
import HomeContainer from './components/Tabber/HomeContainer.vue'
import memberContainer from './components/Tabber/memberContainer.vue'
import shopcarContainer from './components/Tabber/shopcarContainer.vue'
import searchContainer from './components/Tabber/searchContainer.vue'
import newslist from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import comment from './components/subcomponents/comment.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer},
    { path: '/member', component: memberContainer},
    { path: '/shopcar', component: shopcarContainer},
    { path: '/search', component: searchContainer},
    { path: '/home/newslist', component: newslist },
    { path: '/home/newsinfo/:id', component: newsInfo }
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router