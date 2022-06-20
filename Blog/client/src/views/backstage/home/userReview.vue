<template>
	<div id="userreview">
		<el-container>
			<el-main>
				<el-table :data="tableData" border style="width: 96%;margin: 20px  auto 0px;"
					@selection-change="selchange">
					<el-table-column prop="user_name" label="用户" width="180">
					</el-table-column>
					<!-- <el-table-column prop="article_id" label="文章标题" width="180">
					</el-table-column> -->
					<el-table-column prop="content" label="评论内容">
					</el-table-column>
					<el-table-column prop="createdate" label="评论时间">
					</el-table-column>
					<el-table-column prop="createdate" type="selection" label="评论时间">
					</el-table-column>
					<el-table-column prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="deleteUr(scope.row)" type="danger" size="small">删除</el-button>
							<el-button @click="delList()" type="danger" size="small">批量删除</el-button>
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
	</div>
</template>

<script>
	import {
		userReview,
		deleteUserreview,
		delListUreview
	} from '../../../util/api.js'
	import {
		newTime
	} from '../../../util/config.js'
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				pageSize: 10,
				total: 0,
				listselection: []
			}
		},
		created() {
			this.getUreview()
		},
		methods: {
			//批量del
			selchange(val) {
				this.listselection = []
				for (let i = 0; i < val.length; i++) {
					this.listselection.push(val[i].id)
				}
			},

			async delList() {
				let obj = {
					listId: this.listselection
				}
				await delListUreview('backstage/deleteListUr', obj).then(res => {
					this.getUreview()
					alert(res.data.message)
				})
			},
			//单条数据
			async deleteUr(i) {
				let obj = {
					id: i.id
				}
				console.log(obj);
				await deleteUserreview('backstage/deleteUr', obj).then(res => {
					this.getUreview()
					alert(res.data.message)
				})
			},
			async getUreview() {
				await userReview('/backstage/userReview').then(res => {
					this.total = res.data.length
					this.tableData = res.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize *
						this.currentPage)
					for (let i = 0; i < this.tableData.length; i++) {
						this.tableData[i].createdate = newTime(this.tableData[i].createdate)
					}
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getUreview()
				console.log(`当前页: ${val}`);
			},
		}
	}
</script>

<style>
</style>
