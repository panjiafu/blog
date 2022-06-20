const Express = require("express")
const router = Express.Router()



//导入用户路由处理函数的模块
const userHandler = require('../router_handler/user_handler')

//用户登录
router.post('/login',userHandler.login)
//注册新用户
router.post('/reguser',userHandler.regUser)
module.exports = router