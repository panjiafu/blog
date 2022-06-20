<template>
	<div id="publish">
		<header>
			<div class="publish-header">
				发表评论
			</div>
			<div class="publish-content">
				<textarea v-model="input" class="input" placeholder="请输入内容"></textarea>
			</div>
			<el-row style="margin:5px auto 0px; text-align: right;width: 96%;">
				<el-button type="primary">取消</el-button>
				<el-button type="primary" @click='replaysubmit'>发表</el-button>
			</el-row>
		</header>
	</div>
</template>

<script>
	import {postReview} from '../util/api.js'
	export default {
		data() {
			return {
				inputpublish: ''
			}
		},
		methods: {
			async reviews(params){
				await postReview('reviewapi/review',params)
			},
			//发表
			replaysubmit() {
				let obj = {
					name:localStorage.getItem('name'),
					content:this.inputpublish
				}
				console.log(obj);
				this.reviews(obj)
				this.input = ''
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
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
</style>
