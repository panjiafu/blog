<template>
	<div id="user">
		<el-container>
			<el-main>
				<el-table :data="tableData" border style="width: 96%;margin: 20px  auto 0px;">
					<el-table-column prop="user_name" label="用户" width="180">
					</el-table-column>
					<!-- <el-table-column prop="user_loginIp" label="登录ip" width="180">
					</el-table-column>
					<el-table-column prop="user_loginadress" label="登录地址">
					</el-table-column> -->
					<el-table-column prop="user_createdate" label="创建时间">
					</el-table-column>
					<el-table-column prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="handlerClick(scope.row)" type="primary" size="small">编辑</el-button>
							<el-button @click="deleteuser(scope.row)" type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
				</div>
			</el-main>
		</el-container>
		<el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="handleClose">
			<el-form :model="form">
				<el-form-item label="用户名:" :label-width="formLabelWidth">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="密码:" :label-width="formLabelWidth">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="eidtoruser('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getUser,
		editorUser,
		deleteUser
	} from '../../../util/api.js'
	import {
		newTime
	} from '../../../util/config.js'
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				pageSize:10,
				total: 0,
				formLabelWidth: '120px',
				dialogVisible: false,
				form: {
					id: null,
					name: '',
					password: '',
				},
			};
		},
		created() {
			this.users()
		},
		methods: {
			//删除
			async deleteuser(user) {
				let obj = {
					id: user.user_id
				}
				await deleteUser('backstage/deleteUser', obj).then(res => {
					this.users()
					alert(res.data.message)
				})
			},
			//编辑
			async eidtoruser() {
				let obj = {
					user_id: this.form.id,
					user_name: this.form.name,
					user_password: this.form.password
				}
				await editorUser('backstage/editorUser', obj).then(res => {
					if (res.data.status === "fail") {
						alert(res.data.message)
					}
				})
				this.dialogVisible = false
			},
			//用户表数据
			async users() {
				await getUser('backstage/getUser').then(res => {
					this.tableData = res.data.slice(this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
					this.total = res.data.length
					for (let i = 0; i < this.tableData.length; i++) {
						this.tableData[i].user_createdate = newTime(this.tableData[i].user_createdate)
					}
				})
			},
			handlerClick(user) {
				this.form = {
					id: user.user_id,
					name: user.user_name,
					password: user.user_password,
				}
				this.dialogVisible = true
			},
			handleClose() {
				this.dialogVisible = false
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage  = val
				this.users()
				console.log(`当前页: ${val}`);
			},
		}
	};
</script>

<style lang="scss" scoped="scoped">
	#user {
		width: 100%;

		.el-main {
			padding: 0;

			.el-header {
				background-color: rgb(238 241 246);
				line-height: 60px;
				display: flex;
				justify-content: space-between;

			}

			.el-breadcrumb {
				line-height: 60px;
				font-size: 20px;
			}
		}

		.block {
			margin-top: 20px;
		}
	}
</style>
