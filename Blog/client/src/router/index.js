import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

	//登录页
	{
		path: '/login',
		component: () => import('../views/Login.vue')
	},
	//主页
	{
		path: '/',
		component: () => import('../views/Home.vue'),
		redirect: '/home',
		children: [{
				path: '/home',
				component: () => import('../views/page/HomePage.vue')
			}, {
				path: '/pigeonhole',
				component: () => import('../views/page/Pigeonhole.vue')
			}, {
				path: '/message',
				component: () => import('../views/page/Message.vue')
			}, {
				path: '/about',
				component: () => import('../views/page/About.vue')
			}, {
				path: '/detial',
				component: () => import('../views/page/detial.vue')
			},


		]
	},
	//后台
	{
		path: '/backstage',
		component: () => import('../views/backstage/backstage.vue'),
		redirect: '/articleList',
		children: [{
				path: '/backhome',
				component: () => import('../views/backstage/home/backhome.vue')
			}, {
				path: '/articleList',
				component: () => import('../views/backstage/home/articleList.vue')
				
			}, {
				path: '/userList',
				component: () => import('../views/backstage/home/userList.vue')
			}, {
				path: '/publishArt',
				component: () => import('../views/backstage/home/publishArt.vue')
			},
			{
				path: '/eidtor',
				component: () => import('../views/backstage/home/eidtor.vue')
			},
			{
				path: '/userReview',
				component: () => import('../views/backstage/home/userReview.vue')
			},
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
