//导入数据库模块
const db = require('../../config/mysql')

const request = require('request')

const os = require('os');
//导入bcrypt.js加密模块
const bcrypt = require('bcryptjs')
//导入token
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

//注册新用户的处理函数
exports.regUser = (req, res) => {
    if (req.body.uername === '' || req.body.password === '') {
        return res.send({ status: null, tip: "用户名或密码不能为空！" })
    } else {
        //获取客户端提交的信息
        const userInfo = req.body
        //定义SQL语句，查询用户名是否被占用
        const SQLStr = 'SELECT * from user where user_name=?'
        db.query(SQLStr, userInfo.username, (err, results) => {
            if (err) {
                return res.send({ message: err.message })
            }
            //判断用户是否被占用
            if (results.length > 0) {
                return res.send({ message: '该用户名被占用' })
            }
            //用户名没有被占用
            if (results.length == 0) {



                /**
                 * 获取当前机器的ip地址
                 */
                //     function getIpAddress() {
                //         var ifaces = os.networkInterfaces()

                //         for (var dev in ifaces) {
                //             let iface = ifaces[dev]

                //             for (let i = 0; i < iface.length; i++) {
                //                 let { family, address, internal } = iface[i]

                //                 if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                //                     return address
                //                 }
                //             }
                //         }
                //     }
                //     let ipAddress = getIpAddress() 
                //     console.log(ipAddress)
                //   const address="https://restapi.amap.com/v3/ip?ip="+ipAddress+"&output=xml&key=<feed7b176c4c6f9a7e4d0ed7bc768f66>"
                //     request(address,(err,res,body)=>{
                //          console.log(body)
                //         if(!err && res.statusCode == 200){
                //             const resultAdd = JSON.parse(body)
                //         }
                //     })

                //加密密码
                userInfo.password = bcrypt.hashSync(userInfo.password, 10)
                const sqlselect = 'SELECT * from user'
                db.query(sqlselect, (err, result) => {
                    //插入数据
                    const sql = 'INSERT INTO user set ?'
                    const obj = { user_name: userInfo.username, user_password: userInfo.password, user_createdate: new Date(), user_id: result.length + 1, user_loginip: 1 }
                    db.query(sql, obj, (err, results) => {
                        if (err) {
                            return res.send({ message: err.message })
                        }
                        if (results.affectedRows !== 1) {
                            return res.send({ message: "注册失败" })
                        }
                        return res.send({ message: "注册成功" })
                    })
                })

            }
        })
    }

}


//用户登录的处理函数
exports.login = (req, res) => {
    const userLogin = req.body
    const sql = 'SELECT * from user where user_name = ?'

    db.query(sql, userLogin.name, (err, result) => {
        if (err) return res.send({ message: err.message })
        //先判断是否存在该用户
        if (result.length == 0) {
            return res.send({ message: '用户名不正确！' })
        }
        //判断密码是否一致
        const loginpwd = bcrypt.compareSync(userLogin.password, result[0].user_password)
        if (loginpwd === false) {
            return res.send({ message: '密码不正确！' })
        }
        const user = { ...result[0], user_password: '', user_root: '' }
        const tokenStr = jwt.sign(user, config.jetServerKey, { expiresIn: config.expiresIn })

        //响应给客户端
        return res.send({ status: 0, data: result[0], message: '登录成功！', token: 'Bearer ' + tokenStr })
    })
}