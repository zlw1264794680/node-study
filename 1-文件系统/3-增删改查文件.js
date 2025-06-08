// 增删改查文件
import fsPromises from 'node:fs/promises'
import path from 'node:path'

// 1. 增加文件
const createFile = async () => {
    const uid = (Math.random() * 10).toString(32)
    const createFilePath = path.resolve(import.meta.dirname, `./${uid}.txt`)
    await fsPromises.writeFile(createFilePath, 'hello world')
    console.log('创建文件成功')
    return createFilePath
}

// 2. 查看文件是否存在
// 另一种方法：使用 fs-extra 库，提供了更多的文件操作方法
const checkFile = async (filePath) => {
    try {
        await fsPromises.access(filePath)
        console.log('文件存在');
        return true;
    } catch (err) {
        console.log('文件不存在');
        return false;
    }
}

// 3. 删除文件
const deleteFile = async (filePath) => {
    await fsPromises.unlink(filePath)
    console.log('删除文件成功')
}

// 主函数
async function main() {
   const filePath = await createFile()
   await checkFile(filePath)
   deleteFile(filePath)
}
main()