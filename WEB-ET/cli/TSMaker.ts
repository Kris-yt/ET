// @ts-nocheck
/*
 * @Date: 2024-07-25 15:37:17
 * @FilePath: /cli/TSMaker.ts
 * @Description:
 */
import fs from 'fs'

export default ({ client }) => {
  const config = {
    "compilerOptions": {
      "composite": true,
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "noImplicitAny": false,
      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",

      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "paths": {
        "@/*": ["./src/*"],
        "@base-ui/*": ["./src/core/templates/base-ui/*"],
        "@my/*": [`./src/views/pl/*`],
        "@this/*": [`./src/views/pl/${client}/*`],
        "@shadow/*": [`./src/views/pl/${client}/shadow/*`],
        "@templates/*": [`./src/core/templates/${client}/*`],
        "@actions/*": ["./src/core/actions/*"],
        "@services/*": ["./src/core/services/*"],
        "@constants/*": ["./src/core/constants/*"],
        "@locales/*": ["./src/locales/*"],
        "@utlis/*": ["./src/core/utlis/*"],
        "@apis/*": ["./src/core/apis/*"],
        "@hooks/*": ["./src/core/hooks/*"]
      }
    },
    "include": [
      "src/**/*",
      "cli/**/*",
      "deployment/**/*"
    ]
  }

  fs.writeFile('./tsconfig.app.json', `${tips}${JSON.stringify(config, null, 2)}`, {}, function (error) {
    if (error) {
      console.warn('#生成 tsconfig.app.json 失败')
    } else {
      console.log('#生成 tsconfig.app.json 成功')
    }
  })
}

const tips = `
/**
 * TS-CONFIG 配置说明
 * 1. 该文件由脚本自动生成，请勿手动修改
 * 2. 修改配置请在 cli/TSMaker.ts 中修改
 * 3. 该配置文件用于配置 TypeScript 编译选项
 */\n`