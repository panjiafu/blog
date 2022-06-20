const express = require('express')
const router = express.Router()

//导入article处理函数模块
const article = require('../router_handler/article_handler')
//获取文章
router.get('/article',article.getarticle)
router.get('/detial',article.detail)
router.post('/visit',article.postvisit)
router.get('/reviewcount',article.reviewcount)

module.exports = router