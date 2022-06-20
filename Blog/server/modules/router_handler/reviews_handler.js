//导入数据库模块
const db = require('../../config/mysql')


//添加评论
exports.review = (req, res) => {
    // console.log(req.body)
    const sql = 'SELECT * from review'
    db.query(sql, (err, result) => {
         const obj = {
            user_id: result.length + 1,
            user_name: req.body.name,
            content: req.body.content,
            relevance_id: null,
            article_id: req.body.article_id,
            replay_user_name:null,
            createdate: new Date(),
            type: '0'
        }
        const insertSql = 'INSERT INTO review set ?'
        db.query(insertSql, obj, (err, result) => {
            if (err) return res.send({message:err.message})
            return res.send({ message: '发表成功' })
        })
    })

    
}
//回复评论
exports.replayreview = (req, res) => {
    const sql = 'SELECT * from review'
    db.query(sql, (err, result) => {
         const obj = {
            user_id: result.length + 1,
            user_name: req.body.name,
            content: req.body.content,
            relevance_id: req.body.id,
            article_id: req.body.article_id,
            replay_user_name: req.body.replay_user_name,
            createdate: new Date(),
            type: '1'
        }
        const insertSql = 'INSERT INTO review set ?'
        db.query(insertSql, obj, (err, result) => {
            if (err) return res.send({message:err.message})
            return res.send({ message: '回复成功' })
        })
    })

    
}
//获取评论
exports.getreviews =(req,res)=>{
    const sql = 'SELECT * from review where article_id=?'
    db.query(sql,req.query.id,(err,result)=>{
        if (err) return res.send(err.message)
        return res.send(result)
    })
}