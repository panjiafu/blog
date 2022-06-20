<template>
	<div id="content-detial">
		<el-card class="box-card" :style="{'min-height':widthHeight}">
			<div class="title">
				<p>{{this.data.title}}</p>
				<p>{{this.data.createtime}}</p>
			</div>
			<div class="block">
				<article class="article" v-html="this.data.content"></article>
				<review></review>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getdetail
	} from '../../util/api.js'
	import {
		newTime,
		WidthHeight
	} from '../../util/config.js'
	import review from '../../components/review.vue'
	export default {
		data() {
			return {
				widthHeight: '',
				data: '',
			}
		},
		components: {
			review
		},
		created() {
			this.Height()
			this.getDetial()
		},
		methods: {
			Height() {
				this.widthHeight = WidthHeight()
			},
			async getDetial() {
				await getdetail('api/detial', {
					params: this.$route.query
				}).then(res => {
					res.data.data.createtime = newTime(res.data.data.createtime)
					this.data = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#content-detial {
		width: 100%;

		.box-card {
			width: 100%;
			border-radius: 0px;

			.title {
				font-size: 30px;
				color: black;
			}

			.title p:nth-child(2) {
				margin-top: 5px;
				font-size: 16px;
			}
		}

		.block {
			width: 90%;
			height: auto;
			margin: 0 auto;
			position: relative;
			padding-top: 50px;
			background-color: #f5f5f5;

			.article {
				text-align: left;
				text-indent: 30px;
				letter-spacing: 1px;
			}
		}
	}
</style>
