<template>
	<div id="article">
		<el-container>
			<el-main>
				<el-table :data="tableData" border style="width: 96%;margin: 20px  auto 0px;">
					<el-table-column prop="title" label="标题" width="180">
					</el-table-column>
					<el-table-column prop="user_name" label="用户" width="80">
					</el-table-column>
					<el-table-column label="文章缩略图" width="200">
						<template slot-scope="scope">
							<img :src="scope.row.article_img" width="100" height="100" />
						</template>
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="article_desc" label="文章描述" width="300">
					</el-table-column>
					<el-table-column prop="visit" label="浏览" width="80">
					</el-table-column>
					<el-table-column prop="createtime" label="发布时间">
					</el-table-column>
					<el-table-column prop="" label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
							<el-button @click="deleteart(scope.row)" type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
						:total="this.total">
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import {
		getArticle,
		deleteArt
	} from '../../../util/api.js'
	import {
		newTime
	} from '../../../util/config.js'
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				pageSize: 5,
				total: 0,
				formLabelWidth: '120px',

			};

		},
		created() {
			this.articles()
		},
		methods: {
			//delete
			async deleteart(art) {
				await deleteArt('backstage/deleteArt', art).then(res => {
					this.articles()
					alert(res.data.message)
				})
			},
			//文章表数据
			async articles() {
				await getArticle('backstage/getArticle').then(res => {
					this.tableData = res.data.slice(this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
					this.total = res.data.length
					for (let i = 0; i < this.tableData.length; i++) {
						this.tableData[i].createtime = newTime(this.tableData[i].createtime)
					}
				})
			},
			handleClick(row) {
				sessionStorage.setItem("id", row.title_id)
				sessionStorage.setItem("title", row.title)
				sessionStorage.setItem("desc", row.article_desc)
				sessionStorage.setItem("img", row.article_img)
				sessionStorage.setItem("content", row.content)
				this.$router.push({
					path: 'eidtor'
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage  = val
				this.articles()
				console.log(`当前页: ${val}`);
			},
			handleClose() {
				this.dialogVisible = false
			},

		}
	};
</script>

<style lang="scss" scoped="scoped">
	#article {
		width: 100%;

		.el-tooltip__popper {
			max-width: 50%;
		}

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
