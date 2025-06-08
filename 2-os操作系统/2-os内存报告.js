import os from 'node:os'; // 导入 Node.js 的 os 模块，用于获取操作系统信息
import { execSync } from 'node:child_process'; // 导入 child_process 模块的 execSync，用于同步执行 shell 命令

// 格式化字节数为 MB
function formatBytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// 格式化字节数为 GB
function formatGB(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

// 通过执行 ps 命令获取所有进程的 RSS 总和
function getProcessMemoryTotalRSS() {
    try {
        // 执行 'ps -axo rss' 命令，获取所有进程的常驻内存大小 (RSS)，单位 KB
        const output = execSync('ps -axo rss', { encoding: 'utf8' });
        // 分割输出为行，跳过第一行（标题行）
        const lines = output.trim().split('\n').slice(1);
        // 累加所有行的 RSS 值（转换为数字），计算总 KB 数
        const totalKB = lines.reduce((acc, line) => acc + parseInt(line.trim() || '0'), 0);
        return totalKB * 1024; // 将总 KB 转换为 bytes
    } catch (err) {
        // 如果执行命令失败，打印错误信息并返回 0
        console.error('获取进程内存信息失败:', err.message);
        return 0;
    }
}

// 获取更准确的系统内存使用情况（通过累加所有进程的 RSS）
function getAccurateMemoryUsageViaProcesses() {
    const totalMem = os.totalmem(); // 获取系统总内存 (bytes)
    const rssTotal = getProcessMemoryTotalRSS(); // 获取所有进程的 RSS 总和 (bytes)
    // 计算内存使用率
    const usagePercent = ((rssTotal / totalMem) * 100).toFixed(2);

    return {
        total: formatGB(totalMem), // 格式化总内存为 GB
        used: formatGB(rssTotal), // 格式化已用内存为 GB
        usagePercent: usagePercent + '%', // 添加百分号
    };
}

// 获取当前 Node.js 进程的内存使用信息
function getProcessMemoryInfo() {
    const mem = process.memoryUsage(); // 获取当前进程的内存使用对象
    return {
        rss: formatBytes(mem.rss),               // 常驻内存 (Resident Set Size) - 进程占用的物理内存
        heapTotal: formatBytes(mem.heapTotal),   // JS 可用堆总量 - V8 引擎分配的堆内存总量
        heapUsed: formatBytes(mem.heapUsed),     // JS 实际使用堆 - V8 引擎实际使用的堆内存
        external: formatBytes(mem.external),     // JS-C++ 绑定内存 - V8 管理的 C++ 对象内存
        arrayBuffers: formatBytes(mem.arrayBuffers || 0), // ArrayBuffer 和 SharedArrayBuffer 占用的内存
    };
}

// 打印内存报告
function printMemoryReport() {
    console.log('========== 内存状态报告 ==========');
    const sys = getAccurateMemoryUsageViaProcesses(); // 获取系统内存信息
    const proc = getProcessMemoryInfo(); // 获取当前进程内存信息

    console.log('[系统内存]');
    console.log(`总内存    : ${sys.total}`);
    console.log(`已用内存  : ${sys.used}`);
    console.log(`使用率    : ${sys.usagePercent}`);

    console.log('\n[Node.js 当前进程内存]');
    // 遍历进程内存信息对象，打印每个属性
    Object.entries(proc).forEach(([key, value]) => {
        console.log(`${key.padEnd(12)}: ${value}`); // 使用 padEnd 对齐输出
    });

    console.log('==================================\n');
}

// 每 5 秒调用一次 printMemoryReport 函数，打印报告
setInterval(printMemoryReport, 5000);

// 立即调用一次 printMemoryReport 函数，打印初始报告
printMemoryReport();