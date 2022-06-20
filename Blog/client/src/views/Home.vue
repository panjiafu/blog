<template>
	<div id="content">
		<header>
			<div class="wapper">
				<a>
					<img src="../assets/images/image1.jpeg" />
				</a>
				<nav class="nav">
					<el-menu router text-color="#ffffff" active-text-color="#409EFF" background-color="#292929"
						:default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-menu-item index="/home">首页</el-menu-item>
						<el-menu-item index="/pigeonhole">归档</el-menu-item>
						<el-menu-item index="/message">留言</el-menu-item>
						<el-menu-item index="/about">关于</el-menu-item>
						<el-menu-item index="/login">登录</el-menu-item>
						<!-- <el-menu-item index="/editor">发布</el-menu-item> -->
						
					</el-menu>
				</nav>
			</div>
		</header>
		<section class="section" :style="{'min-height':widthHeight}">
			<article :style="{'min-height':widthHeight}">
				<router-view></router-view>
			</article>
		</section>
	</div>
</template>
<script>
	import {
		WidthHeight
	} from '../util/config.js'
	export default {
		data() {
			return {
				activeIndex: '/home',
				widthHeight: ''
			};
		},
		created() {
			this.Height()
		},
		methods: {
			Height() {
				this.widthHeight = WidthHeight()
			},
			handleSelect(key, keyPath) {}
		},
	};
</script>
<style lang="scss" scoped>
	#content {
		width: 100%;
		height: 100px;
		background-color: #292929;
		color: white;

		header {
			width: 100%;
			height: 100px;

			.wapper {
				width: 70%;
				height: 100px;
				margin: 0 auto;
				display: flex;
			}

			a {
				width: 20%;
				margin: 0;
				padding: 0;

				img {
					width: 50px;
					height: 50px;
					margin: 25px 0px;
				}
			}

			.nav {
				width: 80%;
				line-height: 100px;
				padding: 0;

				.el-menu.el-menu--horizontal {
					border-bottom: solid 1px #292929;
				}

				.el-menu--horizontal>.el-menu-item {
					height: 100px;
					line-height: 100px;
				}

				li {
					width: 100px;
					height: 100%;
				}

				li:nth-child(1) {
					margin-left: 300px;
				}
			}
		}

		.section {
			width: 100%;
			background-color: #f5f5f5;
			height: auto;

			article {
				width: 70%;
				margin: 0 auto;
			}
		}
	}
</style>
