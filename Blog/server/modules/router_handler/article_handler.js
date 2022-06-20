//导入数据库模块
const db = require('../../config/mysql')

//获取文章信息
exports.getarticle = (req, res) => {
    //定义sql语句
    const sql = 'SELECT * FROM article where user_name=?'
    db.query(sql, req.query.name, (err, result) => {
        if (err) return res.send({ message: err.message })
        return res.send({
            message: '获取文章数据成功',
            data: result,
        })

    })
}

//获取文章详细信息
exports.detail = (req, res) => {
    const id = req.query.id
    const sql = 'SELECT * from article where title_id=?'
    db.query(sql, id, (err, result) => {
        if (err) return res.send({ message: err.message })
        return res.send({ data: result[0], message: 'ok' })
    })

}

//浏览
exports.postvisit = (req, res) => {
    req.body.visit = req.body.visit + 1
    const sql = 'UPDATE article set ? where title_id=?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== 1) {
            return res.send("fail")
        }

        return res.send("success")
    })
}
//评论总数
exports.reviewcount = (req, res) => {
    const sql = 'SELECT * from review where article_id = ? and type = 0'
    db.query(sql, req.query.titleid, (err, result) => {
        return res.send({
            data: result
        })
    })
}
