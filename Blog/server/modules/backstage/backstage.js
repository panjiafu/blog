const express = require('express')
const router = express.Router()

//导入处理函数
const backstage = require('../router_handler/backstage_handler')
const publishArt = require('../router_handler/publishArt_handler')

//处理formdata
const multer = require('multer')

const storge = multer.diskStorage({
    //设置上传后的文件路径
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    //上传文件重命名，获取添加后缀
    filename: function (req, file, cb) {
        const fileori =file.originalname.split('.').pop()
        cb(null,Date.now()+'.'+fileori)
    }
})
const upload = multer({storage:storge})
// const upload = multer({dest:'./upload'})

router.get('/list',backstage.treelist)
router.get('/getArticle',backstage.getArticle)
router.get('/getUser',backstage.getUser)
//用户编辑
router.post ('/editorUser',backstage.editorUser)
//用户删除
router.post ('/deleteUser',backstage.deleteUser)

//用户编辑
router.post ('/editorArt',upload.single('file'),backstage.editorArt)
//用户删除
router.post ('/deleteArt',backstage.deleteArt)

//文章发布
router.post('/publishArt',upload.single('file'),publishArt.publishArt)

//评论表数据
router.get('/userReview',backstage.userReview)
router.post('/deleteUr',backstage.deluserReview)
//批量del
router.post('/deleteListUr',backstage.delListuserReview)

module.exports = router