// import Mock from 'mockjs'
import { uuid } from '@/utils/uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
// 自定义字符池
Mock.Random.extend({
  sex: function () {
    const list = ['man', 'female'];
    return this.pick(list);
  },
  token: function () {
    const _token = uuid(0, 0);
    return _token;
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

const token = Mock.mock({
  code: 200,
  message: 'success',
  data: {
    token: '@token'
  }
});
/*
参数说明：
第一个参数：请求地址，请求时默认域名使用http://localhost: port;
第二个参数：请求方式；
第三个参数：回调返回接口关联的数据；
*/
Mock.mock('/users', 'get', () => users);
Mock.mock('/token', 'post', () => token);

/* 注意在通过这种方式的mock，发出的请求并不能在Network中访问;
如果需要在Network中访问，请移步 server 文件夹查看;
# 启动 server 服务需要另外开启一个node服务;
# 启动 命令 npm run server 或者带有监听模式的 npm run monserver;
*/
