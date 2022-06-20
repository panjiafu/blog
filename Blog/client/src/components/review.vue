<template>
	<div class="review">
		<div class="review-header">
			评论
		</div>
		<div class="review-div">
			<p v-show="shows">暂无评论</p>
			<ul class="review-ul" v-for="(item,index) in reviewList" :key="index">
				<li class="review-li">
					<span style="color: #aa5500;">{{item.user_name}}</span>
					<span>{{datetime(item.createdate)}}</span>
					<p style="color: #55aaff;">{{item.content}}</p>
					<p class="review-lir"><span @click="replayclick(item)" style="font-size: 15px;">回复</span></p>
				</li>
				<li class="responder-li" v-for="(o,index) in item.replay" :key="index">
					<span style="color: #aa5500;">
						<a @click="responder(o,item.user_id)">{{o.user_name}}</a>回复:
						<a @click="replyresponder(o.replay_user_name,item.user_id)">{{o.replay_user_name}}</a>
					</span>
					<span>{{datetime(o.createdate)}}</span>
					<p style="color: #55aaff;">{{o.content}}</p>
				</li>
				<div style="width: 90%;height: 0.2px; background-color: #000000; margin: 0 auto;"></div>
			</ul>

		</div>

		<div id="publish">
			<header>
				<div class="publish-header">
					发表评论
				</div>
				<div class="publish-content">
					<textarea v-model="inputpublish" class="input" placeholder="请输入内容"></textarea>
				</div>
				<el-row style="margin:5px auto 0px; text-align: right;width: 96%;">
					<el-button type="primary">取消</el-button>
					<el-button type="primary" @click='replaysubmit'>发表</el-button>
				</el-row>
			</header>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible">
			<div class="publish-content">
				<textarea v-model="input" class="input" placeholder="请输入内容"></textarea>
			</div>
			<el-row style="margin:5px auto 0px; text-align: right;width: 96%;">
				<el-button type="primary" @click="cancel()">取消</el-button>
				<el-button type="primary" @click="submit(replay)">发表</el-button>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getReview,
		getReplay,
		postReview
	} from '../util/api.js'
	export default {
		data() {
			return {
				reviewList: [],
				shows: true,
				title: '',
				dialogVisible: false,
				replay: '', //点击回复时获取的数据
				input: '',
				inputpublish: ''
			}
		},
		created() {
			this.getreviews()
			this.showp()
		},
		updated() {
			this.showp()
		},
		methods: {
			//评论数据
			async getreviews() {
				let articleId = {
					id: this.$route.query.id
				}
				await getReview('reviewapi/getreview', {
					params: articleId
				}).then(res => {
					let arr = []
					let replay = []
					let map = {}
					for (let i = 0; i < res.data.length; i++) {
						if (res.data[i].type === 0) {
							arr.push(res.data[i])
						} else {
							if (!map[res.data[i].relevance_id]) {
								map[res.data[i].relevance_id] = [res.data[i]]
							} else {
								map[res.data[i].relevance_id].push(res.data[i])
							}
						}
					}
					for (let i in map) {
						replay.push({
							relevanceId: i,
							item: map[i]
						})
					}
					for (let i = 0; i < arr.length; i++) {
						for (let j = 0; j < replay.length; j++) {
							if (arr[i].user_id == replay[j].relevanceId) {
								arr[i] = {
									...arr[i],
									replay: replay[j].item
								}
							}
						}
					}
					this.reviewList = arr
				})
			},
			
			async reviews(params) {
				await postReview('reviewapi/review', params)
				this.getreviews()
			},
			
			//发表
			replaysubmit() {
				if (sessionStorage.getItem('name') == null) {
					alert("请登录")
					this.$router.push({
						path: '/login',
					})
				} else {
					if (this.inputpublish == "") {
						alert("请输入内容")
					}
					let obj = {
						name: sessionStorage.getItem('name'),
						content: this.inputpublish,
						article_id: this.$route.query.id
					}
					this.reviews(obj)
					this.inputpublish = ''
				}
			},
			
			//点击回复
			replayclick(item) {
				this.title = '你正在回复:' + item.user_name
				this.replay = {
					...item,
					id: item.user_id
				}
				this.dialogVisible = true
			},
			
			//取消
			cancel() {
				this.dialogVisible = false
				this.input = ""
			},
			
			//点击回复）发表
			async submit(i) {
				let obj = {
					name: sessionStorage.getItem('name'),
					content: this.input,
					id: i.id,
					article_id: this.$route.query.id,
					replay_user_name: i.user_name
				}
				await getReplay('reviewapi/replayreview', obj)
				this.getreviews()
				this.dialogVisible = false
				this.input = ""
			},
			
			//回复者
			responder(item, id) {
				this.title = '你正在回复:' + item.user_name
				this.replay = {
					...item,
					id: id
				}
				this.dialogVisible = true
			},
			
			//被回复者
			replyresponder(item, id) {
				this.title = '你正在回复:' + item
				this.replay = {
					user_name: item,
					id: id
				}
				this.dialogVisible = true
			},
			
			//时间转化
			datetime(time) {
				let newTime = new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
				return newTime.substring(0, 10)
			},
			
			//数据不为空，隐藏文字
			showp() {
				if (this.reviewList.length !== 0) {
					this.shows = false
				}
			},
			
			//弹出框
			handleClose(done) {
				this.dialogVisible = true
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.review {
		width: 100%;
		height: auto;
		margin: 50px auto 0px;
		box-sizing: border-box;

		.review-header {
			width: 96%;
			height: 30px;
			line-height: 30px;
			margin: 5px auto 0px;
			text-align: left;
			background-color: lightblue;
			text-indent: 20px;
		}

		.review-div {
			min-height: 100px;
			margin-bottom: 50px;
		}

		.review-ul {
			width: 100%;
		}

		.review-li {
			text-align: left;
			list-style: none;

			span:nth-child(1) {
				font-size: 30px;
				padding: 0px 25px 0px 20px;
			}

			p {
				text-indent: 40px;
				font-size: 20px;
			}

			.review-lir {
				width: 96%;
				text-align: right;
				color: blue;

			}
		}

		.responder-li {
			width: 80%;
			margin: 0 auto;
			list-style: none;
			text-align: left;

			span:nth-child(1) {
				font-size: 20px;
				padding: 0px 15px;
			}

			p {
				text-indent: 40px;
				font-size: 20px;
			}
		}

		#publish {
			width: 100%;

			.publish-header {
				width: 96%;
				height: 30px;
				line-height: 30px;
				background-color: lightblue;
				margin: 0 auto;
				text-align: left;
				text-indent: 20px;
			}

			.publish-content {
				width: 96%;
				height: 200px;
				margin: 10px auto 0px;
				position: relative;

				span {
					position: absolute;
					color: #8f8f91;
					font-size: 14px;
				}
			}

			.input {
				width: 100%;
				height: 196px;
			}
		}

		//弹出框
		.publish-content {
			width: 96%;
			height: 200px;
			margin: 10px auto 0px;
			position: relative;

			span {
				position: absolute;
				color: #8f8f91;
				font-size: 14px;
			}
		}

		.input {
			width: 100%;
			height: 196px;
		}
	}
</style>
