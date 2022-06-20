import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//
		PV: 0,
		//
		articlesNum: 0,
		usersNum: 0,
	},
	//
	getters: {},
	//变更state的数据
	mutations: {
		//article
		artivleNum(state, num) {
			state.articlesNum = num
		},
		//user
		userNum(state, num) {
			state.usersNum = num
		},
	},
	actions: {},
	modules: {}
})
