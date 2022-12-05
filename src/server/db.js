// 引入数据库
const mysql = require('mysql');
// 创建数据库链接方法
const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'wenmingyue',
  database: '20221021' // 数据库名称
});

module.exports = connection;
