//导入sql
const db = require('../../config/mysql')



exports.publishArt = (req, res) => {
    const sqlselect = 'SELECT * from article'
    db.query(sqlselect, (err, result) => {
        const obj = {
            title_id: result.length + 1,
            content: req.body.text,
            createtime: new Date(),
            user_name: req.body.name,
            visit: 0,
            title: req.body.title,
            article_desc: req.body.desc,
            article_img:"http://localhost:8085/"+req.file.filename,
            update_id:"0"
        }
        const sql = "INSERT INTO article set ?"
        db.query(sql, obj, (err, results) => {
            console.log(results)
            if (err) return res.send(err.message)
            if (results.affectedRows !== 1) {
                return res.send({ status: 'fail', message: '发布失败！' })
            }
            if (results.affectedRows == 1) {
                return res.send({ message: '发布成功！' })
            }
        })
    })
}