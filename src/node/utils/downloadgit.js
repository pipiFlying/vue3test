const download = require('download-git-repo');
const fs = require('fs');
const remove = require('./remove');
const spinner = require('./spinner');

module.exports = async function (url, dir, clone) {
  // 校验文件夹是否存在
  const islocal = fs.existsSync(dir);
  islocal && (await remove(dir));
  await new Promise((resolve, reject) => {
    spinner.start('文件下载中...');
    download(`direct:${url}`, dir, { clone }, async (error) => {
      if (error) {
        spinner.fail('下载失败');
        return reject(error);
      } else spinner.succeed('下载完成');
      resolve();
    });
  });
  return Promise.resolve(dir);
};
