/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const Mock = require('mockjs');
// 生成token
const jwtToken = require('jsonwebtoken');
// 验证token 此处注意不同版本写法不同; 否则会报not a Fuction 错误
const { expressjwt: jwt } = require('express-jwt');
// 秘钥
const screctKey = 'hello_token';
// express路由
const router = express.Router();
// 引入数据库配置文件
const connection = require('./db');

const app = express();
// json中间件解析JSON格式数据
app.use(bodyParser.json());
// 通过使用urlencoded解码数据
app.use(bodyParser.urlencoded({ extended: false }));
// 注册路由模块化
app.use('/app', router);
// 验证token
/* 参数说明：
secret: 定义的解码秘钥;
algorithms: 加密方式(默认使用的是哈希256加密);
unless: 排除需要校验token的接口配置
*/
app.use(
  jwt({
    secret: screctKey,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }).unless({ path: ['/uaa/token'] })
);
// 自定义字符池
Mock.Random.extend({
  sex: function () {
    const list = ['man', 'female'];
    return this.pick(list);
  }
});

const users = Mock.mock({
  code: 200,
  message: 'success',
  // data|后面定义的是数据总量
  'data|20': [
    {
      'id|+1': 1,
      name: '@cname',
      dateBirth: '@date("yyyy-MM-dd")',
      sex: '@sex',
      mobile: /^1(5|3|7|8)[0-9]{9}$/,
      idCard: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
      address: '@county(true)',
      resume: '@cparagraph'
    }
  ],
  total: 20
});
// 跨域配置
app.all('*', function (err, req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length,Authorization,Origin,Accept,X-Requested-With'
  );
  res.setHeader('Content-type', 'application/json;charset=utf-8');
  if (err.name === 'UnauthorizedError') res.status(401).send('invalid token...');
  // ### next() 代表要此中间件执行完毕后执行下一个中间件, 一般在中间件里面书写, 其他地方不要用
  next();
});
// 访问该页面需要输入路径 http://localhost:3000/app/home;
router.get('/home', function (req, res, next) {
  res.send('欢迎来到主页');
});
// 访问该页面需要输入路径 http://localhost:3000/app/users;
router.get('/users', function (req, res, next) {
  res.json(users);
});

// ###设置默认输出地址,且要res.send抛出,否则会报本地服务404
app.get('/', function (req, res, next) {
  res.send('localhost has been running... \n we can get the data source');
});

app.get('/api/alarm', function (req, res, next) {
  const sql = `SELECT * FROM alarm`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    str = JSON.stringify(result);
    res.json({
      code: 200,
      message: 'success',
      data: result
    });
  });
});

app.get('/api/apilist', function (req, res, next) {
  const sql = `SELECT * FROM apilist`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    str = JSON.stringify(result);
    res.json({
      code: 200,
      message: 'success',
      data: result
    });
  });
});

router.get('/users', function (req, res, next) {
  res.json(users);
});

app.get('/api/mysqluser', function (req, res, next) {
  const { id } = req.query;
  const sql = `SELECT * FROM user where id=${id}`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    str = JSON.stringify(result);
    res.json({
      code: 200,
      message: 'success',
      data: result
    });
  });
});

app.post('/uaa/token', function (req, res, next) {
  const userInfo = req.body;
  /* 参数说明：
  screctKey: 前面定义的是一个必传值;
  expiresIn: 定义token有效时间;
  */
  // res.send(req.body);
  console.log(req, 'req');
  const token = jwtToken.sign({ username: userInfo.account }, screctKey, { expiresIn: '30d' });
  res.json({
    code: 200,
    message: 'success',
    data: {
      userInfo: userInfo,
      token: token
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server run at:\n- Local: http://localhost:${port}/`);
});
