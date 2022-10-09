const fs = require('fs');

/* 删除文件夹 */
const delDir = (path) => {
  let files = [];
  if (!fs.existsSync(path)) return;
  files = fs.readdirSync(path);
  files.forEach((file) => {
    const curPath = path + '/' + file;
    fs.statSync(curPath).isDirectory() ? delDir(curPath) : fs.unlinkSync(curPath);
  });
  fs.rmdirSync(path);
};

module.exports = delDir;
