
// 获取命令行参数
// 运行 node app.js arg1 arg2​
console.log(process.argv);  // ['node', 'app.js', 'arg1', 'arg2']


// 读取环境变量
console.log('环境变量:',process.env);  // 输出环境变量
console.log('环境变量NODE_ENV:',process.env.NODE_ENV);  // 输出环境变量 NODE_ENV 的值

// 退出进程
console.log('即将退出进程');
process.exit(0);  // 0 表示成功退出
// process.exit(1);  // 非零退出码，表示出错


/**
 * 命令行：NODE_ENV=DEV node 1-process操作.js PORT=3000 --version
 * 解释：NODE_ENV=DEV 设置环境变量 NODE_ENV 的值为 DEV，node 1-process操作.js 运行脚本，PORT=3000 设置环境变量 PORT 的值为 3000，--version 表示输出 node 的版本号
 * 
 * 输出：
 * [
    '/Users/afan/.nvm/versions/node/v20.19.0/bin/node',
    '/Users/afan/Documents/my-code/demo/node-demo/3-process进程/1-process操作.js',
    'PORT=3000',
    '--version'
    ]
 */