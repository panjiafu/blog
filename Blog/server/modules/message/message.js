const Express = require("express")
const router = Express.Router()

//message处理函数
const message = require('../router_handler/message_handler')

//message 数据
router.post('/message',message.messagedata)
//获取message
router.get('/getmessage',message.getmessage)

//回复message 数据
router.post('/replayMessage',message.replayMessagedata)

module.exports = router