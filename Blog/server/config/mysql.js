const Mysql = require("mysql")
const connectionMysql =Mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"blog"
})
connectionMysql.connect()

module.exports = connectionMysql