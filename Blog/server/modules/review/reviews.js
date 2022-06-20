const express = require('express')
const router = express.Router()

//
const reviewHandler = require('../router_handler/reviews_handler')
//评论
router.post('/review',reviewHandler.review)
router.get('/getreview',reviewHandler.getreviews)
router.post('/replayreview',reviewHandler.replayreview)
module.exports = router