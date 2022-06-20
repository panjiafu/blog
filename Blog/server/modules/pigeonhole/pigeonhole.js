const express = require('express')
const router = express.Router()

const pigeonhole = require('../router_handler/pigeonhole_handler')
router.get('/pigeonhole',pigeonhole.pigeonholehandler)


module.exports=router