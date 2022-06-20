//导入sql
const { renderSlot } = require('vue')
const db = require('../../config/mysql')

//获取message
exports.getmessage = (req, res) => {
    const selectsql = 'SELECT * from message'
    db.query(selectsql, (err, result) => {
        if (err) return res.send(err.message)
        return res.send(result)
    })
}
//发布message
exports.messagedata = (req, res) => {
    const selectsql = 'SELECT * from message'
    db.query(selectsql, (err, result) => {
        const obj = {
            messageId: result.length + 1,
            message_name: req.body.name,
            message_content: req.body.content,
            createdate: new Date(),
            relevance_id: null,
            type: "0",
            replay_message_name: null
        }
        const sql = "INSERT INTO message set ?"
        db.query(sql, obj, (err, results) => {
            console.log(results)
            if (err) return res.send(err.message)
            if (results.affectedRows !== 1) {
                return res.send({ status: 'fail', message: '失败！' })
            }
            if (results.affectedRows == 1) {
                return res.send({ message: '成功！' })
            }
        })
    })
}


//回复message
exports.replayMessagedata = (req, res) => {
    const selectsql = 'SELECT * from message'
    db.query(selectsql, (err, result) => {
        const obj = {
            messageId: result.length + 1,
            message_name: req.body.name,
            message_content: req.body.content,
            createdate: new Date(),
            relevance_id: req.body.id,
            type: "1",
            replay_message_name: req.body.replay_message_name
        }
        const sql = "INSERT INTO message set ?"
        db.query(sql, obj, (err, results) => {
            console.log(results)
            if (err) return res.send(err.message)
            if (results.affectedRows !== 1) {
                return res.send({ status: 'fail', message: '失败！' })
            }
            if (results.affectedRows == 1) {
                return res.send({ message: '成功！' })
            }
        })
    })
}