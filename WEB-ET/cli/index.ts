/*
 * @Date: 2024-07-25 15:09:43
 * @FilePath: /cli/index.ts
 * @Description:
 */
import _ from 'lodash';
import inquirer from "inquirer"
import { features, language, platform } from './const';
import { runCommand } from './utils';
import makeTSConfig from './TSMaker';
import { createNewShadowComponent } from './shadow';
import makeLocales from './i18n';

inquirer.prompt([{
  type: 'list',
  name: 'feature',
  message: '请选择要执行的任务',
  choices: Object.values(features),
}])
.then((answers) => {
  if(answers.feature === features.devMode) {
    makeTSConfig({client: 'mobile-horizontal'});
    runCommand('pnpm dev')
    return;
  }
  if(answers.feature === features.prodMode) {
    runCommand('pnpm build')
    return;
  }
  if(answers.feature === features.shadow) {
    createNewShadowComponent();
    return;
  }
  if(answers.feature === features.lang) {
    makeI18n();
    return;
  }
})

const makeI18n = () => inquirer.prompt([
  {
    type: 'list',
    name: 'platform',
    message: '请选择构建平台',
    choices: ['PH-PL'],
  }
]).then(answers => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'confirm',
      message: `确认生成语言包吗？`,
      choices: ['确认生成', '取消'],
    }
  ]).then(ans => {
    if(ans.confirm === '取消'){
      return;
    }
    console.log('# 开始生成语言文件 #')
    const makeL = _.chain(language).pick(platform[answers.platform].langs).values().value();
    makeLocales(makeL, platform[answers.platform].alias)
  })
})
