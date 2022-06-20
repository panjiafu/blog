<template>
	<div id="content-home">
		<el-card class="box-card" v-for="(item,index) in listdata" :key="index">
			<div class="text item">
				<div class="title" style="width: 100%;">
					<h2>{{item.title}}</h2>
				</div>
				<div class="img">
					<p><img ref="img" :src="item.article_img"></p>
				</div>
				<div class="content">
					<article v-html="item.content"></article>
				</div>
				<button class="button" @click="detial(item.title_id,item.visit)">阅读全文 >></button>
				<!-- <div class="item_bottom">
					<span>博主:{{item.user_name}}</span>
					<span>浏览({{item.visit}})</span>
					<span>评论({{reviewCount(item.title_id)}})</span>
				</div> -->
			</div>
		</el-card>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page.sync="currentPage" :page-size="pagSize" layout=" prev, pager, next" :total="count">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		getarticle,
		getVisit,
		loginUser
	} from '../../util/api.js'
	import {
		WidthHeight
	} from '../../util/config.js'
	export default {
		data() {
			return {
				listdata: '',
				//分页
				currentPage: 1,
				pagSize: 5,
				count: 0,
				widthHeight: '',
				tokan:''
			}
		},
		created() {
			this.Height()
			this.loginuser()
			this.getArt()
			// this.authSrc()
		},
		methods: {
			authSrc(){
				let token = localStorage.getItem('token')
				Object.defineProperties(Image.prototype,'authsrc',{
					writable:true,
					enumerable:true,
					configurable:true
				})
				let img = this.$refs.img
				let request = new XMLHttpRequest()
				request.responseType = 'blob'
				request.open('GET',url,true)
				request.onreadystatechange = e=>{
					if(request.readyState == XMLHttpRequest.DONE && request.status ==200){
						img.src = URL.createObjectURL(request.response)
						img.onload=()=>{
							URL.revokeObjectURL(img.src)
						}
						img.src = window.URL.createObjectURL(Blob)
					}
				}
				request.send(null)
			},
			
			//获取用户
			async loginuser() {
				let obj = {
					name: 'pan',
					password: '123'
				}
				await loginUser('user/login',obj).then(res => {
					localStorage.setItem('name', res.data.data.user_name)
					localStorage.setItem("token", res.data.token)
				})
			},
			//获取文章
			async getArt() {
				let obj = {
					name: localStorage.getItem('name'),
					num: this.currentPage
				}
				await getarticle('api/article', {
					params: obj
				}).then(res => {
					this.count = res.data.data.length
					this.listdata = res.data.data.slice(this.pagSize * (this.currentPage - 1), this.pagSize *
						this.currentPage)
				})
			},
			//评论总数
			// async reviewCount(titleId){
			// 	let reviewId
			// 	await reviewcount('api/reviewcount',{params:{titleid:titleId}}).then(res=>{
			// 		reviewId = res.data.data.length
			// 	})
			// 	return reviewId
			// },
			//跳转
			async detial(id, visit) {
				await getVisit('api/visit', {
					id: id,
					visit: visit
				})
				this.$router.push({
					path: '/detial',
					query: {
						id: id
					}
				})
			},
			Height() {
				this.widthHeight = WidthHeight()
			},
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage === val
				this.getArt()
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#content-home {
		width: 100%;
		background-color: white;

		.box-card {
			width: 100%;
			border-radius: 0px;

			.item {
				padding: 18px 0;
				margin-top: 30px;
				min-height: 360px;
				margin-bottom: 100px;
				display: flex;
				flex-wrap: wrap;
				position: relative;
			}

			.img {
				width: 80%;
				margin: 50px auto auto auto;

				p {
					height: 100%;
					line-height: 100%;

					img {
						width: 100%;
						vertical-align: middle;
					}
				}
			}

			.content {
				width: 100%;
				height: 300px;
				margin-top: 20px;

				article {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 7;
					ext-overflow: ellipsis;
					overflow: hidden;

				}

				// .item_bottom {
				// 	width: 95%;
				// 	background-color: #f5f5f5;
				// 	height: 50px;
				// 	line-height: 50px;
				// 	margin: 20px 0px 50px 20px;
				// 	display: flex;

				// 	span {
				// 		display: block;
				// 		margin: 0 20px;
				// 	}
				// }
			}
			.button{
				position: absolute;
				bottom: -50px;
				right: 50px;
				display: block;
				width: 150px;
				height: 50px;
				background-color: #ffb8c3;
				border: solid 0px white;
				font-size: 20px;
			}
		}
	}
</style>
