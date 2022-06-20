<template>
	<div id="login">
		<div id="from">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
				class="demo-ruleForm">
				<el-form-item label="用户名:" prop="user">
					<el-input type="name" v-model="ruleForm.user" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item >
					<el-checkbox style="float: left;" v-model="checked">后台管理</el-checkbox>
				</el-form-item>
				<el-form-item style="margin:0 auto">
					<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					<el-button @click="dialogVisible = true">注册</el-button>
				</el-form-item>
				
			</el-form>
			<el-dialog title="注册" :visible.sync="dialogVisible" :before-close="handleClose">
				<el-form :model="regForm" :rules="rules">
					<el-form-item label="用户名:" :label-width="formLabelWidth" prop="regUser">
						<el-input v-model="regForm.regUser"></el-input>
					</el-form-item>
					<el-form-item label="密码:" :label-width="formLabelWidth" prop="regPass">
						<el-input v-model="regForm.regPass"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	import {
		loginUser,
		regUser
	} from '../util/api.js'
	import {newTime} from '../util/config.js'
	export default {
		data() {
			//登录
			let user = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.regForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			//注册
			let regUser = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			let regPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				dialogVisible: false,
				formLabelWidth: '120px',
				checked: false,
				form: {
					name: '',
					password: '',
				},
				ruleForm: {
					user: '',
					pass: '',
				},
				regForm: {
					regUser: '',
					regPass: '',
				},
				rules: {
					user: [{
						validator: user,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					regUser: [{
						validator: regUser,
						trigger: 'blur'
					}],
					regPass: [{
						validator: regPass,
						trigger: 'blur'
					}],
				}
			};
		},
		created() {
		},
		methods: {
			//登录
			async loginuser() {
				let obj = {
					name: this.ruleForm.user,
					password: this.ruleForm.pass
				}
				await loginUser('user/login', obj).then(res => {
					sessionStorage.setItem('name', res.data.data.user_name)
					sessionStorage.setItem('root', res.data.data.user_root)
					sessionStorage.setItem("token", res.data.token)
					if (this.checked === true &&  res.data.data.user_root == '管理员') {
						this.$router.replace('/backstage')
					} else {
						this.$router.push({
							path: '/',
						})
					}
				})
			},
			//注册
			async regUser() {
				let obj = {
					username: this.regForm.regUser,
					password: this.regForm.regPass,
				}
				console.log(obj);
				await regUser('user/reguser', obj).then(res => {
					if(res.data.status === null){
						alert(res.data.tip)
					}else{
						alert(res.data.message)
					}
					
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loginuser()
					} else {}
				});
			},
			resetForm(formName) {
				this.regUser()
				this.dialogVisible = false
				this.regForm.regUser = ''
				this.regForm.regPass = ''
			},
			handleClose(done) {
				this.dialogVisible = false
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	element.style {
		margin-left: 300px;
	}

	#login {
		width: 100%;

		#from {
			width: 50%;
			margin: 0 auto;
		}

		.el-form-item__content {
			margin: 0 auto;
		}
	}
</style>
