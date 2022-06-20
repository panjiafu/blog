<template>
	<div id="back">
		<el-container style="height: 745px;">
			<el-aside width="200px" style="background-color:#545c64 ">
				<el-col :span="24">
					<el-menu router default-active="/" class="el-menu-vertical-demo" background-color="#545c64"
						text-color="#fff" active-text-color="#ffff00">
						<!-- <el-menu-item index="/backhome" class="menu_home">
							<i class="el-icon-document"></i>
							<span slot="title">首页</span>
						</el-menu-item> -->
						<el-submenu :index="index+''" v-for=" (item,index) in data" :key="index">
							<!-- 一级菜单模板 -->
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-location"></i>
								<!-- 文本 -->
								<span>{{item.name}}</span>
							</template>
							<!-- 二级菜单 -->
							<el-menu-item class="menu_childs" :index="item.path" v-for="(item,index) in item.childs"
								:key="index">
								<!-- 二级菜单模板 -->
								<template slot="title">
									<!-- 图标 -->
									<i class="el-icon-location"></i>
									<!-- 文本 -->
									<span>{{item.name}}</span>
								</template>
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-col>
			</el-aside>

			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>

</template>
<script>
	import {
		getbackstage
	} from '../../util/api.js'
	export default {
		data() {
			return {
				data: '',
			};
		},
		created() {
			this.list()
		},
		mounted() {},
		methods: {
			async list() {
				await getbackstage('backstage/list').then(res => {
					this.data = res.data
				})
			},
			//图片路径
			src(id) {
				return require("@/assets/images/img" + id + ".png")
			}
		}
	};
</script>
<style lang="scss" scoped="scoped">
	#back {
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
