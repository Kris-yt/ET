// @ts-nocheck
/*
 * @Date: 2024-07-25 15:28:54
 * @FilePath: /cli/utils.ts
 * @Description:
 */
import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import { colors } from './const'

/**
 * 执行命令
 * @param command
 * @returns
 */
export const runCommand = (command: string) => {
  console.log(`run command: ${command}`);
  const child = spawn(command, {
    cwd: './',
    shell: true,
    stdio: [
      'inherit',
      'inherit',
      'inherit'
    ],
  })

  child.stdout?.on('data', (data) => {
    stdout.write(data)
  })

  child.stderr?.on('data', (data) => {
    stderr.write(data)
  })

  child.on('error', (err) => {
    console.error('无法启动子进程。', err)
  })

  child.once('close', (code) => {
    child.stdout?.removeAllListeners()
    child.stderr?.removeAllListeners()
  })
  return child
}


/**
 * 写入文件
 * @param filename
 * @param content
 * @param tips
 */
export const writeFileByRecursive = (filename, content, isCover=false) => {
  if(fs.existsSync(filename) && !isCover) {
    console.log(colors.red, `⛔️ ${filename} 文件已存在，跳过`);
    return
  }
  const dir = path.dirname(filename);
  // 递归创建目录
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, content);
  // 创建文件，如果没有该目录则创建目录

  console.log(colors.green, `✅ ${filename} 文件创建成功`);
}