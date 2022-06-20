<template>
	<div id="message">
		<el-card class="box-card" :style="{'min-height':widthHeight}">
			<div class="review">
				<div class="review-header">
					留言
				</div>
				<div class="review-div">
					<p v-show="shows">暂无留言</p>
					<ul class="review-ul" v-for="(item,index) in messageList" :key="index">
						<li class="review-li">
							<span style="color: #aa5500;">{{item.message_name}}</span>
							<span>{{datetime(item.createdate)}}</span>
							<p style="color: #55aaff;">{{item.message_content}}</p>
							<p class="review-lir"><span style="font-size: 15px;" @click="replayMessage(item)">回复</span>
							</p>
						</li>
						<li class="responder-li" v-for="(o,index) in item.replay" :key="index">
							<span style="color: #aa5500;">
								<a @click="responder(o,item.messageId)">{{o.message_name}}</a> 回复:
								<a @click="replyresponder(o,item.messageId)">{{o.replay_message_name}}</a>
							</span>
							<span>{{datetime(o.createdate)}}</span>
							<p style="color: #55aaff;">{{o.message_content}}</p>
						</li>
						<div style="width: 90%;height: 0.2px; background-color: #000000; margin: 0 auto;"></div>
					</ul>
				</div>

				<div id="publish">
					<header>
						<div class="publish-header">
							发表
						</div>
						<div class="publish-content">
							<textarea v-model="inputpublish" class="input" placeholder="请输入内容"></textarea>
						</div>
						<el-row style="margin:5px auto 0px; text-align: right;width: 96%;">
							<el-button type="primary">取消</el-button>
							<el-button type="primary" @click="messagesubmit">发表</el-button>
						</el-row>
					</header>
				</div>

				<el-dialog :title="title" :visible.sync="dialogVisible">
					<div class="publish-content">
						<textarea v-model="input" class="input" placeholder="请输入内容"></textarea>
					</div>
					<el-row style="margin:5px auto 0px; text-align: right;width: 96%;">
						<el-button type="primary" @click="cancel">取消</el-button>
						<el-button type="primary" @click="submit(replay)">发表</el-button>
					</el-row>
				</el-dialog>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		WidthHeight
	} from '../../util/config.js'
	import {
		messagedata,
		getmessage,
		replayMessage
	} from '../../util/api.js'
	export default {
		data() {
			return {
				widthHeight: '',
				inputpublish: '',
				input: '',
				dialogVisible: false,
				shows: true,
				messageList: [],
				title: ''

			}
		},
		created() {
			this.getMessage()
			this.Height()
			this.showp()
		},
		methods: {
			//获取
			async getMessage() {
				await getmessage('messageApi/getmessage').then(res => {
					// console.log(res.data);
					let arr = [],
						map = {},
						replay = []
					for (let i = 0; i < res.data.length; i++) {
						// console.log(res.data[i]);
						if (res.data[i].type === 0) {
							arr.push(res.data[i])
							// console.log(arr);
						} else {
							if (!map[res.data[i].relevance_id]) {
								map[res.data[i].relevance_id] = [res.data[i]]
							} else {
								map[res.data[i].relevance_id].push(res.data[i])
							}
						}
					}
					// console.log(map);
					for (let i in map) {
						replay.push({
							relevanceId: i,
							item: map[i]
						})
					}
					for (let i = 0; i < arr.length; i++) {
						for (let j = 0; j < replay.length; j++) {
							if (arr[i].messageId == replay[j].relevanceId) {
								arr[i] = {
									...arr[i],
									replay: replay[j].item
								}
							}
						}
					}
					this.messageList = arr
				})
			},
			
			//发布留言
			async sendMessage(obj) {
				await messagedata('messageApi/message', obj)
				this.getMessage()
			},
			
			//单击发布按钮
			messagesubmit() {
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
					}
					this.sendMessage(obj)
					this.inputpublish = ''
				}
			},
			
			//点击fu留言回复
			replayMessage(item) {
				this.title = '你正在回复:' + item.message_name
				this.replay = {
					...item
				}
				this.dialogVisible = true
			},
			
			//取消
			cancel() {
				this.dialogVisible = false
				this.input = ""
			},
			
			//（点击fu留言）发表
			async submit(i) {
				let obj = {
					name: sessionStorage.getItem('name'),
					content: this.input,
					id: i.id,
					replay_message_name: i.message_name
				}
				await replayMessage('messageApi/replayMessage', obj)
				this.getMessage()
				this.dialogVisible = false
				this.input = ''
			},
			
			//dianjizi回复
			responder(i, id) {
				this.title = '你正在回复:' + i.message_name
				this.replay = {
					...i,
					id: id
				}
				this.dialogVisible = true
			},
			
			//replyresponder
			replyresponder(i, id) {
				this.title = '你正在回复:' + i.replay_message_name
				this.replay = {
					message_name: i.replay_message_name,
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
			
			Height() {
				this.widthHeight = WidthHeight()
			},
			
			//数据不为空，隐藏文字
			showp() {
				if (this.messageList.lenght !== 0) {
					this.shows = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#message {
		width: 100%;

		.box-card {
			width: 100%;
			border-radius: 0px;

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
					min-height: 200px;
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
		}
	}
</style>
