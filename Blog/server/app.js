//引入模块
const Express = require("express")
const bodyParser = require("body-parser")

//创建服务端对象
const app = Express()

const path = require('path')
//cors跨域资源共享
const cors = require('cors')
app.use(cors())

//解析请求体
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//解析token要在路由前
//导入config
const config = require('./config/config')
//解析token
const expressJWT = require('express-jwt')
// unless({path:['/api']})排除不需要身份认证的接口
// app.use(expressJWT({ secret: config.jetServerKey, algorithms: ['HS256'] }).unless({ path: ['/user'] }))



//路由
const routerVesion = require("../server/modules/router/user")
app.use("/user", routerVesion)
//文章
const getarticles = require('../server/modules/article/article')
app.use('/api',getarticles)
//后台
const backstages = require('../server/modules/backstage/backstage')
app.use('/backstage',backstages)
//message
const messageApi = require('../server/modules/message/message')
app.use('/messageApi',messageApi)

//评论
const review = require('../server/modules/review/reviews')
app.use('/reviewapi',review)
//归档
const pigeonhole = require('../server/modules/pigeonhole/pigeonhole')


app.use('/pigeonholeapi',pigeonhole)


app.use(Express.static(path.join(__dirname,'./upload')))

//catch 404
app.use(function(req,res,next){
    next(createError(404))
})
//定义错误token的中间件
app.use(function (err, req, res, next) {
    //验证失败
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份认证失败！' })
    if (err) return res.send({ status: 1, message: err.message })
})


app.listen(8085,'0.0.0.0',() => {
    console.log("服务器已启动", 'api server running at http://localhost:8085')
})