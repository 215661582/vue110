<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue项目">
		<span to="/" slot="left" @click="goBack" v-show="flag">
    		<mt-button icon="back">返回</mt-button>
		</span>
	</mt-header>

    <!-- 中间的 路由router-view 区域 -->
	<transition>
		<router-view></router-view>
	</transition>
	

    <!-- 底部 Tabber 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item-yyh">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item-yyh">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/shopcar" class="mui-tab-item-yyh">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge"  id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item-yyh">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data() {
		return {
			flag: false
		}
	},
	created(){
		this.flag = this.$route.path === '/home' ? false : true
	},
	methods: {
		goBack(){
			this.$router.go(-1)
		}
	},
	watch: {
		"$route.path": function(newVal){
			if(newVal === '/home'){
				this.flag = false
			}else{
				this.flag = true
			}
		}
	}
}

</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.mint-header {
	z-index: 999;
}

.v-enter{
	opacity: 0;
	transform: translateX(100%);
}

.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active{
	
	transition: all 0.5s ease;
}

.mui-tab-item-yyh {
	display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
	.mui-icon {
		top: 3px;
    	width: 24px;
    	height: 24px;
    	padding-top: 0;
    	padding-bottom: 0;
	}
	.mui-icon~.mui-tab-label {
		    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
	}
}
</style>
