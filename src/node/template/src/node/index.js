const fs = require('fs');
const path = require('path');
const download = require('./utils/downloadgit');
const template = require('./deal');

/* 静态文字写入并读取, 注意 fs.writeFile 执行时机优先于 fs.readFile */
const resolvejs = path.join(__dirname, './as.js');

fs.readFile(resolvejs, 'utf8', (err, data) => {
  if (err === null) {
    console.log('> 文件读取成功');
    console.log('读取内容:', data);
  } else {
    console.log('> 文件读取失败');
  }
});

fs.writeFile(resolvejs, 'import { Ref } from "vue"\n', (err) => {
  if (err === null) {
    console.log('> 文件写入成功');
  } else {
    console.log('> 文件写入失败');
  }
});

/* fs.writeFile 方法如果目录下不存在指定地址文件则会直接在该目录下生成 newfile.vue 文件 */
const createFile = path.join(__dirname, '../views/Deal.vue');

const downloadPath = path.join(__dirname, './template');
download('https://github.com/pipiFlying/vue3test.git', downloadPath, { clone: true });

fs.writeFile(createFile, template, (err) => {
  if (err === null) {
    console.log('> 文件创建成功');
  } else {
    console.log('> 文件创建失败');
  }
});

// 不覆盖原文件的情况下, 在文件末端插入写入
fs.appendFile(resolvejs, 'console.log(Ref)\n', (err) => {
  if (err === null) {
    console.log('> 插入文件写入成功');
  } else {
    console.log('> 插入文件写入失败');
  }
});

/* 动态读取文件并写入 */
const read = fs.createReadStream(path.join(__dirname, '../main.ts'));
const write = fs.createWriteStream(path.join(__dirname, './text.js'));

read.on('data', (chunk) => {
  write.write(chunk);
});

/*
如果需要改变创建和删除执行的顺序可用各个方法的同步方法和异步方法来实现代Sync后缀的都是同步方法
同步创建文件夹 同名文件夹如果存在则输出err
*/
const createFolder = path.join(__dirname, '../folder');
fs.mkdirSync(createFolder, (err) => {
  if (err) throw err;
  console.log('> 文件夹创建成功');
});

/* 读取文件夹 */
const nodepath = path.join(__dirname, '../node');
fs.readdir(nodepath, (err, files) => {
  if (err) throw err;
  console.log(files);
});

/* 删除文件夹 文件夹必须是空文件夹否者输出err */
setTimeout(() => {
  fs.rmdir(createFolder, (err) => {
    if (err) throw err;
    console.log('> 删除文件夹成功');
  });
}, 3000);

/* 创建一个临时本地服务器 */
const http = require('http');

const server = http.createServer();
server.on('request', (req, res) => {
  console.log('服务器被访问了');
  const url = req.url;
  const method = req.method;
  const str = `Your requst url is ${url}, Your requst method is ${method}`;
  console.log(str);
  // 解决中文乱码
  res.setHeader('Content-type', 'text/html; charset=utf-8');
  res.end('服务数据');
});

// 启动服务器
const port = 8090;
server.listen(port, () => {
  console.log(`server run at:\n- Local: http://localhost:${port}/`);
});
