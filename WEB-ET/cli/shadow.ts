/*
 * @Date: 2024-07-25 15:53:28
 * @FilePath: /cli/shadow.ts
 * @Description:
 */
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { writeFileByRecursive } from './utils'

const __dirname = path.resolve();

export const createNewShadowComponent = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'path',
    message: '请输入目标组件相对路径，可在VSCode中右键单击组件，选择复制路径\n例：src/core/templates/mobile-horizontal/pages/bootstrap/index.tsx\n',
  }])
  .then((answers) => {
    // 路径分隔符，mac 为 /，windows 为 \
    const sep = path.sep
    // 必须在 src/core/templates 中创建影子组件
    if(answers.path.search(`src${sep}core${sep}templates`) === -1){
      console.log('⛔️ 请在模板文件夹中创建影子组件')
      return
    }
    // 后缀必须是 tsx
    if(answers.path.search(/\.tsx$/) === -1){
      console.log('⛔️ 请使用 tsx 文件')
      return
    }
    // 不要绝对路径，必须为 src开头
    if(answers.path.search(/^src/) === -1){
      console.log('⛔️ 请使用 src 开头的相对路径')
      return
    }
    // 文件是否存在
    if(!fs.existsSync(answers.path)){
      console.log('⛔️ 目标组件不存在')
      return
    }
    inquirer.prompt([{
      type: 'list',
      name: 'confirm',
      message: '确认创建影子组件？',
      choices: ['是', '否'],
    }])
    .then((ans) => {
      if(ans.confirm === '否'){
        return;
      }
      // 获取所有 src/views/ 层级下的目录
      const dirs = fs.readdirSync(path.resolve(__dirname, 'src/views/'));
      // 当前被创建的客户端 mobile / desktop / mobile-horizontal
      const mode = answers.path.split(sep)[3];
      // relativePath 为相对路径, 不带文件
      const relativePath = answers.path.split(sep).slice(4).join(sep).split(sep).slice(0, -1).join(sep);
      // 文件名称
      const filename = answers.path.split(sep).pop();
      // 生成 SCSS 文件
      const sassContent = `@import \'@shadow/${relativePath}/style.module.scss\';`;
      // 写入 SCSS 文件
      writeFileByRecursive(answers.path.replace(filename, 'style.module.scss'), sassContent);
      // 生成 types.d.ts 文件
      const typesContent = `export interface IProps {}`;
      writeFileByRecursive(answers.path.replace(filename, 'types.d.ts'), typesContent);
      // 生成 configs.ts 文件
      const configContent = `import configs from '@shadow/${relativePath}/configs.ts\';\n\nexport default {\n\t\n\t...configs\n}`;
      writeFileByRecursive(answers.path.replace(filename, 'configs.ts'), configContent);
      // 循环为每个DIR路径创建影子组件
      for(let dir of dirs){
        const shadowPath = path.resolve(__dirname, `src/views/${dir}/${mode}/shadow/${relativePath}`);
        console.log(shadowPath);
        // 生成 TSX 文件
        const tsxContent = `export { default } from '@templates/${relativePath}/${filename.replace('.tsx', '')}';`;
        writeFileByRecursive(`${shadowPath}/${filename}`, tsxContent);
        // 生成 SCSS 文件
        writeFileByRecursive(`${shadowPath}/style.module.scss`, scssTips);
        // 生成 configs.ts 文件
        writeFileByRecursive(`${shadowPath}/configs.ts`, 'export default {\n\t\n}');
      }
      console.log(relativePath, filename)
    })
  })
}

const scssTips =
`// 请在此文件中编写影子组件的样式（以覆盖 @templates 中相同的组件样式）`