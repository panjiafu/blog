<template>
	<div id="editor">
		<el-container>
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="文章标题:">
					<el-input class="input" v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="文章描述:">
					<textarea class="el-textarea__inner" v-model="form.desc"></textarea>
				</el-form-item>
				<el-form-item label="文章缩略图:">
					<div class="load-pic">
						<div class="upload">
							<input type="file" @change="handlePic"></input>
						</div>
						<img :src="form.newimgUrl" class="img" />
					</div>
				</el-form-item>
				</el-form-item>
				<el-form-item label="文章内容:">
					<textarea class="textarea" id="textarea" v-model="form.content"></textarea>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">编辑</el-button>
				</el-form-item>
			</el-form>
		</el-container>
	</div>
</template>
<script>
	import {editorArt} from '../../../util/api.js'
	export default {
		data() {
			return {
				form: {
					title: '',
					desc:'',
					newimgUrl: '',
					oldimgUrl: '',
					content:''
				},
				file:''
			};
		},
		created() {
			this.form={
				title:sessionStorage.getItem('title'),
				desc:sessionStorage.getItem('desc'),
				newimgUrl:sessionStorage.getItem('img'),
				oldimgUrl:sessionStorage.getItem('img'),
				content:sessionStorage.getItem('content')
			}
			console.log(this.form);
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				tinymce.init({
					selector: '#textarea',
					branding: false, //去掉右下角的东西
					height: 500,
					plugins: 'link image',
					toolbar: [
						'newdocument | undo | redo | bold | italic | underline | strikethrough | alignleft | aligncenter | alignright | alignjustify | alignnone | link image',
						'copy | paste | outdent | indent | blockquote | formatselect | fontselect | fontsizeselect '
					]

				})
			},
			async onSubmit(){
				let formdata = new FormData()
				formdata.append("title",this.form.title)
				formdata.append("id",sessionStorage.getItem('id'))
				formdata.append("desc",this.form.desc)
				formdata.append("oldImg",this.form.oldimgUrl)
				formdata.append("file",this.file)
				formdata.append("name",localStorage.getItem('name'))
				formdata.append("text",tinymce.activeEditor.getContent())
				await editorArt('backstage/editorArt', formdata).then(res => {
					alert(res.data.message)
				})
			},
			//上传图片
			handlePic(e) {
				this.file = e.target.files[0]
				//保存当前this(vue实例)
				let _this = this
				let reader = new FileReader()
				reader.readAsDataURL(e.target.files[0])
				reader.addEventListener("load", function() {
					_this.form.newimgUrl = reader.result
				})
			},
			
		}
	}
</script>
<style lang="scss" scoped="scoped">
	#editor {
		width: 100%;

		.el-form {
			width: 90%;
			margin-top: 20px;
			margin-left: 30px;

			.input {
				width: 450px;
				float: left;
			}

			.el-textarea__inner {
				min-height: 200px;
				width: 450px;
			}

			.load-pic {
				width: 450px;
				min-height: 300px;
				border: lightgray 0.1px solid;

				img {
					width: 200px;
					min-height: 200px;
					float: left;
					border: 0.1px dashed lightgray;
				}

				img:before {
					content: "+";
					font-size: 70px;
					color: lightgray;
					position: relative;
					top: 70px;
				}
			}

			.upload {
				width: 70px;
				overflow: hidden;
			}


			.textarea {
				width: 100%;
			}
		}
	}
</style>
