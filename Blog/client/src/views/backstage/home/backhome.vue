<template>
	<div id="back_home">
		<el-container>
			<el-aside width="0px">
			</el-aside>
			<el-container>
				<el-main>
					<el-header style="font-size: 12px">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/backhome' }"><b>首页</b></el-breadcrumb-item>
						</el-breadcrumb>
						<div class="header">
							{{name}}
							<el-button size='mini' type="info" icon="el-icon-switch-button" circle
								:style="{'margin-left':'30px'}">
							</el-button>
						</div>
					</el-header>
					<div class="icon">
						<div>
							<img :src="src(1)">
							<div class="icon_right">
								<p>访问量</p>
								<p>{{}}</p>
							</div>
						</div>
						<div>
							<img :src="src(2)">
							<div class="icon_right">
								<p>文章量</p>
								<p>{{countArticle}}</p>
							</div>
						</div>
						<div>
							<img :src="src(3)">
							<div class="icon_right">
								<p>用户人数</p>
								<p>{{countUser}}</p>
							</div>
						</div>
					</div>
					<div class="echart" ref="visit" style="height: 400px;">
					</div>
					<div class="echart" ref="article" style="height: 400px;">
					</div>
					<div class="echart" ref="user" style="height: 400px;">
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>

</template>
<script>
	import {
		getArticle,
		getUser
	} from '../../../util/api.js'
	export default {
		data() {
			return {
				data: '',
				name: ''
			};
		},
		created() {
			this.articles()
			this.Users()
			this.name = localStorage.getItem('name')
		},
		mounted() {
			this.Echarts()
			this.Article()
			this.User()
		},
		computed: {
			countArticle: function() {
				return this.$store.state.articlesNum
			},
			countUser: function() {
				return this.$store.state.usersNum
			}
		},
		methods: {
			//文章表数据
			async articles() {
				await getArticle('backstage/getArticle').then(res => {
					//触发mutation
					this.$store.commit('artivleNum', res.data.length)
				})
			},
			//用户数据
			async Users() {
				await getUser('backstage/getUser').then(res => {
					//触发mutation
					this.$store.commit('userNum', res.data.length)
				})
			},
			//图片路径
			src(id) {
				return require("@/assets/images/img" + id + ".png")
			},
			Echarts() {
				//获取当前日期
				let week = new Date()
				//获取周几
				let weekday = new Date().getDay()
				//年
				let year = week.getFullYear()
				//月
				let mon = week.getMonth() + 1
				//周日为0
				if (weekday == 0) {
					weekday = 7
				}
				let arr = [],
					arr2 = []

				for (let i = 1; i <= 7; i++) {
					if (weekday - i > 0) { //weekday -i 获取当前时间的前几天
						let daytime = week.getTime() - (weekday - i) * 60 * 60 * 24 * 1000
						arr.push(year + '/' + mon + '/' + new Date(daytime).getDate())
					} else {
						let daytime = week.getTime() + (7 - i) * 60 * 60 * 24 * 1000
						arr2.push(year + '/' + mon + '/' + new Date(daytime).getDate());
					}
				}
				let datearr = [...arr, ...arr2.reverse()]

				let div = this.$refs.visit
				let myEcharts = this.$echarts.init(div)
				myEcharts.setOption({
					title: {
						text: '周访问量',
						textStyle: {
							fontSize: 12
						}
					},
					xAxis: {
						type: 'category',
						data: datearr
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [10, 50, 100, 150, 200, 250, 300],
						type: 'line'
					}]
				})
			},
			Article() {
				let div = this.$refs.article
				let myEcharts = this.$echarts.init(div)
				myEcharts.setOption({
					title: {
						text: '文章数量',
						textStyle: {
							fontSize: 12
						}
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar'
					}]
				})
			},
			User() {
				let div = this.$refs.user
				let myEcharts = this.$echarts.init(div)
				myEcharts.setOption({
					title: {
						text: '文章数量',
						textStyle: {
							fontSize: 12
						}
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar'
					}]
				})
			}
		}
	};
</script>
<style lang="scss" scoped="scoped">
	#back_home {
		.el-menu {
			border-right: solid 0px black;
		}

		.menu_home {
			i {
				margin-left: -30px;
			}
		}

		.menu_childs {
			i {
				margin-left: 50px;
			}
		}

		.el-submenu .el-menu-item {
			min-width: 195px;
		}

		.el-main {
			padding: 0;
		}

		.el-header {
			background-color: rgb(238 241 246);
			line-height: 60px;
			display: flex;
			justify-content: space-between;

		}

		.el-breadcrumb {
			line-height: 60px;
			font-size: 20px;
		}

		.icon {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: space-around;
			margin-top: 20px;


			div {
				width: 25%;
				background-color: rgb(238 241 246);
			}

			img {
				width: 30%;
				height: 100px;
				float: left;
			}

			.icon_right {
				float: right;
				font-size: 26px;
				width: 50%;
				height: 100px;

				p {
					margin-top: 10px;
					margin-bottom: 10px;
				}
			}
		}

		.echart {
			width: 96%;
			background-color: pink;
			margin: 20px auto;
		}

	}
</style>
