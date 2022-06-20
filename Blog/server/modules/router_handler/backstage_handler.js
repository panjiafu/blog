
const list = [{
    id: '1',
    level: 1,
    name: "文章管理",
    childs: [{ id: '11', path: '/articleList', level: 2, name: '文章列表' }, { id: '12', path: '/publishArt', level: 2, name: '文章发布' }]
}, {
    id: '2',
    level: 1,
    name: "用户管理",
    childs: [{ id: '21', path: '/userList', level: 2, name: '用户列表' }]
},
{
    id: '3',
    level: 1,
    name: "评论管理",
    childs: [{ id: '21', path: '/userReview', level: 2, name: '评论列表' }]
}
]

//导入sql
const db = require('../../config/mysql')
//导入加密模块
const bcrypt = require('bcryptjs')

const fs = require('fs')

exports.treelist = (req, res) => {
    return res.send(list)
}

//文章表数据
exports.getArticle = (req, res) => {
    const sql = "SELECT * from article"
    db.query(sql, (err, result) => {
        return res.send(result)
    })

}

//用户数据
exports.getUser = (req, res) => {
    const sql = "SELECT * from user"
    db.query(sql, (err, result) => {
        return res.send(result)
    })

}

//用户编辑
exports.editorUser = (req, res) => {
    const sqlselect = 'SELECT * from user where user_id=?'
    db.query(sqlselect, req.body.user_id, (err, results) => {
        if (err) return res.send(err.message)
        if (results[0].user_name === req.body.user_name) {
            return res.send({ status: 'fail', message: '该用户名已存在!' })
        } else {
            req.body.user_password = bcrypt.hashSync(req.body.user_password, 10)
            const sql = 'UPDATE user set ? where user_id=?'
            db.query(sql, [req.body, req.body.user_id], (err, result) => {
                if (err) return res.send(err.message)
                if (result.affectedRows !== 1) {
                    return res.send({ status: 'fail', message: '编辑失败！' })
                }
                if (result.affectedRows == 1) {
                    return res.send({ message: '编辑成功！' })
                }
            })
        }
    })
}


//用户删除
exports.deleteUser = (req, res) => {
    const sql = 'DELETE from user where user_id =?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== 1) {
            return res.send({ status: 'fail', message: '删除失败！' })
        }
        if (result.affectedRows == 1) {
            return res.send({ message: '删除成功！' })
        }
    })

}


//文章编辑
exports.editorArt = (req, res) => {

    if (req.file == undefined) { //没有修改图片
        return
    } else {
        //删除图片
        const path = req.body.oldImg.replace('http://localhost:8085', './upload')
        fs.unlink(path, (err) => {
            if (err) return console.log(err.message)
        })
    }
    const obj = {
        content: req.body.text,
        update_time: new Date(),
        user_name: req.body.name,
        title: req.body.title,
        article_desc: req.body.desc,
        article_img: "http://localhost:8085/" + req.file.filename,
        update_id: "1"
    }
    const sql = 'UPDATE article set ? where title_id=?'
    db.query(sql, [obj, req.body.id], (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== 1) {
            return res.send({ status: 'fail', message: '编辑失败！' })
        }
        if (result.affectedRows == 1) {
            return res.send({ message: '编辑成功！' })
        }
    })

}

//文章delete
exports.deleteArt = (req, res) => {
    //删除图片
    const path = req.body.article_img.replace('http://localhost:8085', './upload')
    fs.unlink(path, (err) => {
        if (err) return console.log(err.message)
    })
    const sql = 'DELETE from article where title_id =?'
    db.query(sql, req.body.title_id, (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== 1) {
            return res.send({ status: 'fail', message: '删除失败！' })
        }
        if (result.affectedRows == 1) {
            return res.send({ message: '删除成功！' })
        }
    })
}


//用户评论
exports.userReview = (req, res) => {
    const sql = "SELECT * from review"
    db.query(sql, (err, result) => {
        return res.send(result)
    })
}

//用户评论del
exports.deluserReview = (req, res) => {
    const sql = 'DELETE from review where id =?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== 1) {
            return res.send({ status: 'fail', message: '删除失败！' })
        }
        if (result.affectedRows == 1) {
            return res.send({ message: '删除成功！' })
        }
    })
}
//用户评论批量del
exports.delListuserReview = (req, res) => {
    let id = ''
    for (const key in req.body.listId) {
        id += "'" + req.body.listId[key] + "'" + ","
    }
    id = id.substring(0, id.length - 1)//去掉多余的逗号，否则不符合sql语法。报错
    console.log(id)
    const sql = 'DELETE from review where id in(' + id + ')'//多条数据用in
    db.query(sql, (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows !== req.body.listId.length) {
            return res.send({ status: 'fail', message: '删除失败！' })
        }
        if (result.affectedRows == req.body.listId.length) {
            return res.send({ message: '删除成功！' })
        }
    })
}

