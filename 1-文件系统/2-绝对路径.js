// 文件系统
import fs from 'node:fs'
// 文件系统的promise版本（推荐）
import fsPromises from 'node:fs/promises'
// 路径系统
import path from 'node:path'

// 绝对路径读取文件
// 绝对路径：从根目录开始的路径，不会受到工作目录的影响

// import.meta.dirname 当前文件的目录 esm模块规范
console.log('当前文件的目录', import.meta.dirname);
// __dirname 当前文件的目录 commonjs模块规范
// console.log('当前文件的目录', __dirname);

// 同理还有，filename
// import.meta.filename 当前文件的路径 esm模块规范
console.log('当前文件的路径', import.meta.filename);
// __filename 当前文件的路径 commonjs模块规范
// console.log('当前文件的路径', __filename);

// import.meta.url 当前文件的路径 esm模块规范
console.log('当前文件的路径，返回结果会对中文路径进行编码', import.meta.url);
console.log('当前文件的路径，返回结果会对中文路径进行编码，解码', decodeURIComponent(import.meta.url));

// path.resolve() 解析路径，返回绝对路径
 
// 同步
const data = fs.readFileSync(path.resolve(import.meta.dirname, './readme.md'), 'utf-8');
console.log('绝对路径读取', data);

// 异步
fs.readFile(path.resolve(import.meta.dirname, './readme.md'), 'utf-8', (err, data) => {
  if (err) {
    console.error('异步读取错误', err);
    return;
  }
  console.log('绝对路径读取', data);
});

// fsPromises 文件系统的promise版本
fsPromises.readFile(path.resolve(import.meta.dirname, './readme.md'), 'utf-8').then(res=>{
  console.log('promise读取成功', res);
}).catch(err=>{
  console.log('promise读取失败', err);
})