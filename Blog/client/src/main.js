import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//按需导入element
import ElementUi from './element.config.js'
Vue.use(ElementUi)
//全局配置echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
