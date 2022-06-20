<template>
	<div id="content_about">
		<el-card class="box-card" :style="{'min-height':widthHeight}">
			
		</el-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				widthHeight:''
			}
		},
		created() {
			this.WH()
		},
		methods:{
			WH() {
				let WidthHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				this.widthHeight = WidthHeight - 1 - 100 + 'px'
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#content_about {
		width: 100%;
		background-color: red;

		.box-card {
			width: 100%;
			border-radius: 0px;
		}
	}
</style>
