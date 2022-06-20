//导入数据库模块
const db = require('../../config/mysql')


exports.pigeonholehandler = (req, res) => {

    const sql = "SELECT * from article"
    db.query(sql,(err,result)=>{
        if(err) return res.send({err:err.message})
        return res.send(result)
    })
    
}