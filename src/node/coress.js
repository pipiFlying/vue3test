/* 利用 js 脚本去执行 node 命令 */
const { exec } = require('child_process');

exec('node src/node/index.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
  } else {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
});
