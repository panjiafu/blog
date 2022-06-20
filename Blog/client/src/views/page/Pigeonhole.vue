<template>
	<div id="content-pigeonhole">
		<el-card class="box-card" :style="{'min-height':widthHeight}">
			<div class="block">
				<el-timeline :reverse="reverse">
					<el-timeline-item v-for="(item,index) in list" :timestamp="timestamp(item.createtime)" placement="top" :key="index">
						<el-card>
							<h4 v-if="item.update_id==updateId">发布 {{item.title}}</h4>
							<h4 v-else>更新 {{item.title}}</h4>
							<p>{{item.user_name}} 提交于 {{item.createtime}}</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getPigeonhole
	} from '../../util/api.js'
	import {
		newTime,WidthHeight
	} from '../../util/config.js'
	export default {
		data() {
			return {
				widthHeight: '',
				reverse:true,
				list: [],
				updateId:'0'
			}
		},
		created() {
			this.Height()
			this.piegonhole()
		},
		methods: {
			async piegonhole() {
				await getPigeonhole('pigeonholeapi/pigeonhole').then(res => {
					for (let i in res.data) {
						res.data[i].createtime = newTime(res.data[i].createtime)
					}
					this.list = res.data
				})
			},
			timestamp(i){
				return i.substr(0,10)
			},
			Height() {
				this.widthHeight= WidthHeight()
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#content-pigeonhole {
		width: 100%;
		background-color: red;

		.box-card {
			width: 100%;
			border-radius: 0px;
		}

		.block {
			width: 90%;
			background-color: white;
			margin: 0 auto;
			position: relative;
			top: -30px;
			padding-top: 90px;
			border-top-right-radius: 10px;
			border-top-left-radius: 10px;

			.el-timeline {
				width: 60%;
				margin: 0 auto;
			}

			.el-timeline-item {
				padding-left: 20px;
				padding-right: 20px;
			}

		}
	}
</style>
