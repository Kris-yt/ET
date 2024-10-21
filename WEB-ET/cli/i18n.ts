/*
 * @Date: 2024-08-02 16:16:59
 * @FilePath: /cli/i18n.ts
 * @Description:
 */
// @ts-nocheck

import path from 'path';
import walk from 'walk';
import _ from 'lodash';
import fs from 'fs';
import md5 from 'md5';
import { writeFileByRecursive } from './utils';

const __dirname = path.resolve();

export default async (types: string[], platform: string) => {

  const findLocaleFilesKeys = (pathName): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const localeFiles: string[] = [];
      const localeKeys: string[] = [];
      const walker = walk.walk(path.resolve(__dirname, pathName), { followLinks: false });

      walker.on('file', (root, fileStats, next) => {
        if (fileStats.name === '_locale.keys.ts') {
          localeFiles.push(path.join(root, fileStats.name));
          // 我要把这个文件通过 Import 的方式引入，然后读取文件内容，然后解析出里面的所有的 key
          const content = fs.readFileSync(path.join(root, fileStats.name), 'utf-8');
          const reg = /export default \[([\s\S]*)\]/g;
          const match = reg.exec(content);
          if (match) {
            const keys = match[1].split(',');
            keys.forEach((key) => {
              const k = key.replace(/'/g, '').replace(/"/g, '').replace(/\n/g, '').replace(/\s/g, '');
              localeKeys.push(k);
            });
          }
        }
        next();
      });

      walker.on('errors', (root, nodeStatsArray, next) => {
        reject(new Error('Error occurred while walking directory'));
        next();
      });

      walker.on('end', () => {
        resolve(localeKeys);
      });
    });
  };
  const localeKeysInCore= await findLocaleFilesKeys('src/core/locales');
  const localeKeysInView = await findLocaleFilesKeys(`src/views/${platform}/assets/language`);
  const fields = [...localeKeysInCore, ...localeKeysInView];
  // 已有语言文件变更
  let result = {};
  // 未翻译的部分（词条从未被收录部分）
  let noTrans = {};
  let ref = {};
  try{
    const old = fs.readFileSync(`src/views/${platform}/assets/language/index.ts`, 'utf-8').split('export default')[1];
    ref = eval('(' + old + ')');
  }catch(e){
    console.log('# 旧版语言文件不存在 #');
  }
  _.each(_.uniq(fields.filter(i => i)), (key) => {
    _.each(types, (item) => {
      var md5Key = md5(key).substr(0, 16);
      if(item === 'zh-CN'){
        result[md5Key] = result[md5Key] || {};
        result[md5Key][item] = key;
        return true;
      }
      if(ref[md5Key] && ref[md5Key][item]){
        result[md5Key] = result[md5Key] || {};
        result[md5Key][item] = ref[md5Key][item] || '';
      }else{
        noTrans[md5Key] = noTrans[md5Key] || result[md5Key] || {};
        noTrans[md5Key][item] = ''
      }
    })
  })
  // 踢出空词条
  _.each(_.cloneDeep(result), (item, key) => {
    if(noTrans[key]){
      delete result[key]
    }
  })
  const filePath = path.resolve(__dirname, `src/views/${platform}/assets/language/index.ts`)
  // // 中文简体单独生成空文件
  writeFileByRecursive(
    filePath,
    `${tips}export default \n` + JSON.stringify({...result, ...noTrans}, null, 2),
    true
  )
}

const tips = `
/**
 * 翻译注意事项
 * 1. 请将词条按照语言进行翻译
 * 2. 保留井号(#)内容到合适的位置，示例："您还有#money#余额可用" ---替换--> "your balance is #money#
 * 3. 请勿变更每行每个词条的HASH KEY
 * 4. 对应语言与编号：zh-HK -> 中文繁体 / en-US -> 英文 / th -> 泰语 / hi -> 印地语 / vi -> 越南语 / ko -> 韩语 / ja -> 日语 / zh-CN -> 中文简体
*/\n
`
